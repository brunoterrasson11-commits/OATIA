'use client';

import { useState, useMemo } from 'react';
import {
  FileText, Download, Printer, Loader2, CheckCircle2,
  Calendar, MapPin, Building2, Sparkles, Eye, Pencil, Trash2, Save, X,
  BrainCircuit, ChevronDown, ChevronRight
} from 'lucide-react';
import { indicateurs, etablissements } from '@/lib/data';
import { useReports } from '@/hooks/useReports';

// ─── Types de rapport ────────────────────────────────────────────────────────
const reportTypes = [
  {
    key: 'etablissement',
    label: 'Rapport établissement',
    icon: Building2,
    color: 'green',
    desc: "Bilan de l'établissement : effectifs, formations, taux d'insertion, positionnement stratégique"
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
    desc: "Vue d'ensemble nationale : tendances, benchmarks inter-régionaux, priorités d'action"
  },
];

const statutColors = {
  brouillon: 'bg-slate-600/30 text-slate-400 border border-slate-600/50',
  validé:    'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  publié:    'bg-green-500/15 text-green-300 border border-green-500/30',
  généré:    'bg-blue-500/15 text-blue-300 border border-blue-500/30',
};

// Rapports manuels initiaux
const rapportsMockInitial = [
  { id: 'm1', titre: 'Rapport territorial – Gironde',             type: 'régional',       territoire: 'Gironde',                 date: '20/02/2026', statut: 'validé',   source: 'manual', contenu: null },
  { id: 'm2', titre: 'Diagnostic EPLEFPA Bordeaux-Blanquefort',   type: 'établissement',  territoire: 'Bordeaux-Blanquefort',    date: '18/02/2026', statut: 'publié',   source: 'manual', contenu: null },
  { id: 'm3', titre: 'Bilan formations Occitanie 2025',           type: 'régional',       territoire: 'Occitanie',               date: '15/02/2026', statut: 'brouillon',source: 'manual', contenu: null },
  { id: 'm4', titre: 'Rapport national enseignement agricole 2025', type: 'national',     territoire: 'France',                  date: '10/02/2026', statut: 'publié',   source: 'manual', contenu: null },
  { id: 'm5', titre: 'Analyse MFR Périgueux-Antonne',             type: 'établissement',  territoire: 'Dordogne',                date: '05/02/2026', statut: 'validé',   source: 'manual', contenu: null },
];

