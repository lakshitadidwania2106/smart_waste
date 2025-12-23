export default function MapCard({ title = 'Service Map' }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5 map-card">
      <div className="relative z-10">
        <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
          {title}
        </p>
        <h3 className="text-lg font-semibold text-slate-800">Live Bin Markers</h3>
      </div>
      <div className="relative mt-6 h-64 rounded-2xl border border-white/60 bg-white/40 overflow-hidden">
        <div className="map-pin green" style={{ top: '28%', left: '32%' }} />
        <div className="map-pin" style={{ top: '45%', left: '60%' }} />
        <div className="map-pin green" style={{ top: '62%', left: '48%' }} />
        <div className="map-pin" style={{ top: '72%', left: '28%' }} />
        <div className="map-pin green" style={{ top: '35%', left: '72%' }} />
      </div>
    </div>
  )
}

