import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Shield, 
  CheckCircle, 
  Award,
  MapPin,
  DollarSign,
  Home,
  ExternalLink
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

const services = [
  {
    icon: GraduationCap,
    title: "HOA Requirements Education",
    description: "Complete guidance through Skye Canyon's guard-gated community rules and regulations"
  },
  {
    icon: DollarSign,
    title: "Builder Incentive Navigation",
    description: "Expert assistance securing the best builder promotions and upgrade packages"
  },
  {
    icon: Shield,
    title: "Loan Program Expertise",
    description: "FHA, VA, conventional loan guidance with preferred lender relationships"
  },
  {
    icon: MapPin,
    title: "Community Amenities Tour",
    description: "Personal tours of Desert Highlands Golf Course, parks, and recreational facilities"
  }
];

const loanPrograms = [
  {
    type: "FHA Loans",
    downPayment: "3.5% down",
    benefits: "Lower credit requirements, seller concessions allowed",
    ideal: "First-time buyers with limited savings"
  },
  {
    type: "VA Loans",
    downPayment: "0% down",
    benefits: "No PMI, competitive rates, no prepayment penalties",
    ideal: "Military veterans and active duty"
  },
  {
    type: "Conventional Loans",
    downPayment: "5-20% down",
    benefits: "Flexible terms, no upfront mortgage insurance at 20%",
    ideal: "Strong credit buyers with stable income"
  }
];

export default function FirstTimeBuyerServices() {
  return (
    <>
      <Helmet>
        <title>First-Time Home Buyer Services Skye Canyon | Dr. Jan Duffy Las Vegas NV</title>
        <meta name="description" content="First-time home buyer specialist for Skye Canyon. Dr. Jan Duffy guides new buyers through HOA requirements, builder incentives, FHA/VA loans. 200+ first-time buyers helped in Las Vegas, NV 89166." />
        <meta name="keywords" content="first-time home buyer Skye Canyon, FHA loans Las Vegas, VA loans Nevada, new home buyer assistance, Skye Canyon HOA guide, builder incentives" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Skye Canyon First-Time Home Buyer Services",
            "description": "Specialized guidance for new buyers through Skye Canyon's guard-gated community",
            "provider": {
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duffy",
              "telephone": "(702) 500-1902"
            },
            "areaServed": "Skye Canyon, Las Vegas, NV",
            "serviceType": "First-Time Home Buyer Assistance"
          })}
        </script>
        
        <meta property="og:title" content="First-Time Home Buyer Services Skye Canyon | Dr. Jan Duffy Las Vegas NV" />
        <meta property="og:description" content="Specialized first-time buyer services with 200+ clients successfully guided through Skye Canyon purchases." />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/first-time-buyer" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/first-time-buyer" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "First-Time Buyer Services" }
          ]} />
        </div>

        <section className="bg-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Users className="w-4 h-4 mr-2" />
                  200+ First-Time Buyers Helped
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes First-Time Buyer Specialist
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Dr. Jan Duffy provides comprehensive guidance for new homebuyers navigating 
                  Skye Canyon's guard-gated community with confidence and expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://g.co/kgs/nbUf6Pj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-green-600 hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Start Your Journey
                    </Button>
                  </a>
                  <a href="tel:(702) 500-1902">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                      Call (702) 500-1902
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Why First-Time Buyers Choose Dr. Duffy</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>15+ years helping first-time buyers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>FHA, VA, conventional loan expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Complete HOA and amenities education</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Builder incentive negotiation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Skye Canyon First-Time Buyer Support
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to successfully purchase in Skye Canyon
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <service.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Skye Canyon Loan Program Guidance
              </h2>
              <p className="text-xl text-gray-600">
                Expert assistance with all financing options
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loanPrograms.map((program, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-green-600">{program.type}</CardTitle>
                    <div className="text-2xl font-bold">{program.downPayment}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{program.benefits}</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-700">
                        Ideal for: {program.ideal}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Become a Skye Canyon Homeowner?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join 200+ first-time buyers who've successfully purchased their dream home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Schedule Free Consultation
                </Button>
              </a>
              <a href="tel:(702) 500-1902">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  Call (702) 500-1902
                </Button>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}