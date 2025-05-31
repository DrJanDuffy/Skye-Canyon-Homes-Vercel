import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MarketStats from "@/components/market-stats";
import MarketIntelligence from "@/components/market-intelligence";
import Breadcrumb from "@/components/breadcrumb";
import BackToTop from "@/components/back-to-top";

export default function MarketAnalysis() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Market Analysis | Real Estate Trends | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Current Skye Canyon real estate market analysis, pricing trends, and investment insights. Expert market intelligence from Dr. Jan Duffy, licensed Nevada REALTOR®." />
        <meta name="keywords" content="Skye Canyon market analysis, Las Vegas real estate trends, Nevada 89166 market data, property values" />
        <meta property="og:title" content="Skye Canyon Market Analysis | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Comprehensive real estate market insights and trends for Skye Canyon, Las Vegas with expert analysis." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/market-analysis" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Skye Canyon Market Analysis
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Comprehensive real estate market insights and trends for Skye Canyon, Las Vegas
          </p>
          <p className="text-lg opacity-80">
            Stay informed with the latest market data, pricing trends, and investment opportunities 
            in Las Vegas's premier guard-gated community.
          </p>
        </div>
      </section>
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb items={[{ label: "Market Analysis" }]} />
      </div>

      {/* Market Statistics */}
      <MarketStats />
      
      {/* Market Intelligence & Insights */}
      <MarketIntelligence />
      
      {/* Additional Market Context */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Skye Canyon?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-realscout-blue">Guard-Gated Security</h3>
              <p className="text-gray-700">
                24/7 security and controlled access providing peace of mind and exclusive community living.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-realscout-blue">Golf Course Living</h3>
              <p className="text-gray-700">
                Beautiful homes surrounding championship golf courses with stunning mountain views.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-realscout-blue">Family-Friendly</h3>
              <p className="text-gray-700">
                Top-rated schools, parks, and family amenities make this ideal for growing families.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-realscout-blue">Investment Value</h3>
              <p className="text-gray-700">
                Strong appreciation rates and high demand make Skye Canyon an excellent investment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}