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
    // Ensure RealScout script loads properly
    const loadRealScout = () => {
      // Check if already loaded
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        console.log('RealScout loaded successfully');
        return;
      }
      
      // If not loaded, wait and check again
      setTimeout(loadRealScout, 500);
    };
    
    loadRealScout();
  }, []);

  return (
    <div className={className}>
      <realscout-office-listings 
        agent-encoded-id="QWdlbnQtMjI1MDUw" 
        sort-order="NEWEST" 
        listing-status=",For Sale" 
        property-types="SFR,MF,TC" 
        price-min="450000"
      ></realscout-office-listings>
    </div>
  );
}