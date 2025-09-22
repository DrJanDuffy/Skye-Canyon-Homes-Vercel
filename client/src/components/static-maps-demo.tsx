import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedPropertyCard from '@/components/enhanced-property-card';
import PropertyMapImage from '@/components/property-map-image';
import { sampleProperties, getLuxuryProperties, getGolfCourseProperties, getNewConstructionProperties } from '@/data/sample-properties';
import { mapsStaticAPI } from '@/lib/maps-static-api';

export default function StaticMapsDemo() {
  const [selectedProperty, setSelectedProperty] = useState(sampleProperties[0]);
  const [mapType, setMapType] = useState<'property' | 'neighborhood' | 'directions'>('property');

  const luxuryProperties = getLuxuryProperties();
  const golfCourseProperties = getGolfCourseProperties();
  const newConstructionProperties = getNewConstructionProperties();

  const generateNeighborhoodMap = () => {
    return mapsStaticAPI.generateNeighborhoodMap(
      { lat: 36.3128948, lng: -115.3158838 },
      { size: '800x600', zoom: 14 }
    );
  };

  const generateDirectionsMap = () => {
    // From Las Vegas Strip to Skye Canyon
    return mapsStaticAPI.generateDirectionsMap(
      { lat: 36.1147, lng: -115.1728 }, // Las Vegas Strip
      { lat: 36.3128948, lng: -115.3158838 }, // Skye Canyon
      { size: '800x600' }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Google Maps Static API Integration Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience enhanced property listings with interactive static maps, custom markers, and location context for Skye Canyon real estate.
        </p>
      </div>

      <Tabs defaultValue="property-maps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="property-maps">Property Maps</TabsTrigger>
          <TabsTrigger value="luxury-homes">Luxury Homes</TabsTrigger>
          <TabsTrigger value="golf-course">Golf Course</TabsTrigger>
          <TabsTrigger value="new-construction">New Construction</TabsTrigger>
        </TabsList>

        <TabsContent value="property-maps" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Property Maps</CardTitle>
              <p className="text-gray-600">
                Click on any property to see its location on a custom static map with nearby amenities.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select a Property</h3>
                  <div className="space-y-2">
                    {sampleProperties.map((property) => (
                      <button
                        key={property.id}
                        onClick={() => setSelectedProperty(property)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedProperty.id === property.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{property.address}</div>
                        <div className="text-sm text-gray-600">
                          ${property.price.toLocaleString()} • {property.bedrooms} bed • {property.bathrooms} bath
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Map Display */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Location Map</h3>
                  <PropertyMapImage
                    property={{
                      address: selectedProperty.address,
                      coordinates: selectedProperty.coordinates,
                      propertyType: selectedProperty.propertyType,
                      price: selectedProperty.price,
                      bedrooms: selectedProperty.bedrooms,
                      bathrooms: selectedProperty.bathrooms
                    }}
                    size="large"
                    showTitle={true}
                    interactive={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Types Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Different Map Types</CardTitle>
              <p className="text-gray-600">
                Explore various map configurations for different use cases.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Property Detail Map</h4>
                  <img
                    src={mapsStaticAPI.generatePropertyMap({
                      address: selectedProperty.address,
                      coordinates: selectedProperty.coordinates,
                      propertyType: selectedProperty.propertyType,
                      price: selectedProperty.price
                    }, { size: '400x300', maptype: 'hybrid' })}
                    alt="Property map"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Neighborhood Overview</h4>
                  <img
                    src={generateNeighborhoodMap()}
                    alt="Neighborhood map"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Directions to Skye Canyon</h4>
                  <img
                    src={generateDirectionsMap()}
                    alt="Directions map"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="luxury-homes" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Luxury Homes with Custom Maps</CardTitle>
              <p className="text-gray-600">
                High-end properties with custom markers and enhanced map styling.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {luxuryProperties.map((property) => (
                  <EnhancedPropertyCard
                    key={property.id}
                    property={property}
                    showMap={true}
                    mapSize="medium"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="golf-course" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Golf Course Properties</CardTitle>
              <p className="text-gray-600">
                Properties with special golf course markers and nearby amenities.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {golfCourseProperties.map((property) => (
                  <EnhancedPropertyCard
                    key={property.id}
                    property={property}
                    showMap={true}
                    mapSize="medium"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-construction" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>New Construction Homes</CardTitle>
              <p className="text-gray-600">
                Brand new homes with construction markers and development context.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newConstructionProperties.map((property) => (
                  <EnhancedPropertyCard
                    key={property.id}
                    property={property}
                    showMap={true}
                    mapSize="medium"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Features Overview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Google Maps Static API Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Custom Markers</h3>
              <p className="text-sm text-gray-600">Property-specific markers with colors and labels</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">High-DPI Support</h3>
              <p className="text-sm text-gray-600">Crisp images on all devices and screen densities</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fast Loading</h3>
              <p className="text-sm text-gray-600">Static images load instantly without JavaScript</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Customizable</h3>
              <p className="text-sm text-gray-600">Multiple map types, sizes, and styling options</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
