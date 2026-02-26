// ============================================================
// THÉMIS – Prompts IA
// Sources : France Travail, SSP Agreste, INSEE, MSA, INRAE
// ============================================================

/**
 * Bloc France Travail : offres actives par filière (Agriculture, Vente, SAPAT)
 */
function buildEmploiBlock(emploiData) {
  if (!emploiData) return '';

  const topAgri = (emploiData.top_offres || []).slice(0, 3)
    .map(o => `  • ${o.titre} (${o.contrat}${o.rome ? ` – ROME ${o.rome}` : ''})`).join('\n');
  const topVente = (emploiData.top_offres_vente || []).slice(0, 2)
    .map(o => `  • ${o.titre} (${o.contrat})`).join('\n');
  const topSapat = (emploiData.top_offres_sapat || []).slice(0, 2)
    .map(o => `  • ${o.titre} (${o.contrat})`).join('\n');

  return `
DONNÉES EMPLOI TEMPS RÉEL – FRANCE TRAVAIL (${new Date(emploiData.fetched_at).toLocaleDateString('fr-FR')}) :
Filière Agriculture (domaine A) :
  - ${emploiData.offres_agriculture} offres actives dans le département (${emploiData.part_agri_pct}% de l'emploi total)
  - Répartition contrats : ${emploiData.contrats?.cdi ?? '?'} CDI · ${emploiData.contrats?.cdd ?? '?'} CDD · ${emploiData.contrats?.saisonnier ?? '?'} saisonniers${topAgri ? `\n  Exemples :\n${topAgri}` : ''}
Filière Vente & Commerce (domaine D) :
  - ${emploiData.offres_vente ?? '?'} offres actives (${emploiData.part_vente_pct ?? '?'}% de l'emploi total)${topVente ? `\n  Exemples :\n${topVente}` : ''}
Filière Services aux personnes – SAPAT (domaine K) :
  - ${emploiData.offres_sapat ?? '?'} offres actives (${emploiData.part_sapat_pct ?? '?'}% de l'emploi total)${topSapat ? `\n  Exemples :\n${topSapat}` : ''}
`;
}

/**
 * Bloc Formations établissement + Analyse d'adéquation automatique + Emplois d'avenir
 * @param {object|null} formationsCtx  – { formations, cats, alerts, suggestions }
 * @param {object|null} indicateurs    – indicateurs territoriaux
 */
function buildFormationsBlock(formationsCtx, indicateurs) {
  if (!formationsCtx?.formations?.length) return '';

  const { formations, cats = [], alerts = [], suggestions = [] } = formationsCtx;

  const formationsStr = formations.length <= 15
    ? formations.join(' | ')
    : formations.slice(0, 15).join(' | ') + ` … +${formations.length - 15} autres`;

  const alertLines = alerts.length
    ? alerts.map(a =>
        `  ⚠ INADÉQUATION : ${a.msg}` +
        (a.detail ? `\n    → ${a.detail}` : '') +
        (a.source ? `\n    [Source : ${a.source}]` : '')
      ).join('\n')
    : '  Aucune inadéquation majeure détectée.';

  const suggestLines = suggestions.length
    ? suggestions.map(s =>
        `  ✦ OPPORTUNITÉ : ${s.msg}` +
        (s.detail ? `\n    → ${s.detail}` : '') +
        (s.source ? `\n    [Source : ${s.source}]` : '')
      ).join('\n')
    : '  Les formations semblent globalement adaptées au contexte territorial.';

  // Emplois d'avenir : construits à partir des indicateurs disponibles
  const emploisAvenir = [];
  if (indicateurs) {
    if ((indicateurs.part_bio ?? 0) >= 12)
      emploisAvenir.push('Technicien·ne agroécologie / agriculture biologique (demande croissante, Plan France 2030)');
    if ((indicateurs.part_exploitants_55plus ?? 0) >= 48)
      emploisAvenir.push('Repreneur·se d'exploitation agricole / chef·fe d'exploitation (renouvellement générationnel urgent)');
    if ((indicateurs.indice_dynamisme ?? 0) >= 55)
      emploisAvenir.push('Conseiller·e en agriculture numérique / AgTech (robotique, capteurs, IA agricole)');
    if ((indicateurs.score_vulnerabilite ?? 0) >= 6 || (indicateurs.taux_chomage ?? 0) >= 10)
      emploisAvenir.push('Accompagnant·e social·e en territoire rural / animateur·trice SAPAT (demande structurelle)');
    if ((indicateurs.part_bio ?? 0) >= 8 || (indicateurs.filieres_dev ?? []).some(f => /circuit|local|terroir/i.test(f)))
      emploisAvenir.push('Responsable circuits courts / commercialisation de proximité (BTSA TC, BAC Pro TC)');
    if ((indicateurs.evolution_pop_10ans ?? 0) > 1)
      emploisAvenir.push('Animateur·trice périscolaire / éducateur·trice en milieu rural (croissance démographique locale)');
    // Métiers en tension depuis les indicateurs
    (indicateurs.metiers_tension || []).forEach(m =>
      emploisAvenir.push(`${m} (métier en tension identifié dans le bassin d'emploi)`)
    );
    // Filières en développement
    (indicateurs.filieres_dev || []).forEach(f =>
      emploisAvenir.push(`Emplois liés à la filière "${f}" en développement sur le territoire`)
    );
  }

  const emploisStr = emploisAvenir.length
    ? emploisAvenir.slice(0, 6).map(e => `  → ${e}`).join('\n')
    : '  Données insuffisantes pour identifier les emplois d'avenir spécifiques.';

  return `
FORMATIONS DISPENSÉES PAR L'ÉTABLISSEMENT (${formations.length} formation${formations.length > 1 ? 's' : ''}) :
- Filières couvertes : ${cats.join(', ') || 'Non catégorisées'}
- Liste : ${formationsStr}

ANALYSE AUTOMATIQUE – ADÉQUATION FORMATIONS / TERRITOIRE ET MARCHÉ DU TRAVAIL :
${alertLines}

FORMATIONS À DÉVELOPPER (opportunités territoriales identifiées) :
${suggestLines}

EMPLOIS D'AVENIR / MÉTIERS ÉMERGENTS SUR CE TERRITOIRE :
${emploisStr}
`;
}

