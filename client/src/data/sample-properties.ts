/**
 * Sample Skye Canyon properties with coordinates for Google Maps integration
 */

export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: string;
  imageUrl?: string;
  featured?: boolean;
  coordinates: { lat: number; lng: number };
  propertyType: 'luxury' | 'golf-course' | 'new-construction' | 'standard';
  description?: string;
  yearBuilt?: number;
  lotSize?: number;
  mlsId?: string;
}

export const sampleProperties: Property[] = [
  {
    id: 'skye-canyon-001',
    address: '1234 Desert Highlands Dr, Las Vegas, NV 89166',
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    status: 'Active',
    featured: true,
    coordinates: { lat: 36.3128948, lng: -115.3158838 },
    propertyType: 'golf-course',
    description: 'Stunning golf course home with panoramic views of the Desert Highlands Golf Course. Features open concept living, gourmet kitchen, and master suite with private balcony.',
    yearBuilt: 2020,
    lotSize: 12000,
    mlsId: 'SC001234',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skye-canyon-002',
    address: '5678 Skye Canyon Blvd, Las Vegas, NV 89166',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    status: 'Active',
    coordinates: { lat: 36.3148948, lng: -115.3178838 },
    propertyType: 'luxury',
    description: 'Modern luxury home in the heart of Skye Canyon. Features high-end finishes, smart home technology, and resort-style backyard with pool.',
    yearBuilt: 2022,
    lotSize: 8000,
    mlsId: 'SC002345',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skye-canyon-003',
    address: '9012 Canyon View Dr, Las Vegas, NV 89166',
    price: 950000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3800,
    status: 'New',
    coordinates: { lat: 36.3108948, lng: -115.3138838 },
    propertyType: 'new-construction',
    description: 'Brand new construction home with contemporary design and energy-efficient features. Quick move-in available with premium upgrades included.',
    yearBuilt: 2024,
    lotSize: 9000,
    mlsId: 'SC003456',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skye-canyon-004',
    address: '3456 Eagle Canyon Way, Las Vegas, NV 89166',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2800,
    status: 'Active',
    coordinates: { lat: 36.3168948, lng: -115.3198838 },
    propertyType: 'standard',
    description: 'Beautiful single-story home perfect for families. Features open floor plan, updated kitchen, and spacious backyard.',
    yearBuilt: 2018,
    lotSize: 7000,
    mlsId: 'SC004567',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skye-canyon-005',
    address: '7890 Skye View Ln, Las Vegas, NV 89166',
    price: 1100000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4500,
    status: 'Active',
    featured: true,
    coordinates: { lat: 36.3088948, lng: -115.3118838 },
    propertyType: 'golf-course',
    description: 'Exceptional golf course estate with stunning mountain and course views. Features custom finishes, wine cellar, and outdoor entertainment area.',
    yearBuilt: 2019,
    lotSize: 15000,
    mlsId: 'SC005678',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skye-canyon-006',
    address: '2345 Starlight Dr, Las Vegas, NV 89166',
    price: 680000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    status: 'Active',
    coordinates: { lat: 36.3188948, lng: -115.3218838 },
    propertyType: 'new-construction',
    description: 'Charming new construction home with modern amenities and energy-efficient design. Perfect for first-time buyers or downsizing.',
    yearBuilt: 2024,
    lotSize: 6000,
    mlsId: 'SC006789',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Helper function to get properties by type
export const getPropertiesByType = (type: Property['propertyType']): Property[] => {
  return sampleProperties.filter(property => property.propertyType === type);
};

// Helper function to get featured properties
export const getFeaturedProperties = (): Property[] => {
  return sampleProperties.filter(property => property.featured);
};

// Helper function to get properties by price range
export const getPropertiesByPriceRange = (min: number, max: number): Property[] => {
  return sampleProperties.filter(property => property.price >= min && property.price <= max);
};

// Helper function to get luxury properties (over $800k)
export const getLuxuryProperties = (): Property[] => {
  return sampleProperties.filter(property => property.price >= 800000);
};

// Helper function to get golf course properties
export const getGolfCourseProperties = (): Property[] => {
  return sampleProperties.filter(property => property.propertyType === 'golf-course');
};

// Helper function to get new construction properties
export const getNewConstructionProperties = (): Property[] => {
  return sampleProperties.filter(property => property.propertyType === 'new-construction');
};
