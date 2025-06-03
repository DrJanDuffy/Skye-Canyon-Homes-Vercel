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
    <div className={`${className} realscout-container bg-white rounded-lg shadow-lg overflow-hidden`}>
      {/* Enhanced Header with Strong CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Search Skye Canyon Homes</h3>
        <p className="text-blue-100 mb-4">Browse available properties and find your dream home</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Search All Homes
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 border border-blue-400 transition-colors">
            Get Home Value
          </button>
        </div>
      </div>
      
      {/* Widget Container */}
      <div className="p-6">
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
      </div>
      
      {/* Bottom CTA for Widget Interaction */}
      <div className="bg-gray-50 border-t p-6 text-center">
        <p className="text-gray-700 mb-4 font-medium">
          Ready to explore more properties or get your home's value?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Available Homes
          </button>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Get Instant Home Valuation
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Click any property above to start your search or get detailed property information
        </p>
      </div>
      
      <noscript>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Current Listings</h3>
          <p className="text-gray-600 mb-4">Please enable JavaScript to view our current property listings.</p>
          <p className="text-sm text-gray-500">
            For property searches and home valuations, contact Dr. Jan Duffy at (702) 500-1902
          </p>
        </div>
      </noscript>
    </div>
  );
}