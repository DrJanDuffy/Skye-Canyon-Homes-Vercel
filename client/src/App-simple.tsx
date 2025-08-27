import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-900">
                Skye Canyon Homes
              </h1>
            </div>
            <div className="text-blue-700 font-semibold">
              Dr. Jan Duffy, REALTOR®
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Luxury Homes in Skye Canyon
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the finest properties in Las Vegas's premier master-planned community. 
            Expert guidance from Dr. Jan Duffy, your Skye Canyon real estate specialist.
          </p>
          
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Contact Dr. Jan Duffy
            </h3>
            <div className="space-y-3 text-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> (702) 500-1902
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> DrDuffy@SkyeCanyonHomesForSale.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166
              </p>
            </div>
          </div>

          {/* Property Search Button */}
          <div className="mt-8">
            <a
              href="http://drjanduffy.realscout.com/onboarding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Search Skye Canyon Properties
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Luxury Homes</h3>
            <p className="text-gray-600">Premium properties $600K-$2M+ with exceptional amenities</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">⛳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">TPC Golf Course</h3>
            <p className="text-gray-600">Access to world-class golf and resort-style living</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Schools</h3>
            <p className="text-gray-600">A-rated schools including Canyon Springs High School</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            © 2024 Dr. Jan Duffy Real Estate. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2">
            Nevada Real Estate License S.0197614
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
