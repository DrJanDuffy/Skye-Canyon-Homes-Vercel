import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { initWebVitals, trackPageView, trackTouchpoint } from '@/lib/analytics-2025'

export default function AnalyticsTracker() {
  const [location] = useLocation()

  useEffect(() => {
    // Initialize Core Web Vitals tracking
    initWebVitals()

    // Track initial page load
    trackPageView(location)

    // Track attribution from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const source = urlParams.get('utm_source') || urlParams.get('source') || 'direct'
    const medium = urlParams.get('utm_medium') || urlParams.get('medium') || 'none'
    const campaign = urlParams.get('utm_campaign') || urlParams.get('campaign')

    if (source !== 'direct') {
      trackTouchpoint(source, medium, campaign || undefined)
    }

    // Track engagement events
    const trackEngagement = () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollDepth > 75) {
        trackEvent('high_engagement', { scroll_depth: scrollDepth })
      }
    }

    const trackTimeOnPage = () => {
      const timeSpent = Date.now() - pageLoadTime
      if (timeSpent > 60000) { // 1 minute
        trackEvent('engaged_session', { time_on_page: timeSpent })
      }
    }

    const pageLoadTime = Date.now()
    
    window.addEventListener('scroll', trackEngagement, { passive: true })
    window.addEventListener('beforeunload', trackTimeOnPage)

    return () => {
      window.removeEventListener('scroll', trackEngagement)
      window.removeEventListener('beforeunload', trackTimeOnPage)
    }
  }, [])

  useEffect(() => {
    // Track page changes
    trackPageView(location)
  }, [location])

  return null // This component only handles tracking
}

// Helper function to track events (simplified interface)
function trackEvent(eventName: string, parameters: any = {}) {
  if (typeof window !== 'undefined') {
    import('@/lib/analytics-2025').then(({ trackEvent }) => {
      trackEvent(eventName, parameters)
    })
  }
}