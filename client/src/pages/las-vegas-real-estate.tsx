import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Users, Star } from "lucide-react";

export default function LasVegasRealEstate() {
  return (
    <>
      <Helmet>
        <title>Las Vegas Real Estate | Nevada Homes for Sale | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Las Vegas real estate for sale including Henderson, Summerlin, and Northwest communities. Expert Nevada real estate service from Dr. Jan Duffy, licensed REALTOR®." />
        <meta name="keywords" content="Las Vegas real estate, Nevada homes for sale, Henderson properties, Summerlin homes, Northwest Las Vegas" />
        <meta property="og:title" content="Las Vegas Real Estate | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Comprehensive Las Vegas real estate services covering all major communities with expert guidance." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/las-vegas-real-estate" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Las Vegas Real Estate
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Comprehensive real estate services across all Las Vegas communities
            </p>
          </div>
        </section>

  const areas = [
    {
      name: "Northwest Las Vegas",
      communities: ["Skye Canyon", "Centennial Hills", "Summerlin"],
      priceRange: "$350K - $900K+",
      highlights: "Guard-gated communities, golf courses, family-friendly"
    },
    {
      name: "Henderson",
      communities: ["Green Valley", "Anthem", "MacDonald Ranch"],
      priceRange: "$400K - $1.2M+",
      highlights: "Planned communities, top schools, mountain views"
    },
    {
      name: "Southwest Las Vegas",
      communities: ["The Lakes", "Spanish Trail", "Mountains Edge"],
      priceRange: "$300K - $800K",
      highlights: "Established neighborhoods, golf communities, convenience"
    }
  ];

  const services = [
    {
      title: "Buyer Representation",
      description: "Expert guidance through every step of your home purchase",
      icon: Users
    },
    {
      title: "Seller Services",
      description: "Strategic marketing and pricing to maximize your home's value",
      icon: Building
    },
    {
      title: "Market Analysis",
      description: "Comprehensive CMAs and investment property analysis",
      icon: Star
    }
  ];

  return (
    <>
      <Helmet>
        <title>Las Vegas Real Estate | Homes for Sale | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Find your dream home in Las Vegas with Dr. Jan Duffy. Specializing in luxury properties, guard-gated communities, and expert local market knowledge." />
        <meta name="keywords" content="Las Vegas real estate, Las Vegas homes for sale, Nevada real estate, luxury homes Las Vegas, REALTOR Las Vegas" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/las-vegas-real-estate" />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-blue to-realscout-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Las Vegas Real Estate Expert
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Your trusted REALTOR® for luxury homes, investment properties, and 
              exclusive communities throughout the Las Vegas Valley.
            </p>
            <div className="flex items-center justify-center text-lg mb-8">
              <MapPin className="w-6 h-6 mr-2" />
              <span>Serving All of Clark County, Nevada</span>
            </div>
            <Button 
              size="lg"
              className="bg-white text-realscout-blue hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => window.location.href = '/properties'}
            >
              View Available Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Market Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Las Vegas Market Areas
            </h2>
            <p className="text-xl text-gray-600">
              Explore diverse communities throughout the Las Vegas Valley
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <Card key={index} className="overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-br from-realscout-light to-realscout-blue"></div>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4">{area.name}</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Featured Communities:</p>
                    <p className="text-realscout-blue font-semibold">
                      {area.communities.join(" • ")}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      {area.priceRange}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {area.highlights}
                  </p>
                  <Button 
                    className="w-full bg-realscout-blue text-white hover:bg-realscout-navy"
                    onClick={() => window.location.href = area.name === 'Northwest Las Vegas' ? '/northwest-las-vegas' : '/properties'}
                  >
                    Explore {area.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-xl text-gray-600">
              Full-service real estate expertise for all your Las Vegas property needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <IconComponent className="w-12 h-12 text-realscout-blue mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Las Vegas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Invest in Las Vegas Real Estate?
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Las Vegas continues to be one of the fastest-growing metropolitan areas 
                  in the United States, offering exceptional opportunities for homeowners 
                  and investors alike.
                </p>
                <p>
                  With no state income tax, world-class entertainment, diverse neighborhoods, 
                  and year-round sunshine, Las Vegas attracts residents from across the country.
                </p>
                <p>
                  From luxury guard-gated communities to family-friendly suburban neighborhoods, 
                  the Las Vegas Valley offers something for every lifestyle and budget.
                </p>
              </div>
            </div>
            <div className="bg-realscout-blue text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Market Highlights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Population Growth</span>
                  <span className="font-bold">+2.4% annually</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Job Growth Rate</span>
                  <span className="font-bold">+3.1% YoY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Median Home Price</span>
                  <span className="font-bold">$485,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>State Income Tax</span>
                  <span className="font-bold">0%</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-white text-realscout-blue hover:bg-gray-100"
                onClick={() => window.location.href = '/about'}
              >
                Get Market Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}