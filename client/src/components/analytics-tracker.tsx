import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Load analytics functions dynamically to prevent build issues
    const loadAnalytics = async () => {
      try {
        const analyticsModule = await import('@/lib/analytics-2025');
        const { initWebVitals, trackPageView, trackTouchpoint } = analyticsModule;

        // Initialize Core Web Vitals tracking
        initWebVitals();

        // Track initial page load
        trackPageView(location);

        // Track attribution from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get('utm_source') || urlParams.get('source') || 'direct';
        const medium = urlParams.get('utm_medium') || urlParams.get('medium') || 'none';
        const campaign = urlParams.get('utm_campaign') || urlParams.get('campaign');

        if (source !== 'direct') {
          trackTouchpoint(source, medium, campaign || undefined);
        }
      } catch (_error) {}
    };

    loadAnalytics();
  }, [location]);

  useEffect(() => {
    // Track page changes dynamically
    import('@/lib/analytics-2025')
      .then(({ trackPageView }) => {
        trackPageView(location);
      })
      .catch(() => {});
  }, [location]);

  return null; // This component only handles tracking
}

// Helper function to track events (simplified interface)
function _trackEvent(eventName: string, parameters: any = {}) {
  if (typeof window !== 'undefined') {
    import('@/lib/analytics-2025')
      .then(({ trackEvent }) => {
        trackEvent(eventName, parameters);
      })
      .catch(() => {});
  }
}
