import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Star } from "lucide-react";
import FAQSection from "@/components/faq-section";
import RelatedSearches from "@/components/related-searches";
import RealScoutListings from "@/components/realscout-listings";

export default function LasVegasRealEstate() {
  return (
    <>
      <Helmet>
        <title>Las Vegas Real Estate | Nevada Homes for Sale</title>
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

        {/* Current Las Vegas Listings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Current Las Vegas Listings
              </h2>
              <p className="text-xl text-gray-600">
                Available properties across all Las Vegas communities
              </p>
            </div>
            <RealScoutListings className="w-full" />
          </div>
        </section>

        {/* Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Las Vegas Communities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Northwest Las Vegas</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$350K - $900K+</p>
                  <p className="text-gray-600">Guard-gated communities, golf courses, family-friendly</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Henderson</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$400K - $1.2M+</p>
                  <p className="text-gray-600">Planned communities, top schools, mountain views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Summerlin</h3>
                  <p className="text-realscout-blue font-semibold mb-2">$450K - $1.5M+</p>
                  <p className="text-gray-600">Master-planned community, parks, shopping</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section for Las Vegas Real Estate */}
        <FAQSection 
          title="Las Vegas Real Estate Market FAQs"
          pageType="las-vegas"
          faqs={[
            {
              question: "What are the best areas to buy real estate in Las Vegas?",
              answer: "Top Las Vegas areas include Skye Canyon (guard-gated luxury), Henderson (family-friendly), Summerlin (master-planned), The Ridges (high-end), and Northwest Las Vegas communities. Each area offers unique amenities and lifestyle benefits."
            },
            {
              question: "How is the Las Vegas real estate market currently performing?",
              answer: "Las Vegas real estate continues to show strong performance with steady appreciation, growing population, and diverse economic drivers. The market benefits from no state income tax, business-friendly environment, and tourism industry."
            },
            {
              question: "What should out-of-state buyers know about Las Vegas real estate?",
              answer: "Nevada has no state income tax, property taxes are relatively low, and the climate offers year-round outdoor activities. Consider factors like HOA fees, water restrictions, and proximity to amenities when choosing locations."
            },
            {
              question: "What is the average home price in Las Vegas?",
              answer: "Las Vegas home prices vary by area: Northwest Las Vegas ($350K-$900K+), Henderson ($400K-$1.2M+), Summerlin ($450K-$1.5M+), with luxury communities like Skye Canyon ranging $650K-$1.2M+."
            },
            {
              question: "Are there good investment opportunities in Las Vegas real estate?",
              answer: "Yes, Las Vegas offers excellent investment potential with rental properties, vacation homes, and appreciation opportunities. Popular investment areas include established communities and emerging neighborhoods with growth potential."
            },
            {
              question: "What makes Las Vegas attractive for relocation?",
              answer: "Las Vegas offers no state income tax, year-round entertainment, outdoor recreation, growing job market, relatively affordable housing compared to California, and excellent dining and cultural amenities."
            }
          ]}
        />

        {/* Related Searches for Las Vegas Real Estate */}
        <RelatedSearches searchType="las-vegas" />

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}