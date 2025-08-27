import { Clock, ExternalLink, Gift, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const currentOffers = [
  {
    title: 'Free Home Valuation',
    description:
      'Get an accurate market analysis of your Skye Canyon home value with our complimentary CMA report.',
    value: '$500 Value',
    expiry: 'Limited Time',
    cta: 'Get Free Valuation',
    highlight: true,
  },
  {
    title: 'VIP Buyer Program',
    description:
      'Access exclusive off-market listings and get first priority on new Skye Canyon properties.',
    value: 'Exclusive Access',
    expiry: 'For Qualified Buyers',
    cta: 'Join VIP Program',
    highlight: false,
  },
  {
    title: 'Seller Success Package',
    description:
      'Professional photography, staging consultation, and premium marketing for faster sales.',
    value: '$2,500 Value',
    expiry: 'This Quarter',
    cta: 'Learn More',
    highlight: false,
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-16 bg-gradient-to-br from-realscout-blue to-realscout-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
            <Gift className="w-5 h-5 mr-2" />
            <span className="font-medium">Exclusive Client Benefits</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Offers for Skye Canyon Clients
          </h2>
          <p className="text-xl opacity-90">
            Exceptional value and service for your real estate journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentOffers.map((offer, index) => (
            <Card
              key={index}
              className={`h-full ${offer.highlight ? 'ring-4 ring-yellow-400' : ''}`}
            >
              <CardHeader>
                {offer.highlight && (
                  <Badge className="w-fit mb-2 bg-yellow-400 text-gray-900">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardTitle className="text-gray-900">{offer.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {offer.expiry}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
                <div className="text-2xl font-bold text-realscout-blue">{offer.value}</div>
                <a
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-realscout-blue hover:bg-realscout-navy text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {offer.cta}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg opacity-90 mb-6">
            Ready to take advantage of these exclusive offers?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:(702) 500-1902">
              <Button className="bg-white text-realscout-blue hover:bg-gray-100">
                Call (702) 500-1902
              </Button>
            </a>
            <a href="https://g.co/kgs/nbUf6Pj" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-realscout-blue"
              >
                Schedule Consultation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
