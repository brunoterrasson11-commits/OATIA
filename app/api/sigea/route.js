import { NextResponse } from 'next/server';

// ─── Cache en mémoire (24 h) ──────────────────────────────────────────────────
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

const BASE = 'https://data.sigea.educagri.fr/geoserver/schema/wfs';

// Couches disponibles
export const SIGEA_LAYERS = {
  eplefpa:    'dger_pb_eplefpa',
  cfppa:      'dger_pb_cfppa',
  cfa:        'dger_pb_cfa',
  lycee:      'dger_pb_lycee',
  exploit:    'dger_pb_exploit',
  cneap:      'dger_pr_cneap',
  mfr:        'dger_pr_mfr_ireo',
  unrep:      'dger_pr_unrep',
  non_affil:  'dger_pr_non_affil',
  fis_tech:   'dger_voie_fis_tech',
  bdalexia_pac:     'v_bdalexia_2024_pac_scored',
  bdalexia_them:    'v_bdalexia_2024_them',
  bdalexia_sysprod: 'v_bdalexia_2024_sysprod',
};

function mapFeature(f) {
  const p = f.properties;
  const coords = f.geometry?.coordinates;
  return {
    nom:         p.nom,
    uai:         p.uai,
    region:      p.region,
    departement: p.departement,
    code_postal: p.code_postal,
    commune:     p.commune,
    adresse:     p.adresse,
    telephone:   p.telephone,
    email:       p.email,
    site_web:    p.site_web,
    uai_rne:     p.uai_rne,
    code_dger:   p.code_dger,
    lat:         coords ? coords[1] : null,
    lng:         coords ? coords[0] : null,
  };
}

// ─── GET /api/sigea?layer=mfr&dept=44&count=500 ───────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const layerKey = searchParams.get('layer') || 'mfr';
  const dept     = searchParams.get('dept')  || '';
  const count    = parseInt(searchParams.get('count') || '1000', 10);

  const typeName = SIGEA_LAYERS[layerKey];
  if (!typeName) {
    return NextResponse.json({
      error: `Couche inconnue: ${layerKey}. Disponibles: ${Object.keys(SIGEA_LAYERS).join(', ')}`,
    }, { status: 400 });
  }

  const cacheKey = `sigea-${layerKey}-${dept}-${count}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    // Construire le filtre CQL si département demandé
    const params = new URLSearchParams({
      SERVICE: 'WFS',
      VERSION: '2.0.0',
      REQUEST: 'GetFeature',
      TYPENAMES: `schema:${typeName}`,
      outputFormat: 'application/json',
      count: String(count),
    });

    if (dept) {
      // Filtre par code postal (2 premiers chiffres)
      const deptPad = dept.padStart(2, '0');
      params.set('CQL_FILTER', `strStartsWith(code_postal,'${deptPad}')=true`);
    }

    const res = await fetch(`${BASE}?${params}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`SIGEA WFS ${res.status}: ${await res.text()}`);

    const geojson = await res.json();
    const features = (geojson.features || []).map(mapFeature);

    const payload = {
      layer: layerKey,
      type_name: typeName,
      dept: dept || 'national',
      total: features.length,
      features,
      fetched_at: new Date().toISOString(),
    };

    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[sigea]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
