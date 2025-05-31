import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Camera,
  Car,
  Trees,
  Wifi
} from "lucide-react";
import Footer from "@/components/footer";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const params = useParams();
  const id = params.id;
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ['/api/properties', id],
    enabled: !!id,
  });

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

  const formatId = (id: number | undefined) => {
    if (!id) return '000000';
    return id.toString().padStart(6, '0');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600">The property you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Image */}
      <div className="relative h-96 lg:h-[500px]">
        <img 
          src={property.imageUrl} 
          alt={`Property at ${property.address}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {formatPrice(property.price)}
              </h1>
              <p className="text-xl flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {property.address}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Property Details</CardTitle>
                    {property.featured && (
                      <Badge className="mt-2 bg-blue-100 text-blue-800">Featured Property</Badge>
                    )}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {property.status === 'active' ? 'Active' : property.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-realscout-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-realscout-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-8 h-8 text-realscout-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold">{formatSqft(property.sqft)}</div>
                    <div className="text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-realscout-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold">2024</div>
                    <div className="text-gray-600">Year Built</div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Interior Features</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <Wifi className="w-4 h-4 mr-2 text-realscout-blue" />
                        Smart Home Technology
                      </li>
                      <li className="flex items-center">
                        <Camera className="w-4 h-4 mr-2 text-realscout-blue" />
                        Upgraded Kitchen
                      </li>
                      <li className="flex items-center">
                        <Square className="w-4 h-4 mr-2 text-realscout-blue" />
                        Premium Finishes
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Exterior Features</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <Car className="w-4 h-4 mr-2 text-realscout-blue" />
                        3-Car Garage
                      </li>
                      <li className="flex items-center">
                        <Trees className="w-4 h-4 mr-2 text-realscout-blue" />
                        Landscaped Backyard
                      </li>
                      <li className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-realscout-blue" />
                        Mountain Views
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Agent */}
            <Card className="mb-8 sticky top-4">
              <CardHeader>
                <CardTitle>Contact Dr. Jan Duffy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                    alt="Dr. Jan Duffy" 
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg">Dr. Jan Duffy</h3>
                  <p className="text-gray-600">REALTOR® | Skye Canyon Specialist</p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-realscout-blue text-white hover:bg-realscout-navy">
                    <Phone className="w-4 h-4 mr-2" />
                    Call (702) 555-0123
                  </Button>
                  <Button variant="outline" className="w-full border-realscout-blue text-realscout-blue hover:bg-realscout-blue hover:text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Showing
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 text-center">
                    Available 7 days a week for showings and consultations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Property Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Property Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">Single Family</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Size:</span>
                    <span className="font-medium">0.25 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">HOA Fees:</span>
                    <span className="font-medium">$250/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Tax:</span>
                    <span className="font-medium">$12,850/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MLS #:</span>
                    <span className="font-medium">SC{formatId(property.id)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}