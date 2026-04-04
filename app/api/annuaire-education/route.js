import { NextResponse } from 'next/server';

// ─── Cache en mémoire (2 h) ───────────────────────────────────────────────────
const cache = new Map();
const TTL_MS = 2 * 60 * 60 * 1000;

function fromCache(key) {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiry) return entry.data;
  return null;
}
function toCache(key, data) {
  cache.set(key, { data, expiry: Date.now() + TTL_MS });
}

const BASE = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records';

const SELECT_FIELDS = [
  'identifiant_de_l_etablissement',
  'nom_etablissement',
  'type_etablissement',
  'statut_public_prive',
  'ministere_tutelle',
  'code_postal',
  'nom_commune',
  'code_departement',
  'libelle_departement',
  'libelle_region',
  'libelle_academie',
  'telephone',
  'mail',
  'web',
  'voie_professionnelle',
  'voie_technologique',
  'apprentissage',
  'date_ouverture',
  'latitude',
  'longitude',
].join(',');

async function fetchPage(where, offset, limit = 100) {
  const params = new URLSearchParams({ where, limit, offset, select: SELECT_FIELDS });
  const res = await fetch(`${BASE}?${params}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 7200 },
  });
  if (!res.ok) throw new Error(`Annuaire Éducation ${res.status}: ${await res.text()}`);
  return res.json();
}

function mapRecord(r) {
  return {
    uai:             r.identifiant_de_l_etablissement,
    nom:             r.nom_etablissement,
    type:            r.type_etablissement,
    statut:          r.statut_public_prive,
    ministere:       r.ministere_tutelle,
    code_postal:     r.code_postal,
    commune:         r.nom_commune,
    code_dept:       r.code_departement,
    departement:     r.libelle_departement,
    region:          r.libelle_region,
    academie:        r.libelle_academie,
    telephone:       r.telephone,
    mail:            r.mail,
    web:             r.web,
    voie_pro:        r.voie_professionnelle,
    voie_tech:       r.voie_technologique,
    apprentissage:   r.apprentissage,
    date_ouverture:  r.date_ouverture,
    lat:             r.latitude  ? parseFloat(r.latitude)  : null,
    lng:             r.longitude ? parseFloat(r.longitude) : null,
  };
}

// ─── GET /api/annuaire-education?dept=44&type=prive ──────────────────────────
// Retourne les établissements agricoles (tutelle Agriculture) d'un département.
// type: "prive" (défaut) | "public" | "tous"
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept   = searchParams.get('dept')   || '';
  const type   = searchParams.get('type')   || 'prive'; // prive | public | tous
  const radius = searchParams.get('radius') || '';      // km, nécessite lat+lng
  const lat    = searchParams.get('lat')    || '';
  const lng    = searchParams.get('lng')    || '';

  const cacheKey = `annuaire-${dept}-${type}-${lat}-${lng}-${radius}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    // Construction du filtre WHERE
    const clauses = ['ministere_tutelle="AGRICULTURE"'];

    if (type === 'prive') {
      clauses.push('statut_public_prive="Privé"');
    } else if (type === 'public') {
      clauses.push('statut_public_prive="Public"');
    }

    if (dept) {
      const padded = dept.padStart(3, '0'); // L'API utilise 3 chiffres : "044" pour Loire-Atlantique
      clauses.push(`code_departement="${padded}"`);
    }

    // Filtre géographique (si lat/lng + radius fournis)
    if (lat && lng && radius) {
      clauses.push(`distance(geolocation, geom'POINT(${lng} ${lat})', ${parseInt(radius, 10)}km)`);
    }

    const where = clauses.join(' AND ');

    // Première page
    const first = await fetchPage(where, 0, 100);
    const total = first.total_count ?? 0;
    let results = (first.results ?? []).map(mapRecord);

    // Pages suivantes (max 600 résultats)
    if (total > 100) {
      const pages = Math.min(Math.ceil((total - 100) / 100), 5);
      const rest = await Promise.all(
        Array.from({ length: pages }, (_, i) => fetchPage(where, 100 + i * 100))
      );
      rest.forEach(p => { results = results.concat((p.results ?? []).map(mapRecord)); });
    }

    // ── Stats ──────────────────────────────────────────────────────────────────
    const parStatut = results.reduce((acc, e) => {
      const k = e.statut || 'Autre';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    const parType = results.reduce((acc, e) => {
      const k = e.type || 'Autre';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    const avecCoords   = results.filter(e => e.lat && e.lng).length;
    const avecMail     = results.filter(e => e.mail).length;
    const avecApprent  = results.filter(e => e.apprentissage).length;

    const payload = {
      dept: dept || 'national',
      type_filtre: type,
      total: results.length,
      total_api: total,
      stats: {
        par_statut:     parStatut,
        par_type:       parType,
        avec_coords:    avecCoords,
        avec_mail:      avecMail,
        avec_apprentissage: avecApprent,
      },
      etablissements: results,
      fetched_at: new Date().toISOString(),
    };

    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[annuaire-education]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
