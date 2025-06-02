import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import RealScoutListings from "@/components/realscout-listings";

import FollowUpBossListings from "@/components/followup-boss-listings";
import Breadcrumb from "@/components/breadcrumb";
import BackToTop from "@/components/back-to-top";
import FAQSection from "@/components/faq-section";

export default function Properties() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Properties for Sale | Luxury Homes Las Vegas | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Browse luxury Skye Canyon properties for sale. Current MLS listings, exclusive client portfolio, and Las Vegas area homes. Expert service by Dr. Jan Duffy REALTOR®." />
        <meta name="keywords" content="Skye Canyon properties, luxury homes for sale, Las Vegas MLS listings, Nevada 89166, real estate" />
        <meta property="og:title" content="Skye Canyon Properties for Sale | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Browse luxury Skye Canyon properties for sale with current MLS listings and exclusive client portfolio." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/properties" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
      
      {/* Header */}
      <section className="bg-realscout-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Skye Canyon Properties
            </h1>
            <p className="text-xl opacity-90">
              Discover luxury homes in Las Vegas's premier community
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb items={[{ label: "Properties" }]} />
      </div>

      {/* Current MLS Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current MLS Listings
            </h2>
            <p className="text-xl text-gray-600">
              Latest properties for sale from Dr. Jan Duffy's active portfolio
            </p>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Featured Listings</h3>
          </div>
          <RealScoutListings className="w-full" />
        </div>
      </section>

      {/* All Available Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Available Properties
            </h2>
            <p className="text-xl text-gray-600">
              Complete listing of Skye Canyon homes and Las Vegas area properties
            </p>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Browse All Properties</h3>
          </div>
          <RealScoutListings className="w-full" />
        </div>
      </section>

      {/* Client Portfolio */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Portfolio
            </h2>
            <p className="text-xl text-gray-600">
              Properties managed through Dr. Jan Duffy's CRM system
            </p>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Exclusive Client Listings</h3>
          </div>
          <FollowUpBossListings />
        </div>
      </section>

      {/* FAQ Section for Properties */}
      <FAQSection 
        title="Property Search & Buying Process FAQs"
        pageType="general"
        faqs={[
          {
            question: "How do I search for Skye Canyon properties?",
            answer: "Use our advanced search tools to filter by price, bedrooms, bathrooms, and specific features. Dr. Jan Duffy also provides exclusive access to off-market listings and upcoming properties."
          },
          {
            question: "What is the typical timeline for buying a home?",
            answer: "The home buying process typically takes 30-45 days from offer acceptance to closing. Pre-approval can be completed in 1-3 days, and property searches can begin immediately."
          },
          {
            question: "Do you have access to new construction homes?",
            answer: "Yes, Dr. Jan Duffy works with premier builders in Skye Canyon and can help you secure new construction homes, including quick move-in properties and custom builds."
          },
          {
            question: "What are closing costs in Las Vegas?",
            answer: "Closing costs typically range from 2-5% of the purchase price and include title insurance, escrow fees, inspections, and loan origination fees. Dr. Jan Duffy provides detailed cost estimates upfront."
          },
          {
            question: "Can I view properties virtually?",
            answer: "Yes, we offer virtual tours, video walkthroughs, and detailed photo galleries for most properties. In-person showings can be scheduled at your convenience."
          }
        ]}
      />
      
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}