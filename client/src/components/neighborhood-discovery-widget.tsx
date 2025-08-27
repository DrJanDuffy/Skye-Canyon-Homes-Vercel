import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Phone, Globe, Car, ArrowLeft, ExpandMore } from 'lucide-react';

interface Place {
  placeId: string;
  name?: string;
  type?: string;
  address?: string;
  photos?: Array<{
    urlSmall: string;
    urlLarge: string;
    attrs: string;
  }>;
  duration?: {
    text: string;
  };
  website?: string;
  phoneNumber?: string;
  openingHours?: Array<{
    days: string;
    hours: string;
  }>;
  coords?: google.maps.LatLng;
  marker?: google.maps.Marker;
}

interface NeighborhoodDiscoveryWidgetProps {
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function NeighborhoodDiscoveryWidget({ className = '' }: NeighborhoodDiscoveryWidgetProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showMorePlaces, setShowMorePlaces] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Skye Canyon specific configuration
  const CONFIGURATION = {
    center: { lat: 36.3128948, lng: -115.3158838 }, // Skye Canyon area
    mapRadius: 5000, // 5km radius
    pois: [
      { placeId: "ChIJX-jseeTsyIAR6QrEO_B-sqw" }, // Example POI
      { placeId: "ChIJZ1-wi1OTyIARSDAe3l4PNDo" },
      { placeId: "ChIJaRg1jXyNyIARqzugwiqqzck" },
      { placeId: "ChIJb4xNsLXsyIARGXVDQzStwL8" },
      { placeId: "ChIJF7CqIqrsyIAR3qVqTp2DaZE" },
      { placeId: "ChIJoTYTSs2TyIARChKGxHd9gK8" },
      { placeId: "ChIJfcEu_TaTyIARvo-wVZLgD1o" },
      { placeId: "ChIJ5e6CksvsyIARu5ACQNK2Rw4" },
      { placeId: "ChIJkWrzm02TyIARbXi741XQeeQ" },
      { placeId: "ChIJ_1vHD7XsyIARGWpcyHeDn38" },
      { placeId: "ChIJTxjwxsjsyIAR9ikmMng0wZU" },
      { placeId: "ChIJbZJC-jPtyIARPpFFjLdftMM" },
      { placeId: "ChIJlwDuKXSTyIARLZmOMjQ9jXA" },
      { placeId: "ChIJmVa01xCTyIARN4zn9YtA5FM" },
      { placeId: "ChIJS4ibrGSTyIARs5_olkBgSLo" },
      { placeId: "ChIJ2_h-uQ2TyIARGINpOirByZY" }
    ],
    apiKey: 'AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo'
  };

