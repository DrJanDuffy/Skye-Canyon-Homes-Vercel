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
    // Log when component mounts
    console.log('RealScout component mounted');
    
    // Check if script loaded
    const checkScript = () => {
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        console.log('RealScout web component is registered');
      } else {
        console.log('RealScout web component not yet registered');
      }
    };
    
    // Check immediately and after delay
    checkScript();
    setTimeout(checkScript, 2000);
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