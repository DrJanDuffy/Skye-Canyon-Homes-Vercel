import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

// Core Web Vitals monitoring
export function initWebVitals() {
  onCLS((metric: any) => trackMetric('CLS', metric))
  onFCP((metric: any) => trackMetric('FCP', metric))
  onINP((metric: any) => trackMetric('INP', metric))
  onLCP((metric: any) => trackMetric('LCP', metric))
  onTTFB((metric: any) => trackMetric('TTFB', metric))
}

// Enhanced event tracking
export function trackEvent(eventName: string, parameters: any = {}) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
      session_id: getSessionId(),
      user_journey_stage: getUserJourneyStage(),
    })
  }
  
  // Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        parameters,
        context: {
          url: window.location.href,
          referrer: document.referrer,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          device: getDeviceInfo(),
        }
      }),
      keepalive: true
    }).catch(() => {}) // Silent fail for analytics
  }
}

// Multi-touch attribution
export function trackTouchpoint(source: string, medium: string, campaign?: string) {
  if (typeof window === 'undefined') return null

  const touchpoint = {
    source,
    medium,
    campaign,
    timestamp: Date.now(),
    landingPage: window.location.pathname,
  }
  
  // Store in session storage for attribution
  const touchpoints = JSON.parse(
    sessionStorage.getItem('touchpoints') || '[]'
  )
  touchpoints.push(touchpoint)
  sessionStorage.setItem('touchpoints', JSON.stringify(touchpoints))
  
  return touchpoint
}

// Real estate specific tracking
export function trackPropertyInteraction(action: string, propertyId: string, details: any = {}) {
  trackEvent('property_interaction', {
    action,
    property_id: propertyId,
    property_type: details.type || 'unknown',
    property_price: details.price || 0,
    property_location: details.location || 'skye_canyon',
    interaction_type: action,
    ...details
  })
}

export function trackLeadGeneration(source: string, leadData: any) {
  trackEvent('lead_generation', {
    source,
    lead_quality: calculateLeadQuality(leadData),
    lead_type: leadData.type || 'inquiry',
    contact_method: leadData.communicationPreference || 'email',
    timeline: leadData.timeline || 'unknown',
    price_range: leadData.priceRange || 'unspecified'
  })
}

export function trackSearchBehavior(searchTerm: string, filters: any = {}) {
  trackEvent('property_search', {
    search_term: searchTerm,
    filters_applied: Object.keys(filters).length,
    price_min: filters.priceMin || 0,
    price_max: filters.priceMax || 0,
    property_type: filters.type || 'any',
    search_context: 'skye_canyon'
  })
}

export function trackVoiceInteraction(command: string, response: string) {
  trackEvent('voice_interaction', {
    command_type: categorizeVoiceCommand(command),
    command_text: command,
    response_provided: !!response,
    interaction_successful: !!response
  })
}

// User journey tracking
export function getUserJourneyStage(): string {
  if (typeof window === 'undefined') return 'unknown'
  
  const visited = JSON.parse(localStorage.getItem('visitedPages') || '[]')
  const currentPath = window.location.pathname
  
  if (visited.length === 0) return 'awareness'
  if (visited.includes('/properties') || visited.includes('/search')) return 'consideration'
  if (visited.includes('/contact') || visited.includes('/schedule')) return 'decision'
  if (currentPath.includes('/thank-you') || currentPath.includes('/confirmation')) return 'conversion'
  
  return 'engagement'
}

// Attribution and conversion tracking
export function trackConversion(conversionType: string, value: number = 0) {
  const touchpoints = JSON.parse(sessionStorage.getItem('touchpoints') || '[]')
  
  trackEvent('conversion', {
    conversion_type: conversionType,
    conversion_value: value,
    attribution_path: touchpoints.map((t: any) => `${t.source}/${t.medium}`).join(' -> '),
    touchpoint_count: touchpoints.length,
    first_touch: touchpoints[0] || null,
    last_touch: touchpoints[touchpoints.length - 1] || null,
    time_to_convert: touchpoints.length > 0 ? Date.now() - touchpoints[0].timestamp : 0
  })
}

// Utility functions
function trackMetric(metricName: string, metric: any) {
  trackEvent('web_vital', {
    metric_name: metricName,
    metric_value: metric.value,
    metric_rating: metric.rating || 'unknown',
    metric_delta: metric.delta || 0
  })
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

function getDeviceInfo() {
  if (typeof window === 'undefined') return {}
  
  return {
    user_agent: navigator.userAgent,
    language: navigator.language,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    is_mobile: window.innerWidth < 768,
    connection_type: (navigator as any).connection?.effectiveType || 'unknown'
  }
}

function calculateLeadQuality(leadData: any): 'high' | 'medium' | 'low' {
  let score = 0
  
  if (leadData.phone) score += 20
  if (leadData.timeline === 'ASAP') score += 30
  if (leadData.timeline === '1-3 months') score += 20
  if (leadData.priceRange) score += 15
  if (leadData.features?.length > 2) score += 15
  
  if (score >= 60) return 'high'
  if (score >= 30) return 'medium'
  return 'low'
}

function categorizeVoiceCommand(command: string): string {
  const lowerCommand = command.toLowerCase()
  
  if (lowerCommand.includes('homes') || lowerCommand.includes('properties')) return 'property_search'
  if (lowerCommand.includes('market') || lowerCommand.includes('price')) return 'market_inquiry'
  if (lowerCommand.includes('schedule') || lowerCommand.includes('showing')) return 'scheduling'
  if (lowerCommand.includes('agent') || lowerCommand.includes('expert')) return 'agent_inquiry'
  
  return 'general_inquiry'
}

// Page tracking
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return
  
  // Update visited pages
  const visited = JSON.parse(localStorage.getItem('visitedPages') || '[]')
  if (!visited.includes(path)) {
    visited.push(path)
    localStorage.setItem('visitedPages', JSON.stringify(visited))
  }
  
  trackEvent('page_view', {
    page_path: path,
    page_title: document.title,
    user_journey_stage: getUserJourneyStage(),
    visit_count: visited.length,
    is_returning_visitor: visited.length > 1
  })
}