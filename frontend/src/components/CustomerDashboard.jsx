import ScoreBadge from './ScoreBadge'
import FeedbackForm from './FeedbackForm'
import MapCard from './MapCard'

export default function CustomerDashboard({
  customer,
  bins,
  zoneName,
  onSubmitFeedback,
}) {
  const nearbyBins = bins
    .filter((b) => b.zoneId === customer.zoneId)
    .sort((a, b) => b.fillLevel - a.fillLevel)

  const scorePercent = Math.min(100, Math.max(0, customer.score))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl border border-slate-100 p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Your Zone
              </p>
              <h2 className="text-2xl font-semibold text-slate-800">
                {zoneName}
              </h2>
              <p className="text-sm text-slate-500">
                Nearest smart bins and their fill levels
              </p>
            </div>
            <ScoreBadge score={scorePercent} />
          </div>

          <div className="space-y-3">
            {nearbyBins.map((bin) => (
              <div
                key={bin.id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {bin.location}
                    </p>
                    <p className="text-xs text-slate-500">Bin ID: {bin.id}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {bin.fillLevel}% full
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div
                    className={`h-2 rounded-full ${bin.fillLevel >= 80 ? 'bg-red-400' : 'bg-primary-500'}`}
                    style={{ width: `${bin.fillLevel}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Recycle Score
              </p>
              <h3 className="text-3xl font-semibold text-slate-800">
                {scorePercent}%
              </h3>
              <p className="text-sm text-slate-500">Keep segregating waste correctly</p>
            </div>
            <ScoreBadge score={scorePercent} />
          </div>
          <div className="relative flex items-center justify-center">
            <div
              className="h-36 w-36 rounded-full bg-slate-100"
              style={{
                background: `conic-gradient(#21b580 ${scorePercent}%, #e5e7eb ${scorePercent}%)`,
              }}
            >
              <div className="m-4 h-28 w-28 rounded-full bg-white shadow-inner flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-slate-500">Bronze · Silver · Gold</div>
                  <div className="text-lg font-semibold text-slate-800">{scorePercent}</div>
                  <div className="text-xs text-slate-500">Points</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Bronze 0-49 · Silver 50-79 · Gold 80+
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeedbackForm onSubmit={onSubmitFeedback} />
        </div>
        <MapCard title="Nearby Bins Map" />
      </div>
    </div>
  )
}

