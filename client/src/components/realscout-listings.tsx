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
          <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
            Search All Homes
          </a>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 border border-blue-400 transition-colors">
            <div id="homebot_homeowner_1"></div>
            <script dangerouslySetInnerHTML={{
              __html: `
                (function (h,b) { 
                  var w = window, d = document, s = 'script', x, y; 
                  w['__hb_namespace'] = h; 
                  w[h] = w[h] || function () { (w[h].q=w[h].q||[]).push(arguments) }; 
                  y = d.createElement(s); 
                  x = d.getElementsByTagName(s)[0]; 
                  y.async = 1; 
                  y.src = b; 
                  x.parentNode.insertBefore(y,x) 
                })('Homebot','https://embed.homebotapp.com/lgw/v1/widget.js'); 
                Homebot('#homebot_homeowner_1', '35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43')
              `
            }} />
          </div>
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
          <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
            View All Available Homes
          </a>
          <div className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            <div id="homebot_homeowner_2"></div>
            <script dangerouslySetInnerHTML={{
              __html: `
                (function (h,b) { 
                  var w = window, d = document, s = 'script', x, y; 
                  w['__hb_namespace'] = h; 
                  w[h] = w[h] || function () { (w[h].q=w[h].q||[]).push(arguments) }; 
                  y = d.createElement(s); 
                  x = d.getElementsByTagName(s)[0]; 
                  y.async = 1; 
                  y.src = b; 
                  x.parentNode.insertBefore(y,x) 
                })('Homebot','https://embed.homebotapp.com/lgw/v1/widget.js'); 
                Homebot('#homebot_homeowner_2', '35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43')
              `
            }} />
          </div>
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