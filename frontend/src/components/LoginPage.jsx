import { useState } from 'react'

const roles = ['Admin', 'Worker', 'Customer']

export default function LoginPage({ onLogin, defaultRole = 'Admin' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(defaultRole)
  const [remember, setRemember] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ email, password, role, remember })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-login overflow-hidden">
      <div className="floating-circle circle-1" />
      <div className="floating-circle circle-2" />
      <div className="floating-circle circle-3" />

      <div className="glass-card relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl">
        <div className="mx-auto mb-6 flex w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 text-2xl">
          ♻️
        </div>
        <h1 className="text-center text-2xl font-semibold text-slate-800">
          Smart Waste
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Sign in to manage bins and recycling scores
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
            {roles.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  role === r
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100">
              <span className="text-slate-400">✉️</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100">
              <span className="text-slate-400">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-primary-700 font-semibold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-primary-500 to-ocean-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Login as {role}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <span className="font-semibold text-primary-700">Sign Up</span>
        </p>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          By continuing you agree to our Privacy Policy & Terms of Service.
        </p>
      </div>
    </div>
  )
}

