import { Bath, Bed, MapPin, Phone, Square } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  type: string;
  status: string;
  imageUrl?: string;
  featured?: boolean;
}

export default function EnhancedPropertyFallback() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          throw new Error('Failed to fetch properties');
        }
      } catch (_err) {
        setError('Unable to load property listings');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Property Listings Available</h3>
          <p className="text-blue-700 mb-4">
            Current listings are available through direct contact with Dr. Jan Duffy.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => (window.location.href = 'tel:+17025001902')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call (702) 500-1902
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Featured Skye Canyon Properties
        </h3>
        <p className="text-gray-600">
          Authentic listings from Dr. Jan Duffy's portfolio • Updated daily
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              {property.imageUrl ? (
                <img
                  src={property.imageUrl}
                  alt={`Property at ${property.address}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-blue-500" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge className="bg-blue-600 text-white">{property.status}</Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formatPrice(property.price)}
              </div>

              <div className="text-gray-800 font-medium mb-3">{property.address}</div>

              {(property.bedrooms || property.bathrooms || property.sqft) && (
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {property.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.bedrooms} bed
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.bathrooms} bath
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      {property.sqft.toLocaleString()} sqft
                    </div>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-500 mb-3">{property.type}</div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = 'tel:+17025001902')}
              >
                Contact Dr. Jan Duffy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-600 mb-3">
          Ready to explore Skye Canyon properties? Contact Dr. Jan Duffy directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => (window.location.href = 'tel:+17025001902')}>
            <Phone className="w-4 h-4 mr-2" />
            (702) 500-1902
          </Button>
          <a href="https://g.co/kgs/nbUf6Pj" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Schedule Consultation</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
