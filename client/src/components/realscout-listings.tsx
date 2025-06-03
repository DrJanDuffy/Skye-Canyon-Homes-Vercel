import { useEffect } from "react";

interface RealScoutListingsProps {
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
    }
  }
}

export default function RealScoutListings({ className = "" }: RealScoutListingsProps) {
  useEffect(() => {
    // Force load RealScout script for production
    const loadRealScoutScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="realscout"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/js/realscout-widgets.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('RealScout widgets loaded for production');
        // Force widget initialization
        if (window.customElements) {
          window.customElements.whenDefined('realscout-office-listings').then(() => {
            console.log('RealScout office listings widget ready');
          });
        }
      };

      script.onerror = () => {
        console.error('Failed to load RealScout widgets');
      };

      document.head.appendChild(script);
    };

    // Load immediately for production
    loadRealScoutScript();
    
    // Backup retry mechanism
    const retryInterval = setInterval(() => {
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        clearInterval(retryInterval);
      } else {
        loadRealScoutScript();
      }
    }, 2000);

    // Cleanup after 30 seconds
    setTimeout(() => clearInterval(retryInterval), 30000);

    return () => clearInterval(retryInterval);
  }, []);

  return (
    <>
      <style>{`
        /* Fix RealScout widget photo display */
        realscout-office-listings img,
        realscout-office-listings [src],
        .realscout-widget img,
        .realscout-listing-image img {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-width: 100% !important;
          height: auto !important;
          z-index: 1 !important;
        }
        
        /* Ensure photo containers are visible */
        realscout-office-listings .photo-container,
        realscout-office-listings .listing-image,
        realscout-office-listings .property-image {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          overflow: visible !important;
        }
        
        /* Fix any hidden elements in RealScout widget */
        realscout-office-listings * {
          visibility: visible !important;
        }
        
        /* Override any transform or positioning issues */
        realscout-office-listings {
          transform: none !important;
          position: relative !important;
          z-index: auto !important;
        }
      `}</style>
      <div className={className}>
        <realscout-office-listings 
          agent-encoded-id="QWdlbnQtMjI1MDUw" 
          sort-order="NEWEST" 
          listing-status=",For Sale" 
          property-types="SFR,MF,TC" 
          price-min="450000"
          data-production="true"
        ></realscout-office-listings>
      </div>
    </>
  );
}