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
import SkyeCanyonAuthority from "@/components/skye-canyon-authority";
import PreferenceCollector from "@/components/preference-collector";

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

      {/* Preference Collector */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PreferenceCollector />
        </div>
      </section>
      
      <AgentBio />
      <CallToAction />
      <Footer />
    </div>
  );
}
