import { useEffect, useState } from 'react'
import axios from 'axios'
import { dummyData } from '../data/mockData'

const API_BASE =
  typeof import.meta !== 'undefined' && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : 'https://example.com/api'

export function useDashboardData() {
  const [data, setData] = useState(dummyData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        const [binsRes, zonesRes, feedbackRes, workerRes, customerRes] =
          await Promise.all([
            axios.get(`${API_BASE}/bins`),
            axios.get(`${API_BASE}/zones`),
            axios.get(`${API_BASE}/feedback`),
            axios.get(`${API_BASE}/workers/self`),
            axios.get(`${API_BASE}/customers/self`),
          ])

        if (!isMounted) return

        setData({
          bins: binsRes.data ?? dummyData.bins,
          zones: zonesRes.data ?? dummyData.zones,
          feedback: feedbackRes.data ?? dummyData.feedback,
          worker: workerRes.data ?? dummyData.worker,
          customer: customerRes.data ?? dummyData.customer,
        })
        setError(null)
      } catch (err) {
        if (!isMounted) return
        console.warn('API unavailable, using dummy data:', err?.message)
        setError('Connected to fallback data')
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

