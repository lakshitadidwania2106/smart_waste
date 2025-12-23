import { useMemo, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import AdminDashboard from './components/AdminDashboard'
import WorkerDashboard from './components/WorkerDashboard'
import CustomerDashboard from './components/CustomerDashboard'
import { useDashboardData } from './hooks/useDashboardData'

function App() {
  const [role, setRole] = useState('Admin')
  const { data, setData, loading, error } = useDashboardData()
  const { bins, zones, feedback, worker, customer } = data

  const workerBins = useMemo(
    () => bins.filter((b) => b.zoneId === worker.zoneId),
    [bins, worker.zoneId],
  )

  const handleEmptied = (binId) => {
    setData((prev) => ({
      ...prev,
      bins: prev.bins.map((b) =>
        b.id === binId
          ? {
              ...b,
              fillLevel: 0,
              status: 'Active',
              lastCollected: new Date().toISOString(),
            }
          : b,
      ),
    }))
  }

  const handleFeedbackSubmit = ({ message, rating, name }) => {
    const newEntry = {
      id: Date.now(),
      name: name || customer.name || 'Customer',
      zoneId: customer.zoneId,
      rating,
      message,
    }
    setData((prev) => ({ ...prev, feedback: [newEntry, ...prev.feedback] }))
  }

  const renderDashboard = () => {
    if (role === 'Worker') {
      return (
        <WorkerDashboard
          worker={worker}
          bins={workerBins}
          zoneName={zones.find((z) => z.id === worker.zoneId)?.name}
          onEmptied={handleEmptied}
        />
      )
    }

    if (role === 'Customer') {
      return (
        <CustomerDashboard
          customer={customer}
          bins={bins}
          zoneName={zones.find((z) => z.id === customer.zoneId)?.name}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )
    }

    return <AdminDashboard bins={bins} zones={zones} feedback={feedback} />
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="flex">
        <Sidebar active={role} onChange={setRole} />
        <main className="flex-1">
          <TopBar role={role} onChangeRole={setRole} />

          <div className="px-4 py-6 lg:px-8">
            {loading && (
              <div className="mb-4 rounded-xl bg-slate-900 text-white px-4 py-3 text-sm">
                Connecting to backend...
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-xl bg-amber-50 text-amber-800 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
