import { Home, MapPin, TrendingUp, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BackToTop from '@/components/back-to-top';
import FAQSection from '@/components/faq-section';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import NeighborhoodHeatmap from '@/components/neighborhood-heatmap';
import RealScoutListings from '@/components/realscout-listings';
import RelatedSearches from '@/components/related-searches';
import { Card, CardContent } from '@/components/ui/card';

export default function NeighborhoodAnalysis() {
  return (
    <>
      <Helmet>
        <title>Las Vegas Neighborhood Analysis & Market Heat Map | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Interactive neighborhood analysis and market heat map for Las Vegas areas including Skye Canyon, Summerlin, and Centennial Hills. Real-time pricing, school ratings, and local insights."
        />
        <meta
          name="keywords"
          content="Las Vegas neighborhoods, Skye Canyon market analysis, Summerlin real estate, neighborhood comparison, market heat map, school ratings"
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/neighborhood-analysis" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Las Vegas Neighborhood Analysis & Market Heat Map',
            description:
              'Comprehensive neighborhood analysis with interactive heat map showing market trends, pricing, schools, and local insights for Las Vegas real estate areas.',
            url: 'https://skyecanyonhomesforsale.com/neighborhood-analysis',
            about: {
              '@type': 'Place',
              name: 'Las Vegas Real Estate Markets',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Las Vegas',
                addressRegion: 'Nevada',
                addressCountry: 'US',
              },
            },
            provider: {
              '@type': 'RealEstateAgent',
              name: 'Dr. Jan Duffy',
              telephone: '(702) 500-1902',
            },
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Las Vegas Neighborhood Analysis</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Interactive market heat map with real-time data on pricing trends, market activity,
              school ratings, and local insights across Las Vegas neighborhoods.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>5 Key Neighborhoods</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Live Market Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Price Comparisons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Community Insights</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Market Overview & Key Insights
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding neighborhood dynamics is crucial for making informed real estate
                decisions. Our interactive heat map provides comprehensive data to guide your
                investment choices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$1.25M</div>
                  <div className="text-gray-600">Average Skye Canyon Price</div>
                  <div className="text-sm text-green-600 mt-1">+8.5% YoY</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                  <div className="text-gray-600">Avg Days on Market</div>
                  <div className="text-sm text-blue-600 mt-1">Hot Market</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">9/10</div>
                  <div className="text-gray-600">School Rating</div>
                  <div className="text-sm text-gray-500 mt-1">Top-Rated Schools</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
                  <div className="text-gray-600">Recent Sales</div>
                  <div className="text-sm text-gray-500 mt-1">Last 30 Days</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Neighborhood Heatmap */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NeighborhoodHeatmap />
          </div>
        </section>

        {/* Neighborhood Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Location Matters in Las Vegas Real Estate
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each neighborhood offers unique advantages. Understanding these differences helps
                you make the best investment decision for your lifestyle and goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Premium Communities</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Skye Canyon</span>
                      <span className="font-medium">$1.25M avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Summerlin West</span>
                      <span className="font-medium">$1.10M avg</span>
                    </div>
                    <div className="text-sm text-blue-600 mt-4">
                      Guard-gated, luxury amenities, top schools
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Growing Markets</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Centennial Hills</span>
                      <span className="font-medium">$950K avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mountains Edge</span>
                      <span className="font-medium">$780K avg</span>
                    </div>
                    <div className="text-sm text-green-600 mt-4">
                      Strong appreciation, family-friendly
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Value Opportunities</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Aliante</span>
                      <span className="font-medium">$650K avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Areas</span>
                      <span className="font-medium">Varies</span>
                    </div>
                    <div className="text-sm text-purple-600 mt-4">
                      Entry-level luxury, established communities
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Available Properties by Neighborhood
              </h2>
              <p className="text-lg text-gray-600">
                Explore current listings in each analyzed neighborhood
              </p>
            </div>
            <RealScoutListings />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          title="Neighborhood Analysis FAQs"
          pageType="market-analysis"
          faqs={[
            {
              question: 'Which Las Vegas neighborhood has the best investment potential?',
              answer:
                'Skye Canyon and Summerlin West show the strongest investment potential with consistent appreciation, low crime rates, top-rated schools, and premium amenities. These guard-gated communities maintain their value well.',
            },
            {
              question: 'How do school ratings affect property values?',
              answer:
                'School ratings significantly impact property values. Neighborhoods with 8+ rated schools typically command 15-25% higher prices and experience better resale value and faster appreciation.',
            },
            {
              question: 'What makes Skye Canyon stand out from other neighborhoods?',
              answer:
                'Skye Canyon offers 24/7 guard-gated security, Desert Highlands Golf Course, top-rated schools (9/10), low crime rates, and proximity to Red Rock Canyon - all while maintaining strong market performance.',
            },
            {
              question: 'How often is the market data updated?',
              answer:
                'Our neighborhood analysis data is updated weekly with the latest sales, price trends, and market activity to ensure you have the most current information for decision-making.',
            },
          ]}
        />

        {/* Related Searches */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RelatedSearches searchType="las-vegas" />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
