import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, MapPin, DollarSign, Home, Users } from "lucide-react";

interface HeatmapData {
  neighborhood: string;
  coordinates: { lat: number; lng: number };
  priceRange: string;
  averagePrice: number;
  marketActivity: 'hot' | 'warm' | 'cool';
  daysOnMarket: number;
  priceChange: number;
  schoolRating: number;
  walkScore: number;
  crimeRating: 'low' | 'medium' | 'high';
  amenities: string[];
  recentSales: number;
}

interface LocalInsights {
  marketTrends: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    timeframe: string;
  };
  hotspots: string[];
  investmentOpportunity: 'high' | 'medium' | 'low';
  demographicInsights: {
    averageAge: number;
    familyFriendly: boolean;
    incomeLevel: 'high' | 'medium' | 'low';
  };
}

export default function NeighborhoodHeatmap() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [localInsights, setLocalInsights] = useState<LocalInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'price' | 'activity' | 'schools' | 'safety'>('price');

  useEffect(() => {
    fetchHeatmapData();
  }, []);

  const fetchHeatmapData = async () => {
    try {
      const response = await fetch('/api/neighborhood-heatmap');
      const data = await response.json();
      setHeatmapData(data.neighborhoods || []);
      setLocalInsights(data.insights || null);
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
      // Use sample data for demonstration
      setHeatmapData(sampleHeatmapData);
      setLocalInsights(sampleInsights);
    } finally {
      setIsLoading(false);
    }
  };

  const getHeatmapColor = (neighborhood: HeatmapData, viewType: string) => {
    switch (viewType) {
      case 'price':
        if (neighborhood.averagePrice > 1500000) return 'bg-red-500';
        if (neighborhood.averagePrice > 1000000) return 'bg-orange-500';
        if (neighborhood.averagePrice > 800000) return 'bg-yellow-500';
        return 'bg-green-500';
      case 'activity':
        if (neighborhood.marketActivity === 'hot') return 'bg-red-500';
        if (neighborhood.marketActivity === 'warm') return 'bg-orange-500';
        return 'bg-blue-500';
      case 'schools':
        if (neighborhood.schoolRating >= 9) return 'bg-green-500';
        if (neighborhood.schoolRating >= 7) return 'bg-yellow-500';
        return 'bg-red-500';
      case 'safety':
        if (neighborhood.crimeRating === 'low') return 'bg-green-500';
        if (neighborhood.crimeRating === 'medium') return 'bg-yellow-500';
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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

  const sampleHeatmapData: HeatmapData[] = [
    {
      neighborhood: "Skye Canyon",
      coordinates: { lat: 36.2469, lng: -115.3242 },
      priceRange: "$800K - $1.5M",
      averagePrice: 1250000,
      marketActivity: 'hot',
      daysOnMarket: 15,
      priceChange: 8.5,
      schoolRating: 9,
      walkScore: 45,
      crimeRating: 'low',
      amenities: ['Golf Course', 'Parks', 'Shopping', 'Hiking Trails'],
      recentSales: 24
    },
    {
      neighborhood: "Centennial Hills",
      coordinates: { lat: 36.2633, lng: -115.3086 },
      priceRange: "$700K - $1.2M",
      averagePrice: 950000,
      marketActivity: 'warm',
      daysOnMarket: 22,
      priceChange: 5.2,
      schoolRating: 8,
      walkScore: 52,
      crimeRating: 'low',
      amenities: ['Shopping Centers', 'Recreation', 'Schools'],
      recentSales: 18
    },
    {
      neighborhood: "Summerlin West",
      coordinates: { lat: 36.1716, lng: -115.3447 },
      priceRange: "$600K - $1.8M",
      averagePrice: 1100000,
      marketActivity: 'hot',
      daysOnMarket: 18,
      priceChange: 7.1,
      schoolRating: 9,
      walkScore: 48,
      crimeRating: 'low',
      amenities: ['Red Rock Canyon', 'Golf', 'Dining', 'Entertainment'],
      recentSales: 31
    },
    {
      neighborhood: "Mountains Edge",
      coordinates: { lat: 36.0853, lng: -115.3447 },
      priceRange: "$500K - $1.1M",
      averagePrice: 780000,
      marketActivity: 'warm',
      daysOnMarket: 28,
      priceChange: 4.3,
      schoolRating: 7,
      walkScore: 41,
      crimeRating: 'medium',
      amenities: ['Parks', 'Shopping', 'Community Centers'],
      recentSales: 15
    },
    {
      neighborhood: "Aliante",
      coordinates: { lat: 36.2897, lng: -115.2419 },
      priceRange: "$400K - $900K",
      averagePrice: 650000,
      marketActivity: 'cool',
      daysOnMarket: 35,
      priceChange: 2.1,
      schoolRating: 6,
      walkScore: 38,
      crimeRating: 'medium',
      amenities: ['Golf Course', 'Casino', 'Dining'],
      recentSales: 12
    }
  ];

  const sampleInsights: LocalInsights = {
    marketTrends: {
      direction: 'up',
      percentage: 6.2,
      timeframe: 'last 6 months'
    },
    hotspots: ['Skye Canyon', 'Summerlin West', 'Centennial Hills'],
    investmentOpportunity: 'high',
    demographicInsights: {
      averageAge: 42,
      familyFriendly: true,
      incomeLevel: 'high'
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Neighborhood Heat Map...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-6 h-6" />
            <span>Neighborhood Heat Map & Local Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price">Price Levels</TabsTrigger>
              <TabsTrigger value="activity">Market Activity</TabsTrigger>
              <TabsTrigger value="schools">School Ratings</TabsTrigger>
              <TabsTrigger value="safety">Safety Scores</TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapData.map((neighborhood) => (
                  <Card 
                    key={neighborhood.neighborhood}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedNeighborhood === neighborhood.neighborhood ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNeighborhood(neighborhood.neighborhood)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{neighborhood.neighborhood}</h3>
                        <div className={`w-4 h-4 rounded-full ${getHeatmapColor(neighborhood, activeView)}`}></div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{neighborhood.priceRange}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Avg Price:</span>
                          <span className="font-medium">{formatPrice(neighborhood.averagePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price Change:</span>
                          <span className={`font-medium flex items-center ${
                            neighborhood.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {neighborhood.priceChange > 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(neighborhood.priceChange)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapData.map((neighborhood) => (
                  <Card 
                    key={neighborhood.neighborhood}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedNeighborhood === neighborhood.neighborhood ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNeighborhood(neighborhood.neighborhood)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{neighborhood.neighborhood}</h3>
                        <Badge variant={
                          neighborhood.marketActivity === 'hot' ? 'destructive' :
                          neighborhood.marketActivity === 'warm' ? 'default' : 'secondary'
                        }>
                          {neighborhood.marketActivity}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Days on Market:</span>
                          <span className="font-medium">{neighborhood.daysOnMarket} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recent Sales:</span>
                          <span className="font-medium">{neighborhood.recentSales}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schools" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapData.map((neighborhood) => (
                  <Card 
                    key={neighborhood.neighborhood}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedNeighborhood === neighborhood.neighborhood ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNeighborhood(neighborhood.neighborhood)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{neighborhood.neighborhood}</h3>
                        <div className={`w-4 h-4 rounded-full ${getHeatmapColor(neighborhood, activeView)}`}></div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>School Rating:</span>
                          <span className="font-medium">{neighborhood.schoolRating}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Walk Score:</span>
                          <span className="font-medium">{neighborhood.walkScore}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatmapData.map((neighborhood) => (
                  <Card 
                    key={neighborhood.neighborhood}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedNeighborhood === neighborhood.neighborhood ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNeighborhood(neighborhood.neighborhood)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{neighborhood.neighborhood}</h3>
                        <Badge variant={
                          neighborhood.crimeRating === 'low' ? 'default' :
                          neighborhood.crimeRating === 'medium' ? 'secondary' : 'destructive'
                        }>
                          {neighborhood.crimeRating} crime
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-600">
                          Safety Score: {neighborhood.crimeRating === 'low' ? 'Excellent' : 
                                        neighborhood.crimeRating === 'medium' ? 'Good' : 'Fair'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Local Insights Panel */}
      {localInsights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>Local Market Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Market Trend</span>
                    {localInsights.marketTrends.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    +{localInsights.marketTrends.percentage}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {localInsights.marketTrends.timeframe}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Investment</span>
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className={`text-lg font-bold ${
                    localInsights.investmentOpportunity === 'high' ? 'text-green-600' :
                    localInsights.investmentOpportunity === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {localInsights.investmentOpportunity.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500">opportunity</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Demographics</span>
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold">
                    {localInsights.demographicInsights.averageAge} yrs
                  </div>
                  <div className="text-xs text-gray-500">
                    {localInsights.demographicInsights.familyFriendly ? 'Family-friendly' : 'Mixed demographics'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Hot Spots</span>
                    <Home className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-lg font-bold">
                    {localInsights.hotspots.length}
                  </div>
                  <div className="text-xs text-gray-500">active areas</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Top Performing Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {localInsights.hotspots.map((hotspot) => (
                  <Badge key={hotspot} variant="outline">
                    {hotspot}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Neighborhood View */}
      {selectedNeighborhood && (
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedNeighborhood} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const neighborhood = heatmapData.find(n => n.neighborhood === selectedNeighborhood);
              if (!neighborhood) return null;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Market Data</h4>
                      <div className="text-sm space-y-1">
                        <div>Average Price: {formatPrice(neighborhood.averagePrice)}</div>
                        <div>Days on Market: {neighborhood.daysOnMarket}</div>
                        <div>Recent Sales: {neighborhood.recentSales}</div>
                        <div className="flex items-center">
                          Price Change: 
                          <span className={`ml-1 flex items-center ${
                            neighborhood.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {neighborhood.priceChange > 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(neighborhood.priceChange)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Quality of Life</h4>
                      <div className="text-sm space-y-1">
                        <div>School Rating: {neighborhood.schoolRating}/10</div>
                        <div>Walk Score: {neighborhood.walkScore}</div>
                        <div>Safety: {neighborhood.crimeRating} crime rate</div>
                        <div>Market Activity: {neighborhood.marketActivity}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Local Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {neighborhood.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => setSelectedNeighborhood(null)} variant="outline">
                      Close Details
                    </Button>
                    <Button>
                      View Properties in {selectedNeighborhood}
                    </Button>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}