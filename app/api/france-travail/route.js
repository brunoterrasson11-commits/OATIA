import { NextResponse } from 'next/server';

// ─── Cache token OAuth2 (valide ~25 min) ─────────────────────────────────────
let tokenCache = { token: null, expiry: 0 };

async function getFranceTravailToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiry) {
    return tokenCache.token;
  }

  const res = await fetch(
    'https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     process.env.FRANCE_TRAVAIL_CLIENT_ID,
        client_secret: process.env.FRANCE_TRAVAIL_CLIENT_SECRET,
        scope:         'api_offresdemploiv2 o2dsoffre',
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth France Travail échouée (${res.status}): ${text}`);
  }

  const data = await res.json();
  tokenCache = {
    token:  data.access_token,
    expiry: Date.now() + (data.expires_in - 60) * 1000,
  };
  return tokenCache.token;
}

// ─── Helper : extraire le total depuis l'en-tête Content-Range ───────────────
function parseTotalFromRange(header) {
  const m = (header || '').match(/\/(\d+)$/);
  return m ? parseInt(m[1], 10) : 0;
}

// ─── Helper : extraire les top offres d'une réponse JSON ─────────────────────
async function extractTopOffres(res, n = 3) {
  if (!res.ok) return [];
  try {
    const detail = await res.json();
    return (detail?.resultats || []).slice(0, n).map(o => ({
      id:      o.id,
      titre:   o.intitule,
      contrat: o.typeContratLibelle || o.typeContrat,
      lieu:    o.lieuTravail?.libelle || '',
      rome:    o.romeCode,
    }));
  } catch {
    return [];
  }
}

// ─── GET /api/france-travail?dept=33 ─────────────────────────────────────────
// Retourne les offres pour 3 filières : Agriculture (A), Vente (D), SAPAT (K)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get('dept') || '33';

  if (!process.env.FRANCE_TRAVAIL_CLIENT_ID || !process.env.FRANCE_TRAVAIL_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'Clés API France Travail non configurées dans .env.local' },
      { status: 503 }
    );
  }

  try {
    const token = await getFranceTravailToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
    const base = 'https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search';

    // ── Requêtes parallèles (12 appels simultanés) ────────────────────────────
    // Secteurs : A=Agriculture · D=Commerce/Vente · K=Services aux personnes (SAPAT)
    const [
      agriHeadRes, totalHeadRes, agriDetailRes,
      venteHeadRes, venteDetailRes,
      sapatHeadRes, sapatDetailRes,
      cdiRes, cddRes, saisRes,
    ] = await Promise.all([
      // Agriculture
      fetch(`${base}?departement=${dept}&domaine=A&range=0-0`,              { headers }),
      fetch(`${base}?departement=${dept}&range=0-0`,                         { headers }),
      fetch(`${base}?departement=${dept}&domaine=A&range=0-4`,              { headers }),
      // Vente & Commerce (domaine D)
      fetch(`${base}?departement=${dept}&domaine=D&range=0-0`,              { headers }),
      fetch(`${base}?departement=${dept}&domaine=D&range=0-2`,              { headers }),
      // Services aux personnes & territoires / SAPAT (domaine K)
      fetch(`${base}?departement=${dept}&domaine=K&range=0-0`,              { headers }),
      fetch(`${base}?departement=${dept}&domaine=K&range=0-2`,              { headers }),
      // Contrats agriculture
      fetch(`${base}?departement=${dept}&domaine=A&typeContrat=CDI&range=0-0`, { headers }),
      fetch(`${base}?departement=${dept}&domaine=A&typeContrat=CDD&range=0-0`, { headers }),
      fetch(`${base}?departement=${dept}&domaine=A&typeContrat=SAI&range=0-0`, { headers }),
    ]);

    // ── Compteurs ─────────────────────────────────────────────────────────────
    const offres_agriculture = parseTotalFromRange(agriHeadRes.headers.get('Content-Range'));
    const offres_total_dept  = parseTotalFromRange(totalHeadRes.headers.get('Content-Range'));
    const offres_vente       = parseTotalFromRange(venteHeadRes.headers.get('Content-Range'));
    const offres_sapat       = parseTotalFromRange(sapatHeadRes.headers.get('Content-Range'));

    const part_agri_pct  = offres_total_dept > 0
      ? Math.round((offres_agriculture / offres_total_dept) * 1000) / 10 : 0;
    const part_vente_pct = offres_total_dept > 0
      ? Math.round((offres_vente / offres_total_dept) * 1000) / 10 : 0;
    const part_sapat_pct = offres_total_dept > 0
      ? Math.round((offres_sapat / offres_total_dept) * 1000) / 10 : 0;

    // ── Top offres par filière ─────────────────────────────────────────────────
    const [top_offres, top_offres_vente, top_offres_sapat] = await Promise.all([
      extractTopOffres(agriDetailRes, 5),
      extractTopOffres(venteDetailRes, 3),
      extractTopOffres(sapatDetailRes, 3),
    ]);

    // ── Contrats agriculture ──────────────────────────────────────────────────
    const cdi_count = parseTotalFromRange(cdiRes.headers.get('Content-Range'));
    const cdd_count = parseTotalFromRange(cddRes.headers.get('Content-Range'));
    const sai_count = parseTotalFromRange(saisRes.headers.get('Content-Range'));

    return NextResponse.json({
      dept,
      // Agriculture
      offres_agriculture,
      offres_total_dept,
      part_agri_pct,
      contrats: { cdi: cdi_count, cdd: cdd_count, saisonnier: sai_count },
      top_offres,
      // Vente & Commerce
      offres_vente,
      part_vente_pct,
      top_offres_vente,
      // Services aux personnes & territoires (SAPAT)
      offres_sapat,
      part_sapat_pct,
      top_offres_sapat,
      fetched_at: new Date().toISOString(),
    });

  } catch (err) {
    console.error('[france-travail]', err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
