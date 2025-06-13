import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, TrendingUp, Shield } from "lucide-react";
import RealScoutListings from "@/components/realscout-listings";

export default function NorthwestLasVegas() {
  const neighborhoods = [
    {
      name: "Skye Canyon",
      description: "Premier guard-gated community with luxury homes",
      priceRange: "$450K - $900K+",
      features: ["24/7 Security", "Golf Course", "Resort Amenities"]
    },
    {
      name: "Centennial Hills",
      description: "Family-friendly master-planned community",
      priceRange: "$350K - $650K",
      features: ["Top Schools", "Parks", "Shopping"]
    },
    {
      name: "Summerlin",
      description: "Established luxury community with amenities",
      priceRange: "$400K - $800K+",
      features: ["Golf Courses", "Red Rock Views", "Downtown Summerlin"]
    }
  ];

  const marketStats = [
    { label: "Median Home Price", value: "$565,000", change: "+8.2%" },
    { label: "Average Days on Market", value: "32 days", change: "-15%" },
    { label: "Homes Sold (YTD)", value: "2,847", change: "+12%" },
    { label: "Price per Sq Ft", value: "$210", change: "+6.5%" }
  ];

  return (
    <>
      <Helmet>
        <title>Northwest Las Vegas Real Estate | Homes for Sale | Dr. Jan Duffy</title>
        <meta name="description" content="Find luxury homes in Northwest Las Vegas including Skye Canyon, Centennial Hills, and Summerlin. Expert local knowledge from Dr. Jan Duffy, REALTOR®." />
        <meta name="keywords" content="Northwest Las Vegas homes, Skye Canyon real estate, Centennial Hills, Summerlin homes, Las Vegas luxury properties" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/northwest-las-vegas" />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-blue to-realscout-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Northwest Las Vegas Skye Canyon Homes Real Estate
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover luxury homes in Las Vegas's most desirable northwest communities. 
              From guard-gated Skye Canyon to family-friendly Centennial Hills.
            </p>
            <div className="flex items-center justify-center text-lg">
              <MapPin className="w-6 h-6 mr-2" />
              <span>Serving Northwest Las Vegas, NV 89149, 89166, 89144</span>
            </div>
          </div>
        </div>
      </section>

      {/* Current Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Northwest Las Vegas Skye Canyon Listings
            </h2>
            <p className="text-xl text-gray-600">
              Available properties in northwest communities
            </p>
          </div>
          <RealScoutListings className="w-full" variant="all-properties" />
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Northwest Las Vegas Skye Canyon Market Overview
            </h2>
            <p className="text-xl text-gray-600">
              Current market trends and statistics for Northwest Las Vegas communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-realscout-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mb-2">{stat.label}</div>
                  <div className={`text-sm font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} vs last year
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Northwest Las Vegas Skye Canyon Communities
            </h2>
            <p className="text-xl text-gray-600">
              Explore the premier neighborhoods of Northwest Las Vegas
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-realscout-light to-realscout-blue"></div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{neighborhood.name}</h3>
                  <p className="text-gray-600 mb-4">{neighborhood.description}</p>
                  <div className="text-lg font-semibold text-realscout-blue mb-4">
                    {neighborhood.priceRange}
                  </div>
                  <div className="space-y-2 mb-6">
                    {neighborhood.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Shield className="w-4 h-4 mr-2 text-realscout-blue" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-realscout-blue text-white hover:bg-realscout-navy"
                    onClick={() => window.location.href = neighborhood.name === 'Skye Canyon' ? '/' : '/properties'}
                  >
                    View {neighborhood.name} Homes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Northwest Las Vegas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Northwest Las Vegas?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Home className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Luxury Living</h3>
                    <p className="text-gray-600">
                      Master-planned communities with resort-style amenities, golf courses, 
                      and stunning Red Rock Canyon views.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Strong Investment</h3>
                    <p className="text-gray-600">
                      Consistent property value appreciation and high desirability 
                      make Northwest Las Vegas an excellent investment choice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Top-Rated Schools</h3>
                    <p className="text-gray-600">
                      Access to some of Clark County's highest-rated schools, 
                      making it perfect for families with children.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Ready to Explore?</h3>
              <p className="text-gray-600 mb-6">
                Get expert guidance from Dr. Jan Duffy, your Northwest Las Vegas 
                real estate specialist with deep local market knowledge.
              </p>
              <Button 
                className="w-full bg-realscout-blue text-white hover:bg-realscout-navy"
                onClick={() => window.location.href = '/about'}
              >
                Schedule Your Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}