'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Layers, TrendingUp, Leaf, AlertTriangle, Award } from 'lucide-react';
import { etablissements, indicateurs } from '@/lib/data';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const indicateursOptions = [
  { key: 'score_attractivite', label: 'Score attractivité', icon: TrendingUp },
  { key: 'indice_dynamisme', label: 'Dynamisme agricole', icon: Leaf },
  { key: 'score_vulnerabilite', label: 'Vulnérabilité territoriale', icon: AlertTriangle },
  { key: 'part_bio', label: 'Agriculture biologique', icon: Leaf },
];

const typeColors = {
  EPLEFPA: 'bg-green-500/20 text-green-300 border border-green-500/30',
  MFR:     'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  CFPPA:   'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  CNEAP:   'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30',
  CFA:     'bg-sky-500/20 text-sky-300 border border-sky-500/30',
  'Bachelor Agro': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
};

const MENTION_LABELS = {
  GAT:  'Génie agronomique et transitions',
  EAMA: 'Entreprendre, accompagner, manager',
  AAD:  'Alimentation et Agroalimentaire durables',
  ET:   'Élevage et transitions',
  STAF: 'Sciences et techniques agricoles',
  SRNA: 'Systèmes robotiques et numériques',
};

// ── Haversine distance (km) ───────────────────────────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Concurrence overlap score based on geographic distance ──
function concurrenceOverlap(km) {
  return Math.max(5, Math.min(95, Math.round(100 * Math.exp(-km / 200))));
}

