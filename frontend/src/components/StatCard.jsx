export default function StatCard({ label, value, sublabel, trend }) {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl border border-slate-100 p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-3xl font-semibold text-slate-800">{value}</div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-primary-50 text-primary-700' : 'bg-red-50 text-red-600'}`}
          >
            {trend > 0 ? '+' : ''}
            {trend}%
          </span>
        )}
      </div>
      {sublabel && <p className="mt-1 text-xs text-slate-500">{sublabel}</p>}
    </div>
  )
}

