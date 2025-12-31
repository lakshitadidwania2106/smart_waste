export default function FeedbackTable({ feedback, zones }) {
  const renderStars = (count) => '★★★★★'.slice(0, Math.max(1, Math.min(5, count)))

  // Helper to get customer name from feedback item
  const getCustomerName = (item) => {
    // Check if customerId is populated (object) or just an ID (string)
    if (item.customerId) {
      if (typeof item.customerId === 'object' && item.customerId.name) {
        return item.customerId.name
      }
      if (typeof item.customerId === 'string') {
        return 'Customer'
      }
    }
    // Fallback to item.name if available
    return item.name || 'Anonymous'
  }

  // Helper to get zone name
  const getZoneName = (item) => {
    // Check if binId is populated and has zoneId
    if (item.binId && typeof item.binId === 'object') {
      const zoneId = item.binId.zoneId?.toString() || item.binId.zoneId
      const zone = zones.find((z) => z.id === zoneId || z._id?.toString() === zoneId)
      if (zone) return zone.name || zone.zoneName
    }
    // Fallback to item.zoneId
    if (item.zoneId) {
      const zone = zones.find((z) => z.id === item.zoneId || z._id?.toString() === item.zoneId)
      return zone?.name || zone?.zoneName || ''
    }
    return ''
  }

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
              <th className="px-3 py-2 font-medium w-1/3">Message</th>
              <th className="px-3 py-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feedback.length > 0 ? (
              feedback.map((item) => {
                const message = item.message || ''
                return (
                  <tr key={item.id || item._id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-semibold text-slate-800">
                      {getCustomerName(item)}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {getZoneName(item)}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
                        {renderStars(item.rating || 5)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      <div 
                        className="break-words max-w-md" 
                        title={message || 'No message'}
                      >
                        {message || <span className="text-slate-400 italic">No message</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                      {item.date || item.createdAt
                        ? new Date(item.date || item.createdAt).toLocaleDateString()
                        : 'Today'}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-3 py-8 text-center text-slate-400">
                  No feedback submissions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