// ─────────────────────────────────────────────────────────────────────────────

export function buildDiagnosticPrompt(territoire, indicateurs, emploiData = null, formationsCtx = null) {
  const hasFormations = !!formationsCtx?.formations?.length;
  const hasEmploi     = !!emploiData;

  return `Tu es un expert en développement rural et en enseignement agricole, mandaté par la CNEAP.
Génère un diagnostic territorial structuré pour le territoire suivant :

TERRITOIRE : ${territoire.nom} (Département – Code : ${territoire.code || ''})
RÉGION : ${territoire.region}

DONNÉES TERRITORIALES :
- Population : ${indicateurs.population?.toLocaleString('fr-FR') || 'N/A'} hab. | Évolution 10 ans : ${indicateurs.evolution_pop_10ans || 'N/A'}%
- SAU : ${indicateurs.sau_ha?.toLocaleString('fr-FR') || 'N/A'} ha | Nb. exploitations : ${indicateurs.nb_exploitations?.toLocaleString('fr-FR') || 'N/A'} | Évolution : ${indicateurs.evolution_exploitations || 'N/A'}%
- Part exploitants >55 ans : ${indicateurs.part_exploitants_55plus || 'N/A'}% (seuil critique : 50%)
- Emplois agricoles : ${indicateurs.emplois_agricoles?.toLocaleString('fr-FR') || 'N/A'} | Évolution : ${indicateurs.evolution_emplois || 'N/A'}%
- Agriculture biologique : ${indicateurs.part_bio || 'N/A'}% (objectif national Plan France 2030 : 18%)
- Taux de chômage : ${indicateurs.taux_chomage || 'N/A'}% | Métiers en tension : ${(indicateurs.metiers_tension || []).join(', ') || 'N/A'}
- Score attractivité territoriale : ${indicateurs.score_attractivite || 'N/A'}/100
- Indice de dynamisme agricole : ${indicateurs.indice_dynamisme || 'N/A'}/100
- Filières en développement : ${(indicateurs.filieres_dev || []).join(', ') || 'N/A'}
- Filières en déclin : ${(indicateurs.filieres_declin || []).join(', ') || 'N/A'}
${buildEmploiBlock(emploiData)}${buildFormationsBlock(formationsCtx, indicateurs)}
STRUCTURE DU DIAGNOSTIC (respecter exactement) :
1. DYNAMIQUES TERRITORIALES (3-4 phrases) : synthèse des tendances démographiques et économiques clés
2. ÉTAT DE L'AGRICULTURE LOCALE (3-4 phrases) : situation actuelle, forces et fragilités structurelles
3. ADÉQUATION FORMATIONS / OFFRE D'EMPLOI ET EMPLOIS D'AVENIR (4-5 phrases) :${hasFormations
  ? ' Analysez précisément les formations listées ci-dessus au regard du marché du travail local. Identifiez les formations bien positionnées, celles en risque de sous-recrutement (inadéquations détectées), et les emplois d'avenir pour lesquels l'établissement devrait se préparer (nouvelles filières, reconversions, montée en compétences).'
  : ' Analysez la correspondance entre les besoins du territoire et l'offre de formation agricole locale. Identifiez les emplois d'avenir prioritaires (transition agroécologique, numérique agricole, renouvellement des exploitants, services ruraux).'}${hasEmploi
  ? '\n4. MARCHÉ DE L\'EMPLOI AGRICOLE TEMPS RÉEL (2-3 phrases) : interprétation des données France Travail – volumes d\'offres, tension des métiers, opportunités immédiates pour les apprenants'
  : ''}
${hasEmploi ? '5' : '4'}. SIGNAUX FAIBLES ET ALERTES (liste de 3 à 5 points) : risques à surveiller, seuils critiques dépassés
${hasEmploi ? '6' : '5'}. RECOMMANDATIONS OPÉRATIONNELLES POUR L'OFFRE DE FORMATION (liste de 4 à 6 points) :${hasFormations
  ? ' En vous appuyant sur les formations actuelles et les inadéquations/opportunités identifiées, proposez des actions concrètes : formations à renforcer, à créer, partenariats entreprises, alternance à développer.'
  : ' Proposez des actions concrètes pour adapter l\'offre de formation aux besoins du territoire et aux emplois d\'avenir.'}
${hasEmploi ? '7' : '6'}. SCORE DE VULNÉRABILITÉ TERRITORIALE : note de ${indicateurs.score_vulnerabilite || '?'}/10 avec justification en 2 phrases

Ton : professionnel, synthétique, orienté action. Niveau de lecture : directeur d'établissement ou décideur DRAAF/CNEAP.
Longueur : 500 à 700 mots. Rédige en français.`;
}

