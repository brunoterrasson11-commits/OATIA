'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { Layers, TrendingUp, Leaf, AlertTriangle, Award, ShoppingBag, Users, Briefcase } from 'lucide-react';
import { etablissements, indicateurs } from '@/lib/data';
import { getFormations, getFormationsByNom } from '@/lib/formations';
import { analyzeFormationTerritory, categorizeFormations, FORMATION_CATEGORIES } from '@/lib/formationAnalysis';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const indicateursOptions = [
  {
    key: 'score_attractivite',
    label: 'Score attractivité',
    icon: TrendingUp,
    note: 'Enrichi avec Vente + SAPAT',
  },
  {
    key: 'indice_dynamisme',
    label: 'Dynamisme agricole',
    icon: Leaf,
  },
  {
    key: 'score_vulnerabilite',
    label: 'Vulnérabilité territoriale',
    icon: AlertTriangle,
    note: 'Ajusté avec diversification filières',
  },
  {
    key: 'part_bio',
    label: 'Agriculture biologique',
    icon: Leaf,
  },
  {
    key: 'vente',
    label: 'Filière Vente & Commerce',
    icon: ShoppingBag,
    note: 'Source : France Travail domaine D',
    color: 'blue',
  },
  {
    key: 'sapat',
    label: 'Services aux personnes (SAPAT)',
    icon: Users,
    note: 'Source : France Travail domaine K',
    color: 'purple',
  },
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
      <div className="w-72 flex-shrink-0 bg-slate-900 border-r border-slate-700/50 flex flex-col overflow-hidden">

        {/* Header ── compact */}
        <div className="px-3 py-2.5 border-b border-slate-700/50 flex-shrink-0 flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-white font-bold text-sm leading-tight">Carte Territoriale</h1>
            <p className="text-slate-500 text-[10px]">Établissements & indicateurs</p>
          </div>
        </div>

        {/* Couche indicateur ── grille 2 colonnes */}
        <div className="px-3 py-2 border-b border-slate-700/50 flex-shrink-0">
          <p className="text-slate-500 text-[10px] uppercase tracking-wide font-semibold mb-1.5">Couche indicateur</p>
          <div className="grid grid-cols-2 gap-1">
            {indicateursOptions.map(opt => {
              const active = indicateurActif === opt.key;
              const accentClass = opt.color === 'blue'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30'
                : opt.color === 'purple'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                : 'bg-green-600/20 text-green-300 border border-green-600/30';
              const Icon = opt.icon;
              return (
                <button
                  key={opt.key}
                  onClick={() => setIndicateurActif(opt.key)}
                  title={opt.note || opt.label}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] transition-colors text-left leading-tight ${
                    active ? accentClass : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
          {/* Note de la couche active */}
          {indicateursOptions.find(o => o.key === indicateurActif)?.note && (
            <p className="text-slate-600 text-[10px] mt-1.5 px-0.5">
              ℹ {indicateursOptions.find(o => o.key === indicateurActif).note}
            </p>
          )}
        </div>

        {/* Légende ── 2 colonnes compactes */}
        <div className="px-3 py-2 border-b border-slate-700/50 flex-shrink-0">
          <p className="text-slate-500 text-[10px] uppercase tracking-wide font-semibold mb-1.5">Légende</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {[
              { label: 'EPLEFPA (public)',    color: '#22c55e' },
              { label: 'MFR (privé)',          color: '#3b82f6' },
              { label: 'CFPPA (public)',       color: '#f59e0b' },
              { label: 'CNEAP (catholique)',   color: '#e879f9' },
              { label: 'CFA (apprentissage)',  color: '#38bdf8' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-slate-400 text-[11px] truncate">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-orange-500/40" style={{ background: '#f97316' }} />
              <span className="text-orange-300 text-[11px]">🏅 Bachelor ({bachelorCount})</span>
            </div>
          </div>
        </div>

        {/* Filtre & recherche ── compact */}
        <div className="px-3 py-2 border-b border-slate-700/50 space-y-1.5 flex-shrink-0">
          <input
            type="text"
            placeholder="Rechercher un établissement..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-green-500"
          />
          <div className="flex gap-1 flex-wrap">
            {['Tous', 'EPLEFPA', 'MFR', 'CFPPA', 'CNEAP', 'CFA'].map(type => (
              <button
                key={type}
                onClick={() => setFiltreType(type)}
                className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                  filtreType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
            <button
              onClick={() => setFiltreType('Bachelor Agro')}
              className={`text-[11px] px-2 py-0.5 rounded transition-colors font-medium ${
                filtreType === 'Bachelor Agro'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20'
              }`}
            >
              🏅 Bachelor
            </button>
          </div>
          {filtreType === 'Bachelor Agro' && (
            <p className="text-[11px] text-orange-400/80 bg-orange-500/10 rounded px-2 py-1 border border-orange-500/20">
              {etabFiltres.length} établissement{etabFiltres.length > 1 ? 's' : ''} accrédité{etabFiltres.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Liste établissements ── scrollable */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 min-h-0">
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
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[11px] font-semibold truncate leading-tight">{etab.nom}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5 truncate">{etab.departement}</p>
                </div>
                <div className="flex flex-col gap-0.5 items-end flex-shrink-0">
                  <span className={`text-[10px] px-1.5 py-0 rounded ${typeColors[etab.type]}`}>
                    {etab.type}
                  </span>
                  {etab.bachelor_agro && (
                    <span className="text-[10px] px-1.5 py-0 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      🏅 {etab.bachelor_agro.mention}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-1 flex gap-3 text-[10px] text-slate-500">
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

            {/* Formations + Analyse territoire */}
            {(() => {
              // 1) Try commune extracted from adresse (format: "..., 12345 COMMUNE")
              const adresse = selectedEtab.adresse || '';
              const communeMatch = adresse.match(/\d{5}\s+(.+)$/);
              const commune = communeMatch ? communeMatch[1].trim() : null;
              let realFormations = commune ? getFormations(commune) : null;
              // 2) Fallback: try matching by establishment name
              if (!realFormations?.formations?.length && selectedEtab.nom) {
                realFormations = getFormationsByNom(selectedEtab.nom);
              }
              const formations = realFormations?.formations?.length
                ? realFormations.formations
                : selectedEtab.formations;
              const source = realFormations?.formations?.length ? 'CNEAP' : 'référentiel';

              // Formation-territory analysis (using dept indicators)
              const formAnalysis = deptInfo && formations?.length
                ? analyzeFormationTerritory(formations, deptInfo)
                : null;
              const cats = formations?.length ? categorizeFormations(formations) : [];

              return (
                <>
                  {/* Formations list */}
                  <div className="mt-3 border-t border-slate-700 pt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-slate-400 text-xs font-medium">Formations dispensées</p>
                      <span className="text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">
                        {formations.length} · source {source}
                      </span>
                    </div>

                    {/* Category chips */}
                    {cats.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {cats.map(c => (
                          <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-400 border border-slate-600/50">
                            {FORMATION_CATEGORIES[c].label}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-1 max-h-44 overflow-y-auto pr-0.5">
                      {formations.map((f, i) => {
                        const isBachelor = f.startsWith('Bachelor Agro') || f.includes('Bachelor');
                        const isBTS = /^BTSA?\s|^BTS\s/.test(f);
                        return (
                          <div
                            key={i}
                            className={`rounded px-2 py-1 text-xs ${
                              isBachelor
                                ? 'bg-orange-500/15 text-orange-300 border border-orange-500/25'
                                : isBTS
                                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {isBachelor ? '🏅 ' : isBTS ? '🎓 ' : '• '}{f}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Formation–Territory analysis */}
                  {formAnalysis && (formAnalysis.alerts.length > 0 || formAnalysis.suggestions.length > 0) && (
                    <div className="mt-3 border-t border-slate-700 pt-3 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <p className="text-slate-300 text-[11px] font-bold uppercase tracking-wide">Adéquation formations / territoire</p>
                      </div>

                      {formAnalysis.alerts.map((a, i) => (
                        <div key={`alert-${i}`} className="bg-red-500/10 border border-red-500/25 rounded-lg px-2.5 py-2 text-[11px]">
                          <div className="flex items-start gap-1.5 text-red-300 mb-0.5">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{a.msg}</span>
                          </div>
                          {a.detail && <p className="text-red-400/60 text-[10px] ml-4.5 leading-snug">{a.detail}</p>}
                          {a.source && <p className="text-slate-600 text-[10px] ml-4.5 mt-0.5">⬡ {a.source}</p>}
                        </div>
                      ))}

                      {formAnalysis.suggestions.map((s, i) => (
                        <div key={`sug-${i}`} className="bg-green-500/10 border border-green-500/25 rounded-lg px-2.5 py-2 text-[11px]">
                          <div className="flex items-start gap-1.5 text-green-300 mb-0.5">
                            <TrendingUp className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{s.msg}</span>
                          </div>
                          {s.detail && <p className="text-green-400/60 text-[10px] ml-4.5 leading-snug">{s.detail}</p>}
                          {s.source && <p className="text-slate-600 text-[10px] ml-4.5 mt-0.5">⬡ {s.source}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No issues */}
                  {formAnalysis && formAnalysis.alerts.length === 0 && formAnalysis.suggestions.length === 0 && (
                    <div className="mt-2 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-lg px-2.5 py-2 text-[11px] text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Formations bien adaptées au territoire</span>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
