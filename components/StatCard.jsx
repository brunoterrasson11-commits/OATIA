import clsx from 'clsx';

export default function StatCard({ title, value, sub, icon: Icon, trend, trendLabel, color = 'green' }) {
  const colorMap = {
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400', value: 'text-green-300' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', value: 'text-blue-300' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', value: 'text-amber-300' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', value: 'text-purple-300' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400', value: 'text-red-300' },
  };
  const c = colorMap[color] || colorMap.green;

  return (
    <div className={clsx('rounded-xl border p-5 bg-slate-800/60 backdrop-blur-sm', c.border)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className={clsx('text-3xl font-bold mt-1', c.value)}>{value}</p>
          {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', c.bg)}>
            <Icon className={clsx('w-5 h-5', c.icon)} />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={clsx('text-xs font-semibold', trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-slate-400')}>
            {trend > 0 ? '▲' : trend < 0 ? '▼' : '●'} {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-slate-500 text-xs">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
