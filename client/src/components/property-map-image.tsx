import React, { useState, useEffect } from 'react';
import { mapsStaticAPI, PropertyMapConfig } from '@/lib/maps-static-api';

interface PropertyMapImageProps {
  property: PropertyMapConfig;
  size?: 'small' | 'medium' | 'large' | 'thumbnail';
  className?: string;
  showTitle?: boolean;
  interactive?: boolean;
  onMapClick?: () => void;
}

export default function PropertyMapImage({
  property,
  size = 'medium',
  className = '',
  showTitle = true,
  interactive = false,
  onMapClick
}: PropertyMapImageProps) {
  const [mapUrl, setMapUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateMapImage();
  }, [property, size]);

  const generateMapImage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Generate responsive maps
      const maps = mapsStaticAPI.generateResponsiveMaps(property);
      const selectedMapUrl = maps[size];

      setMapUrl(selectedMapUrl);
    } catch (err) {
      console.error('Error generating map image:', err);
      setError('Failed to load map image');
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeClasses = () => {
    const sizeClasses = {
      small: 'w-64 h-48',
      medium: 'w-full h-64',
      large: 'w-full h-96',
      thumbnail: 'w-32 h-24'
    };
    return sizeClasses[size];
  };

  const getTitle = () => {
    if (!showTitle) return '';
    
    const typeLabels = {
      'luxury': 'Luxury Home',
      'golf-course': 'Golf Course Property',
      'new-construction': 'New Construction',
      'standard': 'Property'
    };

    const typeLabel = typeLabels[property.propertyType] || 'Property';
    return `${typeLabel} Location - ${property.address}`;
  };

  if (isLoading) {
    return (
      <div className={`${getSizeClasses()} ${className} bg-gray-200 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${getSizeClasses()} ${className} bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300`}>
        <div className="text-center p-4">
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm text-gray-600">Map unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative group`}>
      {showTitle && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {getTitle()}
          </h3>
          <p className="text-sm text-gray-600">
            {property.address}
          </p>
        </div>
      )}
      
      <div className={`${getSizeClasses()} relative overflow-hidden rounded-lg shadow-lg`}>
        <img
          src={mapUrl}
          alt={`Map showing location of ${property.address}`}
          className={`w-full h-full object-cover ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          loading="lazy"
          onClick={interactive ? onMapClick : undefined}
        />
        
        {/* Overlay for interactive maps */}
        {interactive && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Property type badge */}
        <div className="absolute top-2 right-2">
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

        {/* Price badge if available */}
        {property.price && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-semibold text-gray-900">
              ${property.price.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Map attribution */}
      <p className="text-xs text-gray-500 mt-1 text-center">
        Map data ©2024 Google
      </p>
    </div>
  );
}

// Convenience component for different property types
export function LuxuryPropertyMap({ property, ...props }: Omit<PropertyMapImageProps, 'property'> & { property: Omit<PropertyMapConfig, 'propertyType'> }) {
  return (
    <PropertyMapImage
      {...props}
      property={{ ...property, propertyType: 'luxury' }}
    />
  );
}

export function GolfCoursePropertyMap({ property, ...props }: Omit<PropertyMapImageProps, 'property'> & { property: Omit<PropertyMapConfig, 'propertyType'> }) {
  return (
    <PropertyMapImage
      {...props}
      property={{ ...property, propertyType: 'golf-course' }}
    />
  );
}

export function NewConstructionPropertyMap({ property, ...props }: Omit<PropertyMapImageProps, 'property'> & { property: Omit<PropertyMapConfig, 'propertyType'> }) {
  return (
    <PropertyMapImage
      {...props}
      property={{ ...property, propertyType: 'new-construction' }}
    />
  );
}
