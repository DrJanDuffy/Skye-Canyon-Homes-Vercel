interface RealScoutSearchWidgetProps {
  className?: string;
  variant?: 'hero' | 'sidebar' | 'inline';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-search': any;
      'realscout-cma': any;
    }
  }
}

export default function RealScoutSearchWidget({ 
  className = "", 
  variant = 'hero' 
}: RealScoutSearchWidgetProps) {
  if (variant === 'hero') {
    return (
      <div className={`${className} bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto`}>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Home in Skye Canyon
          </h2>
          <p className="text-gray-600 text-lg">
            Search available properties or get your home's current market value
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-blue-900 mb-3">Search Homes for Sale</h3>
            <realscout-search 
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              search-type="buy"
              location="Skye Canyon, Las Vegas, NV"
              price-min="400000"
              price-max="3000000"
              property-types="SFR,MF,TC"
              data-production="true"
            ></realscout-search>
            <p className="text-sm text-blue-700 mt-3">
              Browse luxury homes, new construction, and custom properties
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-green-900 mb-3">Get Your Home's Value</h3>
            <realscout-cma 
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              location="Skye Canyon, Las Vegas, NV"
              data-production="true"
            ></realscout-cma>
            <p className="text-sm text-green-700 mt-3">
              Instant market analysis with recent comparable sales
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Powered by RealScout • Updated daily with MLS data
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
              Advanced Property Search
            </a>
            <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
              Contact Dr. Jan Duffy
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`${className} bg-white rounded-lg shadow-lg p-6`}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Home Search</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Properties
            </label>
            <realscout-search 
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              search-type="buy"
              location="Skye Canyon, Las Vegas, NV"
              compact="true"
              data-production="true"
            ></realscout-search>
          </div>
          
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Valuation
            </label>
            <realscout-cma 
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              location="Skye Canyon, Las Vegas, NV"
              compact="true"
              data-production="true"
            ></realscout-cma>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={`${className} bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Ready to Find Your Next Home?</h3>
          <p className="text-blue-100">Search current listings or get your home's value</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <realscout-search 
            agent-encoded-id="QWdlbnQtMjI1MDUw"
            search-type="buy"
            location="Skye Canyon, Las Vegas, NV"
            button-text="Search Homes"
            button-style="white"
            data-production="true"
          ></realscout-search>
          
          <realscout-cma 
            agent-encoded-id="QWdlbnQtMjI1MDUw"
            location="Skye Canyon, Las Vegas, NV"
            button-text="Get Home Value"
            button-style="outline-white"
            data-production="true"
          ></realscout-cma>
        </div>
      </div>
    </div>
  );
}