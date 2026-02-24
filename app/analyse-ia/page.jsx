'use client';

import { useState } from 'react';
import {
  BrainCircuit, Play, Download, Copy, CheckCheck, Loader2,
  BarChart2, AlertTriangle, TrendingUp, FileText, RefreshCw,
  ChevronDown, ChevronRight, Sparkles
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { indicateurs, etablissements } from '@/lib/data';

const analysisTypes = [
  { key: 'diagnostic', label: 'Diagnostic territorial complet', icon: BarChart2, desc: 'Analyse complète avec forces, fragilités et score de vulnérabilité', color: 'green' },
  { key: 'recommandations', label: 'Recommandations de formation', icon: TrendingUp, desc: 'Formations à créer, renforcer ou supprimer selon le territoire', color: 'blue' },
  { key: 'alertes', label: 'Détection d\'alertes', icon: AlertTriangle, desc: 'Signaux faibles et alertes territoriales classées par priorité', color: 'amber' },
  { key: 'scenarios', label: 'Scénarios prospectifs 2035', icon: Sparkles, desc: '3 scénarios contrastés (continuité, rupture positive, rupture négative)', color: 'purple' },
];

const colorMap = {
  green: { btn: 'bg-green-600 hover:bg-green-700', ring: 'ring-green-500/30', badge: 'bg-green-500/20 text-green-300 border-green-500/30' },
  blue: { btn: 'bg-blue-600 hover:bg-blue-700', ring: 'ring-blue-500/30', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  amber: { btn: 'bg-amber-600 hover:bg-amber-700', ring: 'ring-amber-500/30', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  purple: { btn: 'bg-purple-600 hover:bg-purple-700', ring: 'ring-purple-500/30', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
};

function formatDiagnosticText(text) {
  // Convert markdown-like text to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^(\d+\.\s+[A-ZÀ-Ö\s\-/]+)/gm, '<h3 class="text-green-400 font-bold text-sm mt-4 mb-1">$1</h3>')
    .replace(/^[-–•]\s+(.+)/gm, '<li class="text-slate-300 text-sm ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-slate-300 text-sm mb-2">')
    .replace(/\n/g, '<br/>');
}

export default function AnalyseIAPage() {
  const [selectedDept, setSelectedDept] = useState('33');
  const [analysisType, setAnalysisType] = useState('diagnostic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const territoire = indicateurs[selectedDept];
  const etabsDuDept = etablissements.filter(e => e.code_departement === selectedDept);

  const radarData = territoire ? [
    { subject: 'Dynamisme', A: territoire.indice_dynamisme },
    { subject: 'Attractivité', A: territoire.score_attractivite },
    { subject: 'Emploi', A: territoire.indice_tension_emploi },
    { subject: 'BIO', A: Math.min(territoire.part_bio * 5, 100) },
    { subject: 'Stabilité démo.', A: Math.max(0, 50 + territoire.evolution_pop_10ans * 3) },
  ] : [];

  const vulnerabiliteColor = territoire ?
    territoire.score_vulnerabilite <= 3 ? 'text-green-400' :
    territoire.score_vulnerabilite <= 5 ? 'text-amber-400' : 'text-red-400'
    : 'text-slate-400';

  async function generateAnalysis() {
    if (!territoire) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          territoire: { nom: territoire.nom, region: territoire.region, code: selectedDept },
          indicateurs: territoire,
          type: analysisType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erreur lors de la génération');
        return;
      }

      setResult(data);
      setHistory(prev => [{ ...data, id: Date.now(), type_label: analysisTypes.find(t => t.key === analysisType)?.label }, ...prev.slice(0, 4)]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (result?.contenu) {
      navigator.clipboard.writeText(result.contenu);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-green-400" /> Analyse IA
        </h1>
        <p className="text-slate-400 mt-1 text-sm">
          Génération de diagnostics territoriaux par intelligence artificielle (Claude Opus 4.6)
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Config panel */}
        <div className="space-y-4">
          {/* Territory selector */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3">1. Sélectionner le territoire</h2>
            <select
              value={selectedDept}
              onChange={e => { setSelectedDept(e.target.value); setResult(null); }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-green-500"
            >
              {Object.entries(indicateurs).map(([code, ind]) => (
                <option key={code} value={code}>
                  {ind.nom} ({ind.region})
                </option>
              ))}
            </select>

            {territoire && (
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { l: 'Population', v: territoire.population.toLocaleString('fr-FR') + ' hab.' },
                    { l: 'Exploitations', v: territoire.nb_exploitations.toLocaleString('fr-FR') },
                    { l: 'SAU', v: territoire.sau_ha.toLocaleString('fr-FR') + ' ha' },
                    { l: 'Part BIO', v: territoire.part_bio + '%' },
                    { l: 'Chômage', v: territoire.taux_chomage + '%' },
                    { l: 'Établissements', v: `${etabsDuDept.length} dans la base` },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-slate-700/50 rounded-lg p-2">
                      <div className="text-slate-500 text-xs">{l}</div>
                      <div className="text-slate-200 font-semibold text-xs mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-2">
                  <span className="text-slate-400 text-xs">Score vulnérabilité</span>
                  <span className={`font-bold text-sm ${vulnerabiliteColor}`}>
                    {territoire.score_vulnerabilite}/10
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={150}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Analysis type */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3">2. Choisir l'analyse</h2>
            <div className="space-y-2">
              {analysisTypes.map(({ key, label, icon: Icon, desc, color }) => {
                const c = colorMap[color];
                const active = analysisType === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAnalysisType(key)}
                    className={`w-full text-left rounded-lg p-3 border transition-all ${
                      active
                        ? `border-${color}-500/40 bg-${color}-500/10 ring-1 ${c.ring}`
                        : 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${active ? `text-${color}-400` : 'text-slate-500'}`} />
                      <span className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1 ml-6">{desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generateAnalysis}
            disabled={loading || !territoire}
            className="w-full flex items-center justify-center gap-2.5 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Générer l'analyse IA
              </>
            )}
          </button>

          {/* History */}
          {history.length > 0 && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-slate-400 text-xs font-medium mb-2">Historique</h3>
              <div className="space-y-1.5">
                {history.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setResult(h)}
                    className="w-full text-left text-xs bg-slate-700/50 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
                  >
                    <div className="text-slate-300 font-medium">{h.territoire}</div>
                    <div className="text-slate-500 mt-0.5">{h.type_label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result panel */}
        <div className="xl:col-span-2">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-semibold">Erreur</span>
              </div>
              <p className="text-red-200 text-sm">{error}</p>
              {error.includes('clé API') && (
                <div className="mt-3 bg-red-900/30 rounded-lg p-3 text-xs text-red-300">
                  <p className="font-semibold mb-1">Configuration requise :</p>
                  <code className="block bg-slate-900 rounded p-2 text-slate-300">
                    # Créez le fichier .env.local avec :<br/>
                    ANTHROPIC_API_KEY=sk-ant-votre-cle
                  </code>
                </div>
              )}
            </div>
          )}

          {!result && !loading && !error && (
            <div className="bg-slate-800/60 border border-slate-700/50 border-dashed rounded-xl h-full min-h-96 flex flex-col items-center justify-center text-center p-8">
              <BrainCircuit className="w-16 h-16 text-slate-600 mb-4" />
              <h3 className="text-slate-400 font-semibold text-lg">Prêt à analyser</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">
                Sélectionnez un territoire et un type d'analyse, puis cliquez sur "Générer".
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-500">
                {analysisTypes.map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-600" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl h-full min-h-96 flex flex-col items-center justify-center text-center p-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-green-500/30 animate-ping" />
              </div>
              <h3 className="text-slate-300 font-semibold text-lg mt-6">Claude analyse le territoire...</h3>
              <p className="text-slate-500 text-sm mt-2">
                {territoire?.nom} · {analysisTypes.find(t => t.key === analysisType)?.label}
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-6 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
                  />
                ))}
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
              {/* Result header */}
              <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold text-sm">
                      {analysisTypes.find(t => t.key === (result.type || analysisType))?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>📍 {result.territoire}</span>
                    <span>·</span>
                    <span>🤖 Claude Opus 4.6</span>
                    <span>·</span>
                    <span>{result.tokens_used?.toLocaleString('fr-FR') || '—'} tokens</span>
                    <span>·</span>
                    <span>{new Date(result.date_generation).toLocaleTimeString('fr-FR')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                  <button
                    onClick={generateAnalysis}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Regénérer
                  </button>
                </div>
              </div>

              {/* Result content */}
              <div className="p-6 overflow-y-auto max-h-[65vh]">
                <div
                  className="prose-ai text-slate-300 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: 'inherit' }}
                >
                  {result.contenu.split('\n').map((line, i) => {
                    if (!line.trim()) return <br key={i} />;
                    if (/^\d+\.\s+[A-ZÀ-Ö].+/.test(line.trim())) {
                      return (
                        <h3 key={i} className="text-green-400 font-bold text-sm mt-4 mb-1.5 uppercase tracking-wide">
                          {line}
                        </h3>
                      );
                    }
                    if (/^[-–•★]\s+/.test(line.trim())) {
                      return (
                        <div key={i} className="flex gap-2 my-1">
                          <span className="text-green-500 flex-shrink-0 mt-0.5">→</span>
                          <span className="text-slate-300 text-sm">{line.replace(/^[-–•★]\s+/, '')}</span>
                        </div>
                      );
                    }
                    if (line.startsWith('SCÉNARIO') || line.startsWith('SCENARIO')) {
                      return (
                        <h2 key={i} className="text-blue-400 font-bold text-base mt-6 mb-2 border-b border-blue-500/20 pb-1">
                          {line}
                        </h2>
                      );
                    }
                    return <p key={i} className="text-slate-300 text-sm mb-1">{line}</p>;
                  })}
                </div>
              </div>

              {/* Export footer */}
              <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/60 flex items-center justify-between">
                <span className="text-slate-500 text-xs">
                  Généré le {new Date(result.date_generation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="text-xs text-slate-600 italic">
                  Validation humaine recommandée avant diffusion
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
