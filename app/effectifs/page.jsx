'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ReferenceArea,
} from 'recharts';
import {
  TrendingDown, TrendingUp, AlertTriangle, XCircle,
  Users, BarChart2, Info, ChevronDown, Building2,
  Minus, ArrowDown, ArrowUp, BookOpen, Briefcase, Sliders,
} from 'lucide-react';
import {
  effectifsData, YEARS, PROJ_YEARS, TOTAL_EFFECTIFS,
  isActive, isClosed, getClosureYear, getPeak,
  projectData, generateAlerts, getLastValue,
} from '@/lib/effectifs';
import { indicateurs } from '@/lib/data';
import { getFormations } from '@/lib/formations';
import {
  FORMATION_CATEGORIES,
  categorizeFormations,
  analyzeFormationTerritory,
} from '@/lib/formationAnalysis';

// ── Helpers ──────────────────────────────────────────────────────────────────

function shortYear(y) { return y ? y.slice(2) : ''; }

/** Average indicateurs for a CNEAP region */
function regionIndicateurs(regionName) {
  const depts = Object.values(indicateurs).filter(d => d.region === regionName);
  if (!depts.length) return null;
  const avg = (key) => Math.round(depts.reduce((s, d) => s + (d[key] || 0), 0) / depts.length * 10) / 10;
  return {
    score_attractivite: avg('score_attractivite'),
    indice_dynamisme: avg('indice_dynamisme'),
    score_vulnerabilite: avg('score_vulnerabilite'),
    taux_chomage: avg('taux_chomage'),
    evolution_pop_10ans: avg('evolution_pop_10ans'),
    part_bio: avg('part_bio'),
    part_exploitants_55plus: avg('part_exploitants_55plus'),
  };
}

// ── Formation–Territoire analysis ─────────────────────────────────────────────
// Fonctions importées depuis @/lib/formationAnalysis

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-300 font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name} : <strong>{p.value?.toLocaleString('fr-FR')}</strong>
        </p>
      ))}
    </div>
  );
}

// ── Alert Badge ───────────────────────────────────────────────────────────────

