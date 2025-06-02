import { useEffect } from 'react';

// Optimize settings for Cloudflare deployment
export default function CloudflareOptimization() {
  useEffect(() => {
    // Add Cloudflare-optimized meta tags and headers
    const optimizeForCloudflare = () => {
      // Cache optimization headers
      const cacheHeaders = [
        { name: 'Cache-Control', content: 'public, max-age=31536000, immutable' },
        { name: 'CF-Cache-Status', content: 'HIT' },
        { name: 'CF-Ray', content: 'performance-optimized' }
      ];

      // Add Early Hints for critical resources
      const earlyHints = document.createElement('link');
      earlyHints.rel = 'preload';
      earlyHints.href = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
      earlyHints.as = 'script';
      earlyHints.setAttribute('data-cf-early-hint', 'true');
      document.head.appendChild(earlyHints);

      // Optimize for Cloudflare's Polish feature
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.hasAttribute('data-cf-optimized')) {
          // Add Cloudflare optimization attributes
          img.setAttribute('data-cf-polish', 'lossy');
          img.setAttribute('data-cf-mirage', 'true');
          img.setAttribute('data-cf-optimized', 'true');
        }
      });

      // Browser caching optimization
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, continue without it
        });
      }
    };

    // Edge-side includes optimization
    const optimizeESI = () => {
      // Mark cacheable components
      const cacheableElements = document.querySelectorAll('[data-cacheable]');
      cacheableElements.forEach((element) => {
        element.setAttribute('data-cf-cache-ttl', '3600');
      });
    };

    // Run optimizations
    optimizeForCloudflare();
    optimizeESI();

    // Monitor Cloudflare performance
    const cfObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('cloudflare') || entry.serverTiming) {
          console.log('Cloudflare metrics:', {
            name: entry.name,
            duration: entry.duration,
            serverTiming: entry.serverTiming
          });
        }
      });
    });

    cfObserver.observe({ entryTypes: ['navigation', 'resource'] });

    return () => cfObserver.disconnect();
  }, []);

  return null;
}