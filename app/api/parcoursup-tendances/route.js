import { NextResponse } from 'next/server';

// ─── Cache en mémoire (24 h) ──────────────────────────────────────────────────
const cache = new Map();
const TTL_MS = 24 * 60 * 60 * 1000;
function fromCache(key) {
  const e = cache.get(key);
  return e && Date.now() < e.expiry ? e.data : null;
}
function toCache(key, data) {
  cache.set(key, { data, expiry: Date.now() + TTL_MS });
}

const BASE = 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets';

// Sessions disponibles :
//   fr-esr-parcoursup         → 2025 (dataset courant)
//   fr-esr-parcoursup_2024    → 2024
//   fr-esr-parcoursup_2023    → 2023
//   fr-esr-parcoursup_2022    → 2022
//   fr-esr-parcoursup_2021    → 2021
//
// ⚠️  En 2021-2022, lib_comp_voe_ins = "École - BTS - Agricole - Formation"
//     En 2023+, lib_comp_voe_ins = "BTSA Productions animales" (formation seule)
//     → On utilise lib_for_voe_ins comme clé commune + g_ea_lib_vx pour le filtre école.
const SESSIONS = [
  { year: '2021', dataset: 'fr-esr-parcoursup_2021' },
  { year: '2022', dataset: 'fr-esr-parcoursup_2022' },
  { year: '2023', dataset: 'fr-esr-parcoursup_2023' },
  { year: '2024', dataset: 'fr-esr-parcoursup_2024' },
  { year: '2025', dataset: 'fr-esr-parcoursup' },
];

// Mots-clés sur le nom de l'établissement — identiques dans tous les millésimes
const ETAB_KW = [
  'agricole', 'agro', 'horticole', 'viticole', 'forestier',
  'MFR', 'LEAP', 'LEGTA', 'EPLEFPA', 'CFPPA',
];

function buildWhere(dept) {
  const etabF = ETAB_KW.map(k => `g_ea_lib_vx like "%${k}%"`).join(' OR ');
  return dept
    ? `dep="${dept.replace(/^0+/, '')}" AND (${etabF})`
    : etabF;
}

// Normalise un libellé de formation pour regrouper à travers les années
// 2021-2022 : "BTS - Agricole - productions animales"
// 2023+     : "BTSA Productions animales" ou "Bac Pro CGEA"
function normKey(libFor, libComp) {
  // Préfère lib_for_voe_ins (plus stable)
  const raw = (libFor || libComp || '').trim();
  // Retire le nom d'établissement s'il est concaténé (format 2021-2022)
  // Pattern : "École XXX - Formation" → garde la partie après " - "
  const parts = raw.split(' - ');
  if (parts.length >= 3 && parts[0].length > 10) {
    // Probable format "École - Niveau - Formation"
    return parts.slice(1).join(' - ').trim();
  }
  return raw;
}

