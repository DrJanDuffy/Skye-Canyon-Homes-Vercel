import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
    }
  }
}

export default function GlobalRealScoutWidget() {
  useEffect(() => {
    const loadRealScoutScript = () => {
      // Remove existing script if present
      const existingScript = document.querySelector('script[src*="realscout"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/js/realscout-widgets.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('RealScout widgets loaded globally');
      };

      script.onerror = () => {
        console.error('Failed to load RealScout widgets');
      };

      document.head.appendChild(script);
    };

    loadRealScoutScript();

    return () => {
      const script = document.querySelector('script[src*="realscout"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* Global RealScout Widget Fixes */
        realscout-office-listings,
        realscout-office-listings *,
        realscout-office-listings img,
        realscout-office-listings picture {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
          position: relative !important;
          overflow: visible !important;
        }

        realscout-office-listings img {
          max-width: 100% !important;
          height: auto !important;
          object-fit: cover !important;
          border-radius: 8px !important;
        }

        realscout-office-listings {
          width: 100% !important;
          min-height: 400px !important;
        }
      `}</style>
    </>
  );
}