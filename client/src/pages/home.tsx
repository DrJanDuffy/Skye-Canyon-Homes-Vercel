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
      
      {/* RealScout MLS Integration - Coming Soon */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live MLS Integration
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Connect your RealScout account to display authentic MLS listings
            </p>
            <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">RealScout Integration Ready</h3>
              <p className="text-gray-600">
                Your website is configured to display live MLS data from your RealScout account. 
                Contact your RealScout representative to complete the integration setup.
              </p>
            </div>
          </div>
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
