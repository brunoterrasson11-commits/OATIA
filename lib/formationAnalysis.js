// ─────────────────────────────────────────────────────────────────────────────
// formationAnalysis.js — Analyse adéquation formations / territoire
// Partagé entre carte/page.jsx et effectifs/page.jsx
// Sources : France Travail (domaines D & K), SSP Agreste, INSEE, MSA
// ─────────────────────────────────────────────────────────────────────────────

export const FORMATION_CATEGORIES = {
  bio:        { keywords: ['bio', 'biologique', 'agroécologie', 'agroecologie', 'conservation', 'herbor', 'phyto'], label: 'Agriculture bio / agroécologie' },
  elevage:    { keywords: ['élevage', 'elevage', 'bovin', 'porcin', 'ovin', 'caprin', 'lait', 'viande', 'animaux', 'animales', 'avicole', 'équin', 'equin', 'apicult'], label: 'Élevage' },
  cultures:   { keywords: ['cultures', 'céréales', 'cereales', 'grandes cultures', 'polyculture', 'cgea', 'agronomie', 'acse', 'agri'], label: 'Grandes cultures / CGEA' },
  maraichage: { keywords: ['maraîchage', 'maraichage', 'légumes', 'legumes', 'horticulture', 'jardins', 'paysag', 'floriculture', 'arboriculture'], label: 'Maraîchage / Horticulture' },
  vente:      { keywords: ['vente', 'commerce', 'commerciale', 'commercialisation', 'technico-commercial', 'technico commercial'], label: 'Vente & Commerce' },
  sapat:      { keywords: ['sapat', 'services aux personnes', 'service', 'social', 'aide', 'jeps', 'animation'], label: 'SAPAT / Services aux personnes' },
  viti:       { keywords: ['viti', 'vigne', 'vin', 'œnologie', 'oenologie', 'enologie', 'spiritueux'], label: 'Viticulture / Œnologie' },
  bts:        { keywords: ['bts', 'btsa', 'bachelor', 'ingénieur', 'ingenieur', 'licence'], label: 'Enseignement supérieur' },
  foret:      { keywords: ['forêt', 'foret', 'sylvicult', 'bois', 'chass'], label: 'Forêt / Sylviculture' },
  numerique:  { keywords: ['numérique', 'numerique', 'robotique', 'drone', 'srna', 'digital', 'informatique', 'agtech'], label: 'Numérique / AgTech' },
  alimentation:{ keywords: ['alimentation', 'agroalimentaire', 'cuisine', 'boucher', 'fromagerie', 'transformation', 'denrées', 'denrees'], label: 'Agroalimentaire / Transformation' },
};

export function categorizeFormations(formations) {
  const cats = new Set();
  formations.forEach(f => {
    const fl = f.toLowerCase();
    Object.entries(FORMATION_CATEGORIES).forEach(([key, { keywords }]) => {
      if (keywords.some(kw => fl.includes(kw))) cats.add(key);
    });
  });
  return [...cats];
}

function countByCategory(formations) {
  const counts = {};
  formations.forEach(f => {
    const fl = f.toLowerCase();
    Object.entries(FORMATION_CATEGORIES).forEach(([key, { keywords }]) => {
      if (keywords.some(kw => fl.includes(kw))) counts[key] = (counts[key] || 0) + 1;
    });
  });
  return counts;
}

/**
 * Analyse l'adéquation entre les formations d'un établissement et les indicateurs territoriaux.
 * @param {string[]} formations – liste de formations (noms)
 * @param {object}   ind        – indicateurs territoire (score_attractivite, indice_dynamisme, etc.)
 * @returns {{ alerts: object[], suggestions: object[] }}
 *   Chaque item : { msg, source, detail? }
 */
