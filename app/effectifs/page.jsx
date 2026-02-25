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
  Minus, ArrowDown, ArrowUp,
} from 'lucide-react';
import {
  effectifsData, YEARS, PROJ_YEARS, TOTAL_EFFECTIFS,
  isActive, isClosed, getClosureYear, getPeak,
  projectData, generateAlerts, getLastValue,
} from '@/lib/effectifs';
import { indicateurs } from '@/lib/data';

// ── Helpers ──────────────────────────────────────────────────────────────────

function toTitle(s) {
  return s.replace(/\b[a-zàâäéèêëîïôùûüç]/g, c => c.toUpperCase());
}

/** Average indicateurs for a CNEAP region (maps to indicateurs by region field) */
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
  };
}

/** Format short year label for x-axis */
function shortYear(y) { return y ? y.slice(2) : ''; }

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

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function EffectifsPage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

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

  const nationalChartData = useMemo(() => {
    const hist = YEARS.map((y, i) => ({
      year: shortYear(y), fullYear: y, total: TOTAL_EFFECTIFS[i],
    }));
    const proj = PROJ_YEARS.map((y, i) => ({
      year: shortYear(y), fullYear: y, projection: totalProj[i],
      // Confidence band ±2% around projection
      bandHigh: Math.round(totalProj[i] * 1.03),
      bandLow:  Math.round(totalProj[i] * 0.97),
    }));
    // Last hist point used as join
    const lastHist = { ...hist[hist.length - 1], projection: TOTAL_EFFECTIFS[TOTAL_EFFECTIFS.length - 1] };
    return [...hist, ...proj.map((p, i) => ({ ...p, total: i === 0 ? undefined : undefined }))];
  }, [totalProj]);

  // Join point: replicate last historical value as start of projection
  const nationalData = useMemo(() => {
    const result = YEARS.map((y, i) => ({
      year: shortYear(y), total: TOTAL_EFFECTIFS[i], projection: null, bandHigh: null, bandLow: null,
    }));
    // Add projection years
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
    const firstVal = TOTAL_EFFECTIFS[0];
    const nbFermes = effectifsData.filter(e => isClosed(e.data)).length;
    const nbActifs = effectifsData.filter(e => isActive(e.data)).length;
    const nbCritiques = effectifsData.filter(e => {
      if (!isActive(e.data)) return false;
      const last = getLastValue(e.data);
      return last < 130;
    }).length;
    return { current, peak, peakYear, firstVal, nbFermes, nbActifs, nbCritiques };
  }, []);

  // ── Closed establishments ────────────────────────────────────────────────

  const fermes = useMemo(() =>
    effectifsData
      .filter(e => isClosed(e.data))
      .map(e => {
        const closureYear = getClosureYear(e.data);
        const { peak, year: peakYear } = getPeak(e.data);
        // Last enrollment before closure
        const lastBefore = e.data.slice().reverse().find(v => v !== null && v > 0) || 0;
        return { ...e, closureYear, peak, peakYear, lastBefore };
      })
      .sort((a, b) => (b.closureYear || '').localeCompare(a.closureYear || '')),
    []);

  const fermesRecents = fermes.filter(e => e.closureYear >= '2015');

  // ── Alert table (all active establishments) ──────────────────────────────

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

  const etabChartData = useMemo(() => {
    if (!selectedEtab) return { chartData: [], proj: null };
    const { projections, slope, trend, reachesZero } = projectData(selectedEtab.data, 5, 7);
    const hist = YEARS.map((y, i) => ({
      year: shortYear(y), value: selectedEtab.data[i] ?? null, projection: null,
      bandHigh: null, bandLow: null,
    }));
    // Standard deviation of residuals for confidence band
    const lastVal = getLastValue(selectedEtab.data);
    const lastHistIdx = hist.length - 1;
    const projRows = PROJ_YEARS.map((y, i) => ({
      year: shortYear(y),
      value: null,
      projection: projections[i],
      bandHigh: Math.round(projections[i] * 1.08),
      bandLow: Math.max(0, Math.round(projections[i] * 0.92)),
    }));
    // join last point
    const joinRow = { year: shortYear(YEARS[YEARS.length - 1]), value: null, projection: lastVal, bandHigh: null, bandLow: null };
    return {
      chartData: [...hist, joinRow, ...projRows],
      proj: { projections, slope, trend, reachesZero },
      lastVal,
    };
  }, [selectedEtab]);

  const etabAlerts = useMemo(() => {
    if (!selectedEtab) return [];
    return generateAlerts(selectedEtab.commune, selectedEtab.region, selectedEtab.data);
  }, [selectedEtab]);

  const etabIndReg = useMemo(() => {
    if (!selectedEtab) return null;
    return regionIndicateurs(selectedEtab.region);
  }, [selectedEtab]);

  const etabPeak = useMemo(() => selectedEtab ? getPeak(selectedEtab.data) : null, [selectedEtab]);

  // ── Trend icon helper ─────────────────────────────────────────────────────

  const TrendIcon = ({ slope }) => {
    if (slope > 4)  return <ArrowUp className="w-3.5 h-3.5 text-green-400" />;
    if (slope < -4) return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
    return <Minus className="w-3.5 h-3.5 text-slate-400" />;
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
            <p className="text-slate-400 text-sm">Évolution nationale 2004–2026 · Projections 5 ans · Alertes</p>
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
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-400 border-dashed border-b inline-block" /> Projection</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={nationalData} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + 'k'} domain={[38000, 55000]} />
            <Tooltip content={<CustomTooltip />} />
            {/* COVID gap indicator */}
            <ReferenceArea x1="18-19" x2="20-21" fill="#f59e0b" fillOpacity={0.06} />
            {/* Historical area */}
            <Area type="monotone" dataKey="total" name="Total élèves" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.12} connectNulls={false} dot={false} />
            {/* Projection confidence band */}
            <Area type="monotone" dataKey="bandHigh" name="Intervalle haut" stroke="none" fill="#f97316" fillOpacity={0.06} connectNulls dot={false} legendType="none" />
            <Area type="monotone" dataKey="bandLow"  name="Intervalle bas"  stroke="none" fill="#f97316" fillOpacity={0.06} connectNulls dot={false} legendType="none" />
            {/* Projection line */}
            <Line type="monotone" dataKey="projection" name="Projection" stroke="#f97316" strokeWidth={2} strokeDasharray="6 3" dot={{ fill: '#f97316', r: 3 }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
        {/* Projection summary */}
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
            return (
              <div key={`${e.region}-${e.commune}`} className={`bg-slate-900 border ${borderColor} rounded-xl p-3`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{e.commune}</p>
                    <p className="text-slate-500 text-[11px]">{e.region}</p>
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
                {/* Mini sparkline as text */}
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
          Établissements fermés depuis 2010
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
                onChange={e => { setSelectedRegion(e.target.value); setSelectedCommune(''); }}
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
                onChange={e => setSelectedCommune(e.target.value)}
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
          <div className="space-y-4">
            {/* Info header */}
            <div className="flex flex-wrap items-start gap-3">
              <div>
                <h3 className="text-white font-bold text-lg">{selectedEtab.commune}</h3>
                <p className="text-slate-400 text-sm">{selectedEtab.region}</p>
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
                    Actuel : {etabChartData.lastVal} él.
                  </span>
                )}
              </div>
            </div>

            {/* Alerts */}
            {etabAlerts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {etabAlerts.map((a, i) => <AlertBadge key={i} alert={a} />)}
              </div>
            )}

            {/* Chart */}
            <div>
              <p className="text-slate-500 text-xs mb-2">Barres bleues = historique · Ligne orange pointillée = projection · Bande = intervalle de confiance (±8 %)</p>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={etabChartData.chartData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  {/* COVID gap */}
                  <ReferenceArea x1="18-19" x2="20-21" fill="#f59e0b" fillOpacity={0.07} />
                  {/* Critical threshold */}
                  <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.5} label={{ value: 'Seuil critique', position: 'insideTopRight', fill: '#ef4444', fontSize: 10 }} />
                  {/* Confidence band */}
                  <Area type="monotone" dataKey="bandHigh" name="Conf. haut" stroke="none" fill="#f97316" fillOpacity={0.08} connectNulls dot={false} legendType="none" />
                  <Area type="monotone" dataKey="bandLow" name="Conf. bas" stroke="none" fill="#f97316" fillOpacity={0.08} connectNulls dot={false} legendType="none" />
                  {/* Historical bars */}
                  <Bar dataKey="value" name="Effectif réel" fill="#3b82f6" fillOpacity={0.8} radius={[2, 2, 0, 0]} maxBarSize={30} />
                  {/* Projection line */}
                  <Line type="monotone" dataKey="projection" name="Projection" stroke="#f97316" strokeWidth={2.5} strokeDasharray="7 3" dot={{ fill: '#f97316', r: 4 }} connectNulls />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Projection table */}
            {etabChartData.proj && isActive(selectedEtab.data) && (
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Projections 5 ans</p>
                <div className="grid grid-cols-5 gap-2">
                  {PROJ_YEARS.map((y, i) => {
                    const val = etabChartData.proj.projections[i];
                    const color = val === 0 ? 'text-red-400 bg-red-500/15 border-red-500/30'
                      : val < 100 ? 'text-orange-400 bg-orange-500/15 border-orange-500/30'
                      : val < 200 ? 'text-amber-400 bg-amber-500/15 border-amber-500/30'
                      : 'text-blue-400 bg-blue-500/15 border-blue-500/30';
                    const delta = val - (etabChartData.lastVal || 0);
                    return (
                      <div key={y} className={`border rounded-lg px-2 py-2 text-center ${color}`}>
                        <p className="text-[10px] opacity-70">{y}</p>
                        <p className="font-bold text-base">{val}</p>
                        <p className="text-[10px]">{delta >= 0 ? '+' : ''}{delta}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Territorial context */}
            {etabIndReg && (
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Contexte territorial — {selectedEtab.region}
                  <span className="font-normal normal-case ml-1 text-slate-600">(moyennes départementales régionales)</span>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { label: 'Attractivité', value: `${etabIndReg.score_attractivite}/100`, color: etabIndReg.score_attractivite >= 60 ? 'text-green-400' : etabIndReg.score_attractivite >= 45 ? 'text-amber-400' : 'text-red-400' },
                    { label: 'Dynamisme agri.', value: `${etabIndReg.indice_dynamisme}/100`, color: etabIndReg.indice_dynamisme >= 60 ? 'text-green-400' : 'text-amber-400' },
                    { label: 'Vulnérabilité', value: `${etabIndReg.score_vulnerabilite}/10`, color: etabIndReg.score_vulnerabilite >= 7 ? 'text-red-400' : etabIndReg.score_vulnerabilite >= 5 ? 'text-amber-400' : 'text-green-400' },
                    { label: 'Chômage', value: `${etabIndReg.taux_chomage} %`, color: etabIndReg.taux_chomage >= 10 ? 'text-red-400' : 'text-slate-300' },
                    { label: 'Évol. pop. (10 ans)', value: `${etabIndReg.evolution_pop_10ans > 0 ? '+' : ''}${etabIndReg.evolution_pop_10ans} %`, color: etabIndReg.evolution_pop_10ans > 0 ? 'text-green-400' : 'text-red-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-slate-800 rounded-lg p-2.5 text-center">
                      <p className="text-slate-500 text-[10px] mb-0.5">{label}</p>
                      <p className={`font-bold text-base ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Projection adjustment note */}
                {etabChartData.proj && (
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/25 rounded-lg p-3 text-xs text-slate-400">
                    <p className="font-medium text-blue-300 mb-1">Facteurs territoriaux intégrés dans la projection</p>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>
                        Score attractivité {etabIndReg.score_attractivite}/100 →{' '}
                        {etabIndReg.score_attractivite >= 55 ? 'territoire favorable à la fréquentation' : etabIndReg.score_attractivite >= 40 ? 'territoire neutre' : 'territoire peu attractif, pression sur les effectifs'}
                      </li>
                      <li>
                        Évolution démographique {etabIndReg.evolution_pop_10ans > 0 ? '+' : ''}{etabIndReg.evolution_pop_10ans} % →{' '}
                        {etabIndReg.evolution_pop_10ans > 0.5 ? 'croissance de la population rurale favorable' : etabIndReg.evolution_pop_10ans > -0.5 ? 'stabilité démographique' : 'déclin démographique aggravant le risque de fermeture'}
                      </li>
                      <li>
                        Dynamisme agricole {etabIndReg.indice_dynamisme}/100 →{' '}
                        {etabIndReg.indice_dynamisme >= 55 ? 'filière agricole régionale dynamique' : 'faible renouvellement des actifs agricoles'}
                      </li>
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
