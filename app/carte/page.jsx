'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Layers, MapPin, TrendingUp, Users, Leaf, AlertTriangle, School } from 'lucide-react';
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
};

export default function CartePage() {
  const [indicateurActif, setIndicateurActif] = useState('score_attractivite');
  const [selectedEtab, setSelectedEtab] = useState(null);
  const [filtreType, setFiltreType] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const etabFiltres = useMemo(() => {
    return etablissements.filter(e => {
      const matchType = filtreType === 'Tous' || e.type === filtreType;
      const matchSearch = !searchTerm || e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.departement.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filtreType, searchTerm]);

  const deptInfo = selectedEtab ? indicateurs[selectedEtab.code_departement] : null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Sidebar controls */}
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

        {/* Légende */}
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
          </div>
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
                <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${typeColors[etab.type]}`}>
                  {etab.type}
                </span>
              </div>
              <div className="mt-2 flex gap-3 text-xs text-slate-500">
                <span>👥 {etab.effectifs_total}</span>
                <span>📊 {etab.taux_remplissage}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapComponent
          etablissements={etabFiltres}
          selectedEtab={selectedEtab}
          indicateurActif={indicateurActif}
          onSelectEtablissement={setSelectedEtab}
        />

        {/* Scale legend overlay */}
        <div className="absolute bottom-8 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-3 z-10">
          <p className="text-slate-400 text-xs font-medium mb-2">Échelle</p>
          <div className="flex items-center gap-2">
            <div className="h-3 w-32 rounded" style={{ background: 'linear-gradient(to right, #ef4444, #f59e0b, #84cc16, #22c55e)' }} />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-xs text-red-400">Faible</span>
            <span className="text-xs text-green-400">Élevé</span>
          </div>
        </div>

        {/* Selected etab panel */}
        {selectedEtab && deptInfo && (
          <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 z-10 w-72 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${typeColors[selectedEtab.type]}`}>
                  {selectedEtab.type}
                </span>
                <h3 className="text-white font-bold text-sm mt-2 leading-tight">{selectedEtab.nom}</h3>
                <p className="text-slate-400 text-xs mt-1">{selectedEtab.departement} · {selectedEtab.region}</p>
              </div>
              <button onClick={() => setSelectedEtab(null)} className="text-slate-500 hover:text-white ml-2 text-lg leading-none">×</button>
            </div>

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

            <div className="mt-3">
              <p className="text-slate-400 text-xs font-medium mb-1.5">Formations dispensées</p>
              <div className="space-y-1">
                {selectedEtab.formations.map((f, i) => (
                  <div key={i} className="bg-slate-800 rounded px-2 py-1 text-xs text-slate-300">• {f}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
