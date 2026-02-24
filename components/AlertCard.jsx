import clsx from 'clsx';

const niveauMap = {
  rouge: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500 text-white', dot: 'bg-red-500' },
  orange: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500 text-white', dot: 'bg-amber-500' },
  jaune: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', badge: 'bg-yellow-500 text-black', dot: 'bg-yellow-400' },
};

export default function AlertCard({ alerte }) {
  const n = niveauMap[alerte.niveau] || niveauMap.jaune;
  return (
    <div className={clsx('rounded-xl border p-4', n.bg, n.border)}>
      <div className="flex items-start gap-3">
        <div className={clsx('w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 animate-pulse', n.dot)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={clsx('text-xs font-bold px-2 py-0.5 rounded uppercase', n.badge)}>
              {alerte.niveau}
            </span>
            <span className="text-white font-semibold text-sm">{alerte.nom_territoire}</span>
          </div>
          <p className="text-slate-300 text-sm font-medium mt-1">{alerte.indicateur}</p>
          <p className="text-slate-400 text-xs mt-0.5">{alerte.valeur} · {alerte.ecart_moyenne}</p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">{alerte.analyse}</p>
          <div className="mt-2 bg-slate-700/50 rounded-lg px-3 py-2">
            <p className="text-xs text-slate-300"><span className="text-green-400 font-semibold">Action : </span>{alerte.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
