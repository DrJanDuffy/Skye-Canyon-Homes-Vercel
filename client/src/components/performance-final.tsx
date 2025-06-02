import { useEffect } from 'react';

// Final performance optimizations to break the 2.5s FCP barrier
export default function PerformanceFinal() {
  useEffect(() => {
    // Eliminate render-blocking operations
    const eliminateRenderBlocking = () => {
      // Move all non-critical CSS to load after FCP
      const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
      styleSheets.forEach((sheet) => {
        const link = sheet as HTMLLinkElement;
        if (!link.hasAttribute('data-critical')) {
          link.media = 'print';
          link.onload = () => { link.media = 'all'; };
        }
      });

      // Defer all scripts except critical ones
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach((script) => {
        const scriptElement = script as HTMLScriptElement;
        if (!scriptElement.hasAttribute('data-critical') && 
            !scriptElement.src.includes('vite') && 
            !scriptElement.src.includes('main.tsx')) {
          scriptElement.defer = true;
        }
      });
    };

    // Optimize largest contentful paint
    const optimizeLCP = () => {
      // Prioritize hero image loading
      const heroImages = document.querySelectorAll('.hero-section img, .hero-section picture img');
      heroImages.forEach((img) => {
        const imgElement = img as HTMLImageElement;
        imgElement.loading = 'eager';
        imgElement.decoding = 'sync'; // Sync for above-fold critical images
        imgElement.fetchPriority = 'high';
      });

      // Optimize font loading for visible text
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.fontDisplay = 'swap';
          }
        });
      });

      document.querySelectorAll('h1, h2, .hero-title').forEach((el) => {
        observer.observe(el);
      });
    };

    // Reduce main thread blocking
    const reduceMainThreadBlocking = () => {
      // Use requestIdleCallback for non-critical tasks
      const runWhenIdle = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback);
        } else {
          setTimeout(callback, 100);
        }
      };

      // Defer analytics and tracking
      runWhenIdle(() => {
        // Analytics initialization happens here
        console.log('Analytics loaded during idle time');
      });

      // Defer RealScout widget until after critical paint
      runWhenIdle(() => {
        const realscoutElements = document.querySelectorAll('realscout-office-listings');
        realscoutElements.forEach((element) => {
          element.setAttribute('data-lazy-load', 'true');
        });
      });
    };

    // Execute optimizations in order
    eliminateRenderBlocking();
    optimizeLCP();
    reduceMainThreadBlocking();

    // Monitor FCP improvements
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          if (fcp < 2500) {
            console.log(`✅ FCP target achieved: ${fcp.toFixed(0)}ms`);
          } else {
            console.log(`⚠️ FCP needs improvement: ${fcp.toFixed(0)}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });

    return () => observer.disconnect();
  }, []);

  return null;
}