// ─── Constructeur de prompt ──────────────────────────────────────────────────
function buildRapportPrompt(reportType, selectedDept, selectedEtab) {
  if (reportType === 'etablissement' && selectedEtab) {
    const ind = indicateurs[selectedEtab.code_departement];
    return `Tu es un assistant expert en communication institutionnelle pour l'enseignement agricole.

Rédige un rapport de pilotage territorial destiné au directeur de l'établissement "${selectedEtab.nom}".

DONNÉES DE L'ÉTABLISSEMENT :
- Type : ${selectedEtab.type} (${selectedEtab.statut})
- Formations : ${selectedEtab.formations.join(', ')}
- Effectifs : ${selectedEtab.effectifs_total} apprenants
- Taux de remplissage : ${selectedEtab.taux_remplissage}%
- Taux d'insertion professionnelle : ${selectedEtab.taux_insertion}%

CONTEXTE TERRITORIAL (${selectedEtab.departement}) :
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

  if (reportType === 'regional' && selectedDept) {
    const ind = indicateurs[selectedDept];
    const etabs = etablissements.filter(e => e.code_departement === selectedDept);
    return `Tu es un analyste territorial expert en enseignement agricole.

Génère un rapport de pilotage régional pour le département "${ind?.nom || selectedDept}" (${ind?.region}).

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

// ─── Téléchargement ──────────────────────────────────────────────────────────
function downloadReportFile(rapport) {
  const content = [
    rapport.titre || 'Rapport',
    '='.repeat(60),
    '',
    `Type       : ${rapport.type}`,
    `Territoire : ${rapport.territoire}`,
    `Date       : ${rapport.date}`,
    `Statut     : ${rapport.statut}`,
    `Source     : ${rapport.source === 'ai' ? 'Généré par IA (Claude Opus 4.6)' : 'Rapport manuel'}`,
    '',
    '='.repeat(60),
    '',
    rapport.contenu || '[Contenu non disponible dans OATIA – rapport créé manuellement]',
    '',
    '—',
    "OATIA – Outil d'Analyse Territoriale Intégrée pour l'Enseignement Agricole",
    'Validation humaine requise avant diffusion officielle.',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(rapport.titre || 'rapport').replace(/[^\w\s]/g, '').replace(/\s+/g, '_').slice(0, 60)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Rendu contenu structuré ─────────────────────────────────────────────────
function renderContent(contenu) {
  if (!contenu) return <p className="text-slate-500 italic text-sm">Contenu non disponible – rapport créé manuellement.</p>;
  return contenu.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    if (/^\d+\.\s+[A-ZÀ-Ö].+/.test(line.trim())) {
      return <h3 key={i} className="text-green-400 font-bold text-sm mt-4 mb-1.5 uppercase tracking-wide">{line}</h3>;
    }
    if (/^[-–•]\s+/.test(line.trim())) {
      return (
        <div key={i} className="flex gap-2 my-1 ml-3">
          <span className="text-green-500 flex-shrink-0">→</span>
          <span className="text-slate-300 text-sm">{line.replace(/^[-–•]\s+/, '')}</span>
        </div>
      );
    }
    return <p key={i} className="text-slate-300 text-sm mb-1">{line}</p>;
  });
}

// ─── Page principale ─────────────────────────────────────────────────────────
export default function RapportsPage() {
  const [reportType, setReportType]     = useState('etablissement');
  const [selectedDept, setSelectedDept] = useState('33');
  const [selectedEtab, setSelectedEtab] = useState(etablissements[0]);
  const [generating, setGenerating]     = useState(false);
  const [error, setError]               = useState(null);

  // Rapports manuels en state pour permettre édition/suppression
  const [manualReports, setManualReports] = useState(rapportsMockInitial);

  // Rapports IA depuis localStorage (partagé avec Analyse IA)
  const { reports: aiReports, deleteReport: deleteAiReport, updateReport: updateAiReport } = useReports();

  // Modals
  const [viewModal, setViewModal]   = useState(null);
  const [editModal, setEditModal]   = useState(null);
  const [editContent, setEditContent] = useState({ titre: '', contenu: '' });
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Liste unifiée (rapports IA en tête, puis manuels)
  const allReports = useMemo(() => {
    const aiNormalized = aiReports.map(r => ({
      id: r.id,
      titre: r.titre || r.type_label || 'Rapport IA',
      type: r.type_label || 'IA',
      territoire: r.territoire || '—',
      date: new Date(r.savedAt || r.date_generation).toLocaleDateString('fr-FR'),
      statut: 'généré',
      source: 'ai',
      contenu: r.contenu,
    }));
    return [...aiNormalized, ...manualReports];
  }, [aiReports, manualReports]);

  // ── Génération ──────────────────────────────────────────────────────────────
  async function generateReport() {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          territoire: {
            nom: reportType === 'etablissement' ? selectedEtab?.nom
              : reportType === 'regional'       ? indicateurs[selectedDept]?.nom
              : 'France',
            region: reportType === 'etablissement' ? selectedEtab?.region
              : reportType === 'regional'           ? indicateurs[selectedDept]?.region
              : 'National',
            code: selectedDept,
          },
          indicateurs: indicateurs[selectedDept] || {},
          type: 'diagnostic',
        }),
      });

      const data = await response.json();
      if (!response.ok) { setError(data.error); return; }

      const titre = reportType === 'etablissement'
        ? `Rapport de pilotage – ${selectedEtab?.nom}`
        : reportType === 'regional'
        ? `Rapport régional – ${indicateurs[selectedDept]?.nom}`
        : 'Rapport national enseignement agricole 2025/2026';

      // Ouvrir directement en modal de visualisation
      setViewModal({
        id: data.id || Date.now(),
        titre,
        type: reportType,
        territoire: reportType === 'etablissement' ? selectedEtab?.departement
          : reportType === 'regional' ? indicateurs[selectedDept]?.nom
          : 'France',
        date: new Date().toLocaleDateString('fr-FR'),
        statut: 'généré',
        source: 'ai',
        contenu: data.contenu,
        tokens_used: data.tokens_used,
        date_generation: data.date_generation,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  // ── Impression ──────────────────────────────────────────────────────────────
  function printReport(rapport) {
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>${rapport.titre}</title>
      <style>
        body { font-family: Georgia, serif; margin: 40px; line-height: 1.6; color: #111; }
        h1 { color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px; }
        h2 { color: #15803d; margin-top: 24px; }
        p { margin: 8px 0; }
        .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
        .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; color: #666; font-size: 12px; }
      </style></head>
      <body>
        <h1>${rapport.titre}</h1>
        <div class="meta">Généré par OATIA · ${rapport.date} · Claude Opus 4.6</div>
        <div>${(rapport.contenu || '[Contenu non disponible]').replace(/\n/g, '<br/>')}</div>
        <div class="footer">OATIA – Outil d'Analyse Territoriale Intégrée · MASA/DGER · Validation humaine requise avant diffusion officielle</div>
      </body></html>
    `);
    w.document.close();
    w.print();
  }

  // ── Édition ─────────────────────────────────────────────────────────────────
  function openEdit(rapport) {
    setEditContent({ titre: rapport.titre || '', contenu: rapport.contenu || '' });
    setEditModal(rapport);
  }

  function saveEdit() {
    if (!editModal) return;
    if (editModal.source === 'ai') {
      updateAiReport(editModal.id, { titre: editContent.titre, contenu: editContent.contenu });
    } else {
      setManualReports(prev => prev.map(r =>
        r.id === editModal.id ? { ...r, titre: editContent.titre } : r
      ));
    }
    setEditModal(null);
  }

  // ── Suppression ─────────────────────────────────────────────────────────────
  function confirmAndDelete(rapport) {
    if (rapport.source === 'ai') {
      deleteAiReport(rapport.id);
    } else {
      setManualReports(prev => prev.filter(r => r.id !== rapport.id));
    }
    setConfirmDelete(null);
  }

  return (
    <div className="p-8 space-y-6">

      {/* ── Modal de visualisation ── */}
      {viewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div>
                <h3 className="text-white font-bold text-base">{viewModal.titre}</h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  {viewModal.type} · {viewModal.territoire} · {viewModal.date}
                  {viewModal.tokens_used && ` · ${viewModal.tokens_used.toLocaleString('fr-FR')} tokens`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => printReport(viewModal)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Imprimer
                </button>
                <button
                  onClick={() => downloadReportFile(viewModal)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Télécharger
                </button>
                <button onClick={() => setViewModal(null)} className="text-slate-400 hover:text-white transition-colors ml-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {renderContent(viewModal.contenu)}
            </div>
            {viewModal.source === 'ai' && (
              <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/60">
                <p className="text-slate-500 text-xs italic">
                  ⚠️ Ce rapport est généré par IA. Une validation humaine est obligatoire avant toute diffusion officielle.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal d'édition ── */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-green-400" /> Modifier le rapport
              </h3>
              <button onClick={() => setEditModal(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Titre</label>
                <input
                  type="text"
                  value={editContent.titre}
                  onChange={e => setEditContent(prev => ({ ...prev, titre: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              {editModal.source === 'ai' && (
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Contenu</label>
                  <textarea
                    value={editContent.contenu}
                    onChange={e => setEditContent(prev => ({ ...prev, contenu: e.target.value }))}
                    rows={16}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-200 text-sm font-mono focus:outline-none focus:border-green-500 resize-none leading-relaxed"
                  />
                </div>
              )}
              {editModal.source === 'manual' && (
                <p className="text-slate-500 text-xs italic">
                  Pour les rapports manuels, seul le titre est modifiable dans OATIA.
                </p>
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-700 flex justify-end gap-3">
              <button onClick={() => setEditModal(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
                Annuler
              </button>
              <button onClick={saveEdit} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors">
                <Save className="w-4 h-4" /> Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal de confirmation suppression ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-white font-bold text-base mb-2">Supprimer le rapport ?</h3>
            <p className="text-slate-400 text-sm mb-1 font-medium">{confirmDelete.titre}</p>
            <p className="text-slate-500 text-xs mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
                Annuler
              </button>
              <button onClick={() => confirmAndDelete(confirmDelete)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-white">Rapports</h1>
        <p className="text-slate-400 mt-1 text-sm">Génération automatique et gestion des rapports de pilotage</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ─── Config ─── */}
        <div className="space-y-4">
          {/* Type de rapport */}
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
                    <div className="mt-2 text-xs text-slate-500 space-y-0.5">
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
                    <div className="mt-2 text-xs text-slate-500">Région : {indicateurs[selectedDept].region}</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bouton générer */}
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

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* ─── Liste de tous les rapports ─── */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-sm">Tous les rapports</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  {allReports.length} rapports ({aiReports.length} IA · {manualReports.length} manuels)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded">
                  <BrainCircuit className="w-3 h-3" /> IA
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-700/50 border border-slate-600/50 px-2 py-0.5 rounded">
                  <FileText className="w-3 h-3" /> Manuel
                </span>
              </div>
            </div>

            {allReports.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">Aucun rapport. Générez votre premier rapport IA !</div>
            ) : (
              <div className="divide-y divide-slate-700/50">
                {allReports.map(rapport => (
                  <div key={rapport.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {rapport.source === 'ai'
                          ? <BrainCircuit className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          : <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        }
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
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded border ${statutColors[rapport.statut] || statutColors.brouillon}`}>
                        {rapport.statut}
                      </span>
                      <button
                        title="Visualiser"
                        onClick={() => setViewModal(rapport)}
                        className="p-1.5 text-slate-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="Éditer"
                        onClick={() => openEdit(rapport)}
                        className="p-1.5 text-slate-500 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        title="Télécharger"
                        onClick={() => downloadReportFile(rapport)}
                        className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-600/50 rounded transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        title="Supprimer"
                        onClick={() => setConfirmDelete(rapport)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
