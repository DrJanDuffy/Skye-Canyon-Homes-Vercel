import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Home, 
  Users, 
  Clock, 
  Shield, 
  Award,
  Truck,
  Phone,
  Mail
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";

const relocationServices = [
  {
    icon: MapPin,
    title: "Area Familiarization Tours",
    description: "Comprehensive neighborhood tours covering amenities, schools, shopping, and local attractions"
  },
  {
    icon: Home,
    title: "Temporary Housing Assistance",
    description: "Coordination with corporate housing providers and extended-stay accommodations"
  },
  {
    icon: Users,
    title: "Family Integration Support",
    description: "School enrollment assistance, community connections, and local service recommendations"
  },
  {
    icon: Shield,
    title: "Corporate Relocation Coordination",
    description: "Direct collaboration with HR departments and relocation management companies"
  }
];

const relocationProcess = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Virtual or in-person meeting to discuss timeline, preferences, and corporate benefits"
  },
  {
    step: 2,
    title: "Market Education",
    description: "Comprehensive overview of Skye Canyon market conditions and available inventory"
  },
  {
    step: 3,
    title: "Area Tour Planning",
    description: "Customized tours of neighborhoods, schools, and community amenities"
  },
  {
    step: 4,
    title: "Home Selection",
    description: "Targeted property showings based on specific criteria and timeline"
  },
  {
    step: 5,
    title: "Moving Coordination",
    description: "Timeline coordination with movers, utilities, and closing schedules"
  }
];

export default function RelocationServices() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Relocation Services | Dr. Jan Duffy REALTOR® Las Vegas NV</title>
        <meta name="description" content="Expert relocation assistance for families moving to Skye Canyon Las Vegas. Dr. Jan Duffy provides comprehensive relocation services, area tours, and family integration support. Call (702) 500-1902!" />
        <meta name="keywords" content="Skye Canyon relocation services, Las Vegas relocation specialist, corporate relocation, family relocation, area tours, Skye Canyon moving assistance" />
        
        {/* Geo-specific meta tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2648;-115.3275" />
        <meta name="geo.zipcode" content="89166" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Skye Canyon Relocation Services | Dr. Jan Duffy REALTOR®" />
        <meta property="og:description" content="Expert relocation assistance for families moving to Skye Canyon Las Vegas with comprehensive area tours and integration support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/relocation" />
        <meta property="og:image" content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/relocation" />
      </Helmet>

      {/* Service-Specific Schema Markup */}
      <ComprehensiveSchemaMarkup 
        pageType="service"
        serviceName="Relocation Services"
        breadcrumbs={[
          { name: "Home", url: "https://skyecanyonhomesforsale.com" },
          { name: "Services", url: "https://skyecanyonhomesforsale.com/services" },
          { name: "Relocation Services", url: "https://skyecanyonhomesforsale.com/services/relocation" }
        ]}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "Relocation Services" }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <Truck className="w-5 h-5 mr-2" />
                <span className="font-medium">Full-Service Relocation Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Skye Canyon Homes Relocation Expert
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Comprehensive relocation services for families moving to Las Vegas' premier guard-gated community. 
                Expert guidance from initial consultation through successful settlement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+17025001902"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Call (702) 500-1902
                </a>
                <a 
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 border-2 border-blue-400 transition-colors"
                >
                  Schedule Consultation
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
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Successful Relocations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">30</div>
                <div className="text-gray-600">Day Average Timeline</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Relocation Services in Skye Canyon
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Full-service relocation assistance designed to make your move to Las Vegas smooth and stress-free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relocationServices.map((service, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <service.icon className="w-6 h-6 text-blue-600" />
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

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Skye Canyon Relocation Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Structured approach ensuring smooth transition to your new Skye Canyon home.
              </p>
            </div>
            
            <div className="space-y-8">
              {relocationProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
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

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Skye Canyon Relocation?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get expert assistance from Las Vegas' premier relocation specialist
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+17025001902"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Call (702) 500-1902
              </a>
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 border-2 border-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Schedule Consultation
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