export function analyzeFormationTerritory(formations, ind) {
  if (!ind || !formations?.length) return { alerts: [], suggestions: [] };

  const cats = categorizeFormations(formations);
  const counts = countByCategory(formations);
  const alerts = [];
  const suggestions = [];

  // ── 1. AGRICULTURE BIO ────────────────────────────────────────────────────
  if ((ind.part_bio ?? 0) >= 15 && !cats.includes('bio')) {
    suggestions.push({
      msg: `Part bio élevée (${ind.part_bio}%) — ouvrir une filière agroécologie`,
      detail: 'Formations recommandées : "BAC Pro CGEA option agroécologie", "BPREA Agriculture biologique"',
      source: 'SSP Agreste – Données bio',
    });
  }
  if ((ind.part_bio ?? 0) < 8 && cats.includes('bio') && (counts.bio || 0) >= 2) {
    alerts.push({
      msg: `Faible engagement bio local (${ind.part_bio}%) pour ${counts.bio} formation(s) bio — risque de sous-recrutement`,
      detail: 'Les débouchés locaux pour les profils bio sont limités. Envisager un pivot vers les grandes cultures ou le maraîchage conventionnel.',
      source: 'SSP Agreste – Données bio',
    });
  }

  // ── 2. VENTE & COMMERCE (France Travail domaine D) ────────────────────────
  const indiceVente = Math.min(100, Math.round(
    (ind.score_attractivite ?? 50) * 0.50 +
    Math.max(0, (10 - (ind.taux_chomage ?? 8)) * 3.2) +
    (ind.indice_dynamisme ?? 50) * 0.12 +
    (ind.vente ?? 0) * 0.20
  ));
  if (indiceVente >= 65 && !cats.includes('vente')) {
    suggestions.push({
      msg: `Territoire commercial dynamique (score Vente ${indiceVente}/100) — filière Commerce absente`,
      detail: 'Formations à développer : "BAC Pro Technico-Commercial produits agro", "BTSA Technico-Commercial"',
      source: 'France Travail – domaine D (Vente)',
    });
  }
  if (indiceVente < 38 && cats.includes('vente') && (counts.vente || 0) >= 2) {
    alerts.push({
      msg: `Score Vente faible (${indiceVente}/100) — ${counts.vente} formation(s) commerce pour un marché local peu porteur`,
      detail: 'Risque d\'insertion difficile. Envisager une réorientation vers des filières mieux ancrées localement.',
      source: 'France Travail – domaine D (Vente)',
    });
  }

  // ── 3. SERVICES AUX PERSONNES / SAPAT (France Travail domaine K) ─────────
  const indiceSAPAT = Math.min(100, Math.round(
    (ind.part_exploitants_55plus ?? 40) * 0.80 +
    (ind.score_vulnerabilite ?? 5) * 5.5 +
    Math.max(0, -(ind.evolution_pop_10ans ?? 0) * 2.5) +
    (ind.sapat ?? 0) * 0.20
  ));
  if (indiceSAPAT >= 60 && !cats.includes('sapat')) {
    suggestions.push({
      msg: `Fort besoin en services aux personnes (score SAPAT ${indiceSAPAT}/100) — filière absente`,
      detail: 'Formations recommandées : "BAC Pro SAPAT", "BP JEPS Animation", "CAP Accompagnement"',
      source: 'France Travail – domaine K (Services à la personne)',
    });
  }
  if (indiceSAPAT < 32 && cats.includes('sapat') && (counts.sapat || 0) >= 2) {
    alerts.push({
      msg: `Contexte SAPAT peu favorable (score ${indiceSAPAT}/100) — risque de saturation du marché local`,
      detail: 'Le territoire présente peu de facteurs de vieillissement. Vérifier la pertinence du maintien de plusieurs formations SAPAT.',
      source: 'France Travail – domaine K (Services à la personne)',
    });
  }

  // ── 4. RENOUVELLEMENT EXPLOITANTS / ÉLEVAGE (MSA) ────────────────────────
  const partPlus55 = ind.part_exploitants_55plus ?? 40;
  if (partPlus55 >= 50 && !cats.includes('elevage') && !cats.includes('cultures')) {
    suggestions.push({
      msg: `${partPlus55}% des exploitants ont 55+ ans — renouvellement urgent, aucune formation en productions végétales/animales`,
      detail: 'Formations prioritaires : "BAC Pro CGEA", "BPREA productions animales", "CS Remplacement en élevage"',
      source: 'MSA – Recensement agricole',
    });
  }
  if (partPlus55 >= 55 && cats.includes('elevage') && cats.includes('cultures')) {
    // Positif : bien orienté
    suggestions.push({
      msg: `Excellent positionnement : élevage + grandes cultures face au renouvellement (${partPlus55}% 55+)`,
      detail: 'L\'établissement est bien positionné pour absorber le renouvellement des exploitants locaux.',
      source: 'MSA – Recensement agricole',
    });
  }

  // ── 5. ENSEIGNEMENT SUPÉRIEUR vs attractivité ─────────────────────────────
  const nbSup = formations.filter(f => /btsa?|bachelor|licence|ingénieur/i.test(f)).length;
  if ((ind.score_attractivite ?? 50) < 42 && cats.includes('bts') && nbSup >= 2) {
    alerts.push({
      msg: `Territoire peu attractif (${ind.score_attractivite}/100) — ${nbSup} formation(s) supérieure(s) exposées à un faible recrutement`,
      detail: 'Les apprenants en BTS/Bachelor choisissent souvent des villes dynamiques. Renforcer la communication et les partenariats avec les lycées du bassin.',
      source: 'INSEE – Données démographiques',
    });
  }
  if ((ind.score_attractivite ?? 50) >= 65 && (ind.indice_dynamisme ?? 50) >= 60 && !cats.includes('bts')) {
    suggestions.push({
      msg: `Territoire attractif (${ind.score_attractivite}/100) et dynamique — potentiel inexploité en enseignement supérieur`,
      detail: 'Formations à envisager : "BTSA Agronomie Productions Végétales", "BTSA ACSE", "Bachelor Agro"',
      source: 'INSEE – Données démographiques',
    });
  }

  // ── 6. DYNAMISME AGRICOLE FAIBLE + GRANDES CULTURES SEULES ───────────────
  if ((ind.indice_dynamisme ?? 50) < 40 && cats.includes('cultures') && !cats.includes('elevage') && !cats.includes('sapat')) {
    alerts.push({
      msg: `Faible dynamisme agricole (${ind.indice_dynamisme}/100) — dépendance aux grandes cultures sans diversification`,
      detail: 'Risque à moyen terme. Diversifier avec élevage, services aux personnes ou transformation agroalimentaire.',
      source: 'SSP Agreste – Dynamisme agricole',
    });
  }

  // ── 7. VITICULTURE / ŒNOLOGIE ─────────────────────────────────────────────
  if (!cats.includes('viti') && (ind.part_bio ?? 0) > 12 && (ind.indice_dynamisme ?? 0) > 55 && !cats.includes('cultures')) {
    suggestions.push({
      msg: `Territoire agri-dynamique propice à la viticulture/œnologie — filière absente`,
      detail: 'Formations à envisager : "BAC Pro Vigne et Vin", "BTSA Viticulture-Œnologie", "CS Vitivinicole"',
      source: 'SSP Agreste',
    });
  }

  // ── 8. FILIÈRE FORÊT ─────────────────────────────────────────────────────
  if (!cats.includes('foret') && (ind.evolution_pop_10ans ?? 0) > 0.8 && (ind.indice_dynamisme ?? 0) > 50 && (ind.part_bio ?? 0) > 10) {
    suggestions.push({
      msg: `Territoire rural dynamique — opportunité dans la filière Forêt/Bois en croissance`,
      detail: 'Formations à envisager : "BAC Pro Forêt", "CS Taille et soins des arbres", "BTSA Gestion Forestière"',
      source: 'CNPF – Centre national de la propriété forestière',
    });
  }

  // ── 9. CHÔMAGE ÉLEVÉ SANS FILIÈRES INSERTION ──────────────────────────────
  if ((ind.taux_chomage ?? 0) >= 12 && !cats.includes('sapat') && !cats.includes('vente') && !cats.includes('alimentation')) {
    suggestions.push({
      msg: `Chômage élevé (${ind.taux_chomage}%) — manque de formations à forte insertion locale`,
      detail: 'Priorités : "BAC Pro SAPAT", "BAC Pro Technico-Commercial", "CAP Accompagnement éducatif"',
      source: 'France Travail – Statistiques chômage',
    });
  }

  // ── 10. NUMÉRIQUE / AGROTECH ──────────────────────────────────────────────
  if (!cats.includes('numerique') && (ind.indice_dynamisme ?? 0) >= 65 && (ind.score_attractivite ?? 0) >= 60) {
    suggestions.push({
      msg: `Territoire attractif et dynamique — le numérique agricole (AgTech) est une opportunité`,
      detail: 'Formations à envisager : "CS Agriculture numérique", "CS Systèmes robotiques en agriculture"',
      source: 'France AgriMer – Prospective AgTech',
    });
  }

  // ── 11. AGROALIMENTAIRE ───────────────────────────────────────────────────
  if (!cats.includes('alimentation') && (ind.part_bio ?? 0) >= 12 && (ind.indice_dynamisme ?? 0) >= 55) {
    suggestions.push({
      msg: `Fort ancrage bio/agri — valorisation par la transformation alimentaire à développer`,
      detail: 'Formations recommandées : "BAC Pro Agroalimentaire", "BTSA Sciences et Technologies des Aliments", "CS Fromagerie"',
      source: 'INRAE – Valorisation agroalimentaire',
    });
  }

  // On limite à 3 alertes + 3 suggestions pour ne pas surcharger le popup
  return {
    alerts: alerts.slice(0, 4),
    suggestions: suggestions.slice(0, 4),
  };
}
