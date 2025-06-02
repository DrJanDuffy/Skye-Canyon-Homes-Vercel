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
    // Ensure RealScout widget loads properly in production
    const initializeRealScout = () => {
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        // Widget is ready for production use
        return;
      }
      
      // Wait for widget to load
      setTimeout(initializeRealScout, 500);
    };
    
    initializeRealScout();
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