export default function CartePage() {
  const [indicateurActif, setIndicateurActif] = useState('score_attractivite');
  const [selectedEtab, setSelectedEtab] = useState(null);
  const [filtreType, setFiltreType] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const etabFiltres = useMemo(() => {
    return etablissements.filter(e => {
      const matchType = filtreType === 'Tous'
        ? true
        : filtreType === 'Bachelor Agro'
          ? !!e.bachelor_agro
          : e.type === filtreType;
      const matchSearch = !searchTerm ||
        e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.departement.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filtreType, searchTerm]);

  const deptInfo = selectedEtab ? indicateurs[selectedEtab.code_departement] : null;

  // ── Concurrence territoriale ────────────────────────────────
  const concurrenceData = useMemo(() => {
    if (!selectedEtab?.bachelor_agro) return null;
    const mention = selectedEtab.bachelor_agro.mention;
    const concurrents = etablissements.filter(e =>
      e.bachelor_agro?.mention === mention && e.id !== selectedEtab.id
    );
    if (concurrents.length === 0) return null;
    const scores = concurrents.map(e => {
      const km = Math.round(haversine(selectedEtab.lat, selectedEtab.lng, e.lat, e.lng));
      const overlap = concurrenceOverlap(km);
      return { nom: e.nom, km, overlap };
    });
    scores.sort((a, b) => b.overlap - a.overlap);
    const maxOverlap = scores[0].overlap;
    const avgOverlap = Math.round(scores.reduce((s, x) => s + x.overlap, 0) / scores.length);
    const risque = maxOverlap >= 70 ? 'élevé' : maxOverlap >= 45 ? 'modéré' : 'faible';
    const risqueColor = maxOverlap >= 70 ? 'text-red-400' : maxOverlap >= 45 ? 'text-amber-400' : 'text-green-400';
    return { scores, maxOverlap, avgOverlap, risque, risqueColor, count: scores.length + 1 };
  }, [selectedEtab]);

  // ── Bachelor count (for display) ───────────────────────────
  const bachelorCount = useMemo(() =>
    etablissements.filter(e => e.bachelor_agro).length, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <div className="w-80 flex-shrink-0 bg-slate-900 border-r border-slate-700/50 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700/50">
          <h1 className="text-white font-bold text-lg">Carte Territoriale</h1>
          <p className="text-slate-400 text-xs mt-1">Établissements & indicateurs</p>
        </div>

        {/* Couche indicateur */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 text-sm font-medium">Couche indicateur</span>
          </div>
          <div className="space-y-1">
            {indicateursOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setIndicateurActif(opt.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  indicateurActif === opt.key
                    ? 'bg-green-600/20 text-green-300 border border-green-600/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Légende établissements */}
        <div className="p-4 border-b border-slate-700/50">
          <p className="text-slate-400 text-xs font-medium mb-2">Légende établissements</p>
          {[
            { type: 'EPLEFPA', label: 'EPLEFPA (public)', color: '#22c55e' },
            { type: 'MFR', label: 'MFR (privé)', color: '#3b82f6' },
            { type: 'CFPPA', label: 'CFPPA (public)', color: '#f59e0b' },
            { type: 'CNEAP', label: 'CNEAP (privé catholique)', color: '#e879f9' },
            { type: 'CFA', label: 'CFA (apprentissage)', color: '#38bdf8' },
          ].map(({ type, label, color }) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
          ))}
          {/* Bachelor Agro legend entry */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
            <span className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-orange-500/40" style={{ background: '#f97316' }} />
            <span className="text-orange-300 text-xs font-medium">🏅 Bachelor Agro ({bachelorCount} établissements)</span>
          </div>
          <div className="mt-1.5 space-y-0.5 pl-5">
            {[
              { code: 'GAT', label: 'Génie agronomique', color: '#22c55e' },
              { code: 'EAMA', label: 'Entreprendre & manager', color: '#f97316' },
              { code: 'AAD', label: 'Agroalimentaire durable', color: '#3b82f6' },
            ].map(m => (
              <div key={m.code} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: m.color }} />
                <span className="text-slate-500 text-xs">{m.code} — {m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filtre & recherche */}
        <div className="p-4 border-b border-slate-700/50 space-y-3">
          <input
            type="text"
            placeholder="Rechercher un établissement..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-green-500"
          />
          <div className="flex gap-1 flex-wrap">
            {['Tous', 'EPLEFPA', 'MFR', 'CFPPA', 'CNEAP', 'CFA'].map(type => (
              <button
                key={type}
                onClick={() => setFiltreType(type)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  filtreType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
            {/* Bachelor Agro filter button */}
            <button
              onClick={() => setFiltreType('Bachelor Agro')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${
                filtreType === 'Bachelor Agro'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20'
              }`}
            >
              🏅 Bachelor
            </button>
          </div>
          {filtreType === 'Bachelor Agro' && (
            <div className="text-xs text-orange-400/80 bg-orange-500/10 rounded-lg px-2 py-1.5 border border-orange-500/20">
              {etabFiltres.length} établissement{etabFiltres.length > 1 ? 's' : ''} accrédité{etabFiltres.length > 1 ? 's' : ''} Bachelor Agro
            </div>
          )}
        </div>

        {/* Liste établissements */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {etabFiltres.map(etab => (
            <button
              key={etab.id}
              onClick={() => setSelectedEtab(etab)}
              className={`w-full text-left rounded-lg p-3 transition-all border ${
                selectedEtab?.id === etab.id
                  ? 'bg-slate-700 border-green-500/40'
                  : 'bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{etab.nom}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{etab.departement}</p>
                </div>
                <div className="flex flex-col gap-1 items-end flex-shrink-0">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${typeColors[etab.type]}`}>
                    {etab.type}
                  </span>
                  {etab.bachelor_agro && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      🏅 {etab.bachelor_agro.mention}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex gap-3 text-xs text-slate-500">
                <span>👥 {etab.effectifs_total}</span>
                <span>📊 {etab.taux_remplissage}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Map area ─────────────────────────────────────────── */}
      <div className="flex-1 relative">
        <MapComponent
          etablissements={etabFiltres}
          selectedEtab={selectedEtab}
          indicateurActif={indicateurActif}
          onSelectEtablissement={setSelectedEtab}
          filtreType={filtreType}
        />

        {/* Scale legend overlay */}
        <div className="absolute bottom-8 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-3 z-10">
          <p className="text-slate-400 text-xs font-medium mb-2">Échelle indicateur</p>
          <div className="flex items-center gap-2">
            <div className="h-3 w-32 rounded" style={{ background: 'linear-gradient(to right, #ef4444, #f59e0b, #84cc16, #22c55e)' }} />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-xs text-red-400">Faible</span>
            <span className="text-xs text-green-400">Élevé</span>
          </div>
        </div>

        {/* ── Selected establishment panel ─────────────────── */}
        {selectedEtab && (
          <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 z-10 w-80 shadow-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${typeColors[selectedEtab.type]}`}>
                    {selectedEtab.type}
                  </span>
                  {selectedEtab.bachelor_agro && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      🏅 Bachelor {selectedEtab.bachelor_agro.mention}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm mt-2 leading-tight">{selectedEtab.nom}</h3>
                <p className="text-slate-400 text-xs mt-1">{selectedEtab.departement} · {selectedEtab.region}</p>
              </div>
              <button onClick={() => setSelectedEtab(null)} className="text-slate-500 hover:text-white ml-2 text-lg leading-none flex-shrink-0">×</button>
            </div>

            {/* Stats */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: 'Apprenants', value: selectedEtab.effectifs_total, unit: '' },
                { label: 'Remplissage', value: selectedEtab.taux_remplissage, unit: '%' },
                { label: 'Insertion', value: selectedEtab.taux_insertion, unit: '%' },
              ].map(({ label, value, unit }) => (
                <div key={label} className="bg-slate-800 rounded-lg p-2 text-center">
                  <div className="text-green-400 font-bold text-base">{value}{unit}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Territoire */}
            {deptInfo && (
              <div className="mt-3 border-t border-slate-700 pt-3">
                <p className="text-slate-400 text-xs font-medium mb-1">Territoire – {deptInfo.nom}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dynamisme</span>
                    <span className="text-green-400 font-semibold">{deptInfo.indice_dynamisme}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Attractivité</span>
                    <span className="text-blue-400 font-semibold">{deptInfo.score_attractivite}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Part BIO</span>
                    <span className="text-lime-400 font-semibold">{deptInfo.part_bio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vulnérabilité</span>
                    <span className="text-amber-400 font-semibold">{deptInfo.score_vulnerabilite}/10</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Concurrence territoriale Bachelor ─────────── */}
            {selectedEtab.bachelor_agro && (
              <div className="mt-3 border-t border-slate-700 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-3.5 h-3.5 text-orange-400" />
                  <p className="text-orange-400 text-xs font-bold">Bachelor Agro</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/25 rounded-lg p-2.5 text-xs mb-2">
                  <p className="text-orange-300 font-semibold text-xs">{selectedEtab.bachelor_agro.mention} — {selectedEtab.bachelor_agro.mention_label}</p>
                  {selectedEtab.bachelor_agro.consortium_label && (
                    <p className="text-slate-400 text-xs mt-1">📎 {selectedEtab.bachelor_agro.consortium_label}</p>
                  )}
                  <p className={`text-xs mt-1 ${selectedEtab.bachelor_agro.role === 'chef_file' ? 'text-green-400' : 'text-slate-400'}`}>
                    {selectedEtab.bachelor_agro.role === 'chef_file' ? '⭐ Chef de file' : '● Membre consortium'}
                  </p>
                </div>

                {concurrenceData ? (
                  <div>
                    <p className="text-slate-400 text-xs font-medium mb-1.5">Concurrence territoriale</p>
                    <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 text-xs">
                          {concurrenceData.count} établissements · mention {selectedEtab.bachelor_agro.mention}
                        </span>
                      </div>
                      <div className="space-y-1 mb-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Bassin partagé max</span>
                          <span className={concurrenceData.risqueColor + ' font-bold'}>{concurrenceData.maxOverlap}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Risque cannibalisation</span>
                          <span className={concurrenceData.risqueColor + ' font-semibold'}>{concurrenceData.risque}</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${concurrenceData.maxOverlap}%`,
                            background: concurrenceData.maxOverlap >= 70 ? '#ef4444' : concurrenceData.maxOverlap >= 45 ? '#f59e0b' : '#22c55e'
                          }}
                        />
                      </div>
                      {/* Top competitors */}
                      <div className="space-y-1 mt-2">
                        <p className="text-slate-500 text-xs font-medium">Établissements proches :</p>
                        {concurrenceData.scores.slice(0, 3).map((s, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 truncate max-w-[55%]">{s.nom}</span>
                            <span className="text-slate-500 flex-shrink-0">{s.km} km · <span className={concurrenceData.risqueColor}>{s.overlap}%</span></span>
                          </div>
                        ))}
                      </div>
                      {concurrenceData.maxOverlap >= 45 && (
                        <div className={`mt-2 text-xs rounded px-2 py-1 ${
                          concurrenceData.maxOverlap >= 70
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          ⚠️ {concurrenceData.maxOverlap >= 70
                            ? 'Risque élevé de cannibalisation des recrutements'
                            : 'Risque modéré – coordination recommandée'}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/25 rounded-lg p-2 text-xs text-green-400">
                    ✓ Pas de concurrent direct sur la mention {selectedEtab.bachelor_agro.mention}
                  </div>
                )}
              </div>
            )}

            {/* Formations */}
            <div className="mt-3 border-t border-slate-700 pt-3">
              <p className="text-slate-400 text-xs font-medium mb-1.5">Formations dispensées</p>
              <div className="space-y-1">
                {selectedEtab.formations.map((f, i) => (
                  <div
                    key={i}
                    className={`rounded px-2 py-1 text-xs ${
                      f.startsWith('Bachelor Agro')
                        ? 'bg-orange-500/15 text-orange-300 border border-orange-500/25'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {f.startsWith('Bachelor Agro') ? '🏅 ' : '• '}{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
