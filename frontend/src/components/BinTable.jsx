function StatusBadge({ status, fillLevel }) {
  const isFull = status === 'Full' || fillLevel >= 80
  const color = isFull ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-700'
  const label = isFull ? 'Full' : 'Active'
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {label}
    </span>
  )
}

export default function BinTable({ bins, zones }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Smart Bins</h3>
          <p className="text-sm text-slate-500">
            Live bin health across all service zones
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Showing {bins.length} bins
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-3 py-2 font-medium">Bin ID</th>
              <th className="px-3 py-2 font-medium">Zone</th>
              <th className="px-3 py-2 font-medium">Location</th>
              <th className="px-3 py-2 font-medium">Fill</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Last Collected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bins.map((bin) => {
              const zoneName = zones.find((z) => z.id === bin.zoneId)?.name
              return (
                <tr key={bin.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 font-semibold text-slate-800">
                    {bin.id}
                  </td>
                  <td className="px-3 py-3 text-slate-700">{zoneName}</td>
                  <td className="px-3 py-3 text-slate-600">{bin.location}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-slate-100">
                        <div
                          className={`h-2 rounded-full ${bin.fillLevel >= 80 ? 'bg-red-400' : 'bg-primary-500'}`}
                          style={{ width: `${bin.fillLevel}%` }}
                        />
                      </div>
                      <span className="text-slate-700">{bin.fillLevel}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={bin.status} fillLevel={bin.fillLevel} />
                  </td>
                  <td className="px-3 py-3 text-slate-500">
                    {new Date(bin.lastCollected).toLocaleString()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

