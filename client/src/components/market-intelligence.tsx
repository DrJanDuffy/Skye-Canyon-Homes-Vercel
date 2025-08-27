import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MarketIntelligence() {
  const [selectedMetric, setSelectedMetric] = useState<'price' | 'inventory' | 'days'>('price');

  const { data: marketData } = useQuery({
    queryKey: ['/api/market-stats'],
    queryFn: async () => {
      const response = await fetch('/api/market-stats');
      if (!response.ok) throw new Error('Failed to fetch market data');
      return response.json();
    },
  });

  const { data: marketInsights } = useQuery({
    queryKey: ['/api/market-insights'],
    queryFn: async () => {
      const response = await fetch('/api/market-insights');
      if (!response.ok) throw new Error('Failed to fetch market insights');
      return response.json();
    },
  });

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Skye Canyon Market Intelligence</h2>
          <p className="text-xl text-gray-600">Real-time data and AI-powered predictions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Metric Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-xl p-1">
              {(['price', 'inventory', 'days'] as const).map((metric) => (
                <Button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  variant={selectedMetric === metric ? 'default' : 'ghost'}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedMetric === metric
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {metric === 'price' && '💰 Median Price'}
                  {metric === 'inventory' && '🏠 Active Listings'}
                  {metric === 'days' && '📅 Days on Market'}
                </Button>
              ))}
            </div>
          </div>

          {/* Dynamic Chart Area */}
          <div className="mb-8">
            <Card className="h-80 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {selectedMetric === 'price' && (marketData?.medianPrice || '$1.2M')}
                    {selectedMetric === 'inventory' && '42'}
                    {selectedMetric === 'days' && (marketData?.daysOnMarket || '18')}
                  </div>
                  <p className="text-gray-600">
                    {selectedMetric === 'price' && 'Current Median Price'}
                    {selectedMetric === 'inventory' && 'Active Listings'}
                    {selectedMetric === 'days' && 'Average Days on Market'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Current Median</h3>
                  <span className="text-green-600 text-sm font-medium">
                    {marketData?.priceChange || '+5.2% YoY'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {marketData?.medianPrice || '$685,000'}
                </p>
                <p className="text-sm text-gray-600 mt-2">Up from last year</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Market Trend</h3>
                  <span className="text-purple-600 text-sm font-medium">Next 6 months</span>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {marketData?.trend || 'Rising'}
                </p>
                <p className="text-sm text-gray-600 mt-2">Projected growth trend</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Market Timing</h3>
                  <span className="text-green-600 text-sm font-medium">Opportunity</span>
                </div>
                <p className="text-3xl font-bold text-green-600">Favorable</p>
                <p className="text-sm text-gray-600 mt-2">
                  {marketData?.daysOnMarket || '18'} days avg on market
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Market Insights from RSS Feed */}
          {marketInsights?.insights && marketInsights.insights.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Latest Market Insights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {marketInsights.insights.slice(0, 4).map((insight: any, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                    {insight.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={insight.imageUrl}
                          alt={insight.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2 line-clamp-2">{insight.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{insight.source}</span>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 h-auto"
                          onClick={() => window.open(insight.link, '_blank')}
                        >
                          Read More →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Personalized Recommendations */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">🎯 Personalized Market Insight</h3>
              <p className="mb-4">
                Based on current market conditions, Skye Canyon homes are selling
                {marketData?.sellingSpeed ? ` ${marketData.sellingSpeed}` : ' 23%'} faster than the
                Las Vegas average. Properties in the premium price range are receiving strong buyer
                interest.
              </p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Your Custom Market Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
