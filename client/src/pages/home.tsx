import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedListings from "@/components/featured-listings";
import MarketStats from "@/components/market-stats";
import LeadCaptureForm from "@/components/lead-capture-form";
import AgentBio from "@/components/agent-bio";
import CommunityHighlights from "@/components/community-highlights";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import RealScoutListings from "@/components/realscout-listings";

import FollowUpBossListings from "@/components/followup-boss-listings";
import AISearchAssistant from "@/components/ai-search-assistant";
import MarketIntelligence from "@/components/market-intelligence";
import FAQSection from "@/components/faq-section";
import SkyeCanyonAuthority from "@/components/skye-canyon-authority";
import PreferenceCollector from "@/components/preference-collector";
import LocalBusinessSchema from "@/components/local-business-schema";
import RelatedSearches from "@/components/related-searches";
import NeighborhoodHeatmap from "@/components/neighborhood-heatmap";
import CriticalPerformanceLoader from "@/components/critical-performance-loader";
import GeoEnhancedSchema from "@/components/geo-enhanced-schema";
import EnhancedPropertyFallback from "@/components/enhanced-property-fallback";
import CriticalCSS from "@/components/critical-css";
import RealScoutSearchWidget from "@/components/realscout-search-widget";
import RealScoutAnalytics from "@/components/realscout-analytics";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Homes for Sale | Las Vegas NV Real Estate</title>
        <meta name="description" content="Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166. Call (702) 500-1902 today!" />
        <meta name="keywords" content="Skye Canyon homes for sale, Las Vegas real estate, Nevada 89166, luxury homes, Dr. Jan Duffy REALTOR, Toll Brothers, Lennar, new construction" />
        
        {/* Geo-specific meta tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2648;-115.3275" />
        <meta name="ICBM" content="36.2648, -115.3275" />
        <meta name="geo.locality" content="Skye Canyon" />
        <meta name="geo.zipcode" content="89166" />
        
        {/* Local business meta tags */}
        <meta name="business.phone" content="(702) 500-1902" />
        <meta name="business.address" content="10111 W Skye Canyon Park Dr, Las Vegas, NV 89166" />
        <meta name="business.hours" content="Mo-Fr 09:00-18:00, Sa 09:00-17:00, Su 11:00-16:00" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Skye Canyon Homes for Sale | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com" />
        <meta property="og:image" content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dr. Jan Duffy Real Estate" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skye Canyon Homes for Sale | Dr. Jan Duffy REALTOR®" />
        <meta name="twitter:description" content="Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166." />
        <meta name="twitter:image" content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg" />
        
        {/* Canonical and alternate URLs */}
        <link rel="canonical" href="https://skyecanyonhomesforsale.com" />
        <link rel="alternate" hrefLang="en-US" href="https://skyecanyonhomesforsale.com" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Dr. Jan Duffy" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Helmet>
      <CriticalCSS />
      <CriticalPerformanceLoader />
      <LocalBusinessSchema />
      <GeoEnhancedSchema />
      <RealScoutAnalytics />
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
      
      {/* Current Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Skye Canyon Listings
            </h2>
            <p className="text-xl text-gray-600">
              Live inventory of available homes
            </p>
          </div>
          <div className="realscout-container">
            <RealScoutListings className="w-full" />
            <div className="realscout-fallback hidden">
              <EnhancedPropertyFallback />
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Search Assistant */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">AI-Powered Property Search</h2>
          <AISearchAssistant />
        </div>
      </section>
      
      <FeaturedListings />
      
      {/* Quick Market Stats Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Skye Canyon Market Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-realscout-blue mb-2">$1.2M</div>
              <div className="text-gray-600">Median Home Price</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-realscout-blue mb-2">28</div>
              <div className="text-gray-600">Days on Market</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-realscout-blue mb-2">96%</div>
              <div className="text-gray-600">Price to List Ratio</div>
            </div>
          </div>
          <a 
            href="/market-analysis" 
            className="inline-flex items-center text-realscout-blue hover:text-realscout-navy font-medium"
          >
            View Complete Market Analysis →
          </a>
        </div>
      </section>

      {/* Home Valuation CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RealScoutSearchWidget variant="inline" className="mb-8" />
        </div>
      </section>

      {/* Neighborhood Heatmap */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neighborhood Market Analytics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore interactive data on Las Vegas neighborhoods including price trends, market activity, 
              school ratings, and local insights to make informed decisions.
            </p>
          </div>
          <NeighborhoodHeatmap />
        </div>
      </section>

      {/* Preference Collector */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Tell Us What You're Looking For</h2>
          <PreferenceCollector />
        </div>
      </section>

      {/* RealScout Search CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Search Skye Canyon properties or get your home's current market value instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Search Available Homes
            </button>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 border-2 border-blue-400 transition-colors shadow-lg">
              Get Home Valuation
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Powered by RealScout MLS • Updated in real-time
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions About Skye Canyon Homes"
        pageType="skye-canyon"
        faqs={[
          {
            question: "What are the home prices in Skye Canyon?",
            answer: "Skye Canyon home prices typically range from $650,000 to $1.2M+, with luxury custom homes reaching higher price points. The guard-gated community offers exceptional value for the premium amenities and location."
          },
          {
            question: "Is Skye Canyon a guard-gated community?",
            answer: "Yes, Skye Canyon is a prestigious 24/7 guard-gated community with controlled access and roving security patrols, ensuring residents' safety and privacy."
          },
          {
            question: "What amenities are available in Skye Canyon?",
            answer: "Skye Canyon features the Desert Highlands Golf Course, community recreation center, fitness facilities, swimming pools, tennis courts, walking trails, and exclusive clubhouse amenities."
          },
          {
            question: "How long does it take to find a home in Skye Canyon?",
            answer: "With Dr. Jan Duffy's expertise and exclusive market knowledge, most clients find their ideal Skye Canyon home within 30-60 days, depending on specific requirements and market conditions."
          },
          {
            question: "What schools serve the Skye Canyon area?",
            answer: "Skye Canyon is served by highly-rated schools in the Clark County School District, including top-performing elementary, middle, and high schools in the northwest Las Vegas area."
          },
          {
            question: "Are there new construction homes available in Skye Canyon?",
            answer: "Yes, Skye Canyon offers both resale homes and new construction opportunities. Dr. Jan Duffy can help you explore all available options including quick move-in homes and custom builds."
          }
        ]}
      />

      {/* Related Searches Section */}
      <RelatedSearches searchType="skye-canyon" />
      
        <AgentBio />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}
