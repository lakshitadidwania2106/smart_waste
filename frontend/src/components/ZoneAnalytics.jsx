import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ZoneAnalytics({ bins, zones }) {
  // Helper to normalize IDs for comparison
  const normalizeId = (id) => {
    if (!id) return ''
    return id.toString()
  }

  const data = zones.map((zone) => {
    const zoneId = normalizeId(zone.id || zone._id)
    const zoneBins = bins.filter((b) => {
      const binZoneId = normalizeId(b.zoneId)
      return binZoneId === zoneId
    })
    
    const avgFill =
      zoneBins.length > 0
        ? zoneBins.reduce((acc, b) => acc + (b.fillLevel || 0), 0) / zoneBins.length
        : 0
    const fullCount = zoneBins.filter((b) => (b.fillLevel || 0) >= 80).length
    
    return {
      zone: zone.name || zone.zoneName || 'Unknown Zone',
      avgFill: Math.round(avgFill),
      fullBins: fullCount,
    }
  }).filter(item => {
    // Keep zones that have bins or if it's the only zone
    return item.avgFill > 0 || item.fullBins > 0 || zones.length === 1
  })

  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Zone-wise Analytics
          </h3>
          <p className="text-sm text-slate-500">
            Average fill level and full-bin count
          </p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="zone" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgFill" name="Avg Fill %" fill="#21b580" radius={[6, 6, 0, 0]} />
            <Bar dataKey="fullBins" name="Full Bins" fill="#176fec" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

