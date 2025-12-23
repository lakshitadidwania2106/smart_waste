export default function FeedbackTable({ feedback, zones }) {
  const renderStars = (count) => '★★★★★'.slice(0, Math.max(1, Math.min(5, count)))

  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Feedback Management
          </h3>
          <p className="text-sm text-slate-500">
            Capture insights to improve segregation
          </p>
        </div>
        <span className="text-xs text-slate-500">
          {feedback.length} submissions
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-3 py-2 font-medium">Citizen</th>
              <th className="px-3 py-2 font-medium">Zone</th>
              <th className="px-3 py-2 font-medium">Rating</th>
              <th className="px-3 py-2 font-medium">Message</th>
              <th className="px-3 py-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feedback.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60">
                <td className="px-3 py-3 font-semibold text-slate-800">
                  {item.name}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {zones.find((z) => z.id === item.zoneId)?.name}
                </td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
                    {renderStars(item.rating)}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-600">{item.message}</td>
                <td className="px-3 py-3 text-slate-500">
                  {item.date
                    ? new Date(item.date).toLocaleDateString()
                    : 'Today'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

