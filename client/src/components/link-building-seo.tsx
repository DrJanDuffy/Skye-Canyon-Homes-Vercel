import { ExternalLink, MapPin, Phone, Star, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const localBusinessDirectories = [
  {
    name: 'Google Business Profile',
    url: 'https://g.co/kgs/nbUf6Pj',
    category: 'Primary',
    description: 'Las Vegas Premier Real Estate Expert',
  },
  {
    name: 'Yelp Business',
    url: 'https://www.yelp.com/biz/dr-jan-duffy-realtor-las-vegas',
    category: 'Reviews',
    description: '5-Star Rated Skye Canyon Specialist',
  },
  {
    name: 'Better Business Bureau',
    url: 'https://www.bbb.org/us/nv/las-vegas/profile/real-estate-agents/dr-jan-duffy-realtor',
    category: 'Trust',
    description: 'A+ Rated Real Estate Professional',
  },
  {
    name: 'Zillow Agent Profile',
    url: 'https://www.zillow.com/profile/DrJanDuffy/',
    category: 'Real Estate',
    description: 'Top-Rated Las Vegas Agent',
  },
  {
    name: 'Realtor.com Agent',
    url: 'https://www.realtor.com/realestateagents/dr-jan-duffy_las-vegas_nv_2665289_000000000',
    category: 'Real Estate',
    description: 'Premier Skye Canyon Expert',
  },
  {
    name: 'Las Vegas Board of REALTORS',
    url: 'https://www.lvrealtors.com/find-realtor/dr-jan-duffy',
    category: 'Professional',
    description: 'Licensed Nevada REALTOR®',
  },
];

const hyperlocalKeywords = [
  {
    keyword: 'Skye Canyon homes for sale',
    page: '/properties',
    priority: 'High',
  },
  {
    keyword: 'Las Vegas 89166 real estate',
    page: '/las-vegas-real-estate',
    priority: 'High',
  },
  {
    keyword: 'Desert Highlands Golf Course homes',
    page: '/luxury-homes-las-vegas',
    priority: 'Medium',
  },
  {
    keyword: 'Northwest Las Vegas homes',
    page: '/northwest-las-vegas',
    priority: 'Medium',
  },
  {
    keyword: 'Skye Canyon new construction',
    page: '/services/new-construction',
    priority: 'High',
  },
  {
    keyword: 'Las Vegas luxury real estate',
    page: '/services/luxury-properties',
    priority: 'Medium',
  },
];

const internalLinkingStructure = [
  {
    anchor: 'Skye Canyon Real Estate Expert',
    target: '/about',
    context: 'Authority building',
  },
  {
    anchor: 'Las Vegas 89166 Properties',
    target: '/properties',
    context: 'Primary service',
  },
  {
    anchor: 'Buyer Agent Services',
    target: '/services/buyer-agent',
    context: 'Service-specific',
  },
  {
    anchor: 'Market Analysis Data',
    target: '/market-analysis',
    context: 'Content authority',
  },
  {
    anchor: 'Neighborhood Heat Map',
    target: '/neighborhood-analysis',
    context: 'Local expertise',
  },
  {
    anchor: 'Voice Search Properties',
    target: '/voice-search',
    context: 'Technology feature',
  },
];

export default function LinkBuildingSEO() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-medium text-blue-600">SEO Authority Building</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hyperlocal SEO & Link Authority
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic link building and local SEO optimization for maximum Skye Canyon market
            visibility.
          </p>
        </div>

        {/* Local Business Directory Links */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Verified Business Directory Presence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localBusinessDirectories.map((directory, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{directory.name}</CardTitle>
                    <Badge variant={directory.category === 'Primary' ? 'default' : 'secondary'}>
                      {directory.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{directory.description}</p>
                  <a
                    href={directory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Profile
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hyperlocal Keyword Strategy */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Hyperlocal Keyword Targeting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hyperlocalKeywords.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold">{item.keyword}</span>
                  </div>
                  <Badge variant={item.priority === 'High' ? 'default' : 'secondary'}>
                    {item.priority}
                  </Badge>
                </div>
                <Link href={item.page}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Target Page
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Internal Linking Structure */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Strategic Internal Link Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalLinkingStructure.map((linkItem, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    {linkItem.context}
                  </Badge>
                  <h4 className="font-semibold text-gray-900">{linkItem.anchor}</h4>
                </div>
                <Link href={linkItem.target}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    {linkItem.target}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Integration */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">
            Boost Your Online Presence with Proven SEO Strategy
          </h3>
          <p className="text-xl opacity-90 mb-6">
            Dr. Jan Duffy's comprehensive digital marketing approach combines local authority,
            strategic content, and verified business profiles for maximum visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+17025001902"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2 inline" />
              Call (702) 500-1902
            </a>
            <a
              href="https://g.co/kgs/nbUf6Pj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 transition-colors"
            >
              <Star className="w-5 h-5 mr-2 inline" />
              View Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
