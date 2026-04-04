import { NextResponse } from 'next/server';

// ─── Cache en mémoire (1 h) ───────────────────────────────────────────────────
const cache = new Map(); // key → { data, expiry }
const TTL_MS = 60 * 60 * 1000;

function fromCache(key) {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiry) return entry.data;
  return null;
}
function toCache(key, data) {
  cache.set(key, { data, expiry: Date.now() + TTL_MS });
}

const BASE = 'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records';

// Mots-clés sur le nom de l'établissement ou de la formation pour cibler l'agricole
// On filtre d'abord côté API sur les noms d'écoles agricoles connues,
// puis on affine côté serveur sur les formations.
const AGRI_ETAB_KEYWORDS = [
  'agricole', 'agro', 'horticole', 'viticole', 'forestier',
  'MFR', 'LEAP', 'LEGTA', 'EPLEFPA', 'CFPPA',
];

const AGRI_FORMATION_KEYWORDS = [
  'agri', 'BTSA', 'CGEA', 'élevage', 'maraîch', 'viticulture',
  'agroéquipement', 'aménagement paysager', 'aquaculture', 'horticulture',
  'productions animales', 'productions végétales', 'SAPAT', 'forêt',
  'rural', 'vigne', 'oenologie', 'agroécologie', 'vétérinaire',
];

function buildWhereClause(dept) {
  const etabFilter = AGRI_ETAB_KEYWORDS
    .map(k => `g_ea_lib_vx like "%${k}%"`)
    .join(' OR ');
  const formFilter = AGRI_FORMATION_KEYWORDS
    .map(k => `lib_comp_voe_ins like "%${k}%"`)
    .join(' OR ');
  const combined = `(${etabFilter}) OR (${formFilter})`;
  return dept
    ? `dep="${dept.replace(/^0+/, '')}" AND (${combined})`
    : `(${combined})`;
}

async function fetchPage(where, offset, limit = 100) {
  const params = new URLSearchParams({
    where,
    limit,
    offset,
    select: [
      'g_ea_lib_vx', 'lib_comp_voe_ins', 'fili', 'fil_lib_voe_acc',
      'contrat_etab', 'ville_etab', 'dep', 'region_etab_aff',
      'capa_fin', 'voe_tot', 'acc_tot', 'taux_acces_ens',
      'pct_bours', 'acc_bg', 'acc_bt', 'acc_bp', 'cod_uai',
    ].join(','),
  });
  const res = await fetch(`${BASE}?${params}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Parcoursup ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── GET /api/parcoursup?dept=44 ──────────────────────────────────────────────
// Retourne les formations agricoles avec leur attractivité et la liste des
// établissements concurrents (public + privé) pour un département donné.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = (searchParams.get('dept') || '').replace(/^0+/, '');

  const cacheKey = `parcoursup-${dept}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    const where = buildWhereClause(dept);

    // Première page pour connaître le total
    const first = await fetchPage(where, 0, 100);
    const total = first.total_count ?? first.results?.length ?? 0;
    let results = first.results ?? [];

    // Pages suivantes si nécessaire (max 500 résultats)
    if (total > 100) {
      const pages = Math.min(Math.ceil((total - 100) / 100), 4);
      const rest = await Promise.all(
        Array.from({ length: pages }, (_, i) => fetchPage(where, 100 + i * 100))
      );
      rest.forEach(p => { results = results.concat(p.results ?? []); });
    }

    // ── Enrichissement ──────────────────────────────────────────────────────
    const formations = results.map(r => ({
      uai:           r.cod_uai,
      etablissement: r.g_ea_lib_vx,
      formation:     r.lib_comp_voe_ins,
      filiere:       r.fil_lib_voe_acc || r.fili,
      type:          r.contrat_etab,       // "Public" ou "Privé"
      ville:         r.ville_etab,
      dept:          r.dep,
      region:        r.region_etab_aff,
      capacite:      r.capa_fin,
      voeux:         r.voe_tot,
      admis:         r.acc_tot,
      taux_acces:    r.taux_acces_ens,
      pct_boursiers: r.pct_bours,
      admis_bac_gen:  r.acc_bg,
      admis_bac_tech: r.acc_bt,
      admis_bac_pro:  r.acc_bp,
      coords:        null,
    }));

    // ── Stats agrégées ───────────────────────────────────────────────────────
    const actifs = formations.filter(f => f.voeux > 0);
    const totalVoeux   = actifs.reduce((s, f) => s + (f.voeux || 0), 0);
    const totalAdmis   = actifs.reduce((s, f) => s + (f.admis || 0), 0);
    const totalCapa    = actifs.reduce((s, f) => s + (f.capacite || 0), 0);
    const tauxMoyen    = actifs.length
      ? Math.round(actifs.reduce((s, f) => s + (f.taux_acces || 0), 0) / actifs.length)
      : null;

    // Top formations par attractivité (voeux / capacité)
    const topAttractivite = [...actifs]
      .filter(f => f.capacite > 0)
      .map(f => ({ ...f, ratio: Math.round((f.voeux / f.capacite) * 10) / 10 }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 10);

    // Répartition public / privé
    const parType = formations.reduce((acc, f) => {
      const k = f.type || 'Autre';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    // Établissements uniques (concurrents)
    const etabsMap = new Map();
    formations.forEach(f => {
      if (!etabsMap.has(f.uai)) {
        etabsMap.set(f.uai, {
          uai: f.uai,
          nom: f.etablissement,
          ville: f.ville,
          dept: f.dept,
          region: f.region,
          type: f.type,
          coords: f.coords,
          formations_count: 0,
          total_voeux: 0,
          total_capacite: 0,
        });
      }
      const e = etabsMap.get(f.uai);
      e.formations_count++;
      e.total_voeux    += f.voeux || 0;
      e.total_capacite += f.capacite || 0;
    });
    const etablissements = [...etabsMap.values()]
      .sort((a, b) => b.total_voeux - a.total_voeux);

    const payload = {
      dept: dept || 'national',
      total_formations: formations.length,
      total_etablissements: etablissements.length,
      stats: {
        total_voeux: totalVoeux,
        total_admis: totalAdmis,
        total_capacite: totalCapa,
        taux_acces_moyen: tauxMoyen,
      },
      par_type: parType,
      top_attractivite: topAttractivite,
      etablissements,
      formations,
      fetched_at: new Date().toISOString(),
    };

    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[parcoursup]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
