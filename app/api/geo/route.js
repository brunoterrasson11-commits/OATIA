import { NextResponse } from 'next/server';

// ─── Cache en mémoire (24 h) — données géographiques quasi-statiques ──────────
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

const GEO_BASE = 'https://geo.api.gouv.fr';

async function geoFetch(path) {
  const res = await fetch(`${GEO_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`API Géo ${path} → ${res.status}`);
  return res.json();
}

// ─── GET /api/geo ─────────────────────────────────────────────────────────────
//
// Modes (paramètre `mode`) :
//   commune   – infos d'une commune (dept=44, commune=Derval | codePostal=44590)
//   dept      – infos + communes d'un département (dept=44)
//   region    – liste des départements d'une région (codeRegion=52)
//   proximity – établissements dans un rayon (lat, lng, radius_km)
//   bassin    – bassin de recrutement d'un établissement : population jeunes
//               dans un rayon autour de lat/lng
//
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode       = searchParams.get('mode')       || 'commune';
  const dept       = searchParams.get('dept')       || '';
  const commune    = searchParams.get('commune')    || '';
  const codePostal = searchParams.get('codePostal') || '';
  const codeRegion = searchParams.get('codeRegion') || '';
  const lat        = searchParams.get('lat')        || '';
  const lng        = searchParams.get('lng')        || '';
  const radiusKm   = parseInt(searchParams.get('radius') || '30', 10);

  const cacheKey = `geo-${mode}-${dept}-${commune}-${codePostal}-${codeRegion}-${lat}-${lng}-${radiusKm}`;
  const cached = fromCache(cacheKey);
  if (cached) return NextResponse.json({ ...cached, from_cache: true });

  try {
    let payload;

    // ── MODE : commune ────────────────────────────────────────────────────────
    if (mode === 'commune') {
      let path;
      if (codePostal) {
        path = `/communes?codePostal=${codePostal}&fields=nom,code,codeDepartement,codeRegion,population,centre`;
      } else if (commune && dept) {
        path = `/communes?codePostal=&codeDepartement=${dept.padStart(2,'0')}&fields=nom,code,codeDepartement,codeRegion,population,centre`;
      } else {
        throw new Error('Fournissez codePostal OU (dept + commune)');
      }
      const communes = await geoFetch(path);
      const match = commune
        ? communes.find(c => c.nom.toLowerCase() === commune.toLowerCase()) || communes[0]
        : communes[0];

      if (!match) throw new Error('Commune non trouvée');

      // Infos département et région en parallèle
      const [deptData, regionData] = await Promise.all([
        geoFetch(`/departements/${match.codeDepartement}?fields=nom,code,codeRegion`),
        geoFetch(`/regions/${match.codeRegion}?fields=nom,code`).catch(() => null),
      ]);

      payload = {
        mode,
        commune: match,
        departement: deptData,
        region: regionData,
      };
    }

    // ── MODE : dept ───────────────────────────────────────────────────────────
    else if (mode === 'dept') {
      if (!dept) throw new Error('Paramètre dept requis');
      const code = dept.padStart(2, '0');

      const [deptData, communes] = await Promise.all([
        geoFetch(`/departements/${code}?fields=nom,code,codeRegion`),
        geoFetch(`/communes?codeDepartement=${code}&fields=nom,code,population&limit=500`),
      ]);

      const population_totale = communes.reduce((s, c) => s + (c.population || 0), 0);
      const nb_communes = communes.length;

      payload = {
        mode,
        departement: deptData,
        nb_communes,
        population_totale,
        communes_top10: [...communes]
          .sort((a, b) => (b.population || 0) - (a.population || 0))
          .slice(0, 10),
      };
    }

    // ── MODE : region ─────────────────────────────────────────────────────────
    else if (mode === 'region') {
      const code = codeRegion || dept;
      if (!code) throw new Error('Paramètre codeRegion requis');

      const [regionData, departements] = await Promise.all([
        geoFetch(`/regions/${code}?fields=nom,code`),
        geoFetch(`/departements?codeRegion=${code}&fields=nom,code`),
      ]);

      payload = { mode, region: regionData, departements };
    }

    // ── MODE : proximity / bassin ─────────────────────────────────────────────
    // L'API Géo ne supporte pas de filtre rayon multiple — on récupère toutes
    // les communes du département concerné puis on filtre par distance haversine.
    else if (mode === 'proximity' || mode === 'bassin') {
      if (!lat || !lng) throw new Error('lat et lng requis pour ce mode');

      const latF = parseFloat(lat);
      const lngF = parseFloat(lng);

      // Déterminer le département de référence via le point central
      const pointCommune = await geoFetch(
        `/communes?lat=${latF}&lon=${lngF}&fields=nom,code,codeDepartement,codeRegion`
      );
      const refDept = pointCommune[0]?.codeDepartement;
      const refRegion = pointCommune[0]?.codeRegion;

      if (!refDept) throw new Error('Impossible de déterminer le département du point');

      // Récupérer les communes des départements voisins potentiels (dept + adjacents)
      // On prend le dept de référence + les depts de la même région pour couvrir les bordures
      const [deptCommunes, regionDepts] = await Promise.all([
        geoFetch(`/communes?codeDepartement=${refDept}&fields=nom,code,codeDepartement,codeRegion,population,centre&limit=1000`),
        geoFetch(`/departements?codeRegion=${refRegion}&fields=code`),
      ]);

      // Pour un rayon > 20 km, on inclut aussi les communes des départements adjacents
      let allCommunes = [...deptCommunes];
      if (radiusKm > 20 && regionDepts.length > 1) {
        const otherDepts = regionDepts.filter(d => d.code !== refDept).slice(0, 4);
        const extras = await Promise.all(
          otherDepts.map(d =>
            geoFetch(`/communes?codeDepartement=${d.code}&fields=nom,code,codeDepartement,codeRegion,population,centre&limit=500`)
          )
        );
        extras.forEach(list => { allCommunes = allCommunes.concat(list); });
      }

      // Haversine distance (en km)
      function haversine(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2
          + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      }

      const communes = allCommunes
        .filter(c => {
          const coords = c.centre?.coordinates;
          if (!coords) return false;
          const [cLng, cLat] = coords; // GeoJSON = [lng, lat]
          return haversine(latF, lngF, cLat, cLng) <= radiusKm;
        })
        .map(c => {
          const coords = c.centre?.coordinates;
          const [cLng, cLat] = coords || [null, null];
          return {
            ...c,
            distance_km: coords ? Math.round(haversine(latF, lngF, cLat, cLng) * 10) / 10 : null,
          };
        })
        .sort((a, b) => a.distance_km - b.distance_km);

      const population_totale = communes.reduce((s, c) => s + (c.population || 0), 0);
      const bassin_jeunes_estime = Math.round(population_totale * 0.12);

      payload = {
        mode,
        centre: { lat: latF, lng: lngF },
        radius_km: radiusKm,
        nb_communes: communes.length,
        population_totale,
        bassin_jeunes_estime,
        communes,
      };
    }

    else {
      throw new Error(`Mode inconnu : ${mode}. Options: commune, dept, region, proximity, bassin`);
    }

    payload.fetched_at = new Date().toISOString();
    toCache(cacheKey, payload);
    return NextResponse.json(payload);

  } catch (err) {
    console.error('[geo]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
