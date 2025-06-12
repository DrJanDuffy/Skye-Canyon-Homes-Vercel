import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function GoogleBusinessProfile() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <>
      <Helmet>
        <meta name="google-site-verification" content="neighborhood-discovery-maps-integration" />
        <meta name="business.google_maps" content="enabled" />
      </Helmet>
      
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Skye Canyon Neighborhood
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amenities, schools, parks, and local attractions in the premier Skye Canyon community of Las Vegas, Nevada
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Neighborhood Map
              </h3>
              <p className="text-gray-600">
                Navigate local businesses, schools, parks, and community features that make Skye Canyon the perfect place to call home
              </p>
            </div>
            
            <div className="relative bg-gray-100" style={{ height: '500px', minHeight: '500px' }}>
              {!iframeLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading neighborhood map...</p>
                  </div>
                </div>
              )}
              
              {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Neighborhood Map</h3>
                    <p className="text-gray-600 mb-4">
                      Interactive map temporarily unavailable. Contact Dr. Jan Duffy for detailed neighborhood information.
                    </p>
                    <a 
                      href="/contact" 
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Get Neighborhood Info
                    </a>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://storage.googleapis.com/maps-solutions-63b8unfipc/neighborhood-discovery/h88f/neighborhood-discovery.html"
                  width="100%" 
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Skye Canyon Neighborhood Discovery Map - Las Vegas NV"
                  aria-label="Interactive map showing Skye Canyon neighborhood amenities, schools, parks, and local businesses"
                  allow="geolocation"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              )}
            </div>
            
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Parks & Recreation Areas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">A-Rated</div>
                  <div className="text-sm text-gray-600">Clark County Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">2 Miles</div>
                  <div className="text-sm text-gray-600">To Downtown Summerlin</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Powered by Google Maps • Real-time neighborhood data
            </p>
          </div>
        </div>
      </section>
    </>
  );
}