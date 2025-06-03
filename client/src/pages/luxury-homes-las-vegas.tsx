import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Shield, Gem, Star } from "lucide-react";
import FAQSection from "@/components/faq-section";
import RelatedSearches from "@/components/related-searches";
import RealScoutListings from "@/components/realscout-listings";

export default function LuxuryHomesLasVegas() {
  return (
    <>
      <Helmet>
        <title>Luxury Homes Las Vegas | High-End Real Estate</title>
        <meta name="description" content="Luxury homes for sale in Las Vegas featuring Skye Canyon, The Ridges, and exclusive communities. Expert service from Dr. Jan Duffy, licensed Nevada REALTOR®." />
        <meta name="keywords" content="luxury homes Las Vegas, high-end real estate, exclusive communities, Nevada luxury properties" />
        <meta property="og:title" content="Luxury Homes Las Vegas | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Discover Las Vegas luxury homes in premier communities with expert guidance from Dr. Jan Duffy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/luxury-homes-las-vegas" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Luxury Homes Las Vegas Skye Canyon Summerlin
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover exclusive properties in Las Vegas's most prestigious communities
            </p>
          </div>
        </section>

        {/* Current Luxury Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Luxury Listings
              </h2>
              <p className="text-xl text-gray-600">
                Premium properties available in Las Vegas's finest communities
              </p>
            </div>
            <RealScoutListings className="w-full" />
          </div>
        </section>

        {/* Luxury Communities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Premier Luxury Communities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Skye Canyon</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$650K - $1.2M+</p>
                  <p className="text-gray-600">Premier guard-gated community with luxury amenities</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">The Ridges</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$800K - $3M+</p>
                  <p className="text-gray-600">Exclusive hillside community with stunning views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Spanish Trail</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$500K - $1.5M</p>
                  <p className="text-gray-600">Established luxury golf community</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section for Luxury Homes */}
        <FAQSection 
          title="Luxury Homes & High-End Real Estate FAQs"
          pageType="luxury-homes"
          faqs={[
            {
              question: "What defines a luxury home in Las Vegas?",
              answer: "Luxury homes in Las Vegas typically feature 3,000+ sq ft, premium finishes, custom designs, and are often located in guard-gated communities like Skye Canyon, The Ridges, or Spanish Trail with prices starting around $650K."
            },
            {
              question: "Which Las Vegas communities have the best luxury homes?",
              answer: "Premier luxury communities include Skye Canyon ($650K-$1.2M+), The Ridges ($800K-$3M+), Spanish Trail ($500K-$1.5M), and MacDonald Ranch in Henderson, each offering unique amenities and lifestyle features."
            },
            {
              question: "What luxury amenities are common in high-end Las Vegas homes?",
              answer: "Luxury Las Vegas homes often feature resort-style pools, wine cellars, home theaters, gourmet kitchens, smart home technology, casitas, RV garages, and outdoor entertainment areas with mountain or golf course views."
            },
            {
              question: "How is the luxury real estate market performing in Las Vegas?",
              answer: "The luxury market remains strong with steady appreciation. Properties above $1M show consistent demand, especially in guard-gated communities. Dr. Jan Duffy provides detailed market analysis for informed luxury home investments."
            },
            {
              question: "What should I expect when buying a luxury home?",
              answer: "Luxury home purchases involve detailed inspections, custom financing options, longer due diligence periods, and specialized marketing. Dr. Jan Duffy's expertise ensures smooth transactions and exclusive access to off-market properties."
            }
          ]}
        />

        {/* Related Searches for Luxury Homes */}
        <RelatedSearches searchType="luxury-homes" />

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}