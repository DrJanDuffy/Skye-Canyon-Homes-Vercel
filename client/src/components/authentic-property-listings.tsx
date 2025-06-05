import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Bed, Bath, Square, AlertCircle, ExternalLink } from "lucide-react";

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: string;
  sqft: number;
  description: string;
  imageUrl: string;
  status: string;
  featured: boolean;
}

export default function AuthenticPropertyListings() {
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties']
  });

  const { data: featuredProperties = [] } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured']
  });

  // If no authentic properties are available, show professional message
  if (!isLoading && properties.length === 0) {
    return (
      <div className="space-y-6">
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <div className="space-y-3">
              <p className="font-semibold">Live Property Listings Coming Soon</p>
              <p>We're currently connecting to MLS data sources to provide you with authentic, up-to-date Skye Canyon property listings. In the meantime:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-orange-700 dark:text-orange-300"
                    onClick={() => window.open('http://drjanduffy.realscout.com/onboarding', '_blank')}
                  >
                    Browse Current Listings on RealScout
                  </Button>
                </div>
                <p className="text-sm">Use our AI search below for real market insights and property information</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Market Insights Card */}
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Skye Canyon Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 dark:text-blue-300">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Current Market Trends</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Median home price: $573,000</li>
                  <li>• Year-over-year growth: +7.6%</li>
                  <li>• Average days on market: 25-35 days</li>
                  <li>• Price range: $450K - $2.5M+</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Popular Features</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Mountain and city views</li>
                  <li>• Modern smart home features</li>
                  <li>• Resort-style backyards</li>
                  <li>• Proximity to TPC Las Vegas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Properties */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {featuredProperties.length > 0 ? 'More Properties' : 'Available Properties'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.filter(p => !p.featured).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property, featured = false }: { property: Property; featured?: boolean }) {
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

  return (
    <Card className={`hover:shadow-lg transition-shadow ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {featured && (
        <Badge className="absolute top-2 left-2 z-10 bg-blue-600 hover:bg-blue-700">
          Featured
        </Badge>
      )}
      
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.address}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
        <Badge 
          variant={property.status === 'active' ? 'default' : 'secondary'}
          className="absolute bottom-2 right-2"
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{property.address}</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{formatSqft(property.sqft)} sqft</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {property.description}
          </p>

          <Button 
            className="w-full" 
            onClick={() => window.open('http://drjanduffy.realscout.com/onboarding', '_blank')}
          >
            View Details on RealScout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}