const LEVEL_STYLES = {
  critique:    { bg: 'bg-red-500/15 border-red-500/40 text-red-300',    icon: <XCircle className="w-3.5 h-3.5" /> },
  vigilance:   { bg: 'bg-orange-500/15 border-orange-500/40 text-orange-300', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  surveillance:{ bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300', icon: <TrendingDown className="w-3.5 h-3.5" /> },
};

function AlertBadge({ alert }) {
  const s = LEVEL_STYLES[alert.level] || LEVEL_STYLES.surveillance;
  return (
    <div className={`flex items-start gap-1.5 text-[11px] px-2 py-1 rounded border ${s.bg}`}>
      <span className="flex-shrink-0 mt-0.5">{s.icon}</span>
      <span>{alert.msg}</span>
    </div>
  );
}

// ── Scenario presets ──────────────────────────────────────────────────────────

const SCENARIO_PRESETS = [
  { label: 'Minimal',   formations: 0, visibilite: 10, partenariats: 10, alternance: 5  },
  { label: 'Modéré',    formations: 1, visibilite: 40, partenariats: 40, alternance: 30 },
  { label: 'Ambitieux', formations: 2, visibilite: 70, partenariats: 70, alternance: 60 },
  { label: 'Maximum',   formations: 5, visibilite: 100,partenariats: 100,alternance: 100},
];

// ── Scenario slider projection ────────────────────────────────────────────────

/**
 * Adjust base projection with scenario levers
 * @param {number[]} base         – raw projection from linear regression
 * @param {number}   formations   – nb of new formation types added (0-5)
 * @param {number}   visibilite   – communication effort 0-100
 * @param {number}   partenariats – territorial partnerships 0-100
 * @param {number}   alternance   – apprenticeship development 0-100
 */
function applyScenario(base, formations, visibilite, partenariats, alternance = 0) {
  // Each new formation type adds ~+1.5% compounded growth per year
  const formBoost = 1 + formations * 0.015;
  // Visibility / communication: up to +15% on enrollment
  const visBoost  = 1 + (visibilite   / 100) * 0.15;
  // Territorial partnerships (stages, alternance agreements): up to +10%
  const partBoost = 1 + (partenariats / 100) * 0.10;
  // Apprenticeship / alternance development: up to +12%
  const altBoost  = 1 + (alternance   / 100) * 0.12;
  return base.map((v, i) => {
    if (v === 0) return 0;
    return Math.round(v * Math.pow(formBoost, i + 1) * visBoost * partBoost * altBoost);
  });
}

/** Returns the maximum total boost % at 5 years */
function scenarioGainPercent(base, formations, visibilite, partenariats, alternance) {
  const scenario = applyScenario(base, formations, visibilite, partenariats, alternance);
  const last = scenario[scenario.length - 1];
  const baseLast = base[base.length - 1];
  if (!baseLast) return 0;
  return Math.round(((last - baseLast) / baseLast) * 100);
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function EffectifsPage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  // Scenario sliders
  const [sliderFormations,   setSliderFormations]   = useState(0);
  const [sliderVisibilite,   setSliderVisibilite]   = useState(0);
  const [sliderPartenariats, setSliderPartenariats] = useState(0);
  const [sliderAlternance,   setSliderAlternance]   = useState(0);

  // ── Derived data ─────────────────────────────────────────────────────────

  const regions = useMemo(() =>
    [...new Set(effectifsData.map(e => e.region))].sort(), []);

  const communesInRegion = useMemo(() => {
    if (!selectedRegion) return [];
    return effectifsData
      .filter(e => e.region === selectedRegion)
      .map(e => e.commune)
      .sort();
  }, [selectedRegion]);

  const selectedEtab = useMemo(() =>
    effectifsData.find(e => e.region === selectedRegion && e.commune === selectedCommune) || null,
    [selectedRegion, selectedCommune]);

  // ── National total chart data ─────────────────────────────────────────────

  const { projections: totalProj } = useMemo(() => projectData(TOTAL_EFFECTIFS, 5, 10), []);

  const nationalData = useMemo(() => {
    const result = YEARS.map((y, i) => ({
      year: shortYear(y), total: TOTAL_EFFECTIFS[i], projection: null, bandHigh: null, bandLow: null,
    }));
    const lastHist = { year: shortYear(YEARS[YEARS.length - 1]), total: null, projection: TOTAL_EFFECTIFS[TOTAL_EFFECTIFS.length - 1], bandHigh: null, bandLow: null };
    const projPoints = PROJ_YEARS.map((y, i) => ({
      year: shortYear(y),
      total: null,
      projection: totalProj[i],
      bandHigh: Math.round(totalProj[i] * 1.04),
      bandLow: Math.round(totalProj[i] * 0.96),
    }));
    return [...result, lastHist, ...projPoints];
  }, [totalProj]);

  // ── Key stats ────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const current = TOTAL_EFFECTIFS[TOTAL_EFFECTIFS.length - 1];
    const peak = Math.max(...TOTAL_EFFECTIFS);
    const peakYear = YEARS[TOTAL_EFFECTIFS.indexOf(peak)];
    const nbFermes = effectifsData.filter(e => isClosed(e.data)).length;
    return { current, peak, peakYear, nbFermes };
  }, []);

  // ── Closed establishments ────────────────────────────────────────────────

  const fermes = useMemo(() =>
    effectifsData
      .filter(e => isClosed(e.data))
      .map(e => {
        const closureYear = getClosureYear(e.data);
        const { peak } = getPeak(e.data);
        const lastBefore = e.data.slice().reverse().find(v => v !== null && v > 0) || 0;
        return { ...e, closureYear, peak, lastBefore };
      })
      .sort((a, b) => (b.closureYear || '').localeCompare(a.closureYear || '')),
    []);

  const fermesRecents = fermes.filter(e => e.closureYear >= '2015');

  // ── Alert table ──────────────────────────────────────────────────────────

  const alertsData = useMemo(() =>
    effectifsData
      .filter(e => isActive(e.data))
      .map(e => {
        const alerts = generateAlerts(e.commune, e.region, e.data);
        const last = getLastValue(e.data);
        const { slope, projections } = projectData(e.data);
        return { ...e, alerts, last, slope, projections };
      })
      .filter(e => e.alerts.length > 0)
      .sort((a, b) => {
        const severity = (alerts) => {
          if (alerts.some(a => a.level === 'critique')) return 0;
          if (alerts.some(a => a.level === 'vigilance')) return 1;
          return 2;
        };
        return severity(a.alerts) - severity(b.alerts) || a.last - b.last;
      }),
    []);

  // ── Individual establishment data ────────────────────────────────────────

  const etabFormations = useMemo(() => {
    if (!selectedEtab) return null;
    return getFormations(selectedEtab.commune);
  }, [selectedEtab]);

  const etabChartData = useMemo(() => {
    if (!selectedEtab) return { chartData: [], proj: null };
    const { projections, slope, trend, reachesZero } = projectData(selectedEtab.data, 5, 7);
    const hist = YEARS.map((y, i) => ({
      year: shortYear(y), value: selectedEtab.data[i] ?? null, projection: null,
      bandHigh: null, bandLow: null,
    }));
    const lastVal = getLastValue(selectedEtab.data);
    const projRows = PROJ_YEARS.map((y, i) => ({
      year: shortYear(y),
      value: null,
      projection: projections[i],
      bandHigh: Math.round(projections[i] * 1.08),
      bandLow: Math.max(0, Math.round(projections[i] * 0.92)),
    }));
    const joinRow = { year: shortYear(YEARS[YEARS.length - 1]), value: null, projection: lastVal, bandHigh: null, bandLow: null };
    return {
      chartData: [...hist, joinRow, ...projRows],
      proj: { projections, slope, trend, reachesZero },
      lastVal,
    };
  }, [selectedEtab]);

  // Scenario-adjusted projections
  const scenarioProj = useMemo(() => {
    if (!etabChartData.proj) return null;
    return applyScenario(
      etabChartData.proj.projections,
      sliderFormations,
      sliderVisibilite,
      sliderPartenariats,
      sliderAlternance,
    );
  }, [etabChartData.proj, sliderFormations, sliderVisibilite, sliderPartenariats, sliderAlternance]);

  // Chart data with scenario overlay
  const etabChartDataWithScenario = useMemo(() => {
    if (!etabChartData.chartData.length || !scenarioProj) return etabChartData.chartData;
    const hasScenario = sliderFormations > 0 || sliderVisibilite > 0 || sliderPartenariats > 0 || sliderAlternance > 0;
    if (!hasScenario) return etabChartData.chartData;
    // Replace projection years with scenario values
    const data = [...etabChartData.chartData];
    let projIdx = 0;
    return data.map(row => {
      if (row.projection !== null && projIdx < scenarioProj.length) {
        const scenVal = scenarioProj[projIdx++];
        return { ...row, scenario: scenVal };
      }
      // Join row
      if (row.value === null && row.projection !== null && projIdx === 0) {
        return { ...row, scenario: row.projection };
      }
      return row;
    });
  }, [etabChartData.chartData, scenarioProj, sliderFormations, sliderVisibilite, sliderPartenariats]);

  const etabAlerts = useMemo(() => {
    if (!selectedEtab) return [];
    return generateAlerts(selectedEtab.commune, selectedEtab.region, selectedEtab.data);
  }, [selectedEtab]);

  const etabIndReg = useMemo(() => {
    if (!selectedEtab) return null;
    return regionIndicateurs(selectedEtab.region);
  }, [selectedEtab]);

  const etabPeak = useMemo(() => selectedEtab ? getPeak(selectedEtab.data) : null, [selectedEtab]);

  const formationAnalysis = useMemo(() => {
    if (!etabFormations || !etabIndReg) return null;
    return analyzeFormationTerritory(etabFormations.formations, etabIndReg);
  }, [etabFormations, etabIndReg]);

  // ── Trend icon helper ─────────────────────────────────────────────────────

  const TrendIcon = ({ slope }) => {
    if (slope > 4)  return <ArrowUp className="w-3.5 h-3.5 text-green-400" />;
    if (slope < -4) return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
    return <Minus className="w-3.5 h-3.5 text-slate-400" />;
  };

  const hasScenario = sliderFormations > 0 || sliderVisibilite > 0 || sliderPartenariats > 0 || sliderAlternance > 0;

  const resetSliders = () => {
    setSliderFormations(0); setSliderVisibilite(0);
    setSliderPartenariats(0); setSliderAlternance(0);
  };

  const applyPreset = (p) => {
    setSliderFormations(p.formations); setSliderVisibilite(p.visibilite);
    setSliderPartenariats(p.partenariats); setSliderAlternance(p.alternance);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-950 p-6 space-y-8">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">Suivi des Effectifs CNEAP</h1>
            <p className="text-slate-400 text-sm">Évolution nationale 2004–2026 · Projections 5 ans · Alertes · Formations</p>
          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Effectif 2025-26',      value: stats.current.toLocaleString('fr-FR'), color: 'text-purple-400', icon: <Users className="w-4 h-4" /> },
          { label: `Pic (${shortYear(stats.peakYear)})`,   value: stats.peak.toLocaleString('fr-FR'), color: 'text-blue-400',   icon: <TrendingUp className="w-4 h-4" /> },
          { label: 'Baisse depuis le pic',  value: `-${Math.round((1 - stats.current / stats.peak) * 100)} %`, color: 'text-red-400',    icon: <TrendingDown className="w-4 h-4" /> },
          { label: 'Établissements fermés', value: stats.nbFermes,   color: 'text-orange-400', icon: <XCircle className="w-4 h-4" /> },
          { label: 'En vigilance / alerte', value: alertsData.length, color: 'text-amber-400',  icon: <AlertTriangle className="w-4 h-4" /> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="bg-slate-900 border border-slate-700/50 rounded-xl p-3">
            <div className={`flex items-center gap-1.5 ${color} mb-0.5`}>{icon}<span className="text-xs font-medium">{label}</span></div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* ── National chart ─────────────────────────────────────────── */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-base">Évolution nationale CNEAP</h2>
            <p className="text-slate-500 text-xs mt-0.5">Total élèves toutes filières · Zone orange = projection 2026→2031</p>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-400 inline-block" /> Historique</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-400 inline-block" /> Projection</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={nationalData} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + 'k'} domain={[38000, 55000]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceArea x1="18-19" x2="20-21" fill="#f59e0b" fillOpacity={0.06} />
            <Area type="monotone" dataKey="total" name="Total élèves" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.12} connectNulls={false} dot={false} />
            <Area type="monotone" dataKey="bandHigh" name="Conf. haut" stroke="none" fill="#f97316" fillOpacity={0.06} connectNulls dot={false} legendType="none" />
            <Area type="monotone" dataKey="bandLow"  name="Conf. bas"  stroke="none" fill="#f97316" fillOpacity={0.06} connectNulls dot={false} legendType="none" />
            <Line type="monotone" dataKey="projection" name="Projection" stroke="#f97316" strokeWidth={2} strokeDasharray="6 3" dot={{ fill: '#f97316', r: 3 }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {PROJ_YEARS.map((y, i) => (
            <div key={y} className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1.5 text-center">
              <p className="text-orange-400 text-[10px]">{y}</p>
              <p className="text-orange-300 font-bold text-sm">{totalProj[i]?.toLocaleString('fr-FR')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alertes ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Alertes décisionnelles
          <span className="ml-1 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-normal">{alertsData.length} établissements</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {alertsData.map((e) => {
            const maxLevel = e.alerts.some(a => a.level === 'critique') ? 'critique'
              : e.alerts.some(a => a.level === 'vigilance') ? 'vigilance' : 'surveillance';
            const borderColor = maxLevel === 'critique' ? 'border-red-500/40' : maxLevel === 'vigilance' ? 'border-orange-500/40' : 'border-amber-500/40';
            const badgeBg = maxLevel === 'critique' ? 'bg-red-500/15' : maxLevel === 'vigilance' ? 'bg-orange-500/15' : 'bg-amber-500/15';
            const { slope } = projectData(e.data);
            const etabF = getFormations(e.commune);
            return (
              <div key={`${e.region}-${e.commune}`} className={`bg-slate-900 border ${borderColor} rounded-xl p-3`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">
                      {etabF?.nom || e.commune}
                    </p>
                    <p className="text-slate-500 text-[11px]">{e.commune} · {e.region}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <TrendIcon slope={slope} />
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${badgeBg} ${maxLevel === 'critique' ? 'text-red-300' : maxLevel === 'vigilance' ? 'text-orange-300' : 'text-amber-300'}`}>
                      {e.last} él.
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {e.alerts.map((a, i) => <AlertBadge key={i} alert={a} />)}
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-slate-600 text-[10px]">Projection :</span>
                  {e.projections.slice(0, 3).map((v, i) => (
                    <span key={i} className={`text-[10px] font-semibold ${v === 0 ? 'text-red-400' : v < 100 ? 'text-orange-400' : 'text-slate-400'}`}>
                      {v}
                    </span>
                  ))}
                  <span className="text-slate-600 text-[10px]">→ …</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Fermetures récentes ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-400" />
          Établissements fermés depuis 2015
          <span className="ml-1 text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-normal">{fermesRecents.length} fermetures</span>
        </h2>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-0 text-[11px] text-slate-500 px-4 py-2 border-b border-slate-700/50 uppercase tracking-wide font-semibold">
            <span>Établissement</span><span>Région</span><span className="text-center">Fermeture</span><span className="text-right">Dernier effectif</span>
          </div>
          <div className="divide-y divide-slate-800">
            {fermesRecents.map((e) => (
              <div key={`${e.region}-${e.commune}`} className="grid grid-cols-4 gap-0 px-4 py-2.5 hover:bg-slate-800/40 transition-colors">
                <span className="text-white text-sm font-medium truncate">{e.commune}</span>
                <span className="text-slate-400 text-xs self-center truncate">{e.region}</span>
                <span className="text-red-400 text-xs font-semibold text-center self-center">{e.closureYear}</span>
                <span className="text-slate-300 text-xs text-right self-center">{e.lastBefore} él. <span className="text-slate-600">(pic {e.peak})</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Analyseur individuel ────────────────────────────────────── */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
        <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" />
          Analyse par établissement
        </h2>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Région CNEAP</label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={e => { setSelectedRegion(e.target.value); setSelectedCommune(''); setSliderFormations(0); setSliderVisibilite(0); setSliderPartenariats(0); setSliderAlternance(0); }}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500 appearance-none"
              >
                <option value="">— Choisir une région —</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Commune / Établissement</label>
            <div className="relative">
              <select
                value={selectedCommune}
                onChange={e => { setSelectedCommune(e.target.value); setSliderFormations(0); setSliderVisibilite(0); setSliderPartenariats(0); setSliderAlternance(0); }}
                disabled={!selectedRegion}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500 appearance-none disabled:opacity-40"
              >
                <option value="">— Choisir un établissement —</option>
                {communesInRegion.map(c => {
                  const etab = effectifsData.find(e => e.region === selectedRegion && e.commune === c);
                  const status = etab ? (isClosed(etab.data) ? ' ✗ fermé' : isActive(etab.data) ? '' : ' (données incomplètes)') : '';
                  return <option key={c} value={c}>{c}{status}</option>;
                })}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Chart + context */}
        {selectedEtab ? (
          <div className="space-y-5">
            {/* Info header */}
            <div className="flex flex-wrap items-start gap-3">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {etabFormations?.nom || selectedEtab.commune}
                </h3>
                <p className="text-slate-400 text-sm">{selectedEtab.commune} · {selectedEtab.region}
                  {etabFormations?.dept ? ` · ${etabFormations.dept}` : ''}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {isClosed(selectedEtab.data) ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">✗ Fermé ({getClosureYear(selectedEtab.data)})</span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">● Actif</span>
                )}
                {etabPeak && (
                  <span className="px-2.5 py-1 rounded-full text-xs bg-slate-700 text-slate-300 border border-slate-600">
                    Pic : {etabPeak.peak} él. ({shortYear(etabPeak.year)})
                  </span>
                )}
                {etabChartData.lastVal > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-xs bg-slate-700 text-slate-300 border border-slate-600">
                    2025-26 : {etabChartData.lastVal} él.
                  </span>
                )}
              </div>
            </div>

            {/* Enrollment alerts */}
            {etabAlerts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {etabAlerts.map((a, i) => <AlertBadge key={i} alert={a} />)}
              </div>
            )}

            {/* Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-xs">Barres bleues = historique · Ligne orange = projection · {hasScenario && <span className="text-green-400">Ligne verte = scénario simulé</span>}</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={etabChartDataWithScenario} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceArea x1="18-19" x2="20-21" fill="#f59e0b" fillOpacity={0.07} />
                  <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.5} label={{ value: 'Seuil critique', position: 'insideTopRight', fill: '#ef4444', fontSize: 10 }} />
                  <Area type="monotone" dataKey="bandHigh" name="Conf. haut" stroke="none" fill="#f97316" fillOpacity={0.08} connectNulls dot={false} legendType="none" />
                  <Area type="monotone" dataKey="bandLow" name="Conf. bas" stroke="none" fill="#f97316" fillOpacity={0.08} connectNulls dot={false} legendType="none" />
                  <Bar dataKey="value" name="Effectif réel" fill="#3b82f6" fillOpacity={0.8} radius={[2, 2, 0, 0]} maxBarSize={30} />
                  <Line type="monotone" dataKey="projection" name="Projection tendancielle" stroke="#f97316" strokeWidth={2.5} strokeDasharray="7 3" dot={{ fill: '#f97316', r: 4 }} connectNulls />
                  {hasScenario && (
                    <Line type="monotone" dataKey="scenario" name="Scénario simulé" stroke="#22c55e" strokeWidth={2.5} strokeDasharray="5 2" dot={{ fill: '#22c55e', r: 4 }} connectNulls />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Projection table */}
            {etabChartData.proj && isActive(selectedEtab.data) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Projection tendancielle</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {PROJ_YEARS.map((y, i) => {
                      const val = etabChartData.proj.projections[i];
                      const color = val === 0 ? 'text-red-400 bg-red-500/15 border-red-500/30'
                        : val < 100 ? 'text-orange-400 bg-orange-500/15 border-orange-500/30'
                        : val < 200 ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
                        : 'text-blue-400 bg-blue-500/15 border-blue-500/30';
                      const delta = val - (etabChartData.lastVal || 0);
                      return (
                        <div key={y} className={`border rounded-lg px-1.5 py-2 text-center ${color}`}>
                          <p className="text-[10px] opacity-70">{y}</p>
                          <p className="font-bold text-sm">{val}</p>
                          <p className="text-[10px]">{delta >= 0 ? '+' : ''}{delta}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {hasScenario && scenarioProj && (
                  <div>
                    <p className="text-green-400 text-xs font-semibold uppercase tracking-wide mb-2">Scénario simulé</p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {PROJ_YEARS.map((y, i) => {
                        const val = scenarioProj[i];
                        const base = etabChartData.proj.projections[i];
                        const gain = val - base;
                        return (
                          <div key={y} className="border rounded-lg px-1.5 py-2 text-center border-green-500/30 bg-green-500/10">
                            <p className="text-[10px] text-green-600">{y}</p>
                            <p className="font-bold text-sm text-green-400">{val}</p>
                            <p className="text-[10px] text-green-600">{gain >= 0 ? '+' : ''}{gain}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Scenario sliders ─────────────────────────────────────── */}
            {isActive(selectedEtab.data) && (
              <div className="border border-blue-500/25 bg-blue-500/5 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <h4 className="text-blue-300 font-semibold text-sm">Simulation de scénarios</h4>
                  <span className="text-slate-500 text-xs ml-1 hidden sm:inline">— Ajustez les leviers stratégiques</span>
                  {hasScenario && (
                    <button onClick={resetSliders}
                      className="ml-auto text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1">
                      ✕ Réinitialiser
                    </button>
                  )}
                </div>

                {/* Preset scenario buttons */}
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  <span className="text-slate-500 text-[10px] self-center mr-1">Scénario :</span>
                  {SCENARIO_PRESETS.map(p => {
                    const isActive2 = sliderFormations === p.formations && sliderVisibilite === p.visibilite &&
                      sliderPartenariats === p.partenariats && sliderAlternance === p.alternance;
                    return (
                      <button key={p.label} onClick={() => applyPreset(p)}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all font-medium ${
                          isActive2
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}>
                        {p.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  {/* 1. Nouvelles filières */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        Nouvelles filières de formation
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-300 bg-blue-500/15 border border-blue-500/25 rounded px-1.5 py-0.5">
                          +{(sliderFormations * 1.5 * 5).toFixed(0)}% max sur 5 ans
                        </span>
                        <span className="text-blue-400 font-bold text-sm min-w-[60px] text-right">
                          +{sliderFormations} filière{sliderFormations > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <input type="range" min="0" max="5" step="1" value={sliderFormations}
                      onChange={e => setSliderFormations(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-400" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>Aucune</span><span>+1</span><span>+2</span><span>+3</span><span>+4</span><span>+5 filières</span>
                    </div>
                    <p className="text-slate-600 text-[10px] mt-0.5">
                      Chaque nouvelle filière ajoute ~+1,5%/an (croissance compoundée). Exemple : ouvrir un BAC Pro SAPAT ou BTSA.
                    </p>
                  </div>

                  {/* 2. Visibilité */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                        Communication & visibilité
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-purple-300 bg-purple-500/15 border border-purple-500/25 rounded px-1.5 py-0.5">
                          +{Math.round(sliderVisibilite * 0.15)}% effectif
                        </span>
                        <span className="text-purple-400 font-bold text-sm min-w-[40px] text-right">{sliderVisibilite}%</span>
                      </div>
                    </div>
                    <input type="range" min="0" max="100" step="10" value={sliderVisibilite}
                      onChange={e => setSliderVisibilite(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>Minimal</span><span>Local</span><span>Régional</span><span>National</span>
                    </div>
                    <p className="text-slate-600 text-[10px] mt-0.5">
                      Salons, JPO, réseaux sociaux, relations lycées : jusqu'à +15% d'effectifs.
                    </p>
                  </div>

                  {/* 3. Partenariats */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-green-400" />
                        Partenariats entreprises & collectivités
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-green-300 bg-green-500/15 border border-green-500/25 rounded px-1.5 py-0.5">
                          +{Math.round(sliderPartenariats * 0.10)}% attractivité
                        </span>
                        <span className="text-green-400 font-bold text-sm min-w-[40px] text-right">{sliderPartenariats}%</span>
                      </div>
                    </div>
                    <input type="range" min="0" max="100" step="10" value={sliderPartenariats}
                      onChange={e => setSliderPartenariats(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-400" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>Aucun</span><span>Quelques conventions</span><span>Réseau dense</span>
                    </div>
                    <p className="text-slate-600 text-[10px] mt-0.5">
                      Stages garantis, maîtres de stage, insertion pro assurée : jusqu'à +10%.
                    </p>
                  </div>

                  {/* 4. Alternance */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        Développement de l'alternance
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-amber-300 bg-amber-500/15 border border-amber-500/25 rounded px-1.5 py-0.5">
                          +{Math.round(sliderAlternance * 0.12)}% effectif
                        </span>
                        <span className="text-amber-400 font-bold text-sm min-w-[40px] text-right">{sliderAlternance}%</span>
                      </div>
                    </div>
                    <input type="range" min="0" max="100" step="10" value={sliderAlternance}
                      onChange={e => setSliderAlternance(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                      <span>Aucune</span><span>Partielle</span><span>Développée</span><span>Intensive</span>
                    </div>
                    <p className="text-slate-600 text-[10px] mt-0.5">
                      Apprentissage, contrats pro, CFA partenaires : jusqu'à +12% d'effectifs supplémentaires.
                    </p>
                  </div>
                </div>

                {/* Live impact summary */}
                {hasScenario && scenarioProj && etabChartData.proj && (
                  <div className="mt-4 bg-green-500/10 border border-green-500/25 rounded-lg p-3">
                    <p className="text-green-400 text-xs font-semibold mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Impact projeté du scénario à 5 ans (2030-31)
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-slate-800/60 rounded-lg p-2">
                        <p className="text-slate-500 text-[10px]">Tendanciel</p>
                        <p className="text-orange-400 font-bold text-base">{etabChartData.proj.projections[4]}</p>
                        <p className="text-slate-600 text-[9px]">élèves</p>
                      </div>
                      <div className="bg-green-900/30 rounded-lg p-2 border border-green-500/20">
                        <p className="text-green-500 text-[10px]">Scénario</p>
                        <p className="text-green-400 font-bold text-base">{scenarioProj[4]}</p>
                        <p className="text-slate-600 text-[9px]">élèves</p>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-2">
                        <p className="text-slate-500 text-[10px]">Gain brut</p>
                        <p className="text-green-300 font-bold text-base">+{scenarioProj[4] - etabChartData.proj.projections[4]}</p>
                        <p className="text-slate-600 text-[9px]">élèves</p>
                      </div>
                      <div className="bg-slate-800/60 rounded-lg p-2">
                        <p className="text-slate-500 text-[10px]">Gain %</p>
                        <p className="text-green-300 font-bold text-base">
                          +{etabChartData.proj.projections[4] > 0
                            ? Math.round(((scenarioProj[4] - etabChartData.proj.projections[4]) / etabChartData.proj.projections[4]) * 100)
                            : 0}%
                        </p>
                        <p className="text-slate-600 text-[9px]">vs tendanciel</p>
                      </div>
                    </div>
                    {/* Lever contributions bar */}
                    <div className="mt-3 space-y-1.5">
                      <p className="text-slate-500 text-[10px] font-medium">Contribution de chaque levier :</p>
                      {[
                        { label: 'Nouvelles filières', value: sliderFormations * 1.5 * 5, color: 'bg-blue-500', max: 37.5 },
                        { label: 'Communication',      value: sliderVisibilite * 0.15,     color: 'bg-purple-500', max: 15 },
                        { label: 'Partenariats',       value: sliderPartenariats * 0.10,   color: 'bg-green-500', max: 10 },
                        { label: 'Alternance',         value: sliderAlternance * 0.12,     color: 'bg-amber-500', max: 12 },
                      ].map(lev => (
                        <div key={lev.label} className="flex items-center gap-2">
                          <span className="text-slate-500 text-[10px] w-24 flex-shrink-0">{lev.label}</span>
                          <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                            <div
                              className={`${lev.color} h-1.5 rounded-full transition-all duration-300`}
                              style={{ width: `${(lev.value / lev.max) * 100}%` }}
                            />
                          </div>
                          <span className="text-slate-400 text-[10px] w-10 text-right">+{lev.value.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Formations ─────────────────────────────────────────────── */}
            {etabFormations && (
              <div className="border-t border-slate-700 pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-fuchsia-400" />
                  <h4 className="text-white font-semibold text-sm">Formations dispensées</h4>
                  <span className="text-xs bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 px-2 py-0.5 rounded-full">
                    {etabFormations.formations.length} formations
                  </span>
                </div>

                {/* Category badges */}
                {(() => {
                  const cats = categorizeFormations(etabFormations.formations);
                  return cats.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {cats.map(c => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                          {FORMATION_CATEGORIES[c].label}
                        </span>
                      ))}
                    </div>
                  ) : null;
                })()}

                {/* Formation list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {etabFormations.formations.map((f, i) => {
                    const isBTS = /btsa?|bachelor|ingénieur|licence/i.test(f);
                    return (
                      <div key={i} className={`rounded px-2.5 py-1.5 text-xs ${
                        isBTS
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                          : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                      }`}>
                        {isBTS ? '🎓 ' : '• '}{f}
                      </div>
                    );
                  })}
                </div>

                {/* Formation–Territory analysis */}
                {formationAnalysis && (formationAnalysis.alerts.length > 0 || formationAnalysis.suggestions.length > 0) && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-slate-300 text-xs font-bold uppercase tracking-wide">Adéquation formations / territoire</p>
                      <span className="text-[10px] text-slate-600 ml-auto">Sources : France Travail · SSP Agreste · INSEE</span>
                    </div>

                    {/* Alertes */}
                    {formationAnalysis.alerts.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-red-400 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {formationAnalysis.alerts.length} inadéquation{formationAnalysis.alerts.length > 1 ? 's' : ''} détectée{formationAnalysis.alerts.length > 1 ? 's' : ''}
                        </p>
                        {formationAnalysis.alerts.map((a, i) => (
                          <div key={i} className="bg-red-500/10 border border-red-500/25 rounded-lg p-2.5 text-xs">
                            <div className="flex items-start gap-2 text-red-300 mb-1">
                              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                              <span className="font-medium">{a.msg}</span>
                            </div>
                            {a.detail && <p className="text-red-400/70 text-[10px] ml-5">{a.detail}</p>}
                            {a.source && <p className="text-slate-600 text-[10px] ml-5 mt-0.5">Source : {a.source}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Opportunités */}
                    {formationAnalysis.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-green-400 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> {formationAnalysis.suggestions.length} opportunité{formationAnalysis.suggestions.length > 1 ? 's' : ''} territoriale{formationAnalysis.suggestions.length > 1 ? 's' : ''}
                        </p>
                        {formationAnalysis.suggestions.map((s, i) => (
                          <div key={i} className="bg-green-500/10 border border-green-500/25 rounded-lg p-2.5 text-xs">
                            <div className="flex items-start gap-2 text-green-300 mb-1">
                              <TrendingUp className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                              <span className="font-medium">{s.msg}</span>
                            </div>
                            {s.detail && <p className="text-green-400/70 text-[10px] ml-5">{s.detail}</p>}
                            {s.source && <p className="text-slate-600 text-[10px] ml-5 mt-0.5">Source : {s.source}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* No issues → positive badge */}
                    {formationAnalysis.alerts.length === 0 && formationAnalysis.suggestions.length === 0 && (
                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-lg px-3 py-2 text-xs text-green-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Les formations sont bien adaptées au territoire — aucune inadéquation majeure détectée</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Territorial context ──────────────────────────────────── */}
            {etabIndReg && (
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Contexte territorial — {selectedEtab.region}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {[
                    { label: 'Attractivité', value: `${etabIndReg.score_attractivite}/100`, color: etabIndReg.score_attractivite >= 60 ? 'text-green-400' : etabIndReg.score_attractivite >= 45 ? 'text-amber-400' : 'text-red-400' },
                    { label: 'Dynamisme agri.', value: `${etabIndReg.indice_dynamisme}/100`, color: etabIndReg.indice_dynamisme >= 60 ? 'text-green-400' : 'text-amber-400' },
                    { label: 'Vulnérabilité', value: `${etabIndReg.score_vulnerabilite}/10`, color: etabIndReg.score_vulnerabilite >= 7 ? 'text-red-400' : etabIndReg.score_vulnerabilite >= 5 ? 'text-amber-400' : 'text-green-400' },
                    { label: 'Chômage', value: `${etabIndReg.taux_chomage} %`, color: etabIndReg.taux_chomage >= 10 ? 'text-red-400' : 'text-slate-300' },
                    { label: 'Évol. pop.', value: `${etabIndReg.evolution_pop_10ans > 0 ? '+' : ''}${etabIndReg.evolution_pop_10ans} %`, color: etabIndReg.evolution_pop_10ans > 0 ? 'text-green-400' : 'text-red-400' },
                    { label: 'Part bio', value: `${etabIndReg.part_bio} %`, color: etabIndReg.part_bio >= 15 ? 'text-lime-400' : 'text-slate-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-slate-800 rounded-lg p-2.5 text-center">
                      <p className="text-slate-500 text-[10px] mb-0.5">{label}</p>
                      <p className={`font-bold text-base ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
                {etabChartData.proj && (
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/25 rounded-lg p-3 text-xs text-slate-400">
                    <p className="font-medium text-blue-300 mb-1">Facteurs territoriaux intégrés dans la projection</p>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>Score attractivité {etabIndReg.score_attractivite}/100 → {etabIndReg.score_attractivite >= 55 ? 'territoire favorable à la fréquentation' : etabIndReg.score_attractivite >= 40 ? 'territoire neutre' : 'territoire peu attractif, pression sur les effectifs'}</li>
                      <li>Évolution démographique {etabIndReg.evolution_pop_10ans > 0 ? '+' : ''}{etabIndReg.evolution_pop_10ans} % → {etabIndReg.evolution_pop_10ans > 0.5 ? 'croissance favorable' : etabIndReg.evolution_pop_10ans > -0.5 ? 'stabilité démographique' : 'déclin démographique aggravant le risque'}</li>
                      <li>Dynamisme agricole {etabIndReg.indice_dynamisme}/100 → {etabIndReg.indice_dynamisme >= 55 ? 'filière régionale dynamique' : 'faible renouvellement des actifs agricoles'}</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-600">
            <Building2 className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">Sélectionnez une région puis un établissement</p>
          </div>
        )}
      </div>

    </div>
  );
}
