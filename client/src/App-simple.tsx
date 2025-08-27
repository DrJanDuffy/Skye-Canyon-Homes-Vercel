function App(): JSX.Element {
  console.log('🎨 App-simple: Component rendering...');
  
  try {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-lg border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-blue-900">Skye Canyon Homes</h1>
              </div>
              <div className="text-blue-700 font-semibold text-xl">Dr. Jan Duffy, REALTOR®</div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Luxury Homes in Skye Canyon</h2>
            <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Discover the finest properties in Las Vegas's premier master-planned community. Expert
              guidance from Dr. Jan Duffy, your Skye Canyon real estate specialist with 15+ years of exclusive community expertise.
            </p>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-2xl p-10 max-w-3xl mx-auto mb-16 border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">Contact Dr. Jan Duffy</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">📞</div>
                <p className="font-semibold text-blue-900">Phone</p>
                <p className="text-lg text-gray-700">(702) 500-1902</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">✉️</div>
                <p className="font-semibold text-blue-900">Email</p>
                <p className="text-lg text-gray-700">DrDuffy@SkyeCanyonHomesForSale.com</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">📍</div>
                <p className="font-semibold text-blue-900">Address</p>
                <p className="text-lg text-gray-700">10111 W. Skye Canyon Park Drive<br />Las Vegas, NV 89166</p>
              </div>
            </div>
          </div>

          {/* Property Search Section */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Search Skye Canyon Properties</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Access exclusive listings, market insights, and personalized property recommendations
            </p>
            <a
              href="http://drjanduffy.realscout.com/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 border border-transparent text-xl font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔍 Search Properties Now
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-6xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Luxury Homes</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Premium properties $600K-$2M+ with exceptional amenities, mountain views, and resort-style living
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-6xl mb-6">⛳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">TPC Golf Course</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Access to world-class golf and resort-style amenities in one of Las Vegas's most prestigious communities
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 text-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Schools</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A-rated schools including Canyon Springs High School, perfect for families seeking educational excellence
              </p>
            </div>
          </div>

          {/* Market Expertise Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-10 mb-16">
            <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">Skye Canyon Market Expertise</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-blue-800 mb-4">🏘️ Community Knowledge</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• 15+ years of exclusive community expertise</li>
                  <li>• Deep understanding of local market trends</li>
                  <li>• Builder relationships and new construction insights</li>
                  <li>• Neighborhood development and future planning</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-800 mb-4">💼 Professional Services</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Buyer representation and negotiation</li>
                  <li>• Luxury property marketing and sales</li>
                  <li>• First-time buyer assistance</li>
                  <li>• Investment property guidance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RealScout Integration Notice */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">RealScout Integration</h3>
            <p className="text-gray-600 mb-4">
              Our website integrates with RealScout for real-time MLS data, advanced search capabilities, and market analysis tools.
            </p>
            <p className="text-sm text-gray-500">
              Click "Search Properties Now" above to access our comprehensive property search platform.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Dr. Jan Duffy Real Estate</h3>
              <p className="text-gray-300 text-lg">Premier Skye Canyon Real Estate Specialist</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-gray-400">(702) 500-1902</p>
                <p className="text-gray-400">DrDuffy@SkyeCanyonHomesForSale.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-gray-400">10111 W. Skye Canyon Park Drive</p>
                <p className="text-gray-400">Las Vegas, NV 89166</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">License</h4>
                <p className="text-gray-400">Nevada Real Estate License</p>
                <p className="text-gray-400">S.0197614</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-lg">© 2024 Dr. Jan Duffy Real Estate. All rights reserved.</p>
              <p className="text-gray-400 mt-2">Expert real estate services in Skye Canyon, Las Vegas, Nevada</p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('❌ App-simple: Error rendering component:', error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Error Loading Skye Canyon Homes</h1>
          <p className="text-red-600">Please refresh the page or contact support.</p>
          <pre className="mt-4 text-sm text-red-500 bg-red-100 p-4 rounded">{String(error)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
