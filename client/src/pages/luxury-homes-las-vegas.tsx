import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Shield, Gem, Star } from "lucide-react";

export default function LuxuryHomesLasVegas() {
  const luxuryCommunities = [
    {
      name: "Skye Canyon",
      priceRange: "$650K - $1.2M+",
      features: ["24/7 Guard-Gated", "Golf Course Views", "Custom Homes"],
      description: "Premier guard-gated community with luxury amenities"
    },
    {
      name: "The Ridges",
      priceRange: "$800K - $3M+", 
      features: ["Tournament Golf", "Red Rock Views", "Custom Estates"],
      description: "Exclusive hillside community with stunning views"
    },
    {
      name: "Spanish Trail",
      priceRange: "$500K - $1.5M",
      features: ["Country Club", "Mature Community", "Golf Membership"],
      description: "Established luxury golf community"
    }
  ];

  const luxuryFeatures = [
    {
      icon: Crown,
      title: "Exclusive Communities",
      description: "Access to the most prestigious neighborhoods in Las Vegas"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Guard-gated communities with 24/7 security and privacy"
    },
    {
      icon: Gem,
      title: "Premium Amenities",
      description: "Golf courses, spas, fitness centers, and resort-style living"
    },
    {
      icon: Star,
      title: "Custom Features",
      description: "High-end finishes, smart home technology, and custom designs"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Luxury Homes Las Vegas | Premium Properties | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Find luxury homes in Las Vegas with Dr. Jan Duffy. Specializing in guard-gated communities, custom estates, and premium properties throughout the valley." />
        <meta name="keywords" content="luxury homes Las Vegas, guard gated communities, premium real estate, custom homes Las Vegas, million dollar homes" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/luxury-homes-las-vegas" />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-navy via-realscout-blue to-realscout-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Luxury Homes Las Vegas
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Discover the finest luxury properties in Las Vegas's most exclusive communities. 
              From guard-gated estates to custom-built masterpieces.
            </p>
            <Button 
              size="lg"
              className="bg-white text-realscout-blue hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/properties'}
            >
              View Luxury Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Luxury Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Defines Luxury in Las Vegas
            </h2>
            <p className="text-xl text-gray-600">
              Experience the pinnacle of luxury living in the Entertainment Capital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center border-2 border-gray-100 hover:border-realscout-blue transition-colors">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 text-realscout-blue mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Communities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exclusive Luxury Communities
            </h2>
            <p className="text-xl text-gray-600">
              Explore Las Vegas's most prestigious neighborhoods
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {luxuryCommunities.map((community, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-realscout-navy to-realscout-blue relative">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <Crown className="w-8 h-8" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  <div className="text-xl font-bold text-realscout-blue mb-4">
                    {community.priceRange}
                  </div>
                  <div className="space-y-2 mb-6">
                    {community.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-realscout-blue" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-realscout-blue text-white hover:bg-realscout-navy"
                    onClick={() => window.location.href = community.name === 'Skye Canyon' ? '/' : '/properties'}
                  >
                    Explore {community.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="py-16 bg-realscout-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Luxury Real Estate Investment
              </h2>
              <div className="space-y-4 text-lg">
                <p>
                  Las Vegas luxury real estate offers exceptional investment opportunities 
                  with strong appreciation potential and rental income possibilities.
                </p>
                <p>
                  With no state income tax, world-class entertainment, and growing demand 
                  from international buyers, luxury properties continue to appreciate.
                </p>
                <p>
                  Whether you're seeking a primary residence, vacation home, or investment 
                  property, Las Vegas luxury market offers unparalleled value.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Luxury Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Luxury Home Sales (YTD)</span>
                  <span className="font-bold">+18.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Luxury Price</span>
                  <span className="font-bold">$1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Days on Market</span>
                  <span className="font-bold">42 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>International Buyers</span>
                  <span className="font-bold">23%</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-white text-realscout-blue hover:bg-gray-100"
                onClick={() => window.location.href = '/about'}
              >
                Schedule Luxury Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}