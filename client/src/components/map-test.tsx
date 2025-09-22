import React, { useState, useEffect } from 'react';
import { mapsStaticAPI } from '@/lib/maps-static-api';

export default function MapTest() {
  const [mapUrl, setMapUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateTestMap();
  }, []);

  const generateTestMap = async () => {
    try {
      setLoading(true);
      setError(null);

      // Generate a simple test map for Skye Canyon
      const testMapUrl = mapsStaticAPI.generatePropertyMap({
        address: '1234 Desert Highlands Dr, Las Vegas, NV 89166',
        coordinates: { lat: 36.3128948, lng: -115.3158838 },
        propertyType: 'golf-course',
        price: 1250000,
        bedrooms: 5,
        bathrooms: 4
      }, {
        size: '600x400',
        maptype: 'hybrid',
        zoom: 16
      });

      console.log('Generated map URL:', testMapUrl);
      setMapUrl(testMapUrl);
    } catch (err) {
      console.error('Error generating test map:', err);
      setError('Failed to generate map');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Map Test - Loading...</h3>
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Generating map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Map Test - Error</h3>
        <div className="w-full h-64 bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
          <div className="text-center">
            <svg className="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-600">{error}</p>
            <button 
              onClick={generateTestMap}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Map Test - Success!</h3>
      <div className="space-y-4">
        <img
          src={mapUrl}
          alt="Test map of Skye Canyon property"
          className="w-full h-64 object-cover rounded-lg border"
          onError={() => setError('Failed to load map image')}
        />
        <div className="text-sm text-gray-600">
          <p><strong>Map URL:</strong></p>
          <p className="break-all text-xs bg-gray-100 p-2 rounded">{mapUrl}</p>
        </div>
        <button 
          onClick={generateTestMap}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate New Map
        </button>
      </div>
    </div>
  );
}
