import { useEffect } from 'react';

export default function RealScoutAnalytics() {
  useEffect(() => {
    // Track RealScout widget interactions
    const trackRealScoutEvent = (eventType: string, details: any) => {
      // Send to analytics
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'realscout_interaction',
          parameters: {
            interaction_type: eventType,
            ...details,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString(),
          },
        }),
      });
    };

    // Listen for RealScout widget events
    const handleRealScoutEvents = () => {
      // Property search initiated
      document.addEventListener('realscout:search:started', (e: any) => {
        trackRealScoutEvent('property_search_started', {
          search_criteria: e.detail?.criteria || {},
          widget_location: e.detail?.widgetLocation || 'unknown',
        });
      });

      // Property viewed
      document.addEventListener('realscout:property:viewed', (e: any) => {
        trackRealScoutEvent('property_viewed', {
          property_id: e.detail?.propertyId,
          property_address: e.detail?.address,
          property_price: e.detail?.price,
          widget_location: e.detail?.widgetLocation || 'unknown',
        });
      });

      // Home valuation requested
      document.addEventListener('realscout:cma:requested', (e: any) => {
        trackRealScoutEvent('home_valuation_requested', {
          property_address: e.detail?.address,
          widget_location: e.detail?.widgetLocation || 'unknown',
        });
      });

      // Lead form submitted
      document.addEventListener('realscout:lead:submitted', (e: any) => {
        trackRealScoutEvent('lead_form_submitted', {
          lead_type: e.detail?.leadType || 'general',
          property_context: e.detail?.propertyContext,
          widget_location: e.detail?.widgetLocation || 'unknown',
        });
      });

      // Contact request
      document.addEventListener('realscout:contact:requested', (e: any) => {
        trackRealScoutEvent('contact_requested', {
          contact_method: e.detail?.method || 'unknown',
          property_context: e.detail?.propertyContext,
          widget_location: e.detail?.widgetLocation || 'unknown',
        });
      });
    };

    // Enhanced click tracking for buttons
    const handleButtonClicks = () => {
      document.querySelectorAll('[class*="realscout"], button').forEach((button) => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const text = target.textContent?.toLowerCase() || '';

          if (text.includes('search') || text.includes('home')) {
            trackRealScoutEvent('widget_button_clicked', {
              button_text: target.textContent,
              button_type: text.includes('search') ? 'property_search' : 'home_valuation',
              element_id: target.id || 'unknown',
              widget_location: target.closest('section')?.id || 'unknown',
            });
          }
        });
      });
    };

    // Initialize tracking
    handleRealScoutEvents();
    handleButtonClicks();

    // Track time spent on page
    const startTime = Date.now();
    const trackEngagement = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackRealScoutEvent('page_engagement', {
        time_spent_seconds: timeSpent,
        scroll_depth: Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        ),
      });
    };

    // Track engagement every 30 seconds
    const engagementInterval = setInterval(trackEngagement, 30000);

    // Track on page unload
    window.addEventListener('beforeunload', trackEngagement);

    return () => {
      clearInterval(engagementInterval);
      window.removeEventListener('beforeunload', trackEngagement);
    };
  }, []);

  return null; // This component doesn't render anything
}
