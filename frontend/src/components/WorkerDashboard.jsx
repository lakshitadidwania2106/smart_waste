import BinList from './BinList'
import MapCard from './MapCard'

export default function WorkerDashboard({ worker, bins, zoneName, onEmptied }) {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl border border-slate-100 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Assigned Zone
          </p>
          <h2 className="text-2xl font-semibold text-slate-800">{zoneName}</h2>
          <p className="text-sm text-slate-500">
            Shift: {worker.shift} · Worker: {worker.name}
          </p>
        </div>
        <div className="rounded-xl bg-primary-50 px-4 py-2 text-sm text-primary-700 font-semibold">
          Priority: Keep bins below 70%
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BinList bins={bins} onEmptied={onEmptied} />
        </div>
        <MapCard title="Zone Map" />
      </div>
    </div>
  )
}

