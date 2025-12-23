const navItems = [
  { key: 'Admin', label: 'Admin Dashboard', icon: '📊' },
  { key: 'Worker', label: 'Worker Dashboard', icon: '🧹' },
  { key: 'Customer', label: 'Customer Dashboard', icon: '🌍' },
]

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="hidden min-h-screen w-64 sidebar-gradient text-white lg:flex flex-col justify-between shadow-2xl">
      <div>
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl">
              ♻️
            </div>
            <div>
              <div className="text-lg font-semibold">Smart Waste</div>
              <p className="text-sm text-white/70">Segregation Suite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-3 ${active === item.key ? 'bg-white/15 text-white shadow-lg' : 'text-white/80 hover:bg-white/5'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-6 text-xs text-white/70 space-y-2">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="font-semibold text-white">Logout</div>
          <p>Return to portal</p>
        </div>
        <p>Design-first · Responsive · Tailwind + React</p>
      </div>
    </aside>
  )
}

