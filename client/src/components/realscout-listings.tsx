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
        agent-id="QWdlbnQtMjI1MDUw"
        widget-id="office-listings-widget"
        max-listings="6"
      ></realscout-office-listings>
    </div>
  );
}