  useEffect(() => {
    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIGURATION.apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup
      if (map) {
        // Remove markers and clear map
        places.forEach(place => {
          if (place.marker) {
            place.marker.setMap(null);
          }
        });
      }
    };
  }, []);

  const initializeMap = (): void => {
    if (!mapRef.current || !window.google) {
      return;
    }

    const mapOptions = {
      center: CONFIGURATION.center,
      zoom: 16,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      maxZoom: 20,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Initialize places
    initializePlaces(newMap);
  };

  const initializePlaces = async (mapInstance: google.maps.Map): Promise<void> => {
    if (!mapInstance) {
      return;
    }

    const placesService = new window.google.maps.places.PlacesService(mapInstance);
    const newPlaces: Place[] = [];

    for (const poi of CONFIGURATION.pois) {
      try {
        const place = await getPlaceDetails(placesService, poi.placeId);
        if (place) {
          newPlaces.push(place);
          addMarkerToMap(place, mapInstance);
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    }

    setPlaces(newPlaces);
    setIsLoading(false);
  };

  const getPlaceDetails = (service: google.maps.places.PlacesService, placeId: string): Promise<Place> => {
    return new Promise((resolve, reject) => {
      const request = {
        placeId: placeId,
        fields: ['name', 'types', 'geometry', 'formatted_address', 'photos', 'website', 'formatted_phone_number', 'opening_hours']
      };

      service.getDetails(request, (result: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const place: Place = {
            placeId: placeId,
            name: result.name,
            type: result.types ? formatPlaceType(result.types[0]) : 'Place',
            address: result.formatted_address,
            coords: result.geometry?.location,
            photos: result.photos ? result.photos.slice(0, 3).map((photo: google.maps.places.PlacePhoto) => ({
              urlSmall: photo.getUrl({ maxWidth: 200, maxHeight: 200 }),
              urlLarge: photo.getUrl({ maxWidth: 1200, maxHeight: 1200 }),
              attrs: photo.html_attributions?.join(', ') || ''
            })) : [],
            website: result.website,
            phoneNumber: result.formatted_phone_number,
            openingHours: result.opening_hours ? parseOpeningHours(result.opening_hours) : undefined
          };
          resolve(place);
        } else {
          reject(new Error(`Place details failed: ${status}`));
        }
      });
    });
  };

  const addMarkerToMap = (place: Place, mapInstance: google.maps.Map) => {
    if (!place.coords) return;

    const marker = new window.google.maps.Marker({
      position: place.coords,
      map: mapInstance,
      title: place.name,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#EA4335',
        fillOpacity: 1,
        strokeColor: '#C5221F',
        strokeWeight: 2,
      },
    });

    marker.addListener('click', () => {
      setSelectedPlace(place);
      mapInstance.panTo(place.coords);
      mapInstance.setZoom(18);
    });

    place.marker = marker;
  };

  const formatPlaceType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ');
  };

  const parseOpeningHours = (openingHours: any): Array<{ days: string; hours: string }> => {
    if (!openingHours.weekday_text) return [];
    
    return openingHours.weekday_text.map((text: string) => {
      const [day, hours] = text.split(': ');
      return { days: day, hours: hours || '' };
    });
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    if (place.coords && map) {
      map.panTo(place.coords);
      map.setZoom(18);
    }
  };

  const handleBackToPlaces = () => {
    setSelectedPlace(null);
  };

  const displayedPlaces = showMorePlaces ? places : places.slice(0, 8);

  if (isLoading) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realscout-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading neighborhood information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center text-2xl">
            <MapPin className="w-6 h-6 mr-2 text-realscout-blue" />
            Skye Canyon Neighborhood Explorer
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Discover nearby amenities, restaurants, schools, and attractions around Skye Canyon
          </p>
        </CardHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Places Panel */}
          <div className="bg-white p-4 max-h-96 overflow-y-auto">
            {!selectedPlace ? (
              <>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search nearby places..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-realscout-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {displayedPlaces.map((place, index) => (
                    <div
                      key={place.placeId}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-realscout-blue hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <div className="flex-shrink-0 w-16 h-16 mr-3">
                        {place.photos && place.photos[0] ? (
                          <img
                            src={place.photos[0].urlSmall}
                            alt={place.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{place.name}</h3>
                        <p className="text-sm text-gray-600">{place.type}</p>
                        {place.duration && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Car className="w-3 h-3 mr-1" />
                            {place.duration.text}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {places.length > 8 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowMorePlaces(!showMorePlaces)}
                      className="flex items-center"
                    >
                      {showMorePlaces ? 'Show Less' : 'Show More'}
                      <ExpandMore className={`w-4 h-4 ml-2 transition-transform ${showMorePlaces ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Place Details Panel */
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToPlaces}
                  className="flex items-center text-realscout-blue hover:text-realscout-navy"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Places
                </Button>

                <div className="text-center">
                  {selectedPlace.photos && selectedPlace.photos[0] && (
                    <img
                      src={selectedPlace.photos[0].urlLarge}
                      alt={selectedPlace.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedPlace.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedPlace.type}</p>
                  
                  {selectedPlace.address && (
                    <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedPlace.address}
                    </div>
                  )}
                  
                  {selectedPlace.duration && (
                    <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                      <Car className="w-4 h-4 mr-2" />
                      {selectedPlace.duration.text} drive from Skye Canyon
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedPlace.website && (
                    <a
                      href={selectedPlace.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-realscout-blue transition-colors"
                    >
                      <Globe className="w-4 h-4 mr-3 text-realscout-blue" />
                      <span className="text-sm">Visit Website</span>
                    </a>
                  )}
                  
                  {selectedPlace.phoneNumber && (
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <Phone className="w-4 h-4 mr-3 text-realscout-blue" />
                      <span className="text-sm">{selectedPlace.phoneNumber}</span>
                    </div>
                  )}
                  
                  {selectedPlace.openingHours && (
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-2 text-realscout-blue" />
                        <span className="text-sm font-medium">Opening Hours</span>
                      </div>
                      <div className="space-y-1">
                        {selectedPlace.openingHours.map((hours, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-600">{hours.days}</span>
                            <span className="text-gray-900">{hours.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Map Panel */}
          <div className="bg-gray-100">
            <div
              ref={mapRef}
              className="w-full h-96 lg:h-full min-h-96"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
