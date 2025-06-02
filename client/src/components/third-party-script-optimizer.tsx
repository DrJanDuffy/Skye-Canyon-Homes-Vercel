import { useEffect } from 'react';

// Optimize third-party script loading for better performance
export default function ThirdPartyScriptOptimizer() {
  useEffect(() => {
    // Delay non-critical scripts until after page load
    const loadNonCriticalScripts = () => {
      // Load analytics after user interaction or 3 seconds
      let analyticsLoaded = false;
      
      const loadAnalytics = () => {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        
        // Google Analytics (if needed)
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(gaScript);
      };

      // Load on first user interaction
      const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll'];
      const loadOnInteraction = () => {
        loadAnalytics();
        interactionEvents.forEach(event => 
          document.removeEventListener(event, loadOnInteraction)
        );
      };

      interactionEvents.forEach(event => 
        document.addEventListener(event, loadOnInteraction, { passive: true })
      );

      // Fallback: load after 3 seconds
      setTimeout(loadAnalytics, 3000);
    };

    // Optimize RealScout widget loading
    const optimizeRealScoutLoading = () => {
      const realscoutElements = document.querySelectorAll('realscout-office-listings');
      
      realscoutElements.forEach((element) => {
        // Add loading indicator
        if (!element.querySelector('.loading-indicator')) {
          const loader = document.createElement('div');
          loader.className = 'loading-indicator';
          loader.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 1rem 0;
          `;
          loader.innerHTML = '<div style="color: #666;">Loading property listings...</div>';
          element.appendChild(loader);
        }
      });
    };

    // Run optimizations
    if (document.readyState === 'complete') {
      loadNonCriticalScripts();
      optimizeRealScoutLoading();
    } else {
      window.addEventListener('load', () => {
        loadNonCriticalScripts();
        optimizeRealScoutLoading();
      });
    }

    // Monitor script loading performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'script' && entry.duration > 100) {
          console.warn(`Slow script detected: ${entry.name} took ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
}