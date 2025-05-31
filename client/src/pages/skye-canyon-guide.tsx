import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, School, Shield, Car, Utensils, Coffee, TreePine } from "lucide-react";

export default function SkyeCanyonGuide() {
  const communityStats = [
    { label: "Total Homes", value: "1,847", description: "Single-family residences" },
    { label: "Average Home Size", value: "2,850 sq ft", description: "Spacious floor plans" },
    { label: "Average Lot Size", value: "0.23 acres", description: "Generous outdoor space" },
    { label: "HOA Fee Range", value: "$180-$320", description: "Monthly association dues" }
  ];

  const amenities = [
    {
      icon: Shield,
      title: "24/7 Guard-Gated Security",
      description: "Controlled access with roving security patrols ensuring residents' safety and privacy"
    },
    {
      icon: TreePine,
      title: "Championship Golf Course",
      description: "18-hole championship golf course designed by renowned golf course architect"
    },
    {
      icon: Home,
      title: "Resort-Style Clubhouse",
      description: "25,000 sq ft clubhouse with fitness center, spa, and event facilities"
    },
    {
      icon: Car,
      title: "Private Parks & Trails",
      description: "Multiple parks, walking trails, and recreational areas throughout the community"
    }
  ];

  const nearbyAttractions = [
    { name: "Red Rock Canyon", distance: "8 miles", type: "Natural attraction" },
    { name: "Downtown Summerlin", distance: "12 miles", type: "Shopping & dining" },
    { name: "Las Vegas Strip", distance: "25 miles", type: "Entertainment" },
    { name: "McCarran Airport", distance: "28 miles", type: "International airport" }
  ];

  return (
    <>
      <Helmet>
        <title>Skye Canyon Community Guide | Complete Neighborhood Overview | Dr. Jan Duffy</title>
        <meta name="description" content="Complete guide to Skye Canyon Las Vegas - the premier guard-gated community. Learn about amenities, schools, home prices, and why Dr. Jan Duffy is your Skye Canyon expert." />
        <meta name="keywords" content="Skye Canyon guide, Skye Canyon Las Vegas, guard gated community, Skye Canyon homes, Skye Canyon amenities, Dr Jan Duffy Skye Canyon" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/skye-canyon-guide" />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-blue to-realscout-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Complete Skye Canyon Guide
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto">
              Everything you need to know about Las Vegas's premier guard-gated community. 
              Your comprehensive resource from Dr. Jan Duffy, Skye Canyon's leading real estate expert.
            </p>
            <div className="flex items-center justify-center text-lg mb-8">
              <MapPin className="w-6 h-6 mr-2" />
              <span>Las Vegas, NV 89166 | Northwest Las Vegas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Skye Canyon Las Vegas
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Skye Canyon is Las Vegas's most sought-after guard-gated community, 
                  featuring luxury homes ranging from $450,000 to over $1 million. 
                  Located in northwest Las Vegas (89166), this master-planned community 
                  offers an unparalleled lifestyle with world-class amenities.
                </p>
                <p>
                  <strong>Dr. Jan Duffy</strong> has been the leading Skye Canyon real estate 
                  specialist for over 15 years, completing more than 150 transactions in 
                  this exclusive community. Her deep knowledge of Skye Canyon's unique 
                  characteristics makes her the go-to expert for buyers and sellers.
                </p>
                <p>
                  The community spans over 1,200 acres and features custom homes, 
                  semi-custom homes, and production homes from premier builders including 
                  Toll Brothers, KB Home, and Lennar. All homes feature premium finishes 
                  and modern amenities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {communityStats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-realscout-blue mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skye Canyon Amenities & Features
            </h2>
            <p className="text-xl text-gray-600">
              World-class amenities that define luxury living in Las Vegas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {amenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <Card key={index} className="border-2 border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <IconComponent className="w-12 h-12 text-realscout-blue mr-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-3">{amenity.title}</h3>
                        <p className="text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schools & Education */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Skye Canyon Schools & Education
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <School className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Top-Rated Schools</h3>
                    <p className="text-gray-600">
                      Skye Canyon Elementary School (9/10 rating), Becker Middle School, 
                      and Centennial High School serve the community with excellent 
                      academic programs and extracurricular activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Coffee className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Private School Options</h3>
                    <p className="text-gray-600">
                      Nearby private schools include Bishop Gorman High School, 
                      The Meadows School, and Alexander Dawson School, all within 
                      15 minutes of Skye Canyon.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Utensils className="w-6 h-6 text-realscout-blue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Higher Education</h3>
                    <p className="text-gray-600">
                      UNLV and CSN are easily accessible, with the College of 
                      Southern Nevada Northwest Campus just 10 minutes away.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-realscout-blue text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Dr. Jan Duffy for Skye Canyon?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span>15+ years Skye Canyon specialist</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span>150+ successful Skye Canyon transactions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span>Doctorate in Business Administration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span>Top 1% REALTOR® in Las Vegas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span>Exclusive Skye Canyon market knowledge</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-white text-realscout-blue hover:bg-gray-100"
                onClick={() => window.location.href = '/about'}
              >
                Contact Dr. Duffy Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Accessibility */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skye Canyon Location & Nearby Attractions
            </h2>
            <p className="text-xl text-gray-600">
              Perfectly positioned in northwest Las Vegas for convenience and recreation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 text-realscout-blue mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                  <p className="text-realscout-blue font-semibold mb-1">{attraction.distance}</p>
                  <p className="text-sm text-gray-600">{attraction.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}