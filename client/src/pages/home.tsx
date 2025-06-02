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
import MarketAnalysisJune2025 from "@/components/market-analysis-june-2025";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Homes for Sale | Dr. Jan Duffy REALTOR® | Las Vegas NV</title>
        <meta name="description" content="Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166. Schedule your tour today!" />
        <meta name="keywords" content="Skye Canyon homes for sale, Las Vegas real estate, Nevada 89166, luxury homes, Dr. Jan Duffy REALTOR" />
        <meta property="og:title" content="Skye Canyon Homes for Sale | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com" />
      </Helmet>
      <LocalBusinessSchema />
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
          <RealScoutListings className="w-full" />
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
      
      {/* Updated June 2025 Market Analysis */}
      <MarketAnalysisJune2025 />

      {/* Preference Collector */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Tell Us What You're Looking For</h2>
          <PreferenceCollector />
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