// ─────────────────────────────────────────────────────────────────────────────

export function buildRecommandationsPrompt(territoire, indicateurs, emploiData = null, formationsCtx = null) {
  const hasFormations = !!formationsCtx?.formations?.length;

  return `Tu es un conseiller en ingénierie de formation agricole, expert CNEAP.

CONTEXTE TERRITORIAL :
- Territoire : ${territoire.nom} (${territoire.region})
- Dynamique agricole : ${indicateurs.indice_dynamisme}/100 – ${indicateurs.evolution_exploitations}% d'évolution des exploitations
- Part exploitants >55 ans : ${indicateurs.part_exploitants_55plus}% (renouvellement générationnel)
- Métiers en tension : ${(indicateurs.metiers_tension || []).join(', ') || 'N/A'}
- Filières en développement : ${(indicateurs.filieres_dev || []).join(', ') || 'N/A'}
- Filières en déclin : ${(indicateurs.filieres_declin || []).join(', ') || 'N/A'}
- Taux de chômage local : ${indicateurs.taux_chomage}%
- Score attractivité : ${indicateurs.score_attractivite}/100
- Agriculture biologique : ${indicateurs.part_bio}% (objectif 18% en 2030)
${buildEmploiBlock(emploiData)}${buildFormationsBlock(formationsCtx, indicateurs)}
${hasFormations
  ? 'En te basant sur les formations actuelles de l\'établissement, leur adéquation territoriale et les données d\'emploi, propose :'
  : 'En te basant sur ces éléments, propose :'}

1. FORMATIONS À RENFORCER : liste avec justification territoriale précise (max 3)${hasFormations ? ' — précise lesquelles parmi les formations existantes sont les mieux positionnées' : ''}
2. FORMATIONS À CRÉER OU DÉVELOPPER : nouveaux diplômes ou spécialités prioritaires (max 4)${hasFormations ? ' — en lien avec les opportunités territoriales identifiées et les emplois d\'avenir' : ''}
3. FORMATIONS À RECONVERTIR OU ADAPTER : avec plan d'accompagnement (max 2)${hasFormations ? ' — en lien avec les inadéquations détectées' : ''}
4. ADÉQUATION FORMATIONS / MARCHÉ DU TRAVAIL ET EMPLOIS D'AVENIR : analyse précise de la concordance entre l'offre de formation${hasFormations ? ' (formations listées ci-dessus)' : ''} et les offres France Travail actives (CDI/CDD/saisonnier), les métiers émergents (AgTech, transition agroécologique, circuits courts, services ruraux)
5. PARTENARIATS STRATÉGIQUES À DÉVELOPPER : entreprises, collectivités, CFA, autres établissements (max 3)
6. HORIZON DE MISE EN ŒUVRE : court terme (1-2 ans), moyen terme (3-5 ans)

Base tes recommandations sur les données territoriales réelles. Sois précis et opérationnel. Rédige en français.`;
}

