import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "@/lib/icons";

interface FollowUpBossListing {
  id: string;
  address: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  imageUrl?: string;
  status: string;
  listingDate?: string;
}

export default function FollowUpBossListings() {
  const [listings, setListings] = useState<FollowUpBossListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/followup-boss/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      
      // Transform FollowUp Boss data to match our interface
      const transformedListings = data.map((item: any) => ({
        id: item.id,
        address: item.address || 'Address not available',
        price: item.listPrice || item.price || 0,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        sqft: item.squareFeet,
        imageUrl: item.photos?.[0]?.url,
        status: item.status || 'Active',
        listingDate: item.listDate
      }));
      
      setListings(transformedListings);
    } catch (err) {
      setError('Unable to load authentic listings at this time');
      console.error('FollowUp Boss API error:', err);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realscout-blue mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading authentic MLS listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Connect Your CRM for Live Listings
          </h3>
          <p className="text-yellow-700 text-sm">
            To display authentic property data, please ensure your FollowUp Boss CRM integration is properly configured.
          </p>
        </div>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No current listings available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {listing.imageUrl && (
            <img 
              src={listing.imageUrl} 
              alt={`Property at ${listing.address}`}
              className="w-full h-48 object-cover"
            />
          )}
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {formatPrice(listing.price)}
              </h3>
              <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                {listing.status}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.address}
            </p>
            
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              {listing.bedrooms && (
                <span className="flex items-center">
                  <span className="mr-1">🛏️</span>
                  {listing.bedrooms} bed
                </span>
              )}
              {listing.bathrooms && (
                <span className="flex items-center">
                  <span className="mr-1">🛁</span>
                  {listing.bathrooms} bath
                </span>
              )}
              {listing.sqft && (
                <span className="flex items-center">
                  <span className="mr-1">📐</span>
                  {listing.sqft.toLocaleString()} sqft
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1 bg-realscout-blue text-white hover:bg-realscout-navy">
                View Details
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}