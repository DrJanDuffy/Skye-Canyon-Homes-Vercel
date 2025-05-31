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
      
      {/* RealScout MLS Access */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Search Live MLS Listings
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Access Dr. Jan Duffy's complete MLS inventory and advanced search tools
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-realscout-blue rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional MLS Search Portal</h3>
              <p className="text-gray-600 mb-6">
                Search thousands of properties with detailed filters, high-resolution photos, 
                and real-time market data through Dr. Jan Duffy's dedicated MLS platform.
              </p>
              <button 
                onClick={() => window.open('http://drjanduffy.realscout.com/', '_blank')}
                className="bg-realscout-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-realscout-navy transition-colors"
              >
                Launch MLS Search Portal
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Opens in new window • Powered by RealScout MLS
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
