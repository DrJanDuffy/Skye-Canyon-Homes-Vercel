import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FAQSection from "@/components/faq-section";
import EnhancedStructuredData from "@/components/enhanced-structured-data";
import RealScoutListings from "@/components/realscout-listings";
import { Home, MapPin, DollarSign, Users, Car, Building2 } from "lucide-react";

export default function SkyeCanyonCommunities() {
  const communitiesData = [
    {
      name: "Eaglepointe",
      priceRange: "High $500s",
      builder: "Century Communities",
      description: "Spacious homes with flexible floor plans and generous outdoor space in a prime Skye Canyon location.",
      features: ["Flexible floor plans", "Up to 6 bedrooms", "2- and 3-bay garages", "Lofts and dens available", "Outdoor living spaces"],
      highlights: ["Custom primary suites", "Multiple bedroom options", "Desert climate optimization"]
    },
    {
      name: "Marvella",
      priceRange: "High $500s", 
      builder: "Century Communities",
      description: "One and two-story homes designed for every life stage with customizable layouts and luxury amenities.",
      features: ["One and two-story options", "Customizable layouts", "Premium finishes", "Energy-efficient design", "Modern amenities"],
      highlights: ["Life-stage flexibility", "Luxury appointments", "Contemporary design"]
    },
    {
      name: "Skyecrest",
      priceRange: "Low $700s",
      builder: "Century Communities", 
      description: "Premium homes offering the highest level of customization with luxurious primary suites and expanded living spaces.",
      features: ["Premium customization", "Luxurious primary suites", "Expanded floor plans", "High-end finishes", "Enhanced outdoor access"],
      highlights: ["Luxury customization", "Premium positioning", "Enhanced amenities"]
    }
  ];

  const communitiesFAQs = [
    {
      question: "What home builders are in Skye Canyon Las Vegas?",
      answer: "Century Communities is a major builder in Skye Canyon, offering three distinct communities: Eaglepointe and Marvella starting in the high $500s, and Skyecrest starting in the low $700s, all featuring flexible floor plans and luxury amenities."
    },
    {
      question: "What is the price range for new construction in Skye Canyon?",
      answer: "New construction homes in Skye Canyon range from the high $500s to the low $700s and up, with Century Communities offering Eaglepointe and Marvella from the high $500s, and Skyecrest from the low $700s."
    },
    {
      question: "How many bedrooms do Skye Canyon new homes have?",
      answer: "Century Communities homes in Skye Canyon offer up to six bedrooms with flexible floor plans that allow customization with additional lofts, bedrooms, dens, and luxurious primary suites."
    },
    {
      question: "Do Skye Canyon homes have garages?",
      answer: "Yes, Century Communities homes in Skye Canyon feature both 2-bay and 3-bay garages, providing ample storage and parking for residents' vehicles and recreational equipment."
    },
    {
      question: "Are there quick move-in homes available in Skye Canyon?",
      answer: "Yes, Century Communities offers quick move-in homes in Skye Canyon for buyers who need to move in sooner. Contact Dr. Jan Duffy at (702) 500-1902 for current availability and inventory."
    },
    {
      question: "What makes Skye Canyon communities special for families?",
      answer: "Skye Canyon communities offer homes designed for every life stage with flexible floor plans, generous outdoor spaces, access to community parks and schools, all within a secure guard-gated environment."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Skye Canyon New Construction Communities | Century Communities Las Vegas NV</title>
        <meta 
          name="description" 
          content="Discover new construction homes in Skye Canyon's three Century Communities: Eaglepointe, Marvella, and Skyecrest. Flexible floor plans, up to 6 bedrooms, luxury amenities from high $500s." 
        />
        <meta name="keywords" content="Skye Canyon new construction, Century Communities, Eaglepointe, Marvella, Skyecrest, new homes Las Vegas 89166" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Skye Canyon New Construction Communities | Century Communities Las Vegas NV" />
        <meta property="og:description" content="Explore new construction homes in Skye Canyon featuring Century Communities' Eaglepointe, Marvella, and Skyecrest with flexible floor plans and luxury amenities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/skye-canyon-communities" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skye Canyon New Construction Communities | Century Communities Las Vegas NV" />
        <meta name="twitter:description" content="New construction homes in Skye Canyon from Century Communities featuring flexible floor plans and luxury amenities." />
        
        {/* Local SEO */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2887;-115.3366" />
        <meta name="ICBM" content="36.2887, -115.3366" />
        
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/skye-canyon-communities" />
      </Helmet>

      <EnhancedStructuredData />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skye Canyon Homes New Construction Communities
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover luxury new construction homes by Century Communities in Skye Canyon. With spacious one and two-story homes featuring up to six bedrooms and flexible floor plans for every life stage.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Century Communities Builder
              </span>
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                3 Distinct Communities
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                From High $500s
              </span>
            </div>
          </div>
        </section>

        {/* Current Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                New Construction & Resale Homes
              </h2>
              <p className="text-xl text-gray-600">
                Available properties in Skye Canyon communities
              </p>
            </div>
            <RealScoutListings className="w-full" variant="new-construction" />
          </div>
        </section>

        {/* Century Communities Overview */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Century Communities at Skye Canyon</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                With a range of spacious one and two-story homes with up to six bedrooms and both 2- and 3-bay garages, Century Communities at Skye Canyon offers something for buyers at every life stage. Flexible floor plans allow ample customization with the addition of lofts, bedrooms, dens and luxurious primary suites.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communitiesData.map((community, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{community.name}</h3>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {community.priceRange}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{community.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    {community.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {community.highlights.map((highlight, highlightIndex) => (
                        <span key={highlightIndex} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customization Features */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Flexible Floor Plans & Customization
                </h2>
                <p className="text-gray-600 mb-6">
                  Generous outdoor space gives buyers multiple access points to interact with their natural surroundings and enjoy the desert's favorable climate year-round. Every home is designed with flexibility in mind.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Up to 6 Bedrooms</h4>
                    <p className="text-sm text-gray-600">Flexible layouts for growing families</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">2 & 3-Bay Garages</h4>
                    <p className="text-sm text-gray-600">Ample storage and parking space</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Custom Options</h4>
                    <p className="text-sm text-gray-600">Lofts, dens, and luxury suites</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Outdoor Access</h4>
                    <p className="text-sm text-gray-600">Multiple outdoor living spaces</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Builder Resources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Visit Builder Website</h4>
                    <p className="text-blue-100 text-sm">Explore floor plans and customization options directly with Century Communities</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Quick Move-In Homes</h4>
                    <p className="text-blue-100 text-sm">View available inventory for faster move-in timeline</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Search by Community</h4>
                    <p className="text-blue-100 text-sm">Compare Eaglepointe, Marvella, and Skyecrest options</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-700 rounded-lg">
                  <p className="text-sm text-blue-100 mb-2">Need Expert Guidance?</p>
                  <p className="font-semibold">Contact Dr. Jan Duffy for personalized assistance with Century Communities homes and incentives.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Community Price Ranges</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-600 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Eaglepointe</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">High $500s</div>
                <p className="text-gray-600 text-sm">Entry-level luxury with premium features and flexible customization options</p>
              </div>
              
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-600 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marvella</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">High $500s</div>
                <p className="text-gray-600 text-sm">Contemporary designs with enhanced amenities and modern features</p>
              </div>
              
              <div className="border-2 border-blue-600 rounded-xl p-6 bg-blue-50">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Skyecrest</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">Low $700s</div>
                <p className="text-gray-600 text-sm">Premium luxury homes with highest level of customization and finishes</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions About Skye Canyon Communities"
          faqs={communitiesFAQs}
          pageType="skye-canyon"
        />

        {/* Contact CTA */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Your Perfect New Construction Home
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get expert guidance on Century Communities homes, builder incentives, and customization options in Skye Canyon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/properties" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View All Properties
              </a>
              <a 
                href="tel:(702) 500-1902" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Call (702) 500-1902
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}