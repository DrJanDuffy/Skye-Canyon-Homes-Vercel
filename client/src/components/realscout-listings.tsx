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
          
          // Check for any error messages in the widget
          setTimeout(() => {
            const widgets = document.querySelectorAll('realscout-office-listings');
            widgets.forEach((widget, index) => {
              console.log(`Widget ${index + 1} status:`, widget.innerHTML);
              console.log(`Widget ${index + 1} attributes:`, {
                agentId: widget.getAttribute('agent-encoded-id'),
                sortOrder: widget.getAttribute('sort-order'),
                listingStatus: widget.getAttribute('listing-status'),
                propertyTypes: widget.getAttribute('property-types'),
                priceMin: widget.getAttribute('price-min')
              });
            });
          }, 3000);
        }
      }
    };
    
    // Check immediately and after a delay
    checkRealScout();
    setTimeout(checkRealScout, 2000);
  }, []);

  return (
    <div className={className}>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
        <strong>RealScout Widget Status:</strong> Check browser console for debug info
      </div>
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