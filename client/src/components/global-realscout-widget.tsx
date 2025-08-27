import { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
    }
  }
}

export default function GlobalRealScoutWidget() {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="realscout-web-components"]');
    if (existingScript) {
      console.log('RealScout script already loaded');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
    script.type = 'module';

    script.onload = () => {
      console.log('RealScout web components loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load RealScout web components');
    };

    document.head.appendChild(script);

    // Add global styles for RealScout widgets
    if (!document.querySelector('#realscout-styles')) {
      const style = document.createElement('style');
      style.id = 'realscout-styles';
      style.textContent = `
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          width: 100%;
          display: block;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const scriptToRemove = document.querySelector('script[src*="realscout-web-components"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}
