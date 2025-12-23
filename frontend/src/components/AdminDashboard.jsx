import StatCard from './StatCard'
import BinTable from './BinTable'
import ZoneAnalytics from './ZoneAnalytics'
import FeedbackTable from './FeedbackTable'
import WasteSegmentation from './WasteSegmentation'

export default function AdminDashboard({ bins, zones, feedback }) {
  const totalZones = zones.length
  const totalBins = bins.length
  const fullBins = bins.filter((b) => b.fillLevel >= 80).length
  const activeWorkers = 12

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Zones" value={totalZones} sublabel="Operational zones" trend={4} />
        <StatCard label="Total Bins" value={totalBins} sublabel="Smart IoT enabled" trend={9} />
        <StatCard label="Full Bins" value={fullBins} sublabel="Need service" trend={-3} />
        <StatCard label="Active Workers" value={activeWorkers} sublabel="On shift" trend={6} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <BinTable bins={bins} zones={zones} />
          <FeedbackTable feedback={feedback} zones={zones} />
        </div>
        <div className="space-y-6">
          <ZoneAnalytics bins={bins} zones={zones} />
          <WasteSegmentation />
        </div>
      </div>
    </div>
  )
}

