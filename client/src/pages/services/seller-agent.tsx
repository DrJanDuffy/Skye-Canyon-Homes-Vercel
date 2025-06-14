import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Camera, 
  Users, 
  Target, 
  Shield, 
  Award,
  DollarSign,
  Phone,
  Mail,
  Star
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";

const sellerServices = [
  {
    icon: Camera,
    title: "Professional Marketing Package",
    description: "High-end photography, virtual tours, drone footage, and premium listing presentations"
  },
  {
    icon: Target,
    title: "Strategic Pricing Analysis",
    description: "Comprehensive market analysis and competitive positioning for optimal pricing strategy"
  },
  {
    icon: Users,
    title: "Buyer Network Access",
    description: "Exclusive access to qualified buyer database and agent referral networks"
  },
  {
    icon: Shield,
    title: "Transaction Management",
    description: "Complete contract negotiation, inspection coordination, and closing oversight"
  }
];

const marketingFeatures = [
  {
    title: "Professional Photography",
    description: "High-resolution interior and exterior photography showcasing your home's best features"
  },
  {
    title: "Virtual Tour Technology",
    description: "3D virtual tours and interactive floor plans for enhanced online engagement"
  },
  {
    title: "Drone Aerial Footage",
    description: "Stunning aerial photography highlighting Skye Canyon's golf course and mountain views"
  },
  {
    title: "Premium Listing Syndication",
    description: "Maximum exposure across MLS, Zillow, Realtor.com, and luxury property websites"
  }
];

const sellingProcess = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Property evaluation, market analysis, and strategic planning session"
  },
  {
    step: 2,
    title: "Pre-Market Preparation",
    description: "Home staging recommendations, repairs coordination, and photography scheduling"
  },
  {
    step: 3,
    title: "Marketing Launch",
    description: "MLS listing activation, professional marketing materials, and showing coordination"
  },
  {
    step: 4,
    title: "Offer Management",
    description: "Buyer qualification, offer negotiation, and contract execution"
  },
  {
    step: 5,
    title: "Closing Coordination",
    description: "Inspection management, financing coordination, and successful closing"
  }
];

export default function SellerAgentServices() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Seller Agent Services | Dr. Jan Duffy REALTOR® Las Vegas NV</title>
        <meta name="description" content="Expert seller agent services for Skye Canyon homes. Dr. Jan Duffy provides professional marketing, strategic pricing, and premium listing services with 98% of list price results. Call (702) 500-1902!" />
        <meta name="keywords" content="Skye Canyon seller agent, Las Vegas luxury home sales, premium marketing package, home selling services, real estate listing agent, Skye Canyon homes for sale" />
        
        {/* Geo-specific meta tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2648;-115.3275" />
        <meta name="geo.zipcode" content="89166" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Skye Canyon Seller Agent Services | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Expert seller agent services for Skye Canyon homes with professional marketing and 98% of list price results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/seller-agent" />
        <meta property="og:image" content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/seller-agent" />
      </Helmet>

      {/* Service-Specific Schema Markup */}
      <ComprehensiveSchemaMarkup 
        pageType="service"
        serviceName="Seller Agent Services"
        breadcrumbs={[
          { name: "Home", url: "https://skyecanyonhomesforsale.com" },
          { name: "Services", url: "https://skyecanyonhomesforsale.com/services" },
          { name: "Seller Agent Services", url: "https://skyecanyonhomesforsale.com/services/seller-agent" }
        ]}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "Seller Agent Services" }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="font-medium">Premium Marketing Package</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Skye Canyon Homes Seller's Agent Expert
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Professional listing and marketing services with proven results in the competitive Skye Canyon market. 
                Achieve maximum value with expert pricing strategy and premium marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+17025001902"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
                >
                  Call (702) 500-1902
                </a>
                <a 
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-400 border-2 border-green-400 transition-colors"
                >
                  Get Market Analysis
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Of List Price Achieved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">45</div>
                <div className="text-gray-600">Days Average Market Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">$50M+</div>
                <div className="text-gray-600">In Sales Since 2009</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Skye Canyon Seller Agent Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive listing and marketing services designed to maximize your home's value and minimize time on market.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sellerServices.map((service, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <service.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Premium Marketing Package Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional marketing materials and strategies that set your Skye Canyon home apart from the competition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketingFeatures.map((feature, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Skye Canyon Home Selling Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Proven methodology for achieving maximum value and successful sale of your Skye Canyon home.
              </p>
            </div>
            
            <div className="space-y-8">
              {sellingProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-4">
                "Dr. Jan Duffy's marketing strategy was exceptional. Our Skye Canyon home sold in 30 days for 102% of asking price. 
                The professional photography and marketing materials were outstanding."
              </blockquote>
              <cite className="text-gray-600 font-medium">- Sarah & Mike Thompson, Skye Canyon Sellers</cite>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Skye Canyon Home?</h2>
            <p className="text-xl text-green-100 mb-8">
              Get a comprehensive market analysis and pricing strategy from the Skye Canyon specialist
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+17025001902"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Call (702) 500-1902
              </a>
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-400 border-2 border-green-400 transition-colors"
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                Get Market Analysis
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}