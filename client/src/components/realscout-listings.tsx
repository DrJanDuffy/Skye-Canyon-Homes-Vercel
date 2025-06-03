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
  return (
    <div className={`${className} realscout-container bg-white rounded-lg shadow-lg p-6`}>
      <realscout-office-listings 
        agent-encoded-id="QWdlbnQtMjI1MDUw" 
        sort-order="NEWEST" 
        listing-status="For Sale" 
        property-types="SFR,MF,TC,LAND" 
        price-min="400000"
        price-max="3000000"
        max-listings="12"
        show-photos="true"
        show-details="true"
        layout="grid"
        columns="3"
        data-production="true"
      ></realscout-office-listings>
      
      <noscript>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Current Listings</h3>
          <p className="text-gray-600">Please enable JavaScript to view our current property listings.</p>
        </div>
      </noscript>
    </div>
  );
}