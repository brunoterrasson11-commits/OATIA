// ============================================================
// OATIA – Prompts IA (extraits de la Fiche Projet)
// ============================================================

export function buildDiagnosticPrompt(territoire, indicateurs) {
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

STRUCTURE DU DIAGNOSTIC (respecter exactement) :
1. DYNAMIQUES TERRITORIALES (3-4 phrases) : synthèse des tendances démographiques et économiques
2. ÉTAT DE L'AGRICULTURE LOCALE (3-4 phrases) : situation actuelle, forces, fragilités
3. ADÉQUATION FORMATION / BESOINS (3-4 phrases) : analyse des correspondances et des écarts
4. SIGNAUX FAIBLES ET ALERTES (liste de 3 à 5 points) : risques à surveiller
5. RECOMMANDATIONS POUR L'OFFRE DE FORMATION (liste de 3 à 5 recommandations opérationnelles)
6. SCORE DE VULNÉRABILITÉ TERRITORIALE : note de ${indicateurs.score_vulnerabilite || '?'}/10 avec justification en 2 phrases

Ton : professionnel, synthétique. Niveau de lecture : directeur d'établissement ou décideur DRAAF.
Longueur : 400 à 600 mots maximum. Rédige en français.`;
}

export function buildRecommandationsPrompt(territoire, indicateurs) {
  return `Tu es un conseiller en ingénierie de formation agricole.

CONTEXTE TERRITORIAL :
- Territoire : ${territoire.nom} (${territoire.region})
- Dynamique agricole : ${indicateurs.indice_dynamisme}/100 – ${indicateurs.evolution_exploitations}% d'évolution des exploitations
- Métiers en tension (5 ans) : ${(indicateurs.metiers_tension || []).join(', ')}
- Filières en développement : ${(indicateurs.filieres_dev || []).join(', ')}
- Filières en déclin : ${(indicateurs.filieres_declin || []).join(', ')}
- Taux de chômage local : ${indicateurs.taux_chomage}%
- Score attractivité : ${indicateurs.score_attractivite}/100

En te basant sur ces éléments, propose :
1. FORMATIONS À RENFORCER : liste avec justification territoriale (max 3)
2. FORMATIONS À CRÉER OU DÉVELOPPER : nouveaux diplômes ou spécialités à envisager (max 3)
3. FORMATIONS À RECONVERTIR OU SUPPRIMER : avec plan d'accompagnement (max 2)
4. PARTENARIATS STRATÉGIQUES À DÉVELOPPER : entreprises, collectivités, autres établissements (max 3)
5. HORIZON DE MISE EN ŒUVRE : court terme (1-2 ans), moyen terme (3-5 ans)

Base tes recommandations sur les réalités du territoire. Sois précis et opérationnel. Rédige en français.`;
}

export function buildAlertePrompt(territoire, indicateurs) {
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

Pour chaque alerte détectée :
- NIVEAU : Rouge (urgent) / Orange (vigilance) / Jaune (à surveiller)
- INDICATEUR CONCERNÉ : nom et valeur
- ÉCART À LA MOYENNE NATIONALE : en points
- ANALYSE : cause probable en 2 phrases
- ACTION RECOMMANDÉE : mesure concrète pour l'établissement ou la DRAAF

Classe les alertes par niveau de priorité (rouge en premier).
Limite : 5 alertes maximum. Format structuré, en français.`;
}

export function buildScenarioPrompt(territoire, indicateurs) {
  return `Tu es un prospectiviste spécialisé en agriculture et développement rural.

TERRITOIRE : ${territoire.nom} (${territoire.region})
HORIZON : 2035

DONNÉES DE BASE :
- Projection démographique 2035 : ${indicateurs.projection_pop_2035?.toLocaleString('fr-FR')} hab. (actuellement ${indicateurs.population?.toLocaleString('fr-FR')})
- Tendance surfaces agricoles : ${indicateurs.evolution_exploitations}% évolution exploitations
- Part bio actuelle : ${indicateurs.part_bio}%
- Score vulnérabilité : ${indicateurs.score_vulnerabilite}/10
- Filières stratégiques : ${(indicateurs.filieres_dev || []).join(', ')}

Construis 3 scénarios contrastés pour ce territoire à l'horizon 2035 :

SCÉNARIO 1 – CONTINUITÉ (tendance actuelle maintenue)
SCÉNARIO 2 – RUPTURE POSITIVE (mobilisation des atouts, politiques favorables)
SCÉNARIO 3 – RUPTURE NÉGATIVE (accumulation des fragilités, désengagement)

Pour chaque scénario, décris :
a) Hypothèses de départ (3 hypothèses clés)
b) Situation agricole attendue en 2035
c) Impact sur l'enseignement agricole (effectifs, formations, établissements)
d) Signaux précurseurs à surveiller
e) Leviers d'action pour l'enseignement agricole

Longueur : 150-200 mots par scénario. Rédige en français.`;
}
