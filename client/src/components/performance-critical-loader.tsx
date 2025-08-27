import { useEffect, useState } from 'react';

export default function PerformanceCriticalLoader() {
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Optimize initial load by deferring non-critical operations
    const optimizeInitialLoad = () => {
      // Remove render-blocking operations
      requestIdleCallback(() => {
        // Defer non-critical CSS and scripts
        const nonCriticalStyles = document.querySelectorAll(
          'link[rel="stylesheet"]:not([data-critical])'
        );
        nonCriticalStyles.forEach((style) => {
          (style as HTMLLinkElement).media = 'print';
          (style as HTMLLinkElement).addEventListener('load', () => {
            (style as HTMLLinkElement).media = 'all';
          });
        });

        // Preload critical resources
        const preloadCritical = [
          '/dr-jan-duffy-headshot.jpg',
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        ];

        preloadCritical.forEach((resource) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          link.as = resource.includes('.jpg') ? 'image' : 'style';
          if (!document.querySelector(`link[href="${resource}"]`)) {
            document.head.appendChild(link);
          }
        });

        setIsLoaded(true);
      });
    };

    // Run optimization immediately for production
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeInitialLoad);
    } else {
      optimizeInitialLoad();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeInitialLoad);
    };
  }, []);

  // Inject critical CSS inline for immediate rendering
  useEffect(() => {
    const criticalCSS = `
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .hero-section { min-height: 80vh; }
      .nav-bar { height: 64px; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);

    return () => {
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
}
