/**
 * Google Maps Static API utility functions
 * Generates static map images for property listings
 */

export interface StaticMapOptions {
  center: string; // "lat,lng" format
  zoom?: number;
  size: string; // "widthxheight" format
  maptype?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  markers?: StaticMapMarker[];
  paths?: StaticMapPath[];
  style?: string; // Custom map styling
  format?: 'png' | 'jpg' | 'gif' | 'webp';
  scale?: 1 | 2 | 4; // For high-DPI displays
}

export interface StaticMapMarker {
  location: string; // "lat,lng" format
  size?: 'tiny' | 'mid' | 'small' | 'normal';
  color?: string; // hex color code
  label?: string; // single character or number
  icon?: string; // custom icon URL
}

export interface StaticMapPath {
  points: string[]; // array of "lat,lng" strings
  weight?: number; // line weight in pixels
  color?: string; // hex color code
  fillcolor?: string; // hex color code for filled areas
  geodesic?: boolean; // true for curved lines
}

export interface PropertyMapConfig {
  address: string;
  coordinates: { lat: number; lng: number };
  propertyType: 'luxury' | 'golf-course' | 'new-construction' | 'standard';
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
}

class MapsStaticAPI {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate a static map URL for a property
   */
  generatePropertyMap(config: PropertyMapConfig, options: Partial<StaticMapOptions> = {}): string {
    const center = `${config.coordinates.lat},${config.coordinates.lng}`;
    
    // Default options for property maps
    const defaultOptions: StaticMapOptions = {
      center,
      zoom: 16,
      size: '600x400',
      maptype: 'hybrid',
      format: 'png',
      scale: 2, // High-DPI for crisp images
      markers: this.createPropertyMarkers(config),
      ...options
    };

    return this.buildMapUrl(defaultOptions);
  }

  /**
   * Create custom markers based on property type
   */
  private createPropertyMarkers(config: PropertyMapConfig): StaticMapMarker[] {
    const markers: StaticMapMarker[] = [];
    const location = `${config.coordinates.lat},${config.coordinates.lng}`;

    // Main property marker
    const mainMarker: StaticMapMarker = {
      location,
      size: 'normal',
      color: this.getPropertyTypeColor(config.propertyType),
      label: this.getPropertyTypeLabel(config.propertyType)
    };

    markers.push(mainMarker);

    // Add nearby amenities markers for context
    const nearbyAmenities = this.getNearbyAmenities(config.coordinates);
    markers.push(...nearbyAmenities);

    return markers;
  }

  /**
   * Get color based on property type
   */
  private getPropertyTypeColor(propertyType: string): string {
    const colors = {
      'luxury': '0x8B0000', // Dark red for luxury
      'golf-course': '0x228B22', // Forest green for golf course
      'new-construction': '0x4169E1', // Royal blue for new construction
      'standard': '0xDC143C' // Crimson for standard
    };
    return colors[propertyType as keyof typeof colors] || colors.standard;
  }

  /**
   * Get label based on property type
   */
  private getPropertyTypeLabel(propertyType: string): string {
    const labels = {
      'luxury': 'L',
      'golf-course': 'G',
      'new-construction': 'N',
      'standard': 'H'
    };
    return labels[propertyType as keyof typeof labels] || 'H';
  }

  /**
   * Get nearby amenities for context markers
   */
  private getNearbyAmenities(coordinates: { lat: number; lng: number }): StaticMapMarker[] {
    // Skye Canyon specific amenities
    const amenities = [
      {
        name: 'Desert Highlands Golf Course',
        location: '36.3128948,-115.3158838',
        color: '0x32CD32', // Lime green
        label: 'G'
      },
      {
        name: 'Skye Canyon Park',
        location: '36.3128948,-115.3158838',
        color: '0x87CEEB', // Sky blue
        label: 'P'
      },
      {
        name: 'Centennial Hills Hospital',
        location: '36.3128948,-115.3158838',
        color: '0xFF0000', // Red
        label: 'H'
      }
    ];

    return amenities.map(amenity => ({
      location: amenity.location,
      size: 'small' as const,
      color: amenity.color,
      label: amenity.label
    }));
  }

