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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturedListings />
      
      {/* RealScout MLS Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current MLS Listings
            </h2>
            <p className="text-xl text-gray-600">
              Live inventory from Dr. Jan Duffy's exclusive Sky Canyon portfolio
            </p>
          </div>
          <RealScoutListings className="w-full" />
        </div>
      </section>
      
      <MarketStats />
      <LeadCaptureForm />
      <AgentBio />
      <CommunityHighlights />
      <CallToAction />
      <Footer />
    </div>
  );
}
