const tiers = [
  { label: 'Bronze', min: 0, max: 49, color: 'bg-amber-100 text-amber-700' },
  { label: 'Silver', min: 50, max: 79, color: 'bg-slate-200 text-slate-800' },
  { label: 'Gold', min: 80, max: 100, color: 'bg-yellow-100 text-yellow-700' },
]

export default function ScoreBadge({ score }) {
  const tier = tiers.find((t) => score >= t.min && score <= t.max) || tiers[0]
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tier.color}`}>
      {tier.label}
    </span>
  )
}

