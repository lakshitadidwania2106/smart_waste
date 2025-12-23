export default function TopBar({ role, onChangeRole }) {
  const roles = ['Admin', 'Worker', 'Customer']

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-white/90 border-b border-slate-100 px-4 py-3 lg:px-8 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Smart Waste Segregation
        </p>
        <h1 className="text-xl font-semibold text-slate-800">
          {role} Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary-500 shadow-[0_0_0_6px_rgba(33,181,128,0.15)]" />
          <span className="text-sm text-slate-600">Live</span>
        </div>
        <div className="flex gap-2 rounded-full bg-slate-50 p-1">
          {roles.map((item) => (
            <button
              key={item}
              onClick={() => onChangeRole(item)}
              className={`px-3 py-1 text-sm rounded-full transition ${role === item ? 'bg-ocean-500 text-white shadow-md' : 'text-slate-600 hover:bg-white'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-3 rounded-full border border-slate-100 bg-white px-3 py-1">
          <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
            A
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-800">Admin</p>
            <p className="text-xs text-slate-500">College Demo</p>
          </div>
        </div>
      </div>
    </header>
  )
}

