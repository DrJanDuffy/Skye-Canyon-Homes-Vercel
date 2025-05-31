import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Bed, Bath, Square } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

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
    if (property.featured) {
      return <Badge className="bg-blue-100 text-blue-800">Featured</Badge>;
    }
    if (property.status === 'new') {
      return <Badge className="bg-green-100 text-green-800">New Listing</Badge>;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <img 
        src={property.imageUrl} 
        alt={`Property at ${property.address}`}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {formatPrice(property.price)}
            </h3>
            <p className="text-gray-600">{property.address}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{formatSqft(property.sqft)} sqft</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-realscout-blue text-white hover:bg-realscout-navy"
            onClick={() => window.location.href = `/property/${property.id}`}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`border-realscout-blue ${isFavorited ? 'bg-realscout-blue text-white' : 'text-realscout-blue'} hover:bg-realscout-blue hover:text-white`}
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
