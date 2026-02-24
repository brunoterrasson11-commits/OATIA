'use client';

import { useState, useMemo } from 'react';
import {
  School, Users, Map, BrainCircuit, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, RefreshCw, BarChart2
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, ReferenceLine
} from 'recharts';
import StatCard from '@/components/StatCard';
import AlertCard from '@/components/AlertCard';
import { statsGlobales, alertes, evolutionEffectifs, typesFormations } from '@/lib/data';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'];

// ─── Tooltip personnalisé ─────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isProjection = payload[0]?.payload?.projection;
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-xs font-semibold mb-1">
          {label} {isProjection && <span className="text-purple-400 ml-1">(projection)</span>}
        </p>
        {payload.map((p, i) => (
          p.value !== undefined && p.value !== null && (
            <p key={i} style={{ color: p.color }} className="text-xs">
              {p.name} : {p.value?.toLocaleString('fr-FR')}
            </p>
          )
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [periode, setPeriode] = useState('10ans');

  const alertesRouge  = alertes.filter(a => a.niveau === 'rouge').length;
  const alertesOrange = alertes.filter(a => a.niveau === 'orange').length;

  // ── Calcul des projections à partir de la tendance historique ─────────────
  const projectionData = useMemo(() => {
    const last  = evolutionEffectifs[evolutionEffectifs.length - 1]; // 2024
    const first = evolutionEffectifs[0];                              // 2015
    const n = evolutionEffectifs.length - 1;                         // 9 ans

    const trendEff = (last.effectifs     - first.effectifs)     / n; // ≈ -1 111/an
    const trendBio = (last.bio           - first.bio)           / n; // ≈ +2 578/an
    const trendApp = (last.apprentissage - first.apprentissage)  / n; // ≈ +2 533/an

    // Point de jonction 2024 : clés historiques ET projections pour continuité visuelle
    const bridge = {
      ...last,
      effectifs_proj:     last.effectifs,
      bio_proj:           last.bio,
      apprentissage_proj: last.apprentissage,
      projection: false,
    };

    const projected = Array.from({ length: 12 }, (_, i) => ({
      annee: String(2025 + i),
      effectifs_proj:     Math.round(last.effectifs     + trendEff * (i + 1)),
      bio_proj:           Math.round(last.bio           + trendBio * (i + 1)),
      apprentissage_proj: Math.round(last.apprentissage + trendApp * (i + 1)),
      projection: true,
    }));

    return { bridge, projected };
  }, []);

  // ── Données selon la période sélectionnée ────────────────────────────────
  const data = useMemo(() => {
    if (periode === '5ans')       return evolutionEffectifs.slice(-5);
    if (periode === 'projection') return [...evolutionEffectifs.slice(0, -1), projectionData.bridge, ...projectionData.projected];
    return evolutionEffectifs; // '10ans'
  }, [periode, projectionData]);

  const lastEff = evolutionEffectifs[evolutionEffectifs.length - 1];
  const proj36  = projectionData.projected[11];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Vue d'ensemble nationale · Enseignement agricole français · Dernière mise à jour : {statsGlobales.derniere_maj}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors border border-slate-700">
          <RefreshCw className="w-4 h-4" /> Actualiser
        </button>
      </div>

      {/* Bannière alerte */}
      {alertesRouge > 0 && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">
            <span className="font-bold">{alertesRouge} alerte(s) rouge</span> et{' '}
            <span className="font-bold">{alertesOrange} alerte(s) orange</span> détectées.{' '}
            Des territoires nécessitent une attention immédiate.
          </p>
        </div>
      )}

      {/* KPI Cards – ligne 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Établissements couverts"
          value={statsGlobales.nb_etablissements_couverts.toString()}
          sub={`sur ~${statsGlobales.nb_etablissements} au total`}
          icon={School} color="green" trend={2.1} trendLabel="vs an dernier"
        />
        <StatCard
          title="Apprenants (national)"
          value={`${(statsGlobales.nb_apprenants_total / 1000).toFixed(0)}k`}
          sub="tous types de formations"
          icon={Users} color="blue" trend={statsGlobales.evolution_effectifs_5ans} trendLabel="en 5 ans"
        />
        <StatCard
          title="Départements analysés"
          value={statsGlobales.nb_departements_couverts.toString()}
          sub="avec indicateurs complets"
          icon={Map} color="purple"
        />
        <StatCard
          title="Diagnostics IA générés"
          value={statsGlobales.diagnostics_generes.toString()}
          sub={`${statsGlobales.rapports_produits} rapports produits`}
          icon={BrainCircuit} color="amber" trend={18} trendLabel="ce mois"
        />
      </div>

      {/* KPI Cards – ligne 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Taux de remplissage moyen"
          value={`${statsGlobales.taux_remplissage_moyen}%`}
          sub="objectif : 85%"
          icon={BarChart2} color="green"
        />
        <StatCard
          title="Taux d'insertion pro. moyen"
          value={`${statsGlobales.taux_insertion_moyen}%`}
          sub="6 mois après sortie"
          icon={CheckCircle2} color="blue"
        />
        <StatCard
          title="Alertes territoriales"
          value={`${alertesRouge + alertesOrange}`}
          sub={`${alertesRouge} rouge · ${alertesOrange} orange`}
          icon={AlertTriangle} color="red"
        />
        <StatCard
          title="Formations recensées"
          value={statsGlobales.nb_formations_recensees.toString()}
          sub="sur 20 départements"
          icon={TrendingUp} color="amber"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Évolution effectifs + projection */}
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white font-semibold text-base">Évolution des effectifs en formation</h2>
            <div className="flex gap-1.5">
              {[
                { key: '5ans',       label: '5 ans'       },
                { key: '10ans',      label: '10 ans'      },
                { key: 'projection', label: '↗ Proj. 2036' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPeriode(key)}
                  className={`text-xs px-3 py-1 rounded-md transition-colors ${
                    periode === key
                      ? key === 'projection' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Note projection */}
          {periode === 'projection' && (
            <p className="text-xs text-purple-400/80 mb-3 mt-1">
              Projection linéaire 2025–2036 calculée sur la tendance 2015–2024 (sources : DGER BND, Agreste, INSEE)
            </p>
          )}

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="annee" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />

              {/* Ligne de séparation historique/projection */}
              {periode === 'projection' && (
                <ReferenceLine
                  x="2024"
                  stroke="#6b7280"
                  strokeDasharray="4 2"
                  label={{ value: "Aujourd'hui", fill: '#6b7280', fontSize: 9, position: 'top' }}
                />
              )}

              {/* ── Courbes historiques ── */}
              <Line
                name="Total" type="monotone" dataKey="effectifs"
                stroke="#22c55e" strokeWidth={2.5} dot={false} connectNulls={false}
              />
              <Line
                name="Formation BIO" type="monotone" dataKey="bio"
                stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="4 2" connectNulls={false}
              />
              <Line
                name="Apprentissage" type="monotone" dataKey="apprentissage"
                stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 2" connectNulls={false}
              />

              {/* ── Courbes de projection ── */}
              {periode === 'projection' && (
                <>
                  <Line
                    name="Total (proj.)" type="monotone" dataKey="effectifs_proj"
                    stroke="#22c55e" strokeWidth={2} dot={false}
                    strokeDasharray="6 4" strokeOpacity={0.55} connectNulls={false}
                  />
                  <Line
                    name="BIO (proj.)" type="monotone" dataKey="bio_proj"
                    stroke="#3b82f6" strokeWidth={1.5} dot={false}
                    strokeDasharray="6 4" strokeOpacity={0.55} connectNulls={false}
                  />
                  <Line
                    name="Apprentissage (proj.)" type="monotone" dataKey="apprentissage_proj"
                    stroke="#f59e0b" strokeWidth={1.5} dot={false}
                    strokeDasharray="6 4" strokeOpacity={0.55} connectNulls={false}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>

          {/* Récap chiffres 2036 */}
          {periode === 'projection' && (
            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-slate-700 pt-3">
              {[
                {
                  label: 'Total 2036',
                  value: proj36.effectifs_proj.toLocaleString('fr-FR'),
                  color: 'text-green-400',
                  trend: Math.round(((proj36.effectifs_proj - lastEff.effectifs) / lastEff.effectifs) * 100),
                },
                {
                  label: 'BIO 2036',
                  value: proj36.bio_proj.toLocaleString('fr-FR'),
                  color: 'text-blue-400',
                  trend: Math.round(((proj36.bio_proj - lastEff.bio) / lastEff.bio) * 100),
                },
                {
                  label: 'Apprentissage 2036',
                  value: proj36.apprentissage_proj.toLocaleString('fr-FR'),
                  color: 'text-amber-400',
                  trend: Math.round(((proj36.apprentissage_proj - lastEff.apprentissage) / lastEff.apprentissage) * 100),
                },
              ].map(({ label, value, color, trend }) => (
                <div key={label} className="bg-slate-700/40 rounded-lg px-3 py-2 text-center">
                  <div className={`font-bold text-sm ${color}`}>{value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{label}</div>
                  <div className={`text-xs mt-0.5 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trend >= 0 ? '+' : ''}{trend}% vs 2024
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Répartition par type */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h2 className="text-white font-semibold text-base mb-4">Répartition par type de formation</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={typesFormations}
                dataKey="nb_apprenants"
                nameKey="nom"
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={80} paddingAngle={3}
              >
                {typesFormations.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${(v / 1000).toFixed(0)}k apprenants`, '']}
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {typesFormations.map((f, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-slate-400 text-xs truncate">{f.nom}</span>
                </div>
                <span className={`text-xs font-semibold ${f.evolution > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {f.evolution > 0 ? '+' : ''}{f.evolution}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apprenants par filière */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h2 className="text-white font-semibold text-base mb-4">Apprenants par filière de formation</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={typesFormations} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="nom" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="nb_apprenants" name="Apprenants" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alertes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Alertes territoriales actives</h2>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            {alertes.length} alertes détectées
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {alertes.map(alerte => (
            <AlertCard key={alerte.id} alerte={alerte} />
          ))}
        </div>
      </div>
    </div>
  );
}
