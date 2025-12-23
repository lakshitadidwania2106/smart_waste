import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#21b580', '#176fec', '#f97316']

export default function WasteSegmentation() {
  const data = [
    { name: 'Wet', value: 50 },
    { name: 'Dry', value: 31 },
    { name: 'Other', value: 19 },
  ]

  return (
    <div className="glass-card rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Waste Segregation</h3>
          <p className="text-sm text-slate-500">Composition across city bins</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