  /**
   * Generate a neighborhood overview map
   */
  generateNeighborhoodMap(center: { lat: number; lng: number }, options: Partial<StaticMapOptions> = {}): string {
    const defaultOptions: StaticMapOptions = {
      center: `${center.lat},${center.lng}`,
      zoom: 14,
      size: '800x600',
      maptype: 'roadmap',
      format: 'png',
      scale: 2,
      markers: [
        {
          location: `${center.lat},${center.lng}`,
          size: 'normal',
          color: '0x0000FF',
          label: 'S'
        }
      ],
      ...options
    };

    return this.buildMapUrl(defaultOptions);
  }

  /**
   * Generate a directions map showing route to property
   */
  generateDirectionsMap(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    options: Partial<StaticMapOptions> = {}
  ): string {
    const path: StaticMapPath = {
      points: [
        `${origin.lat},${origin.lng}`,
        `${destination.lat},${destination.lng}`
      ],
      weight: 4,
      color: '0x0000FF',
      geodesic: true
    };

    const defaultOptions: StaticMapOptions = {
      center: `${(origin.lat + destination.lat) / 2},${(origin.lng + destination.lng) / 2}`,
      zoom: 12,
      size: '600x400',
      maptype: 'roadmap',
      format: 'png',
      scale: 2,
      paths: [path],
      markers: [
        {
          location: `${origin.lat},${origin.lng}`,
          size: 'normal',
          color: '0x00FF00',
          label: 'A'
        },
        {
          location: `${destination.lat},${destination.lng}`,
          size: 'normal',
          color: '0xFF0000',
          label: 'B'
        }
      ],
      ...options
    };

    return this.buildMapUrl(defaultOptions);
  }

  /**
   * Build the complete Google Maps Static API URL
   */
  private buildMapUrl(options: StaticMapOptions): string {
    const params = new URLSearchParams();
    
    params.append('center', options.center);
    params.append('zoom', options.zoom?.toString() || '14');
    params.append('size', options.size);
    params.append('maptype', options.maptype || 'roadmap');
    params.append('format', options.format || 'png');
    params.append('scale', options.scale?.toString() || '1');
    params.append('key', this.apiKey);

    // Add markers
    if (options.markers && options.markers.length > 0) {
      options.markers.forEach(marker => {
        let markerParam = `markers=`;
        if (marker.size) markerParam += `size:${marker.size}|`;
        if (marker.color) markerParam += `color:${marker.color}|`;
        if (marker.label) markerParam += `label:${marker.label}|`;
        if (marker.icon) markerParam += `icon:${encodeURIComponent(marker.icon)}|`;
        markerParam += marker.location;
        params.append('markers', markerParam);
      });
    }

    // Add paths
    if (options.paths && options.paths.length > 0) {
      options.paths.forEach(path => {
        let pathParam = `path=`;
        if (path.weight) pathParam += `weight:${path.weight}|`;
        if (path.color) pathParam += `color:${path.color}|`;
        if (path.fillcolor) pathParam += `fillcolor:${path.fillcolor}|`;
        if (path.geodesic) pathParam += `geodesic:${path.geodesic}|`;
        pathParam += path.points.join('|');
        params.append('path', pathParam);
      });
    }

    // Add custom styling
    if (options.style) {
      params.append('style', options.style);
    }

    return `${this.baseUrl}?${params.toString()}`;
  }

  /**
   * Generate multiple map sizes for responsive design
   */
  generateResponsiveMaps(config: PropertyMapConfig): {
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  } {
    return {
      small: this.generatePropertyMap(config, { size: '300x200' }),
      medium: this.generatePropertyMap(config, { size: '600x400' }),
      large: this.generatePropertyMap(config, { size: '800x600' }),
      thumbnail: this.generatePropertyMap(config, { size: '150x100', zoom: 15 })
    };
  }
}

// Export singleton instance
export const mapsStaticAPI = new MapsStaticAPI('AIzaSyDt84u_m6IGyrNZ9Eyc2W0fAIx6yD3peTo');

// Export types and class for external use
export { MapsStaticAPI };
export type { StaticMapOptions, StaticMapMarker, StaticMapPath, PropertyMapConfig };
