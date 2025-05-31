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
import RealScoutCurrentListings from "@/components/realscout-current-listings";
import FollowUpBossListings from "@/components/followup-boss-listings";
import AISearchAssistant from "@/components/ai-search-assistant";
import MarketIntelligence from "@/components/market-intelligence";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      {/* AI Search Assistant */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AISearchAssistant />
        </div>
      </section>
      
      <FeaturedListings />
      
      {/* Live MLS Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current MLS Listings
            </h2>
            <p className="text-xl text-gray-600">
              Newest properties for sale and rent from Dr. Jan Duffy's portfolio
            </p>
          </div>
          <RealScoutCurrentListings className="w-full" />
        </div>
      </section>
      
      <MarketStats />
      
      {/* Market Intelligence */}
      <MarketIntelligence />
      
      {/* FollowUp Boss CRM Integration */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Portfolio
            </h2>
            <p className="text-xl text-gray-600">
              Properties managed through Dr. Jan Duffy's CRM system
            </p>
          </div>
          <FollowUpBossListings />
        </div>
      </section>
      
      <LeadCaptureForm />
      <AgentBio />
      <CommunityHighlights />
      <CallToAction />
      <Footer />
    </div>
  );
}