// L'API Opendatasoft a une limite maximale de 100 enregistrements par requête
async function fetchOneYear({ year, dataset }, dept) {
  const where = buildWhere(dept);
  const select = [
    'g_ea_lib_vx', 'lib_comp_voe_ins', 'lib_for_voe_ins',
    'fili', 'fil_lib_voe_acc',
    'dep', 'voe_tot', 'acc_tot', 'capa_fin',
  ].join(',');

  async function fetchPage(offset) {
    const params = new URLSearchParams({ where, limit: 100, offset, select });
    const res = await fetch(`${BASE}/${dataset}/records?${params}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return { results: [], total: 0 };
    const data = await res.json();
    return { results: data.results ?? [], total: data.total_count ?? 0 };
  }

  try {
    const first = await fetchPage(0);
    let results = first.results;
    // Paginer si nécessaire (max 5 pages supplémentaires = 600 records max)
    if (first.total > 100) {
      const pages = Math.min(Math.ceil((first.total - 100) / 100), 5);
      const rest = await Promise.all(
        Array.from({ length: pages }, (_, i) => fetchPage(100 + i * 100))
      );
      rest.forEach(p => { results = results.concat(p.results); });
    }
    return { year, results };
  } catch {
    return { year, results: [] };
  }
}

// ─── GET /api/parcoursup-tendances?dept=44 ────────────────────────────────────
// Analyse multi-millésimes des formations agricoles (2021–2025).
// Retourne formations_avenir, formations_risque, formations_attractives, top_bours.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = (searchParams.get('dept') || '').replace(/^0+/, '');

  const cacheKey = `parcoursup-tendances-${dept || 'national'}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    // ── Téléchargement parallèle des 5 sessions ──────────────────────────
    const yearData = await Promise.all(
      SESSIONS.map(s => fetchOneYear(s, dept))
    );

    // ── Agrégation par clé de formation normalisée ───────────────────────
    const formMap = new Map();
    const years = SESSIONS.map(s => s.year);

    for (const { year, results } of yearData) {
      for (const r of results) {
        const key = normKey(r.lib_for_voe_ins, r.lib_comp_voe_ins);
        if (!key) continue;

        if (!formMap.has(key)) {
          formMap.set(key, {
            nom: key,
            filiere: r.fil_lib_voe_acc || r.fili,
            depts: new Set(),
            annees: {},
          });
        }

        const f = formMap.get(key);
        f.depts.add(r.dep || '');

        if (!f.annees[year]) {
          f.annees[year] = { voe: 0, acc: 0, capa: 0, n: 0 };
        }
        const a = f.annees[year];
        a.voe  += r.voe_tot  || 0;
        a.acc  += r.acc_tot  || 0;
        a.capa += r.capa_fin || 0;
        a.n++;
      }
    }

    // ── Calcul des tendances ─────────────────────────────────────────────
    const all = [];
    for (const [, f] of formMap.entries()) {
      const getVoe = y => f.annees[y]?.voe ?? null;
      const v21 = getVoe('2021'), v22 = getVoe('2022'), v23 = getVoe('2023');
      const v24 = getVoe('2024'), v25 = getVoe('2025');

      // Préfère la progression la plus longue disponible
      const vDebut = v21 ?? v22 ?? v23;
      const vFin   = v25 ?? v24;
      const croissance_4ans = vDebut && vFin
        ? Math.round(((vFin - vDebut) / vDebut) * 100)
        : null;
      const croissance_1an  = v24 && v25
        ? Math.round(((v25 - v24) / v24) * 100)
        : null;

      all.push({
        nom: f.nom,
        filiere: f.filiere,
        nb_depts: f.depts.size,
        voeux_par_an: { '2021': v21, '2022': v22, '2023': v23, '2024': v24, '2025': v25 },
        croissance_4ans,
        croissance_1an,
        voeux_latest: vFin,
      });
    }

    const recent = f => (f.voeux_latest ?? 0) > 10;

    const formations_avenir = [...all]
      .filter(f => f.croissance_4ans !== null && f.croissance_4ans > 5 && recent(f))
      .sort((a, b) => b.croissance_4ans - a.croissance_4ans)
      .slice(0, 12);

    const formations_risque = [...all]
      .filter(f => f.croissance_4ans !== null && f.croissance_4ans < -8 && (f.voeux_par_an['2021'] ?? f.voeux_par_an['2022'] ?? 0) > 10)
      .sort((a, b) => a.croissance_4ans - b.croissance_4ans)
      .slice(0, 8);

    const formations_attractives = [...all]
      .filter(f => recent(f) && f.nb_depts > 1)
      .sort((a, b) => b.nb_depts - a.nb_depts)
      .slice(0, 8);

    // Statistiques par année
    const stats_par_an = {};
    for (const { year, results } of yearData) {
      stats_par_an[year] = {
        formations: results.length,
        voeux: results.reduce((s, r) => s + (r.voe_tot || 0), 0),
        admis:  results.reduce((s, r) => s + (r.acc_tot || 0), 0),
      };
    }

    const payload = {
      dept: dept || 'national',
      annees: years,
      total_formations_uniques: all.length,
      stats_par_an,
      formations_avenir,
      formations_risque,
      formations_attractives,
      fetched_at: new Date().toISOString(),
    };

    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[parcoursup-tendances]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
