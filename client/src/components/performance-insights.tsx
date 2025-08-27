import { Award, Clock, Home, MapPin, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const performanceStats = [
  {
    icon: Home,
    metric: '150+',
    label: 'Homes Sold',
    trend: '+23% this year',
    color: 'text-green-600',
  },
  {
    icon: TrendingUp,
    metric: '12 days',
    label: 'Avg. Days on Market',
    trend: '67% faster than area avg',
    color: 'text-blue-600',
  },
  {
    icon: Users,
    metric: '98%',
    label: 'Client Satisfaction',
    trend: '150+ five-star reviews',
    color: 'text-purple-600',
  },
  {
    icon: Award,
    metric: 'Top 1%',
    label: 'Las Vegas REALTORS®',
    trend: 'Consistent ranking',
    color: 'text-yellow-600',
  },
];

const recentActivity = [
  {
    type: 'Sale',
    address: 'Desert Highlands Dr',
    price: '$1,850,000',
    days: 'Sold in 5 days',
    icon: Home,
  },
  {
    type: 'Sale',
    address: 'Canyon Vista Way',
    price: '$1,450,000',
    days: 'Sold in 8 days',
    icon: Home,
  },
  {
    type: 'Listing',
    address: 'Granite Peak Dr',
    price: '$1,750,000',
    days: 'New listing',
    icon: MapPin,
  },
];

export default function PerformanceInsights() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Performance That Delivers Results
          </h2>
          <p className="text-xl text-gray-600">
            Data-driven success in the Skye Canyon luxury market
          </p>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {performanceStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.metric}</div>
                <div className="text-gray-600 mb-2">{stat.label}</div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.trend}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Sales Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <activity.icon className="w-6 h-6 text-realscout-blue" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{activity.address}</p>
                        <p className="text-sm text-gray-500">{activity.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-realscout-blue">{activity.price}</p>
                        <p className="text-sm text-gray-500">{activity.days}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Leadership</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-realscout-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Faster Sales</h4>
                  <p className="text-gray-600">
                    Properties sell 67% faster than area average through strategic pricing and
                    marketing.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-realscout-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Higher Sale Prices</h4>
                  <p className="text-gray-600">
                    87% of listings sell above asking price with expert negotiation and market
                    positioning.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Award className="w-6 h-6 text-realscout-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Industry Recognition</h4>
                  <p className="text-gray-600">
                    Consistently ranked in top 1% of Las Vegas REALTORS® for production and client
                    satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
