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
      script.defer = true;
      script.setAttribute('data-widgets-loaded', 'true');
      
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

  return null;
}