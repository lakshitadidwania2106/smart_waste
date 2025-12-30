import { useEffect, useState } from 'react'
import { API } from '../api'
import { dummyData } from '../data/mockData'

// Helper function to map backend data to frontend format
const mapBinData = (backendBins) => {
  if (!Array.isArray(backendBins)) return []
  return backendBins.map((bin) => ({
    id: bin._id || bin.binCode || bin.id || `BIN-${bin._id}`,
    zoneId: bin.zoneId?.toString() || bin.zoneId || 'unknown',
    location: bin.location || 'Unknown Location',
    fillLevel: bin.fillLevel ?? 0,
    status: bin.status || 'Active',
    lastCollected: bin.lastCollected || new Date().toISOString(),
    wasteType: bin.wasteType || 'General',
  }))
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
  return backendFeedback.map((fb, index) => ({
    id: fb._id?.toString() || fb.id || index + 1,
    name: fb.customerId?.name || fb.name || 'Anonymous',
    zoneId: fb.binId?.zoneId?.toString() || fb.zoneId || 'unknown',
    rating: fb.rating ?? 5,
    message: fb.message || '',
    date: fb.createdAt || fb.date || new Date().toISOString().split('T')[0],
  }))
}

export function useDashboardData() {
  const [data, setData] = useState(dummyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        // Fetch data from backend API using the correct endpoints
        const [binsRes, zonesRes, feedbackRes] = await Promise.all([
          API.get('/api/admin/bins').catch((err) => {
            console.warn('Failed to fetch bins:', err)
            return { data: [] }
          }),
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

        // Map backend data to frontend format
        const bins = binsRes.data && binsRes.data.length > 0 
          ? mapBinData(binsRes.data) 
          : dummyData.bins
        
        const zones = zonesRes.data && zonesRes.data.length > 0 
          ? mapZoneData(zonesRes.data) 
          : dummyData.zones
        
        const feedback = feedbackRes.data && feedbackRes.data.length > 0 
          ? mapFeedbackData(feedbackRes.data) 
          : dummyData.feedback

        setData({
          bins,
          zones,
          feedback,
          worker: dummyData.worker, // Using dummy data for now as endpoint doesn't exist
          customer: dummyData.customer, // Using dummy data for now as endpoint doesn't exist
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
  }, [])

  return { data, setData, loading, error }
}
