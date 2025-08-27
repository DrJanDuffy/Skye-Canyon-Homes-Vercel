import { ExternalLink, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthenticPropertyListings() {
  useEffect(() => {
    // Load RealScout widget script
    const script = document.createElement('script');
    script.src = 'https://embed.realscout.com/v3/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(
        'script[src="https://embed.realscout.com/v3/embed.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Featured Properties with Price Variety */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Skye Canyon Properties for Sale
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse current MLS listings in Skye Canyon, Las Vegas 89166. All properties are verified
            and updated in real-time.
          </p>
        </div>

        {/* High-End Properties */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Luxury Homes ($800K+)</h3>
          <div className="realscout-widget-container border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <realscout-office-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale"
              property-types="SFR,MF,TC,OTHER"
              price-min="800000"
              style={{ minHeight: '600px', width: '100%' }}
            />
          </div>
        </div>

        {/* Mid-Range Properties */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Premium Homes ($600K-$800K)</h3>
          <div className="realscout-widget-container border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <realscout-office-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale"
              property-types="SFR,MF,TC,OTHER"
              price-min="600000"
              price-max="800000"
              style={{ minHeight: '600px', width: '100%' }}
            />
          </div>
        </div>

        {/* Entry-Level Properties */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Homes ($530K-$600K)
          </h3>
          <div className="realscout-widget-container border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <realscout-office-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale"
              property-types="SFR,MF,TC,OTHER"
              price-min="530000"
              price-max="600000"
              style={{ minHeight: '600px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Market Insights Card */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Why Choose Skye Canyon?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 dark:text-blue-300">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Community Features</h4>
              <ul className="space-y-2 text-sm">
                <li>• 24/7 guard-gated security</li>
                <li>• TPC Las Vegas golf course access</li>
                <li>• Desert Highlands amenities</li>
                <li>• Walking trails and parks</li>
                <li>• Top-rated schools nearby</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Market Advantages</h4>
              <ul className="space-y-2 text-sm">
                <li>• Strong appreciation rates</li>
                <li>• Low property taxes</li>
                <li>• Prime northwest location</li>
                <li>• New construction available</li>
                <li>• Mountain and city views</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-700">
            <Button
              variant="outline"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-800"
              onClick={() => window.open('http://drjanduffy.realscout.com/onboarding', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Search All Available Properties
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
