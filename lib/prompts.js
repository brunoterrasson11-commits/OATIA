// ============================================================
// OATIA – Prompts IA (extraits de la Fiche Projet)
// ============================================================

/**
 * Formate un bloc France Travail à insérer dans les prompts.
 * @param {object|null} emploiData  – réponse de /api/france-travail
 */
function buildEmploiBlock(emploiData) {
  if (!emploiData) return '';
  const top = (emploiData.top_offres || []).slice(0, 3).map(o => `  • ${o.titre} (${o.contrat})`).join('\n');
  return `
DONNÉES EMPLOI FRANCE TRAVAIL (temps réel – ${new Date(emploiData.fetched_at).toLocaleDateString('fr-FR')}) :
- Offres d'emploi agriculture dans le département : ${emploiData.offres_agriculture} offres actives
- Part dans l'emploi total du département : ${emploiData.part_agri_pct}%
- Répartition des contrats : ${emploiData.contrats.cdi} CDI · ${emploiData.contrats.cdd} CDD · ${emploiData.contrats.saisonnier} saisonniers${top ? `\n- Exemples d'offres représentatives :\n${top}` : ''}
`;
}

export function buildDiagnosticPrompt(territoire, indicateurs, emploiData = null) {
  return `Tu es un expert en développement rural et en enseignement agricole.
Génère un diagnostic territorial structuré pour le territoire suivant :

TERRITOIRE : ${territoire.nom} (Département – Code : ${territoire.code || ''})
RÉGION : ${territoire.region}

DONNÉES DISPONIBLES :
- Population : ${indicateurs.population?.toLocaleString('fr-FR') || 'N/A'} hab. | Évolution 10 ans : ${indicateurs.evolution_pop_10ans || 'N/A'}%
- SAU : ${indicateurs.sau_ha?.toLocaleString('fr-FR') || 'N/A'} ha | Nb. exploitations : ${indicateurs.nb_exploitations?.toLocaleString('fr-FR') || 'N/A'} | Évolution : ${indicateurs.evolution_exploitations || 'N/A'}%
- Part exploitants >55 ans : ${indicateurs.part_exploitants_55plus || 'N/A'}%
- Emplois agricoles : ${indicateurs.emplois_agricoles?.toLocaleString('fr-FR') || 'N/A'} | Évolution : ${indicateurs.evolution_emplois || 'N/A'}%
- Surfaces en agriculture biologique : ${indicateurs.part_bio || 'N/A'}%
- Taux de chômage : ${indicateurs.taux_chomage || 'N/A'}% | Métiers en tension : ${(indicateurs.metiers_tension || []).join(', ')}
- Score attractivité territoriale : ${indicateurs.score_attractivite || 'N/A'}/100
- Indice de dynamisme agricole : ${indicateurs.indice_dynamisme || 'N/A'}/100
- Filières en développement : ${(indicateurs.filieres_dev || []).join(', ')}
- Filières en déclin : ${(indicateurs.filieres_declin || []).join(', ')}
${buildEmploiBlock(emploiData)}
STRUCTURE DU DIAGNOSTIC (respecter exactement) :
1. DYNAMIQUES TERRITORIALES (3-4 phrases) : synthèse des tendances démographiques et économiques
2. ÉTAT DE L'AGRICULTURE LOCALE (3-4 phrases) : situation actuelle, forces, fragilités
3. ADÉQUATION FORMATION / BESOINS (3-4 phrases) : analyse des correspondances et des écarts
4. SIGNAUX FAIBLES ET ALERTES (liste de 3 à 5 points) : risques à surveiller${emploiData ? '\n5. MARCHÉ DE L\'EMPLOI AGRICOLE (2-3 phrases) : interprétation des données France Travail, tension des métiers, opportunités\n6. RECOMMANDATIONS POUR L\'OFFRE DE FORMATION (liste de 3 à 5 recommandations opérationnelles)\n7. SCORE DE VULNÉRABILITÉ TERRITORIALE : note de ' + (indicateurs.score_vulnerabilite || '?') + '/10 avec justification en 2 phrases' : '\n5. RECOMMANDATIONS POUR L\'OFFRE DE FORMATION (liste de 3 à 5 recommandations opérationnelles)\n6. SCORE DE VULNÉRABILITÉ TERRITORIALE : note de ' + (indicateurs.score_vulnerabilite || '?') + '/10 avec justification en 2 phrases'}

Ton : professionnel, synthétique. Niveau de lecture : directeur d'établissement ou décideur DRAAF.
Longueur : 400 à 600 mots maximum. Rédige en français.`;
}

export function buildRecommandationsPrompt(territoire, indicateurs, emploiData = null) {
  return `Tu es un conseiller en ingénierie de formation agricole.

CONTEXTE TERRITORIAL :
- Territoire : ${territoire.nom} (${territoire.region})
- Dynamique agricole : ${indicateurs.indice_dynamisme}/100 – ${indicateurs.evolution_exploitations}% d'évolution des exploitations
- Métiers en tension (5 ans) : ${(indicateurs.metiers_tension || []).join(', ')}
- Filières en développement : ${(indicateurs.filieres_dev || []).join(', ')}
- Filières en déclin : ${(indicateurs.filieres_declin || []).join(', ')}
- Taux de chômage local : ${indicateurs.taux_chomage}%
- Score attractivité : ${indicateurs.score_attractivite}/100
${buildEmploiBlock(emploiData)}
En te basant sur ces éléments, propose :
1. FORMATIONS À RENFORCER : liste avec justification territoriale (max 3)
2. FORMATIONS À CRÉER OU DÉVELOPPER : nouveaux diplômes ou spécialités à envisager (max 3)
3. FORMATIONS À RECONVERTIR OU SUPPRIMER : avec plan d'accompagnement (max 2)
4. PARTENARIATS STRATÉGIQUES À DÉVELOPPER : entreprises, collectivités, autres établissements (max 3)
5. HORIZON DE MISE EN ŒUVRE : court terme (1-2 ans), moyen terme (3-5 ans)${emploiData ? '\n6. ADÉQUATION OFFRE / MARCHÉ DE L\'EMPLOI : analyse de la concordance entre les formations proposées et les offres France Travail actives (CDI/CDD/saisonnier)' : ''}

Base tes recommandations sur les réalités du territoire. Sois précis et opérationnel. Rédige en français.`;
}

export function buildAlertePrompt(territoire, indicateurs, emploiData = null) {
  return `Tu es un système d'alerte territorial pour l'enseignement agricole.

Analyse les données suivantes et identifie les signaux d'alerte pour ${territoire.nom} :

INDICATEURS :
- Évolution population 10 ans : ${indicateurs.evolution_pop_10ans}% (moyenne nationale : +2%)
- Évolution exploitations : ${indicateurs.evolution_exploitations}% (moyenne nationale : -5%)
- Part exploitants >55 ans : ${indicateurs.part_exploitants_55plus}% (seuil d'alerte : 50%)
- Évolution emplois agricoles : ${indicateurs.evolution_emplois}% (cible : 0%)
- Indice de dynamisme : ${indicateurs.indice_dynamisme}/100 (seuil vigilance : 45)
- Score attractivité : ${indicateurs.score_attractivite}/100 (seuil vigilance : 50)
- Part agriculture biologique : ${indicateurs.part_bio}% (objectif national : 18% en 2027)
- Taux de chômage : ${indicateurs.taux_chomage}% (moyenne nationale : 7.3%)
${buildEmploiBlock(emploiData)}
Pour chaque alerte détectée :
- NIVEAU : Rouge (urgent) / Orange (vigilance) / Jaune (à surveiller)
- INDICATEUR CONCERNÉ : nom et valeur
- ÉCART À LA MOYENNE NATIONALE : en points
- ANALYSE : cause probable en 2 phrases
- ACTION RECOMMANDÉE : mesure concrète pour l'établissement ou la DRAAF

Classe les alertes par niveau de priorité (rouge en premier).
Limite : ${emploiData ? '6' : '5'} alertes maximum${emploiData ? ' (dont au moins une liée aux données emploi France Travail si pertinent)' : ''}. Format structuré, en français.`;
}

export function buildScenarioPrompt(territoire, indicateurs, emploiData = null) {
  return `Tu es un prospectiviste spécialisé en agriculture et développement rural.

TERRITOIRE : ${territoire.nom} (${territoire.region})
HORIZON : 2035

DONNÉES DE BASE :
- Projection démographique 2035 : ${indicateurs.projection_pop_2035?.toLocaleString('fr-FR')} hab. (actuellement ${indicateurs.population?.toLocaleString('fr-FR')})
- Tendance surfaces agricoles : ${indicateurs.evolution_exploitations}% évolution exploitations
- Part bio actuelle : ${indicateurs.part_bio}%
- Score vulnérabilité : ${indicateurs.score_vulnerabilite}/10
- Filières stratégiques : ${(indicateurs.filieres_dev || []).join(', ')}
${buildEmploiBlock(emploiData)}
Construis 3 scénarios contrastés pour ce territoire à l'horizon 2035 :

SCÉNARIO 1 – CONTINUITÉ (tendance actuelle maintenue)
SCÉNARIO 2 – RUPTURE POSITIVE (mobilisation des atouts, politiques favorables)
SCÉNARIO 3 – RUPTURE NÉGATIVE (accumulation des fragilités, désengagement)

Pour chaque scénario, décris :
a) Hypothèses de départ (3 hypothèses clés)
b) Situation agricole attendue en 2035
c) Impact sur l'enseignement agricole (effectifs, formations, établissements)
d) Signaux précurseurs à surveiller
e) Leviers d'action pour l'enseignement agricole${emploiData ? '\nf) Évolution prévisible du marché de l\'emploi agricole (volumes CDI/CDD/saisonnier, métiers émergents)' : ''}

Longueur : 150-200 mots par scénario. Rédige en français.`;
}
