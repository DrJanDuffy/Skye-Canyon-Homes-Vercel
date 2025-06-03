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
    const loadRealScoutScript = () => {
      // Remove existing script if present
      const existingScript = document.querySelector('script[src*="realscout"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/js/realscout-widgets.js';
      script.async = true;
      script.defer = false; // Load synchronously for better reliability
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('RealScout widgets loaded successfully');
        // Force widget registration
        setTimeout(() => {
          if (window.customElements && !window.customElements.get('realscout-office-listings')) {
            // Force re-registration if needed
            const widgets = document.querySelectorAll('realscout-office-listings');
            widgets.forEach(widget => {
              if (widget.shadowRoot) {
                console.log('RealScout widget found with shadow DOM');
              }
            });
          }
        }, 1000);
      };

      script.onerror = () => {
        console.error('Failed to load RealScout widgets - retrying...');
        setTimeout(loadRealScoutScript, 3000);
      };

      document.head.appendChild(script);
    };

    // Load script immediately
    loadRealScoutScript();

    return () => {
      // Clean up on unmount
      const script = document.querySelector('script[src*="realscout"]');
      if (script) {
        script.remove();
      }
    };
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
      <div className={`${className} realscout-container`} style={{ minHeight: '400px' }}>
        <realscout-office-listings 
          agent-encoded-id="QWdlbnQtMjI1MDUw" 
          sort-order="NEWEST" 
          listing-status=",For Sale" 
          property-types="SFR,MF,TC" 
          price-min="450000"
          data-production="true"

        ></realscout-office-listings>
        
        {/* Fallback content if widget fails to load */}
        <noscript>
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Current Listings</h3>
            <p className="text-gray-600">Please enable JavaScript to view our current property listings.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}