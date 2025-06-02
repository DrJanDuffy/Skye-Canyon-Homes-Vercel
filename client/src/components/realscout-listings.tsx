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
    // Check if RealScout script is loaded
    const checkRealScout = () => {
      if (typeof window !== 'undefined') {
        if (customElements.get('realscout-office-listings')) {
          console.log('RealScout components are loaded and ready');
        } else {
          console.log('RealScout components not yet loaded, retrying...');
          setTimeout(checkRealScout, 1000);
        }
      }
    };
    
    checkRealScout();
  }, []);

  return (
    <div className={className}>
      <div style={{ minHeight: '200px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
        <realscout-office-listings 
          agent-encoded-id="QWdlbnQtMjI1MDUw" 
          sort-order="NEWEST" 
          listing-status=",For Sale" 
          property-types="SFR,MF,TC" 
          price-min="450000"
        ></realscout-office-listings>
        <div id="realscout-fallback" style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>
          Loading RealScout listings...
        </div>
      </div>
    </div>
  );
}