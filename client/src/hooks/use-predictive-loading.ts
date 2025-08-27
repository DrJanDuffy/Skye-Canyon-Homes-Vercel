import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export function usePredictiveLoading() {
  const [location] = useLocation();
  const prefetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Intersection Observer for link prefetching
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (href?.startsWith('/') && !prefetchedRef.current.has(href)) {
              prefetchLink(href);
              prefetchedRef.current.add(href);
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Observe all internal links
    const observeLinks = () => {
      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        observer.observe(link);
      });
    };

    // Initial observation
    setTimeout(observeLinks, 500);

    // Re-observe on route changes
    const intervalId = setInterval(observeLinks, 2000);

    // Predictive prefetch based on current page and user behavior
    const predictivePages = getPredictivePages(location);

    // Prefetch likely next pages after 3 seconds
    const timeoutId = setTimeout(() => {
      predictivePages.forEach((page) => {
        if (!prefetchedRef.current.has(page)) {
          prefetchLink(page);
          prefetchedRef.current.add(page);
        }
      });
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [location, getPredictivePages, prefetchLink]);

  const prefetchLink = (href: string) => {
    // Create a hidden link element for prefetching
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);

    // Also prefetch associated API data
    prefetchApiData(href);
  };

  const prefetchApiData = (route: string) => {
    try {
      // Prefetch API data based on route
      switch (route) {
        case '/properties':
          fetch('/api/properties').catch(() => {});
          fetch('/api/properties/featured').catch(() => {});
          break;
        case '/market-analysis':
          fetch('/api/market-stats').catch(() => {});
          fetch('/api/market-insights').catch(() => {});
          break;
        case '/about':
          fetch('/api/agent-bio').catch(() => {});
          break;
        case '/skye-canyon-guide':
          fetch('/api/community-data').catch(() => {});
          break;
      }
    } catch (_error) {
      // Silently handle prefetch errors
    }
  };

  const getPredictivePages = (currentLocation: string): string[] => {
    // Smart predictive loading based on current page
    switch (currentLocation) {
      case '/':
        return ['/properties', '/market-analysis', '/about'];
      case '/properties':
        return ['/skye-canyon-guide', '/market-analysis', '/luxury-homes-las-vegas'];
      case '/about':
        return ['/properties', '/market-analysis'];
      case '/market-analysis':
        return ['/properties', '/skye-canyon-guide'];
      case '/skye-canyon-guide':
        return ['/properties', '/luxury-homes-las-vegas'];
      default:
        return ['/properties', '/about'];
    }
  };
}
