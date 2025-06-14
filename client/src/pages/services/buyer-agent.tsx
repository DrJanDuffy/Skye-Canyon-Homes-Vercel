import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Award,
  MapPin,
  Clock,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

const benefits = [
  {
    icon: DollarSign,
    title: "Average $15K+ Savings",
    description: "Expert negotiation consistently saves clients significant money on Skye Canyon purchases"
  },
  {
    icon: MapPin,
    title: "All 8 Neighborhoods Expertise",
    description: "Deep knowledge of Desert Highlands, Granite Park, Canyon Vista, and all Skye Canyon communities"
  },
  {
    icon: Users,
    title: "Direct Builder Relationships",
    description: "Exclusive partnerships with Toll Brothers, Lennar, DR Horton for insider access"
  },
  {
    icon: Home,
    title: "Off-Market Access",
    description: "First priority on exclusive listings before they hit the public market"
  }
];

const process = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Discuss your needs, budget, and preferences for Skye Canyon neighborhoods"
  },
  {
    step: "2", 
    title: "Market Education",
    description: "Comprehensive overview of HOA fees, amenities, and community features"
  },
  {
    step: "3",
    title: "Property Search",
    description: "Access to MLS listings, off-market properties, and new construction opportunities"
  },
  {
    step: "4",
    title: "Expert Negotiation",
    description: "Strategic pricing analysis and negotiation to secure the best possible deal"
  },
  {
    step: "5",
    title: "Closing Support",
    description: "Full transaction management from contract to keys in hand"
  }
];

export default function BuyerAgentServices() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Buyer Agent Services | Expert Home Buying Las Vegas NV</title>
        <meta name="description" content="Expert Skye Canyon buyer agent services by Dr. Jan Duffy. 15+ years exclusive specialization, direct builder relationships, off-market access. Average client saves $15K+ in Las Vegas, NV 89166." />
        <meta name="keywords" content="Skye Canyon buyer agent, Las Vegas home buying, expert buyer representation, off-market properties, new construction buyer agent, Skye Canyon specialist" />
        
        {/* Service Schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Skye Canyon Expert Buyer Agent Services",
            "description": "Professional buyer representation with 15+ years exclusive Skye Canyon specialization",
            "provider": {
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duffy",
              "telephone": "(702) 500-1902",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "postalCode": "89166"
              }
            },
            "areaServed": {
              "@type": "Place",
              "name": "Skye Canyon, Las Vegas, NV"
            },
            "serviceType": "Real Estate Buyer Representation",
            "offers": {
              "@type": "Offer",
              "description": "Expert buyer agent services with average $15K+ savings"
            }
          })}
        </script>
        
        <meta property="og:title" content="Skye Canyon Buyer Agent Services | Expert Home Buying Las Vegas NV" />
        <meta property="og:description" content="Expert Skye Canyon buyer agent services with 15+ years specialization and average $15K+ client savings." />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/buyer-agent" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/buyer-agent" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "Buyer Agent Services" }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="bg-realscout-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Award className="w-4 h-4 mr-2" />
                  15+ Years Exclusive Specialization
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes Expert Buyer Agent
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Dr. Jan Duffy provides exclusive buyer representation in Las Vegas' premier 
                  guard-gated community with unmatched expertise and proven results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://g.co/kgs/nbUf6Pj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-realscout-blue hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Start Your Search
                    </Button>
                  </a>
                  <a href="tel:(702) 500-1902">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-realscout-blue">
                      Call (702) 500-1902
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Why Choose Dr. Duffy?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Average client saves $15K+ through expert negotiation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Direct builder relationships for insider access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Deep knowledge of all 8 Skye Canyon neighborhoods</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Exclusive focus on Skye Canyon since 2009</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Exclusive Skye Canyon Buyer Agent Benefits
              </h2>
              <p className="text-xl text-gray-600">
                Specialized expertise that delivers measurable results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <benefit.icon className="w-8 h-8 text-realscout-blue" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
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
                Your Buyer Journey in Skye Canyon
              </h2>
              <p className="text-xl text-gray-600">
                A proven 5-step process for successful home purchases
              </p>
            </div>
            
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-realscout-blue text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-realscout-blue text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Skye Canyon Home?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Experience the advantage of working with Skye Canyon's most experienced buyer agent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-realscout-blue hover:bg-gray-100">
                  Schedule Free Consultation
                </Button>
              </a>
              <a href="tel:(702) 500-1902">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-realscout-blue">
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