// ─────────────────────────────────────────────────────────────────────────────

export function buildAlertePrompt(territoire, indicateurs, emploiData = null, formationsCtx = null) {
  const hasFormations = !!formationsCtx?.formations?.length;

  return `Tu es un système d'alerte territorial pour l'enseignement agricole CNEAP.

Analyse les données suivantes et identifie les signaux d'alerte pour ${territoire.nom} :

INDICATEURS TERRITORIAUX :
- Évolution population 10 ans : ${indicateurs.evolution_pop_10ans}% (moyenne nationale : +2%)
- Évolution exploitations : ${indicateurs.evolution_exploitations}% (moyenne nationale : -5%)
- Part exploitants >55 ans : ${indicateurs.part_exploitants_55plus}% (seuil d'alerte : 50%)
- Évolution emplois agricoles : ${indicateurs.evolution_emplois}% (cible : 0%)
- Indice de dynamisme : ${indicateurs.indice_dynamisme}/100 (seuil vigilance : 45)
- Score attractivité : ${indicateurs.score_attractivite}/100 (seuil vigilance : 50)
- Agriculture biologique : ${indicateurs.part_bio}% (objectif national : 18% en 2027)
- Taux de chômage : ${indicateurs.taux_chomage}% (moyenne nationale : 7.3%)
${buildEmploiBlock(emploiData)}${buildFormationsBlock(formationsCtx, indicateurs)}
Pour chaque alerte détectée :
- NIVEAU : 🔴 Rouge (urgent) / 🟠 Orange (vigilance) / 🟡 Jaune (à surveiller)
- INDICATEUR CONCERNÉ : nom et valeur
- ÉCART À LA MOYENNE NATIONALE : en points
- ANALYSE : cause probable en 2 phrases
- ACTION RECOMMANDÉE : mesure concrète pour l'établissement ou la DRAAF/CNEAP

${hasFormations
  ? 'Inclure obligatoirement au moins une alerte liée à l\'adéquation entre les formations dispensées et le marché du travail local (inadéquations ou formations manquantes par rapport aux emplois d\'avenir).'
  : ''}
Classe les alertes par niveau de priorité (rouge en premier).
Limite : ${emploiData ? '7' : '5'} alertes maximum. Format structuré, en français.`;
}

// ─────────────────────────────────────────────────────────────────────────────

export function buildScenarioPrompt(territoire, indicateurs, emploiData = null, formationsCtx = null) {
  const hasFormations = !!formationsCtx?.formations?.length;

  return `Tu es un prospectiviste spécialisé en agriculture et développement rural, expert CNEAP.

TERRITOIRE : ${territoire.nom} (${territoire.region})
HORIZON : 2035

DONNÉES DE BASE :
- Projection démographique 2035 : ${indicateurs.projection_pop_2035?.toLocaleString('fr-FR') || 'N/A'} hab. (actuellement ${indicateurs.population?.toLocaleString('fr-FR') || 'N/A'})
- Tendance surfaces agricoles : ${indicateurs.evolution_exploitations}% évolution exploitations
- Agriculture biologique : ${indicateurs.part_bio}% actuellement (objectif 18% en 2030)
- Score vulnérabilité : ${indicateurs.score_vulnerabilite}/10
- Filières stratégiques : ${(indicateurs.filieres_dev || []).join(', ') || 'N/A'}
${buildEmploiBlock(emploiData)}${buildFormationsBlock(formationsCtx, indicateurs)}
Construis 3 scénarios contrastés pour ce territoire à l'horizon 2035 :

SCÉNARIO 1 – CONTINUITÉ (tendance actuelle maintenue)
SCÉNARIO 2 – RUPTURE POSITIVE (mobilisation des atouts, politiques favorables, transition réussie)
SCÉNARIO 3 – RUPTURE NÉGATIVE (accumulation des fragilités, désengagement, inadaptation)

Pour chaque scénario, décris :
a) Hypothèses de départ (3 hypothèses clés)
b) Situation agricole attendue en 2035
c) Impact sur l'enseignement agricole (effectifs, formations, établissements)${hasFormations ? ' — en référence aux formations actuelles listées ci-dessus' : ''}
d) Évolution du marché de l'emploi agricole (volumes, métiers émergents, emplois d'avenir)
e) Signaux précurseurs à surveiller
f) Leviers d'action prioritaires pour l'enseignement agricole CNEAP
${hasFormations ? 'g) Adéquation des formations actuelles avec le marché du travail dans ce scénario : lesquelles seront renforcées, lesquelles seront obsolètes ?' : ''}

Longueur : 180-220 mots par scénario. Rédige en français.`;
}
