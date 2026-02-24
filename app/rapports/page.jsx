'use client';

import { useState } from 'react';
import {
  FileText, Download, Printer, BrainCircuit, Loader2, CheckCircle2,
  Calendar, MapPin, Building2, ChevronRight, Sparkles, Eye
} from 'lucide-react';
import { indicateurs, etablissements } from '@/lib/data';

const reportTypes = [
  {
    key: 'etablissement',
    label: 'Rapport établissement',
    icon: Building2,
    color: 'green',
    desc: 'Bilan de l\'établissement : effectifs, formations, taux d\'insertion, positionnement stratégique'
  },
  {
    key: 'regional',
    label: 'Rapport régional',
    icon: MapPin,
    color: 'blue',
    desc: 'Synthèse régionale : dynamiques agricoles, offre de formation, alertes, recommandations'
  },
  {
    key: 'national',
    label: 'Rapport national',
    icon: FileText,
    color: 'purple',
    desc: 'Vue d\'ensemble nationale : tendances, benchmarks inter-régionaux, priorités d\'action'
  },
];

const regions = ['Nouvelle-Aquitaine', 'Occitanie', 'Normandie', 'Bretagne', 'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Hauts-de-France', 'Grand Est', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'];

const rapportsMock = [
  { id: 1, titre: 'Rapport territorial – Gironde', type: 'régional', territoire: 'Gironde', date: '20/02/2026', statut: 'validé' },
  { id: 2, titre: 'Diagnostic EPLEFPA Bordeaux-Blanquefort', type: 'établissement', territoire: 'Bordeaux-Blanquefort', date: '18/02/2026', statut: 'publié' },
  { id: 3, titre: 'Bilan formations Occitanie 2025', type: 'régional', territoire: 'Occitanie', date: '15/02/2026', statut: 'brouillon' },
  { id: 4, titre: 'Rapport national enseignement agricole 2025', type: 'national', territoire: 'France', date: '10/02/2026', statut: 'publié' },
  { id: 5, titre: 'Analyse MFR Périgueux-Antonne', type: 'établissement', territoire: 'Dordogne', date: '05/02/2026', statut: 'validé' },
];

const statutColors = {
  brouillon: 'bg-slate-600/30 text-slate-400 border border-slate-600/50',
  validé: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  publié: 'bg-green-500/15 text-green-300 border border-green-500/30',
};

function buildRapportPrompt(reportType, territoire, etab) {
  if (reportType === 'etablissement' && etab) {
    const ind = indicateurs[etab.code_departement];
    return `Tu es un assistant expert en communication institutionnelle pour l'enseignement agricole.

Rédige un rapport de pilotage territorial destiné au directeur de l'établissement "${etab.nom}".

DONNÉES DE L'ÉTABLISSEMENT :
- Type : ${etab.type} (${etab.statut})
- Formations : ${etab.formations.join(', ')}
- Effectifs : ${etab.effectifs_total} apprenants
- Taux de remplissage : ${etab.taux_remplissage}%
- Taux d'insertion professionnelle : ${etab.taux_insertion}%

CONTEXTE TERRITORIAL (${etab.departement}) :
- Population : ${ind?.population?.toLocaleString('fr-FR')} hab. | Évolution : ${ind?.evolution_pop_10ans}%
- Indice dynamisme agricole : ${ind?.indice_dynamisme}/100
- Score attractivité : ${ind?.score_attractivite}/100
- Vulnérabilité : ${ind?.score_vulnerabilite}/10
- Métiers en tension : ${ind?.metiers_tension?.join(', ')}
- Filières en développement : ${ind?.filieres_dev?.join(', ')}

STRUCTURE DU RAPPORT :
1. RÉSUMÉ EXÉCUTIF (100-150 mots)
2. ÉTAT DES LIEUX DE L'ÉTABLISSEMENT (indicateurs clés et analyse)
3. ANALYSE TERRITORIALE (opportunités et risques pour l'établissement)
4. POSITIONNEMENT STRATÉGIQUE RECOMMANDÉ
5. PLAN D'ACTION PRIORITAIRE (3 actions avec porteur, délai, indicateur de succès)
6. CONCLUSION

Style : rapport officiel, structuré, objectif. Public : chef d'établissement, conseil d'administration. Rédigez en français.`;
  }

  if (reportType === 'regional' && territoire) {
    const ind = indicateurs[territoire];
    const etabs = etablissements.filter(e => e.code_departement === territoire);
    return `Tu es un analyste territorial expert en enseignement agricole.

Génère un rapport de pilotage régional pour le département "${ind?.nom || territoire}" (${ind?.region}).

DONNÉES TERRITORIALES :
- Population : ${ind?.population?.toLocaleString('fr-FR')} hab. | Évolution 10 ans : ${ind?.evolution_pop_10ans}%
- SAU : ${ind?.sau_ha?.toLocaleString('fr-FR')} ha | Exploitations : ${ind?.nb_exploitations?.toLocaleString('fr-FR')}
- Part exploitants >55 ans : ${ind?.part_exploitants_55plus}%
- Emplois agricoles : ${ind?.emplois_agricoles?.toLocaleString('fr-FR')} | Évolution : ${ind?.evolution_emplois}%
- Part BIO : ${ind?.part_bio}%
- Taux de chômage : ${ind?.taux_chomage}%
- Score attractivité : ${ind?.score_attractivite}/100 | Dynamisme : ${ind?.indice_dynamisme}/100

ÉTABLISSEMENTS RECENSÉS : ${etabs.length} établissements
${etabs.map(e => `- ${e.nom} (${e.type}) : ${e.effectifs_total} apprenants, remplissage ${e.taux_remplissage}%`).join('\n')}

STRUCTURE :
1. SYNTHÈSE EXÉCUTIVE
2. DYNAMIQUES TERRITORIALES ET AGRICOLES
3. ÉTAT DE L'OFFRE DE FORMATION
4. ADÉQUATION FORMATION-MARCHÉ DU TRAVAIL
5. RISQUES ET ALERTES
6. RECOMMANDATIONS PRIORITAIRES (5 recommandations opérationnelles)
7. PERSPECTIVES 2030

Style : rapport DRAAF/SRFD, professionnel, 600-800 mots. Français.`;
  }

  return `Tu es un expert national en enseignement agricole.

Génère un rapport de pilotage national de l'enseignement agricole français.

CONTEXTE NATIONAL :
- 800 établissements d'enseignement agricole (lycées, MFR, CFPPA, EPLEFPA)
- 220 000 apprenants en formation initiale et continue
- Enjeux : transition agroécologique, renouvellement des actifs, adaptation climatique
- Objectif Plan France 2030 : 18% d'agriculture biologique, renouvellement 50% des exploitants
- Tendance : baisse globale des effectifs -2.3% sur 5 ans, hausse formations BIO +8.7%

STRUCTURE :
1. BILAN NATIONAL DE L'ENSEIGNEMENT AGRICOLE 2025
2. TENDANCES DÉMOGRAPHIQUES ET MARCHÉ DU TRAVAIL AGRICOLE
3. ADAPTATION DE L'OFFRE DE FORMATION AUX TRANSITIONS AGROÉCOLOGIQUES
4. TERRITOIRES EN VIGILANCE ET ZONES À RENFORCER
5. PRÉCONISATIONS STRATÉGIQUES POUR 2026-2030
6. CONCLUSION ET PROCHAINES ÉTAPES

Style : rapport institutionnel DGER/MASA, 700-900 mots. Français.`;
}

export default function RapportsPage() {
  const [reportType, setReportType] = useState('etablissement');
  const [selectedDept, setSelectedDept] = useState('33');
  const [selectedEtab, setSelectedEtab] = useState(etablissements[0]);
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const etabsDuDept = etablissements.filter(e => e.code_departement === selectedDept);

  async function generateReport() {
    setGenerating(true);
    setError(null);
    setGeneratedReport(null);

    const prompt = buildRapportPrompt(reportType, selectedDept, selectedEtab);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          territoire: {
            nom: reportType === 'etablissement' ? selectedEtab?.nom :
              reportType === 'regional' ? indicateurs[selectedDept]?.nom :
              'France',
            region: reportType === 'etablissement' ? selectedEtab?.region :
              reportType === 'regional' ? indicateurs[selectedDept]?.region :
              'National',
            code: selectedDept,
          },
          indicateurs: indicateurs[selectedDept] || {},
          type: 'diagnostic',
        }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error); return; }
      setGeneratedReport({
        ...data,
        type: reportType,
        titre: reportType === 'etablissement'
          ? `Rapport de pilotage – ${selectedEtab?.nom}`
          : reportType === 'regional'
          ? `Rapport régional – ${indicateurs[selectedDept]?.nom}`
          : 'Rapport national enseignement agricole 2025/2026',
        date: new Date().toLocaleDateString('fr-FR'),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  function printReport() {
    if (!generatedReport) return;
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>${generatedReport.titre}</title>
      <style>
        body { font-family: Georgia, serif; margin: 40px; line-height: 1.6; color: #111; }
        h1 { color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px; }
        h2 { color: #15803d; margin-top: 24px; }
        p { margin: 8px 0; }
        .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
        .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; color: #666; font-size: 12px; }
      </style></head>
      <body>
        <h1>${generatedReport.titre}</h1>
        <div class="meta">Généré par OATIA · ${generatedReport.date} · Claude Opus 4.6</div>
        <div>${generatedReport.contenu.replace(/\n/g, '<br/>')}</div>
        <div class="footer">OATIA – Outil d'Analyse Territoriale Intégrée pour l'Enseignement Agricole · MASA/DGER · Validation humaine requise avant diffusion officielle</div>
      </body></html>
    `);
    w.document.close();
    w.print();
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Rapports</h1>
        <p className="text-slate-400 mt-1 text-sm">Génération automatique de rapports de pilotage par l'IA</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Config */}
        <div className="space-y-4">
          {/* Report type */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3">Type de rapport</h2>
            <div className="space-y-2">
              {reportTypes.map(({ key, label, icon: Icon, color, desc }) => (
                <button
                  key={key}
                  onClick={() => setReportType(key)}
                  className={`w-full text-left rounded-lg p-3 border transition-all ${
                    reportType === key
                      ? 'border-green-500/40 bg-green-500/10'
                      : 'border-slate-700 hover:bg-slate-700/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${reportType === key ? 'text-green-400' : 'text-slate-500'}`} />
                    <span className={`text-sm font-medium ${reportType === key ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 ml-6">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Paramètres */}
          {reportType !== 'national' && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 space-y-3">
              <h2 className="text-white font-semibold text-sm">Paramètres</h2>

              {reportType === 'etablissement' && (
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Établissement</label>
                  <select
                    value={selectedEtab?.id}
                    onChange={e => setSelectedEtab(etablissements.find(et => et.id === parseInt(e.target.value)))}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-green-500"
                  >
                    {etablissements.map(etab => (
                      <option key={etab.id} value={etab.id}>{etab.nom}</option>
                    ))}
                  </select>
                  {selectedEtab && (
                    <div className="mt-2 text-xs text-slate-500 space-y-1">
                      <div>Type : {selectedEtab.type} · {selectedEtab.statut}</div>
                      <div>Effectifs : {selectedEtab.effectifs_total} apprenants</div>
                      <div>Région : {selectedEtab.region}</div>
                    </div>
                  )}
                </div>
              )}

              {reportType === 'regional' && (
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block">Département</label>
                  <select
                    value={selectedDept}
                    onChange={e => setSelectedDept(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-green-500"
                  >
                    {Object.entries(indicateurs).map(([code, ind]) => (
                      <option key={code} value={code}>{ind.nom} ({ind.region})</option>
                    ))}
                  </select>
                  {indicateurs[selectedDept] && (
                    <div className="mt-2 text-xs text-slate-500">
                      Région : {indicateurs[selectedDept].region}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={generateReport}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2.5 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors"
          >
            {generating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Génération en cours...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Générer le rapport IA</>
            )}
          </button>
        </div>

        {/* Reports list & preview */}
        <div className="xl:col-span-2 space-y-5">
          {/* Generated report */}
          {generatedReport && (
            <div className="bg-slate-800/60 border border-green-500/20 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700 bg-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold text-sm">{generatedReport.titre}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Généré le {generatedReport.date} · Claude Opus 4.6 · {generatedReport.tokens_used?.toLocaleString('fr-FR')} tokens
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={printReport}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> Imprimer
                  </button>
                </div>
              </div>
              <div className="p-5 overflow-y-auto max-h-[50vh]">
                {generatedReport.contenu.split('\n').map((line, i) => {
                  if (!line.trim()) return <br key={i} />;
                  if (/^\d+\.\s+[A-ZÀ-Ö]/.test(line.trim())) {
                    return <h3 key={i} className="text-green-400 font-bold text-sm mt-4 mb-1.5 uppercase tracking-wide">{line}</h3>;
                  }
                  if (/^[-–•]\s+/.test(line.trim())) {
                    return <div key={i} className="flex gap-2 my-1 ml-3"><span className="text-green-500 flex-shrink-0">→</span><span className="text-slate-300 text-sm">{line.replace(/^[-–•]\s+/, '')}</span></div>;
                  }
                  return <p key={i} className="text-slate-300 text-sm mb-1">{line}</p>;
                })}
              </div>
              <div className="px-5 py-3 border-t border-slate-700 bg-slate-800/60">
                <p className="text-slate-500 text-xs italic">
                  ⚠️ Ce rapport est généré par IA. Une validation humaine est obligatoire avant toute diffusion officielle.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Existing reports */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700">
              <h2 className="text-white font-semibold text-sm">Rapports existants</h2>
              <p className="text-slate-400 text-xs mt-0.5">{rapportsMock.length} rapports dans la base</p>
            </div>
            <div className="divide-y divide-slate-700/50">
              {rapportsMock.map(rapport => (
                <div key={rapport.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-white text-sm font-medium truncate">{rapport.titre}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="capitalize">{rapport.type}</span>
                      <span>·</span>
                      <span>{rapport.territoire}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{rapport.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className={`text-xs px-2 py-0.5 rounded border ${statutColors[rapport.statut]}`}>
                      {rapport.statut}
                    </span>
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
