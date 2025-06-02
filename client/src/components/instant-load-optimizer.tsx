import { useEffect } from 'react';

// Aggressive instant load optimization to achieve sub-2.5s FCP
export default function InstantLoadOptimizer() {
  useEffect(() => {
    // 1. Immediate DOM optimization
    const optimizeDOM = () => {
      // Hide all non-critical content immediately
      const nonCritical = document.querySelectorAll(
        '.market-stats, .testimonials, .footer, .market-insights, [data-defer="true"]'
      );
      
      nonCritical.forEach((el: Element) => {
        const element = el as HTMLElement;
        element.style.display = 'none';
      });

      // Show only hero section and navigation
      const critical = document.querySelectorAll(
        'nav, .hero-section, .hero-section *'
      );
      
      critical.forEach((el: Element) => {
        const element = el as HTMLElement;
        element.style.visibility = 'visible';
        element.style.display = '';
      });
    };

    // 2. Instant style injection
    const injectInstantStyles = () => {
      const instantCSS = document.createElement('style');
      instantCSS.id = 'instant-styles';
      instantCSS.innerHTML = `
        /* Instant critical styles */
        * { box-sizing: border-box; }
        body { 
          margin: 0; 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.5;
        }
        
        /* Hero section instant visibility */
        .hero-section {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5d8f 100%);
          min-height: 100vh;
          display: flex !important;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        /* Navigation instant styles */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 1000;
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        /* Instant text rendering */
        h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }
        
        /* Phone number prominence */
        .phone-number {
          color: #4a90e2;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        /* Hide everything else initially */
        .market-stats,
        .testimonials,
        .footer,
        .market-insights,
        [data-defer="true"] {
          display: none !important;
        }
      `;
      
      // Insert at the very beginning of head
      document.head.insertBefore(instantCSS, document.head.firstChild);
    };

    // 3. Prevent layout shifts
    const preventLayoutShifts = () => {
      // Reserve space for images
      const images = document.querySelectorAll('img[data-critical="true"], .hero-section img');
      images.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement;
        if (!imgElement.style.minHeight) {
          imgElement.style.minHeight = '300px';
          imgElement.style.background = '#f3f4f6';
        }
      });
    };

    // 4. Progressive enhancement
    const progressivelyReveal = () => {
      // Show content progressively after critical paint
      const revealOrder = [
        { selector: '.agent-bio', delay: 100 },
        { selector: '.featured-listings', delay: 200 },
        { selector: '.market-stats', delay: 300 },
        { selector: '.testimonials', delay: 400 },
        { selector: '.footer', delay: 500 }
      ];

      revealOrder.forEach(({ selector, delay }) => {
        setTimeout(() => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el: Element) => {
            const element = el as HTMLElement;
            element.style.display = '';
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            requestAnimationFrame(() => {
              element.style.opacity = '1';
            });
          });
        }, delay);
      });
    };

    // Execute optimizations immediately
    injectInstantStyles();
    optimizeDOM();
    preventLayoutShifts();

    // Monitor when first paint happens
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          console.log(`⚡ Instant FCP: ${fcp.toFixed(0)}ms`);
          
          // Start progressive reveal after FCP
          if (fcp < 3000) {
            progressivelyReveal();
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Fallback progressive reveal
      setTimeout(progressivelyReveal, 1000);
    }

    return () => {
      try {
        observer.disconnect();
      } catch (e) {
        // Observer cleanup failed
      }
    };
  }, []);

  return null;
}