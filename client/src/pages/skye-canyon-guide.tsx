import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home } from "lucide-react";
import FAQSection from "@/components/faq-section";
import RelatedSearches from "@/components/related-searches";
import RealScoutListings from "@/components/realscout-listings";

export default function SkyeCanyonGuide() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Community Guide | Living in Las Vegas NV 89166</title>
        <meta name="description" content="Complete Skye Canyon community guide covering amenities, schools, parks, dining, and lifestyle. Expert neighborhood insights from Dr. Jan Duffy, local REALTOR®." />
        <meta name="keywords" content="Skye Canyon community, Las Vegas 89166, neighborhood guide, schools, amenities, lifestyle" />
        <meta property="og:title" content="Skye Canyon Community Guide | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Discover what makes Skye Canyon special - amenities, schools, parks, and lifestyle in this premier Las Vegas community." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/skye-canyon-guide" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Community Overview */}
        <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skye Canyon Community Guide Las Vegas 89166 Living
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover what makes Skye Canyon one of Las Vegas's most desirable guard-gated communities
            </p>
          </div>
        </section>

        {/* Current Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Skye Canyon Listings
              </h2>
              <p className="text-xl text-gray-600">
                Available homes in this exclusive community
              </p>
            </div>
            <RealScoutListings className="w-full" />
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Community Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-realscout-blue mb-2">1,847</h3>
                  <p className="text-sm text-gray-600">Total Homes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-realscout-blue mb-2">2,850 sq ft</h3>
                  <p className="text-sm text-gray-600">Average Home Size</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-realscout-blue mb-2">0.23 acres</h3>
                  <p className="text-sm text-gray-600">Average Lot Size</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-realscout-blue mb-2">$180-$320</h3>
                  <p className="text-sm text-gray-600">HOA Fee Range</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Amenities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <span className="text-3xl mb-4 block">🛡️</span>
                  <h3 className="text-xl font-semibold mb-2">24/7 Guard-Gated Security</h3>
                  <p className="text-gray-600">Controlled access with roving security patrols ensuring residents' safety and privacy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <span className="text-3xl mb-4 block">🌲</span>
                  <h3 className="text-xl font-semibold mb-2">Desert Highlands Golf Course</h3>
                  <p className="text-gray-600">Championship 18-hole golf course with stunning mountain views and clubhouse amenities</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Home className="w-8 h-8 text-realscout-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community Recreation Center</h3>
                  <p className="text-gray-600">State-of-the-art fitness center, pools, tennis courts, and event spaces</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section for Skye Canyon Community */}
        <FAQSection 
          title="Living in Skye Canyon - Community Guide FAQs"
          pageType="skye-canyon"
          faqs={[
            {
              question: "What makes Skye Canyon different from other Las Vegas communities?",
              answer: "Skye Canyon is a prestigious 24/7 guard-gated community featuring the Desert Highlands Golf Course, exclusive amenities, and larger lot sizes averaging 0.23 acres. The community offers privacy, security, and resort-style living."
            },
            {
              question: "What amenities are included with Skye Canyon living?",
              answer: "Residents enjoy access to Desert Highlands Golf Course, community recreation center with fitness facilities, swimming pools, tennis courts, walking trails, clubhouse, and various community events and activities."
            },
            {
              question: "What are the HOA fees in Skye Canyon?",
              answer: "Skye Canyon HOA fees typically range from $180-$320 per month, which includes security, golf course maintenance, community amenities, landscaping of common areas, and exclusive club access."
            },
            {
              question: "What schools serve Skye Canyon residents?",
              answer: "Skye Canyon is served by highly-rated schools in the Clark County School District, including top-performing elementary, middle, and high schools in the northwest Las Vegas area with excellent academic programs."
            },
            {
              question: "How far is Skye Canyon from Las Vegas Strip and airport?",
              answer: "Skye Canyon is approximately 25-30 minutes from the Las Vegas Strip and McCarran International Airport, offering convenient access to entertainment, dining, and travel while maintaining a peaceful residential setting."
            },
            {
              question: "Are there dining and shopping options near Skye Canyon?",
              answer: "Yes, Skye Canyon is close to various shopping centers, restaurants, grocery stores, and entertainment venues in the northwest Las Vegas area, with easy access to major retail and dining destinations."
            }
          ]}
        />

        {/* Related Searches for Skye Canyon */}
        <RelatedSearches searchType="skye-canyon" />

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}