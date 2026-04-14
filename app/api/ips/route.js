import { NextResponse } from 'next/server';

// ─── Cache en mémoire (24 h) — données quasi-statiques ───────────────────────
const cache = new Map();
const TTL_MS = 24 * 60 * 60 * 1000;

function fromCache(key) {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiry) return entry.data;
  return null;
}
function toCache(key, data) {
  cache.set(key, { data, expiry: Date.now() + TTL_MS });
}

// Références nationales IPS 2023-2024 (source DEPP)
const IPS_REF = {
  ecoles:   115,
  colleges: 104,
  lycees:   114,
  // Seuils de classification
  faible: 89,    // < 89 = milieu défavorisé
  eleve:  120,   // > 120 = milieu favorisé
};

// Codes de zonage prioritaire dans l'Annuaire Éducation
// appartenance_education_prioritaire: "REP+" | "REP" | null
const BASE_ANNUAIRE = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records';
const BASE_PSP = 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records';

// ─── Récupération des comptages par type/zone (API max limit = 100) ──────────
// Utilise total_count au lieu de charger tous les enregistrements
async function countEtabs(code, extraWhere = '') {
  const where = `code_departement="${code}"${extraWhere}`;
  const params = new URLSearchParams({ where, limit: 1, select: 'identifiant_de_l_etablissement' });
  const res = await fetch(`${BASE_ANNUAIRE}?${params}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data = await res.json();
  return data.total_count ?? 0;
}

async function fetchEtabsDept(dept) {
  const code = dept.padStart(3, '0');
  const [total, repPlus, rep, ecoles, colleges, lycees, lyceesPro] = await Promise.all([
    countEtabs(code),
    countEtabs(code, ' AND appartenance_education_prioritaire="REP+"'),
    countEtabs(code, ' AND appartenance_education_prioritaire="REP"'),
    countEtabs(code, ' AND (type_etablissement like "%école%" OR type_etablissement like "%maternelle%" OR type_etablissement like "%élémentaire%")'),
    countEtabs(code, ' AND type_etablissement like "%collège%"'),
    countEtabs(code, ' AND type_etablissement like "%lycée%"'),
    countEtabs(code, ' AND voie_professionnelle=true'),
  ]);
  return { total, repPlus, rep, ecoles, colleges, lycees, lyceesPro };
}

// ─── Récupération du pct_bours moyen depuis Parcoursup (paginated, max 100/page) ─
async function fetchPctBoursDept(dept) {
  const depCode = dept.replace(/^0+/, '');
  async function fetchPage(offset) {
    const params = new URLSearchParams({
      where: `dep="${depCode}"`,
      limit: 100,
      offset,
      select: 'pct_bours',
    });
    const res = await fetch(`${BASE_PSP}?${params}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return { results: [], total: 0 };
    const data = await res.json();
    return { results: data.results ?? [], total: data.total_count ?? 0 };
  }

  const first = await fetchPage(0);
  let records = first.results;
  if (first.total > 100) {
    const pages = Math.min(Math.ceil((first.total - 100) / 100), 4); // max 500 records
    const rest = await Promise.all(
      Array.from({ length: pages }, (_, i) => fetchPage(100 + i * 100))
    );
    rest.forEach(p => { records = records.concat(p.results); });
  }

  const vals = records.map(r => r.pct_bours).filter(v => v != null);
  return vals.length
    ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length * 10) / 10
    : null;
}

// ─── GET /api/ips?dept=44 ──────────────────────────────────────────────────────
// Profil socio-économique du territoire (proxy IPS) :
//   - Nombre d'établissements en REP / REP+
//   - Densité scolaire (écoles, collèges, lycées)
//   - pct_bours moyen (Parcoursup) comme proxy du mix social supérieur
//   - Estimation du niveau IPS relatif (favori / médian / défavorisé)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = (searchParams.get('dept') || '').replace(/^0+/, '');

  if (!dept) {
    return NextResponse.json({ error: 'Paramètre dept requis' }, { status: 400 });
  }

  const cacheKey = `ips-${dept}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    const [etabs, pctBours] = await Promise.all([
      fetchEtabsDept(dept),
      fetchPctBoursDept(dept),
    ]);

    // ── Comptages par type (directement depuis les count queries) ──────────
    const repPlus  = etabs.repPlus;
    const rep      = etabs.rep;
    const repTotal = repPlus + rep;
    const pctRep   = etabs.total ? Math.round((repTotal / etabs.total) * 100) : 0;

    // ── Estimation IPS ──────────────────────────────────────────────────────
    // Méthode proxy : on estime l'IPS relatif en combinant
    //   • part d'écoles en REP (- favorable)
    //   • pct_bours Parcoursup (+ boursiers = - favorable)
    // Score synthétique : 100 = médiane nationale
    let ips_estime = 104; // valeur de référence nationale collèges
    if (pctRep > 0) {
      // REP = écoles socialement défavorisées → baisse IPS estimé
      ips_estime -= Math.min(30, pctRep * 0.8);
    }
    if (pctBours !== null) {
      // % boursiers national ~28 % → si + élevé = territoire moins favorisé
      const delta = pctBours - 28;
      ips_estime -= delta * 0.4;
    }
    ips_estime = Math.round(Math.max(70, Math.min(145, ips_estime)));

    // ── Classification ─────────────────────────────────────────────────────
    const profil = ips_estime < IPS_REF.faible  ? 'défavorisé'
                 : ips_estime > IPS_REF.eleve    ? 'favorisé'
                 : 'médian';
    const profil_color = profil === 'favorisé' ? 'green'
                       : profil === 'défavorisé' ? 'red'
                       : 'amber';

    const payload = {
      dept,
      ips_estime,
      profil,
      profil_color,
      reference_nationale: IPS_REF.colleges,
      ecart_nationale: ips_estime - IPS_REF.colleges,
      sources: {
        pct_bours_parcoursup: pctBours,     // % boursiers admis en sup (Parcoursup 2025)
        pct_rep: pctRep,                    // % établissements en zone prioritaire
        nb_rep_plus: repPlus,
        nb_rep: rep,
      },
      etablissements: {
        total: etabs.total,
        ecoles: etabs.ecoles,
        colleges: etabs.colleges,
        lycees: etabs.lycees,
        lycees_pro: etabs.lyceesPro,
      },
      note: 'IPS estimé par proxy (REP/REP+ + % boursiers Parcoursup). IPS DEPP officiel publié sur data.education.gouv.fr',
      fetched_at: new Date().toISOString(),
    };

    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[ips]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
