import React, { useState } from 'react';
import { Heart, Bed, Bath, Square, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PropertyMapImage, { PropertyMapConfig } from '@/components/property-map-image';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: string;
  imageUrl?: string;
  featured?: boolean;
  coordinates?: { lat: number; lng: number };
  propertyType?: 'luxury' | 'golf-course' | 'new-construction' | 'standard';
  description?: string;
  yearBuilt?: number;
  lotSize?: number;
  mlsId?: string;
}

interface EnhancedPropertyCardProps {
  property: Property;
  showMap?: boolean;
  mapSize?: 'small' | 'medium' | 'large' | 'thumbnail';
  className?: string;
  onViewDetails?: (property: Property) => void;
  onFavorite?: (property: Property) => void;
}

export default function EnhancedPropertyCard({
  property,
  showMap = true,
  mapSize = 'medium',
  className = '',
  onViewDetails,
  onFavorite
}: EnhancedPropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSqft = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const getStatusBadge = () => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Sold': 'bg-gray-100 text-gray-800',
      'New': 'bg-blue-100 text-blue-800',
      'Featured': 'bg-purple-100 text-purple-800'
    };

    const colorClass = statusColors[property.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {property.status}
      </span>
    );
  };

  const getPropertyTypeColor = () => {
    const colors = {
      'luxury': 'border-red-200 bg-red-50',
      'golf-course': 'border-green-200 bg-green-50',
      'new-construction': 'border-blue-200 bg-blue-50',
      'standard': 'border-gray-200 bg-gray-50'
    };
    return colors[property.propertyType || 'standard'];
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(property);
    } else {
      window.location.href = `/property/${property.id}`;
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) {
      onFavorite(property);
    }
  };

  // Create property map config if coordinates are available
  const propertyMapConfig: PropertyMapConfig | null = property.coordinates ? {
    address: property.address,
    coordinates: property.coordinates,
    propertyType: property.propertyType || 'standard',
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms
  } : null;

  return (
    <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${getPropertyTypeColor()} ${className}`}>
      {/* Property Image */}
      <div className="relative h-64">
        <img
          src={property.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=75'}
          alt={property.address}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {getStatusBadge()}
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Property Type Badge */}
        {property.propertyType && property.propertyType !== 'standard' && (
          <div className="absolute bottom-4 left-4">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              property.propertyType === 'luxury' ? 'bg-red-600' :
              property.propertyType === 'golf-course' ? 'bg-green-600' :
              property.propertyType === 'new-construction' ? 'bg-blue-600' :
              'bg-gray-600'
            }`}>
              {property.propertyType === 'luxury' ? 'Luxury' :
               property.propertyType === 'golf-course' ? 'Golf Course' :
               property.propertyType === 'new-construction' ? 'New Build' :
               'Property'}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <CardContent className="p-6">
        {/* Price and Address */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {formatPrice(property.price)}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.address}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatSqft(property.sqft)} sqft</span>
          </div>
        </div>

        {/* Additional Details */}
        {(property.yearBuilt || property.lotSize) && (
          <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
            {property.yearBuilt && (
              <span>Built {property.yearBuilt}</span>
            )}
            {property.lotSize && (
              <span>Lot: {property.lotSize.toLocaleString()} sqft</span>
            )}
          </div>
        )}

        {/* Description */}
        {property.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Static Map */}
        {showMap && propertyMapConfig && (
          <div className="mb-4">
            <PropertyMapImage
              property={propertyMapConfig}
              size={mapSize}
              showTitle={false}
              interactive={true}
              onMapClick={() => setShowFullMap(true)}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handleViewDetails}
            className="flex-1 bg-realscout-blue text-white hover:bg-realscout-navy"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-realscout-blue text-realscout-blue hover:bg-realscout-blue hover:text-white"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`, '_blank')}
            title="View on Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* MLS ID */}
        {property.mlsId && (
          <p className="text-xs text-gray-500 mt-2">
            MLS# {property.mlsId}
          </p>
        )}
      </CardContent>

      {/* Full Map Modal */}
      {showFullMap && propertyMapConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Property Location</h3>
              <button
                onClick={() => setShowFullMap(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Close map"
                aria-label="Close map"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <PropertyMapImage
                property={propertyMapConfig}
                size="large"
                showTitle={true}
                interactive={false}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
