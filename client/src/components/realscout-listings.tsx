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
    // Debug logging for RealScout widget
    const checkRealScout = () => {
      console.log('Checking RealScout widget status...');
      console.log('customElements available:', !!window.customElements);
      
      if (window.customElements) {
        const isRegistered = window.customElements.get('realscout-office-listings');
        console.log('realscout-office-listings registered:', !!isRegistered);
        
        if (!isRegistered) {
          console.log('Waiting for RealScout components to load...');
          setTimeout(checkRealScout, 1000);
        } else {
          console.log('RealScout component is ready');
        }
      }
    };
    
    // Check immediately and after a delay
    checkRealScout();
    setTimeout(checkRealScout, 2000);
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