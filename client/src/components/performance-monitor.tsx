import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        // Measure Largest Contentful Paint (LCP)
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime);
            }
          }
        });

        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Fallback for browsers that don't support this API
        }

        // Measure First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              console.log('FID:', (entry as any).processingStart - entry.startTime);
            }
          }
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // Fallback for browsers that don't support this API
        }

        // Measure Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Fallback for browsers that don't support this API
        }

        // Log navigation timing
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType(
              'navigation'
            )[0] as PerformanceNavigationTiming;
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
          }, 0);
        });
      }
    };

    measurePerformance();
  }, []);

  return null;
}
