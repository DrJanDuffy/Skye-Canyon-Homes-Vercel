import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AuthenticPropertyListings from "@/components/authentic-property-listings";
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
import VoiceSearchIntegration from "@/components/voice-search-integration";
import ErrorBoundary from "@/components/error-boundary";
import ReviewHighlights from "@/components/review-highlights";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";
import ServicesOverview from "@/components/services-overview";
import LinkBuildingSEO from "@/components/link-building-seo";
import LocalCitationsSchema from "@/components/local-citations-schema";
import { ContextualContent } from "@/components/internal-link-optimizer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166</title>
        <meta name="description" content="Expert Skye Canyon real estate agent Dr. Jan Duffy specializes in luxury homes, new construction & golf course properties in Las Vegas NV 89166. Call (702) 500-1902!" />
        <meta name="keywords" content="Skye Canyon homes for sale, Las Vegas NV 89166, luxury real estate, Dr. Jan Duffy REALTOR, golf course homes, guard gated community, new construction, Desert Highlands Golf Course" />
        
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
        <meta property="og:title" content="Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166" />
        <meta property="og:description" content="Expert Skye Canyon real estate agent Dr. Jan Duffy specializes in luxury homes, new construction & golf course properties in Las Vegas NV 89166." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com" />
        <meta property="og:image" content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Skye Canyon Homes for Sale" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166" />
        <meta name="twitter:description" content="Expert Skye Canyon real estate agent specializing in luxury homes, new construction & golf course properties. Call (702) 500-1902!" />
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
      
      {/* Comprehensive Schema Markup */}
      <ComprehensiveSchemaMarkup 
        pageType="homepage"
        breadcrumbs={[
          { name: "Home", url: "https://skyecanyonhomesforsale.com" }
        ]}
        reviews={[
          {
            author: "Sarah Mitchell",
            rating: 5,
            reviewBody: "Dr. Jan Duffy made our Skye Canyon home purchase seamless. Her knowledge of the community and market expertise helped us find our perfect luxury home.",
            datePublished: "2024-11-15"
          },
          {
            author: "Michael Rodriguez",
            rating: 5,
            reviewBody: "Outstanding service from Dr. Duffy! She guided us through our first-time home purchase in Skye Canyon with professionalism and patience.",
            datePublished: "2024-10-22"
          },
          {
            author: "Jennifer Chen",
            rating: 5,
            reviewBody: "Sold our Skye Canyon home in just 8 days! Dr. Duffy's marketing strategy and local connections delivered exceptional results.",
            datePublished: "2024-12-03"
          },
          {
            author: "David Thompson",
            rating: 5, 
            reviewBody: "Dr. Duffy's expertise in luxury Skye Canyon properties is unmatched. She helped us navigate the competitive market and secure our dream home.",
            datePublished: "2024-09-18"
          },
          {
            author: "Lisa Anderson",
            rating: 5,
            reviewBody: "Professional, knowledgeable, and responsive. Dr. Duffy made our new construction purchase stress-free with her builder relationships.",
            datePublished: "2024-11-28"
          }
        ]}
      />
      
      <CriticalCSS />
      <CriticalPerformanceLoader />
      <LocalBusinessSchema />
      <LocalCitationsSchema />
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
              Current Skye Canyon MLS Listings Nevada 89166
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
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">AI-Powered Skye Canyon Property Search Las Vegas</h2>
          <AISearchAssistant />
        </div>
      </section>
      
      {/* Voice Search Integration with Conversion Limits */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Voice-Activated Skye Canyon Property Search</h2>
            <p className="text-xl text-gray-600">Search for your dream home using natural language</p>
          </div>
          <ErrorBoundary>
            <VoiceSearchIntegration 
              maxSearches={3}
              onSearchLimitReached={() => {
                // Track conversion event when limit is reached
                if (window.gtag) {
                  window.gtag('event', 'voice_search_conversion', {
                    event_category: 'lead_generation',
                    event_label: 'realscout_onboarding_redirect'
                  });
                }
                console.log('Voice search limit reached - automated RealScout popup triggered');
              }}
            />
          </ErrorBoundary>
        </div>
      </section>
      
      {/* Authentic Property Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthenticPropertyListings />
        </div>
      </section>
      
      {/* Quick Market Stats Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Skye Canyon Real Estate Market Data Las Vegas 89166
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

      {/* Services Overview Section */}
      <ServicesOverview />

      {/* Contextual Internal Linking Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContextualContent />
        </div>
      </section>

      {/* Client Reviews Section */}
      <ReviewHighlights />

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
              Skye Canyon Neighborhood Market Analytics
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
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Tell Us What Skye Canyon Features You're Looking For</h2>
          <PreferenceCollector />
        </div>
      </section>

      {/* Local Area Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Skye Canyon & Northwest Las Vegas Service Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dr. Jan Duffy specializes in Skye Canyon and surrounding Northwest Las Vegas communities, providing expert real estate services in the most sought-after neighborhoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-2">Skye Canyon (89166)</h3>
              <p className="text-sm text-gray-600">Guard-gated luxury community with Desert Highlands Golf Course</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-2">Centennial Hills</h3>
              <p className="text-sm text-gray-600">Master-planned community with top-rated schools and amenities</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-2">Providence</h3>
              <p className="text-sm text-gray-600">Family-friendly neighborhoods with parks and recreation</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold text-lg mb-2">Northwest Las Vegas</h3>
              <p className="text-sm text-gray-600">Established communities near shopping and entertainment</p>
            </div>
          </div>

          {/* Key Landmarks & Features */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose Skye Canyon?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2-5V7m0 4V9" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">24/7 Guard-Gated Security</h4>
                <p className="text-sm text-gray-600">Premium security with controlled access and roving patrols</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Desert Highlands Golf Course</h4>
                <p className="text-sm text-gray-600">18-hole championship golf course with clubhouse amenities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Top-Rated Schools</h4>
                <p className="text-sm text-gray-600">Highly-rated Clark County schools serving the community</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="bg-white border-2 border-blue-200 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Explore Skye Canyon?</h3>
              <p className="text-gray-600 mb-6">
                Contact Dr. Jan Duffy for expert guidance on Skye Canyon homes and Northwest Las Vegas real estate opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+17025001902"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Call (702) 500-1902
                </a>
                <a 
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Schedule Consultation
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                📍 10111 W Skye Canyon Park Dr, Las Vegas, NV 89166
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RealScout Search CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Skye Canyon Home?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Search Skye Canyon properties or get your home's current market value instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg text-center">
              Search Available Homes
            </a>
            <div className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 border-2 border-blue-400 transition-colors shadow-lg">
              <div id="homebot_homeowner"></div>
              <script dangerouslySetInnerHTML={{
                __html: `
                  (function (h,b) { 
                    var w = window, d = document, s = 'script', x, y; 
                    w['__hb_namespace'] = h; 
                    w[h] = w[h] || function () { (w[h].q=w[h].q||[]).push(arguments) }; 
                    y = d.createElement(s); 
                    x = d.getElementsByTagName(s)[0]; 
                    y.async = 1; 
                    y.src = b; 
                    x.parentNode.insertBefore(y,x) 
                  })('Homebot','https://embed.homebotapp.com/lgw/v1/widget.js'); 
                  Homebot('#homebot_homeowner', '35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43')
                `
              }} />
            </div>
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
