import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Home, Calendar, DollarSign, BarChart3 } from "lucide-react";

// June 2025 Las Vegas Market Analysis Component
export default function MarketAnalysisJune2025() {
  const marketData = {
    medianPrice: {
      current: 485000,
      previous: 480000,
      yearOverYear: 2.4,
      display: "$485,000"
    },
    daysOnMarket: {
      current: 49,
      previous: 34,
      change: 15,
      trend: "up"
    },
    activeListings: {
      current: 7150,
      yearOverYear: 49.3,
      trend: "up"
    },
    inventory: {
      months: 3.4,
      previous: 2.95,
      status: "balanced"
    },
    condoPrice: {
      current: 293000,
      yearOverYear: 6.5,
      display: "$293,000"
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Las Vegas Market Analysis - June 2025
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Current market trends for Las Vegas and Skye Canyon real estate
          </p>
          <p className="text-sm text-gray-500">
            Data sourced from Las Vegas REALTORS® and Clark County MLS
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Median Home Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.medianPrice.display}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{marketData.medianPrice.yearOverYear}% YoY
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Single-family homes in Las Vegas metro
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days on Market</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.daysOnMarket.current} days</div>
              <div className="flex items-center text-xs text-orange-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{marketData.daysOnMarket.change} days from last year
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average time to sell
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.activeListings.current.toLocaleString()}</div>
              <div className="flex items-center text-xs text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{marketData.activeListings.yearOverYear}% YoY
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Homes available for sale
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Inventory</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.inventory.months} months</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Moving toward balance
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supply at current sales pace
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends - June 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Price Stability</h4>
                  <p className="text-gray-700 text-sm">
                    Las Vegas median home prices have stabilized at <strong>$485,000</strong> for single-family homes, 
                    with modest 2.4% year-over-year growth indicating a balanced market.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Increased Inventory</h4>
                  <p className="text-gray-700 text-sm">
                    Active listings surged 49.3% year-over-year to <strong>7,150 homes</strong>, providing buyers 
                    with significantly more options compared to the constrained inventory of 2024.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Market Balance</h4>
                  <p className="text-gray-700 text-sm">
                    With 3.4 months of inventory (up from 2.95 months), the market is moving toward the 
                    4-6 month range considered balanced between buyers and sellers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skye Canyon Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Community Positioning</h4>
                  <p className="text-gray-700 text-sm">
                    Skye Canyon home values typically align with or exceed the Las Vegas metro median, 
                    reflecting the community's premium amenities and master-planned design.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Condo/Townhome Market</h4>
                  <p className="text-gray-700 text-sm">
                    Condominiums and townhomes show strong performance at <strong>$293,000</strong> median, 
                    with 6.5% year-over-year appreciation outpacing single-family homes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Buyer Opportunities</h4>
                  <p className="text-gray-700 text-sm">
                    Extended days on market (49 days) and increased inventory create favorable conditions 
                    for buyers to negotiate and find their ideal Skye Canyon home.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>Market Outlook - Summer 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Balanced Market</h4>
                <p className="text-sm text-gray-600">
                  Continued inventory growth expected to create more balanced conditions through summer 2025.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Price Moderation</h4>
                <p className="text-sm text-gray-600">
                  Modest price appreciation expected as market stabilizes with increased supply.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Home className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Buyer Advantage</h4>
                <p className="text-sm text-gray-600">
                  More choices and negotiation power for buyers in premium communities like Skye Canyon.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Navigate the Las Vegas Market?
          </h3>
          <p className="text-gray-600 mb-6">
            Get expert guidance from Dr. Jan Duffy for buying or selling in today's market conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+17025001902"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Call (702) 500-1902
            </a>
            <a 
              href="/properties"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              View Available Properties
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}