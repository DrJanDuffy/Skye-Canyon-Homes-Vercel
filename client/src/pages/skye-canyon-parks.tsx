import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FAQSection from "@/components/faq-section";
import EnhancedStructuredData from "@/components/enhanced-structured-data";
import RealScoutListings from "@/components/realscout-listings";
import { MapPin, Users } from "@/lib/icons";

export default function SkyeCanyonParks() {
  const parksData = [
    {
      name: "Skye Canyon Park",
      size: "15-acre",
      description: "The sprawling 15-acre Skye Canyon Park, adjacent to Skye Center and Skye Fitness, is the heartbeat of the neighborhood and home to many community events.",
      address: "10111 W Skye Canyon Park Dr, Las Vegas, NV 89166",
      hours: "6:00am – 9:00pm",
      features: [
        "15-acre park",
        "Skye Center",
        "Skye Fitness",
        "Two covered play areas",
        "Splash pad",
        "Grass field with football & soccer goal posts",
        "Basketball court with 6 hoops",
        "½ mile walking path",
        "Junior Olympic swimming pool"
      ],
      highlights: ["Main community hub", "Resident-only pool access", "Event hosting venue"]
    },
    {
      name: "Eagle Canyon Park",
      description: "Family-friendly park featuring play structures and open spaces for recreational activities.",
      features: ["Play structures", "Open green spaces", "Walking paths"],
      highlights: ["Family-oriented design", "Safe play environment"]
    },
    {
      name: "Skye View Park",
      description: "Scenic park offering beautiful mountain views and peaceful outdoor recreation opportunities.",
      features: ["Mountain views", "Walking trails", "Picnic areas"],
      highlights: ["Scenic mountain vistas", "Peaceful setting"]
    },
    {
      name: "Big Skye Park",
      description: "Expansive park space designed for larger recreational activities and community gatherings.",
      features: ["Large open areas", "Multi-use fields", "Community gathering spaces"],
      highlights: ["Spacious recreation areas", "Community events"]
    },
    {
      name: "Starlight Park",
      description: "Evening-friendly park with lighting for extended outdoor enjoyment and recreational activities.",
      features: ["Evening lighting", "Play areas", "Open spaces"],
      highlights: ["Extended hours usage", "Safe evening recreation"]
    }
  ];

  const parksFAQs = [
    {
      question: "What parks are available in Skye Canyon Las Vegas?",
      answer: "Skye Canyon features five community parks: the 15-acre Skye Canyon Park (main hub), Eagle Canyon Park, Skye View Park, Big Skye Park, and Starlight Park, each offering unique recreational amenities and family-friendly features."
    },
    {
      question: "What are the hours for Skye Canyon Park?",
      answer: "Skye Canyon Park is open daily from 6:00am to 9:00pm, located at 10111 W Skye Canyon Park Drive, Las Vegas, NV 89166, adjacent to Skye Center and Skye Fitness."
    },
    {
      question: "Does Skye Canyon Park have a swimming pool?",
      answer: "Yes, Skye Canyon Park features a Junior Olympic swimming pool with resident-only access, along with a splash pad for children and families to enjoy water activities."
    },
    {
      question: "What sports facilities are at Skye Canyon parks?",
      answer: "Skye Canyon parks offer basketball courts with 6 hoops, grass fields with football and soccer goal posts, walking paths, and various play structures for active outdoor recreation."
    },
    {
      question: "Are Skye Canyon parks good for families with children?",
      answer: "Absolutely! Skye Canyon parks feature covered play areas, splash pads, safe play structures, basketball courts, and family-friendly amenities designed for children of all ages."
    },
    {
      question: "Can I host events at Skye Canyon parks?",
      answer: "Yes, the 15-acre Skye Canyon Park serves as the community's main event venue and hosts many neighborhood gatherings, with large green spaces perfect for community activities."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Skye Canyon Parks & Recreation | Community Amenities Las Vegas NV</title>
        <meta 
          name="description" 
          content="Discover 5 amazing parks in Skye Canyon Las Vegas including the 15-acre main park with splash pad, swimming pool, basketball courts, and walking trails. Perfect for active families." 
        />
        <meta name="keywords" content="Skye Canyon parks, Las Vegas parks, community recreation, splash pad, swimming pool, basketball courts, family parks 89166" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Skye Canyon Parks & Recreation | Community Amenities Las Vegas NV" />
        <meta property="og:description" content="Explore 5 community parks in Skye Canyon featuring splash pads, swimming pools, sports courts, and family recreation areas in Las Vegas Nevada 89166." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/skye-canyon-parks" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skye Canyon Parks & Recreation | Community Amenities Las Vegas NV" />
        <meta name="twitter:description" content="Discover 5 amazing parks in Skye Canyon Las Vegas with splash pads, pools, courts, and family recreation areas." />
        
        {/* Local SEO */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2887;-115.3366" />
        <meta name="ICBM" content="36.2887, -115.3366" />
        
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/skye-canyon-parks" />
      </Helmet>

      <EnhancedStructuredData />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skye Canyon Parks & Recreation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Play, run, or splash in one of Skye Canyon's community parks. Perfect for those who seek a fitness-inspired lifestyle and enjoy expansive outdoor recreation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                🌲 5 Community Parks
              </span>
              <span className="flex items-center gap-2">
                🌊 Splash Pads & Pool
              </span>
              <span className="flex items-center gap-2">
                💪 Sports Courts & Fields
              </span>
            </div>
          </div>
        </section>

        {/* Current Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Homes Near Parks & Recreation
              </h2>
              <p className="text-xl text-gray-600">
                Properties close to community amenities
              </p>
            </div>
            <RealScoutListings className="w-full" />
          </div>
        </section>

        {/* Main Park Feature */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Skye Canyon Park
                  <span className="block text-lg text-blue-600 font-normal">15-Acre Community Hub</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  The sprawling 15-acre Skye Canyon Park, adjacent to Skye Center and Skye Fitness, is the heartbeat of the neighborhood and home to many community events. Easily-accessible, the park features large green spaces and resident-only pool access.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">🕕</span>
                    <span className="text-gray-700">Open 6:00am – 9:00pm daily</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <span className="text-gray-700">10111 W Skye Canyon Park Dr</span>
                      <br />
                      <span className="text-gray-700">Las Vegas, NV 89166</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parksData[0].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-green-100 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Main Park Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-1" />
                    <span className="text-gray-700">Community event hosting venue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600">🌊</span>
                    <span className="text-gray-700">Junior Olympic pool with resident-only access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600">🌲</span>
                    <span className="text-gray-700">½ mile walking path through scenic areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* All Parks Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              All Skye Canyon Community Parks
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parksData.slice(1).map((park, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{park.name}</h3>
                  <p className="text-gray-600 mb-4">{park.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-900">Features:</h4>
                    {park.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                    {park.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recreation Benefits */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Active Lifestyle & Family Recreation
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Fully equipped with splash pads, basketball courts, soccer fields, play structures and more, there is something for everyone at Skye Canyon's community parks.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Friendly</h3>
                <p className="text-gray-600">Safe play areas and amenities designed for families with children of all ages.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-green-600">💪</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fitness Focused</h3>
                <p className="text-gray-600">Walking paths, sports courts, and fitness amenities for an active lifestyle.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-purple-600">🌲</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Events</h3>
                <p className="text-gray-600">Central gathering spaces perfect for neighborhood events and celebrations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions About Skye Canyon Parks"
          faqs={parksFAQs}
          pageType="skye-canyon"
        />

        {/* Contact CTA */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Find Your Home Near Skye Canyon Parks
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Discover luxury homes within walking distance of these amazing community amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/properties" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Available Homes
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