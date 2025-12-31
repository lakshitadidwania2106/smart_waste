export default function MapCard({ title = 'Service Map', bins = [] }) {
  // Generate positions for bins on the map with better distribution
  const getBinPosition = (index, total) => {
    if (total === 0) return { top: '50%', left: '50%' }
    
    // Distribute bins across the map in a grid-like pattern
    const cols = Math.ceil(Math.sqrt(total))
    const rows = Math.ceil(total / cols)
    
    const row = Math.floor(index / cols)
    const col = index % cols
    
    // Add some randomness to make it look more natural
    const randomOffset = () => (Math.random() - 0.5) * 8
    
    const top = Math.max(10, Math.min(85, 15 + (row * (70 / Math.max(1, rows - 1))) + randomOffset()))
    const left = Math.max(10, Math.min(85, 15 + (col * (70 / Math.max(1, cols - 1))) + randomOffset()))
    
    return { top: `${top}%`, left: `${left}%` }
  }

  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5 map-card">
      <div className="relative z-10">
        <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
          {title}
        </p>
        <h3 className="text-lg font-semibold text-slate-800">
          Live Bin Markers {bins.length > 0 && `(${bins.length})`}
        </h3>
      </div>
      <div className="relative mt-6 h-64 rounded-2xl border border-white/60 bg-white/40 overflow-hidden">
        {bins.length > 0 ? (
          <>
            {bins.map((bin, index) => {
              const position = getBinPosition(index, bins.length)
              const isFull = (bin.fillLevel || 0) >= 80
              const fillLevel = bin.fillLevel || 0
              return (
                <div
                  key={bin.id || bin._id || index}
                  className={`map-pin ${isFull ? '' : 'green'}`}
                  style={{
                    ...position,
                    zIndex: 10,
                    cursor: 'pointer',
                  }}
                  title={`${bin.location || 'Unknown Location'} - ${fillLevel}% full`}
                />
              )
            })}
            {/* Add a legend */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-4 text-xs text-slate-600 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#21b580] border border-white"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#176fec] border border-white"></div>
                <span>Full (≥80%)</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            No bins available
          </div>
        )}
      </div>
    </div>
  )
}

