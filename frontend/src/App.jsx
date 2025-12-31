import { useMemo, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import AdminDashboard from './components/AdminDashboard'
import WorkerDashboard from './components/WorkerDashboard'
import CustomerDashboard from './components/CustomerDashboard'
import { useDashboardData } from './hooks/useDashboardData'
import LoginPage from './components/LoginPage'
import { API } from './api'

function App() {
  const [role, setRole] = useState('Admin')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userCredentials, setUserCredentials] = useState(null)
  const { data, setData, loading, error } = useDashboardData(userCredentials)
  const { bins = [], zones = [], feedback = [], worker = {}, customer = {} } = data || {}

  const workerBins = useMemo(() => {
    if (!Array.isArray(bins)) return []
    if (!worker?.zoneId) return bins // If no zoneId, return all bins (shouldn't happen but safe fallback)
    
    const normalizeId = (id) => {
      if (!id) return ''
      return id.toString().trim()
    }
    
    const workerZoneId = normalizeId(worker.zoneId)
    const filtered = bins.filter((b) => {
      const binZoneId = normalizeId(b.zoneId)
      return binZoneId === workerZoneId && binZoneId !== ''
    })
    
    // If no bins found, log for debugging
    if (filtered.length === 0 && bins.length > 0) {
      console.log('Worker bins filter - No matches found:', {
        workerZoneId,
        binZoneIds: bins.map(b => normalizeId(b.zoneId)),
        binsCount: bins.length
      })
    }
    
    return filtered
  }, [bins, worker?.zoneId])

  const handleEmptied = async (binId) => {
    try {
      // Call backend API to update bin
      await API.put(`/api/workers/bin/${binId}/empty`)
      
      // Update local state
      setData((prev) => ({
        ...prev,
        bins: (prev?.bins || []).map((b) =>
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
    } catch (err) {
      console.error('Failed to update bin:', err)
      // Still update UI optimistically
      setData((prev) => ({
        ...prev,
        bins: (prev?.bins || []).map((b) =>
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
  }

  const handleFeedbackSubmit = ({ message, rating, name }) => {
    const newEntry = {
      id: Date.now(),
      name: name || customer?.name || 'Customer',
      zoneId: customer?.zoneId || 'unknown',
      rating,
      message,
    }
    setData((prev) => ({ ...prev, feedback: [newEntry, ...(prev?.feedback || [])] }))
  }

  const handleLogin = ({ role: selectedRole, email }) => {
    setRole(selectedRole || 'Admin')
    setUserCredentials({ role: selectedRole || 'Admin', email: email || '' })
    setLoggedIn(true)
  }

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} defaultRole={role} />
  }

  const renderDashboard = () => {
    if (role === 'Worker') {
      return (
        <WorkerDashboard
          worker={worker}
          bins={workerBins}
          zoneName={zones.find((z) => z.id === worker?.zoneId)?.name || 'Unknown Zone'}
          onEmptied={handleEmptied}
        />
      )
    }

    if (role === 'Customer') {
      return (
        <CustomerDashboard
          customer={customer}
          bins={bins}
          zoneName={zones.find((z) => z.id === customer?.zoneId)?.name || 'Unknown Zone'}
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
