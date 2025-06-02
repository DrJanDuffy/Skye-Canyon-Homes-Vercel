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
    // Ensure the web components are loaded
    if (typeof window !== 'undefined' && !customElements.get('realscout-office-listings')) {
      console.log('RealScout components not yet loaded');
    }
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