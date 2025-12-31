import { useEffect, useState } from 'react'
import { API } from '../api'
import { dummyData } from '../data/mockData'

// Helper function to map backend data to frontend format
const mapBinData = (backendBins) => {
  if (!Array.isArray(backendBins)) return []
  return backendBins.map((bin) => {
    // Handle zoneId - could be ObjectId, string, or populated object
    let zoneId = 'unknown'
    if (bin.zoneId) {
      if (typeof bin.zoneId === 'object' && bin.zoneId._id) {
        zoneId = bin.zoneId._id.toString()
      } else {
        zoneId = bin.zoneId.toString()
      }
    }
    
    return {
      id: bin._id?.toString() || bin.binCode || bin.id || `BIN-${bin._id}`,
      zoneId: zoneId,
      location: bin.location || 'Unknown Location',
      fillLevel: bin.fillLevel ?? 0,
      status: bin.status || 'Active',
      lastCollected: bin.lastCollected || new Date().toISOString(),
      wasteType: bin.wasteType || 'General',
    }
  })
}

const mapZoneData = (backendZones) => {
  if (!Array.isArray(backendZones)) return []
  return backendZones.map((zone) => ({
    id: zone._id?.toString() || zone.id || `zone-${zone._id}`,
    name: zone.zoneName || zone.name || 'Unknown Zone',
    households: zone.households || 0,
    description: zone.description || '',
  }))
}

const mapFeedbackData = (backendFeedback) => {
  if (!Array.isArray(backendFeedback)) return []
  return backendFeedback.map((fb, index) => {
    // Preserve the full feedback object with populated fields
    return {
      ...fb,
      id: fb._id?.toString() || fb.id || index + 1,
      name: fb.customerId?.name || fb.name || 'Anonymous',
      zoneId: fb.binId?.zoneId?._id?.toString() || fb.binId?.zoneId?.toString() || fb.zoneId?.toString() || fb.zoneId || 'unknown',
      rating: fb.rating ?? 5,
      message: fb.message || '',
      date: fb.createdAt || fb.date || new Date().toISOString().split('T')[0],
      customerId: fb.customerId, // Preserve for FeedbackTable
      binId: fb.binId, // Preserve for FeedbackTable
    }
  })
}

export function useDashboardData(userCredentials = null) {
  const [data, setData] = useState(dummyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        // Always fetch zones and feedback
        const [zonesRes, feedbackRes] = await Promise.all([
          API.get('/api/admin/zones').catch((err) => {
            console.warn('Failed to fetch zones:', err)
            return { data: [] }
          }),
          API.get('/api/admin/feedback').catch((err) => {
            console.warn('Failed to fetch feedback:', err)
            return { data: [] }
          }),
        ])

        if (!isMounted) return

        const zones = zonesRes.data && zonesRes.data.length > 0 
          ? mapZoneData(zonesRes.data) 
          : dummyData.zones
        
        const feedback = feedbackRes.data && feedbackRes.data.length > 0 
          ? mapFeedbackData(feedbackRes.data) 
          : dummyData.feedback

        // Fetch user-specific data based on role and email
        let userData = {}
        let bins = []

        if (userCredentials?.email && userCredentials?.role) {
          try {
            if (userCredentials.role === 'Customer') {
              // Fetch customer data
              const customerRes = await API.get(`/api/customers/by-email/${encodeURIComponent(userCredentials.email)}`)
              if (customerRes.data) {
                const customer = customerRes.data
                userData.customer = {
                  name: customer.name || 'Customer',
                  email: customer.email,
                  zoneId: customer.zoneId?._id?.toString() || customer.zoneId?.toString() || customer.zoneId,
                  score: customer.score || 0,
                  level: customer.level || 'Bronze'
                }
                
                // Fetch bins for customer's zone
                if (userData.customer.zoneId) {
                  const binsRes = await API.get(`/api/customers/bins/${userData.customer.zoneId}`).catch(() => ({ data: [] }))
                  bins = binsRes.data && binsRes.data.length > 0 ? mapBinData(binsRes.data) : []
                }
              }
            } else if (userCredentials.role === 'Worker') {
              // Fetch worker data
              const workerRes = await API.get(`/api/workers/by-email/${encodeURIComponent(userCredentials.email)}`)
              if (workerRes.data) {
                const worker = workerRes.data
                userData.worker = {
                  name: worker.name || 'Worker',
                  zoneId: worker.zoneId?._id?.toString() || worker.zoneId?.toString() || worker.zoneId,
                  shift: worker.shift || '06:00 - 14:00'
                }
                
                // Fetch bins for worker's zone
                if (userData.worker.zoneId) {
                  const binsRes = await API.get(`/api/workers/bins/${userData.worker.zoneId}`).catch(() => ({ data: [] }))
                  bins = binsRes.data && binsRes.data.length > 0 ? mapBinData(binsRes.data) : []
                }
              }
            } else {
              // Admin - fetch all bins
              const binsRes = await API.get('/api/admin/bins').catch(() => ({ data: [] }))
              bins = binsRes.data && binsRes.data.length > 0 ? mapBinData(binsRes.data) : dummyData.bins
            }
          } catch (userErr) {
            console.warn('Failed to fetch user data:', userErr)
            // Continue with default data
          }
        } else {
          // No credentials - fetch all bins for admin view
          const binsRes = await API.get('/api/admin/bins').catch(() => ({ data: [] }))
          bins = binsRes.data && binsRes.data.length > 0 ? mapBinData(binsRes.data) : dummyData.bins
        }

        // Log for debugging
        if (userCredentials?.role === 'Worker' || userCredentials?.role === 'Customer') {
          console.log('Dashboard data loaded:', {
            role: userCredentials.role,
            binsCount: bins.length,
            userZoneId: userCredentials.role === 'Worker' 
              ? userData.worker?.zoneId 
              : userData.customer?.zoneId,
            bins: bins.map(b => ({ id: b.id, zoneId: b.zoneId, location: b.location }))
          })
        }

        setData({
          bins: bins.length > 0 ? bins : dummyData.bins,
          zones,
          feedback,
          worker: userData.worker || dummyData.worker,
          customer: userData.customer || dummyData.customer,
        })
        setError(null)
      } catch (err) {
        if (!isMounted) return
        console.error('Failed to connect to backend:', err?.message)
        console.error('Error details:', err)
        setError('Failed to connect to backend. Using fallback data.')
        // Keep dummy data on error
        setData(dummyData)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [userCredentials?.email, userCredentials?.role])

  return { data, setData, loading, error }
}
