'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, GraduationCap, TrendingUp, TrendingDown, Users, BarChart2, Building2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { etablissements, indicateurs, typesFormations } from '@/lib/data';

const typeColors = {
  EPLEFPA: { bg: 'bg-green-500/15', text: 'text-green-300', border: 'border-green-500/30', dot: '#22c55e' },
  MFR: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/30', dot: '#3b82f6' },
  CFPPA: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30', dot: '#f59e0b' },
  CNEAP: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300', border: 'border-fuchsia-500/30', dot: '#e879f9' },
  CFA:   { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/30', dot: '#38bdf8' },
};

const statutColors = {
  'public': 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  'privé': 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-xs font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="text-xs">{p.name} : {p.value?.toLocaleString('fr-FR')}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FormationsPage() {
  const [search, setSearch] = useState('');
  const [filtreType, setFiltreType] = useState('Tous');
  const [filtreRegion, setFiltreRegion] = useState('Toutes');
  const [filtreStatut, setFiltreStatut] = useState('Tous');
  const [selectedEtab, setSelectedEtab] = useState(null);
  const [sortBy, setSortBy] = useState('effectifs_total');

  const regions = useMemo(() => ['Toutes', ...new Set(etablissements.map(e => e.region))], []);

  const etabFiltres = useMemo(() => {
    return etablissements
      .filter(e => {
        const matchSearch = !search || e.nom.toLowerCase().includes(search.toLowerCase()) ||
          e.departement.toLowerCase().includes(search.toLowerCase()) ||
          e.formations.some(f => f.toLowerCase().includes(search.toLowerCase()));
        const matchType = filtreType === 'Tous' || e.type === filtreType;
        const matchRegion = filtreRegion === 'Toutes' || e.region === filtreRegion;
        const matchStatut = filtreStatut === 'Tous' || e.statut === filtreStatut;
        return matchSearch && matchType && matchRegion && matchStatut;
      })
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [search, filtreType, filtreRegion, filtreStatut, sortBy]);

  const radarData = selectedEtab ? [
    { subject: 'Effectifs', A: (selectedEtab.effectifs_total / 700) * 100 },
    { subject: 'Remplissage', A: selectedEtab.taux_remplissage },
    { subject: 'Insertion', A: selectedEtab.taux_insertion },
    { subject: 'Formations', A: selectedEtab.formations.length * 20 },
    {
      subject: 'Dynamisme territ.',
      A: indicateurs[selectedEtab.code_departement]?.indice_dynamisme || 0
    },
  ] : [];

  const totalEffectifs = etabFiltres.reduce((s, e) => s + e.effectifs_total, 0);
  const moyRemplissage = etabFiltres.length > 0
    ? Math.round(etabFiltres.reduce((s, e) => s + e.taux_remplissage, 0) / etabFiltres.length)
    : 0;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Offre de Formation</h1>
        <p className="text-slate-400 mt-1 text-sm">
          {etablissements.length} établissements · {etabFiltres.length} affichés · {totalEffectifs.toLocaleString('fr-FR')} apprenants
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-white font-semibold text-sm mb-3">Effectifs par filière</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={typesFormations} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="nom" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} interval={0} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="nb_apprenants" name="Apprenants" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-white font-semibold text-sm mb-3">Évolution des filières (5 ans, en %)</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={typesFormations} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="nom" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} interval={0} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="evolution"
                name="Évolution %"
                radius={[4, 4, 0, 0]}
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, formation, département..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-green-500"
          />
        </div>

        {[
          { label: 'Type', value: filtreType, set: setFiltreType, opts: ['Tous', 'EPLEFPA', 'MFR', 'CFPPA', 'CNEAP', 'CFA'] },
          { label: 'Statut', value: filtreStatut, set: setFiltreStatut, opts: ['Tous', 'public', 'privé'] },
        ].map(({ label, value, set, opts }) => (
          <select
            key={label}
            value={value}
            onChange={e => set(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-green-500"
          >
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}

        <select
          value={filtreRegion}
          onChange={e => setFiltreRegion(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-green-500"
        >
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-green-500"
        >
          <option value="effectifs_total">Trier : Effectifs</option>
          <option value="taux_remplissage">Trier : Remplissage</option>
          <option value="taux_insertion">Trier : Insertion</option>
        </select>
      </div>

      {/* Summary row */}
      <div className="flex gap-4 text-sm">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-green-400" />
          <span className="text-slate-400">Total apprenants :</span>
          <span className="text-white font-bold">{totalEffectifs.toLocaleString('fr-FR')}</span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-400" />
          <span className="text-slate-400">Remplissage moyen :</span>
          <span className="text-white font-bold">{moyRemplissage}%</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Table */}
        <div className={`${selectedEtab ? 'flex-1' : 'w-full'} overflow-x-auto`}>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Établissement</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Région</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-medium">Effectifs</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-medium">Remplissage</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-medium">Insertion</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Formations</th>
                </tr>
              </thead>
              <tbody>
                {etabFiltres.map((etab, i) => {
                  const tc = typeColors[etab.type] || typeColors.EPLEFPA;
                  const isSelected = selectedEtab?.id === etab.id;
                  return (
                    <tr
                      key={etab.id}
                      onClick={() => setSelectedEtab(isSelected ? null : etab)}
                      className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-green-900/20' : i % 2 === 0 ? 'hover:bg-slate-700/40' : 'bg-slate-800/30 hover:bg-slate-700/40'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{etab.nom}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{etab.departement} · {etab.statut}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded border ${tc.bg} ${tc.text} ${tc.border}`}>
                          {etab.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-slate-400 text-xs">{etab.region}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-white font-semibold">{etab.effectifs_total}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${
                          etab.taux_remplissage >= 85 ? 'text-green-400' :
                          etab.taux_remplissage >= 70 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {etab.taux_remplissage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${
                          etab.taux_insertion >= 85 ? 'text-green-400' :
                          etab.taux_insertion >= 75 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {etab.taux_insertion}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <span className="text-slate-400 text-xs">{etab.formations.length} formations</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selectedEtab && (
          <div className="w-80 flex-shrink-0 space-y-4">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${typeColors[selectedEtab.type]?.bg} ${typeColors[selectedEtab.type]?.text} ${typeColors[selectedEtab.type]?.border}`}>
                  {selectedEtab.type}
                </span>
                <button onClick={() => setSelectedEtab(null)} className="text-slate-500 hover:text-white text-xl leading-none">×</button>
              </div>
              <h3 className="text-white font-bold text-sm leading-tight">{selectedEtab.nom}</h3>
              <p className="text-slate-400 text-xs mt-1">{selectedEtab.departement} · {selectedEtab.region}</p>
              <p className="text-slate-500 text-xs mt-0.5">UAI : {selectedEtab.uai} · {selectedEtab.statut}</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { l: 'Apprenants', v: selectedEtab.effectifs_total, c: 'text-green-400' },
                  { l: 'Remplissage', v: `${selectedEtab.taux_remplissage}%`, c: 'text-blue-400' },
                  { l: 'Insertion', v: `${selectedEtab.taux_insertion}%`, c: 'text-amber-400' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="bg-slate-700/60 rounded-lg p-2 text-center">
                    <div className={`font-bold text-sm ${c}`}>{v}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <ResponsiveContainer width="100%" height={160}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <Radar name="Établissement" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 border-t border-slate-700 pt-3">
                <p className="text-slate-400 text-xs font-medium mb-2">Formations dispensées</p>
                <div className="space-y-1.5">
                  {selectedEtab.formations.map((f, i) => (
                    <div key={i} className="bg-slate-700/40 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {indicateurs[selectedEtab.code_departement] && (
                <div className="mt-3 border-t border-slate-700 pt-3">
                  <p className="text-slate-400 text-xs font-medium mb-2">Contexte territorial</p>
                  <div className="space-y-1 text-xs">
                    {[
                      { label: 'Dynamisme agricole', value: `${indicateurs[selectedEtab.code_departement].indice_dynamisme}/100` },
                      { label: 'Attractivité', value: `${indicateurs[selectedEtab.code_departement].score_attractivite}/100` },
                      { label: 'Métiers en tension', value: indicateurs[selectedEtab.code_departement].metiers_tension.join(', ') },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span className="text-slate-500">{label} : </span>
                        <span className="text-slate-200">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
