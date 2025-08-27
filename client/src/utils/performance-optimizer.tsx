import { lazy } from 'react';

// Lazy loading components for code splitting
export const LazyVoiceSearchIntegration = lazy(
  () => import('@/components/voice-search-integration')
);
export const LazyRealScoutListings = lazy(() => import('@/components/realscout-listings'));
export const LazyMarketIntelligence = lazy(() => import('@/components/market-intelligence'));
export const LazyNeighborhoodHeatmap = lazy(() => import('@/components/neighborhood-heatmap'));

// Performance monitoring utilities
export const performanceMonitor = {
  measureComponentRender: (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;

      if (window.gtag) {
        window.gtag('event', 'component_render_time', {
          event_category: 'performance',
          event_label: componentName,
          value: Math.round(duration),
        });
      }
    };
  },

  measureAPICall: (apiEndpoint: string) => {
    const start = performance.now();
    return (success: boolean = true) => {
      const end = performance.now();
      const duration = end - start;

      if (window.gtag) {
        window.gtag('event', 'api_call_duration', {
          event_category: 'performance',
          event_label: `${apiEndpoint}_${success ? 'success' : 'error'}`,
          value: Math.round(duration),
        });
      }
    };
  },
};

// Debounce utility for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Memory cleanup utilities
export const cleanupManager = {
  cleanupEventListeners: (element: HTMLElement | Window, events: string[]) => {
    events.forEach((event) => {
      const handlers = (element as any)._eventHandlers?.[event] || [];
      handlers.forEach((handler: EventListener) => {
        element.removeEventListener(event, handler);
      });
    });
  },

  cleanupTimers: (timers: (NodeJS.Timeout | number)[]) => {
    timers.forEach((timer) => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
        clearInterval(timer);
      }
    });
  },
};

// Loading component for Suspense fallbacks
export const LoadingFallback = ({ component }: { component: string }) => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading {component}...</span>
  </div>
);
