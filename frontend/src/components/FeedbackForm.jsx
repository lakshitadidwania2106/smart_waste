import { useState } from 'react'

export default function FeedbackForm({ onSubmit }) {
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(4)
  const [name, setName] = useState('Guest')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    onSubmit({ message, rating, name })
    setMessage('')
    setRating(4)
    setName('Guest')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl border border-slate-100 p-5 space-y-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Share Feedback
        </h3>
        <p className="text-sm text-slate-500">
          Help us place smarter bins and improve segregation
        </p>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Rating (1-5)
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-200"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-200"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Message</label>
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about bin placement, cleanliness, or signage..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-ocean-400 focus:outline-none focus:ring-1 focus:ring-ocean-200"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-primary-600"
      >
        Submit feedback
      </button>
    </form>
  )
}

