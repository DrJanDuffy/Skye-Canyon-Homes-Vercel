/**
 * Smart Lead Scoring Hook
 * Tracks user behavior and automatically identifies high-intent prospects
 */

import { useEffect, useCallback, useRef } from 'react';

interface TrackingEvent {
  action: string;
  data?: any;
  priceRange?: string;
  propertyId?: string;
  query?: string;
}

export function useLeadScoring() {
  const sessionStartTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());
  const pageViewStartTime = useRef<number>(Date.now());
  const propertyViewsRef = useRef<Set<string>>(new Set());
  const priceSearchesRef = useRef<string[]>([]);

  // Track intent-based actions
  const trackIntent = useCallback(async (event: TrackingEvent) => {
    try {
      await fetch('/api/track-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: event.action,
          data: {
            ...event.data,
            sessionDuration: Math.floor((Date.now() - sessionStartTime.current) / 1000),
            priceRange: event.priceRange,
            propertyId: event.propertyId,
            query: event.query,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error('Lead scoring tracking error:', error);
    }
  }, []);

  // Track property views with price consistency
  const trackPropertyView = useCallback((propertyId: string, price: number, address: string) => {
    propertyViewsRef.current.add(propertyId);
    
    // Determine price range for consistency tracking
    let priceRange = '';
    if (price >= 1500000) priceRange = '$1.5M+';
    else if (price >= 1000000) priceRange = '$1M-$1.5M';
    else if (price >= 800000) priceRange = '$800K-$1M';
    else if (price >= 600000) priceRange = '$600K-$800K';
    else if (price >= 400000) priceRange = '$400K-$600K';
    else priceRange = 'Under $400K';

    trackIntent({
      action: 'property_view',
      propertyId,
      priceRange,
      data: {
        price,
        address,
        viewCount: propertyViewsRef.current.size,
        isLuxury: price > 800000
      }
    });
  }, [trackIntent]);

  // Track AI search queries
  const trackAISearch = useCallback((query: string, priceRange?: string) => {
    if (priceRange) {
      priceSearchesRef.current.push(priceRange);
    }

    trackIntent({
      action: 'ai_search',
      query,
      priceRange,
      data: {
        searchCount: priceSearchesRef.current.length,
        priceConsistency: priceSearchesRef.current.length > 1
      }
    });
  }, [trackIntent]);

  // Track contact actions (high-intent triggers)
  const trackContactAction = useCallback((actionType: 'phone' | 'email' | 'form') => {
    trackIntent({
      action: actionType === 'form' ? 'contact_form' : `${actionType}_click`,
      data: {
        urgency: 'high',
        sessionDuration: Math.floor((Date.now() - sessionStartTime.current) / 1000),
        propertyViewCount: propertyViewsRef.current.size
      }
    });
  }, [trackIntent]);

  // Track RealScout widget interactions
  const trackRealScoutInteraction = useCallback((interactionType: string, duration?: number) => {
    trackIntent({
      action: 'realscout_interaction',
      data: {
        interaction_type: interactionType,
        time_spent_seconds: duration || Math.floor((Date.now() - pageViewStartTime.current) / 1000),
        scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
        page_path: window.location.pathname
      }
    });
  }, [trackIntent]);

  // Track page engagement automatically
  useEffect(() => {
    let engagementTimer: NodeJS.Timeout;
    
    const trackEngagement = () => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      
      // Track every 30 seconds for active users
      if (sessionDuration % 30 === 0 && sessionDuration > 0) {
        trackRealScoutInteraction('page_engagement', sessionDuration);
      }
    };

    // Track engagement every 30 seconds
    engagementTimer = setInterval(trackEngagement, 30000);

    // Track on page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackRealScoutInteraction('page_exit');
      } else {
        pageViewStartTime.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(engagementTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackRealScoutInteraction]);

  // Track scroll depth for engagement
  useEffect(() => {
    let maxScrollDepth = 0;
    
    const handleScroll = () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track significant scroll milestones
        if (scrollDepth > 75 && maxScrollDepth <= 75) {
          trackIntent({
            action: 'realscout_interaction',
            data: {
              interaction_type: 'deep_scroll',
              scroll_depth: scrollDepth
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackIntent]);

  // Track mouse activity for engagement scoring
  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    let isActive = true;

    const resetActivityTimer = () => {
      lastActivityTime.current = Date.now();
      
      if (!isActive) {
        isActive = true;
        // User became active again after being idle
        trackIntent({
          action: 'realscout_interaction',
          data: {
            interaction_type: 'user_active'
          }
        });
      }

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        isActive = false;
      }, 60000); // 1 minute idle threshold
    };

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetActivityTimer, { passive: true });
    });

    return () => {
      clearTimeout(activityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetActivityTimer);
      });
    };
  }, [trackIntent]);

  return {
    trackPropertyView,
    trackAISearch,
    trackContactAction,
    trackRealScoutInteraction,
    trackIntent
  };
}

// Enhanced analytics tracking for existing components
export function useEnhancedAnalytics() {
  const { trackRealScoutInteraction } = useLeadScoring();

  const trackEvent = useCallback((event: string, parameters: any) => {
    // Send to both analytics and lead scoring
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        parameters,
        timestamp: new Date().toISOString()
      })
    }).catch(error => {
      console.error('Analytics tracking error:', error);
    });

    // Also track for lead scoring if relevant
    if (event === 'realscout_interaction') {
      trackRealScoutInteraction(parameters.interaction_type, parameters.time_spent_seconds);
    }
  }, [trackRealScoutInteraction]);

  return { trackEvent };
}