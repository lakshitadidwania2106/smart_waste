export default function BinList({ bins, onEmptied }) {
  const statusLabel = (level) => {
    if (level >= 80) return { label: 'Critical', color: 'bg-red-50 text-red-600' }
    if (level >= 60) return { label: 'High', color: 'bg-amber-50 text-amber-700' }
    return { label: 'OK', color: 'bg-primary-50 text-primary-700' }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bins.map((bin) => (
        <div
          key={bin.id}
          className="glass-card rounded-2xl border border-slate-100 p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Bin ID</p>
              <p className="text-lg font-semibold text-slate-800">{bin.id}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {bin.location}
              </span>
              <span
                className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusLabel(bin.fillLevel).color}`}
              >
                {statusLabel(bin.fillLevel).label}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Fill level</span>
              <span className="font-semibold text-slate-800">
                {bin.fillLevel}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full ${bin.fillLevel >= 80 ? 'bg-red-400' : 'bg-primary-500'}`}
                style={{ width: `${bin.fillLevel}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onEmptied(bin.id)}
            className="mt-auto inline-flex items-center justify-center rounded-xl bg-ocean-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-ocean-600"
          >
            Mark as Emptied
          </button>
        </div>
      ))}
    </div>
  )
}

