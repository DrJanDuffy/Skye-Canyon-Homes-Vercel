import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MarketStats } from "@shared/schema";

export default function MarketStats() {
  const { data: stats, isLoading, error } = useQuery<MarketStats>({
    queryKey: ['/api/market-stats'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skye Canyon Market Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center bg-blue-50 rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skye Canyon Market Insights
            </h2>
            <p className="text-red-600">Failed to load market statistics. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sky Canyon Market Insights
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with the latest market trends and statistics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center bg-blue-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-realscout-blue mb-2">{stats.medianPrice}</div>
            <div className="text-gray-600 text-sm mb-1">Median Sale Price</div>
            <div className="text-green-600 text-xs flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% vs last year
            </div>
          </div>
          
          <div className="text-center bg-green-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-realscout-blue mb-2">{stats.daysOnMarket}</div>
            <div className="text-gray-600 text-sm mb-1">Avg Days on Market</div>
            <div className="text-green-600 text-xs flex items-center justify-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              -12% vs last year
            </div>
          </div>
          
          <div className="text-center bg-purple-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-realscout-blue mb-2">{stats.homesSold}</div>
            <div className="text-gray-600 text-sm mb-1">Homes Sold YTD</div>
            <div className="text-green-600 text-xs flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.3% vs last year
            </div>
          </div>
          
          <div className="text-center bg-orange-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-realscout-blue mb-2">{stats.activeListings}</div>
            <div className="text-gray-600 text-sm mb-1">Active Listings</div>
            <div className="text-orange-600 text-xs flex items-center justify-center">
              <Minus className="w-3 h-3 mr-1" />
              Stable vs last month
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
