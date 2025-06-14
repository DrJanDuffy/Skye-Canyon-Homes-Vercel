import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Handshake, 
  Shield, 
  CheckCircle, 
  Award,
  MapPin,
  DollarSign,
  Wrench,
  ExternalLink
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

const builders = [
  {
    name: "Toll Brothers",
    specialty: "Luxury custom homes",
    partnership: "Direct partnership since 2009",
    icon: Building
  },
  {
    name: "Lennar",
    specialty: "Smart home technology",
    partnership: "Preferred agent program",
    icon: Wrench
  },
  {
    name: "DR Horton",
    specialty: "Value-oriented homes",
    partnership: "Volume purchase expertise",
    icon: DollarSign
  }
];

const services = [
  {
    icon: Handshake,
    title: "Builder Incentive Negotiation",
    description: "Expert negotiation of upgrade packages, closing cost assistance, and promotional offers"
  },
  {
    icon: Shield,
    title: "Warranty Guidance",
    description: "Complete education on builder warranties, inspection timelines, and defect resolution"
  },
  {
    icon: MapPin,
    title: "Lot Selection Strategy",
    description: "Premium lot evaluation for views, privacy, and future resale value"
  },
  {
    icon: Award,
    title: "Construction Timeline Management",
    description: "Regular updates and milestone coordination from groundbreaking to move-in"
  }
];

export default function NewConstructionServices() {
  return (
    <>
      <Helmet>
        <title>New Construction Sales Skye Canyon | Builder Partnerships Las Vegas NV</title>
        <meta name="description" content="Skye Canyon new construction expert with direct partnerships with Toll Brothers, Lennar, DR Horton. 15+ years facilitating new home purchases with builder incentive negotiations and warranty guidance." />
        <meta name="keywords" content="new construction Skye Canyon, Toll Brothers Las Vegas, Lennar homes Nevada, DR Horton builder, new home builder partnerships, construction timeline management" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Skye Canyon New Construction Sales & Leasing",
            "description": "Direct partnerships with all active builders for new home purchases",
            "provider": {
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duffy",
              "telephone": "(702) 500-1902"
            },
            "areaServed": "Skye Canyon, Las Vegas, NV",
            "serviceType": "New Construction Real Estate Services"
          })}
        </script>
        
        <meta property="og:title" content="New Construction Sales Skye Canyon | Builder Partnerships Las Vegas NV" />
        <meta property="og:description" content="Direct partnerships with Toll Brothers, Lennar, DR Horton for exclusive new construction expertise in Skye Canyon." />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/new-construction" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/new-construction" />
      </Helmet>

      {/* Service-Specific Schema Markup */}
      <ComprehensiveSchemaMarkup 
        pageType="service"
        serviceName="New Construction"
        breadcrumbs={[
          { name: "Home", url: "https://skyecanyonhomesforsale.com" },
          { name: "Services", url: "https://skyecanyonhomesforsale.com/services" },
          { name: "New Construction", url: "https://skyecanyonhomesforsale.com/services/new-construction" }
        ]}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "New Construction Services" }
          ]} />
        </div>

        <section className="bg-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Building className="w-4 h-4 mr-2" />
                  Only Exclusive Skye Canyon Focus
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes New Construction Expert
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Dr. Jan Duffy maintains direct partnerships with Toll Brothers, Lennar, DR Horton, 
                  and all active builders for exclusive new construction expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://g.co/kgs/nbUf6Pj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-orange-600 hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View New Homes
                    </Button>
                  </a>
                  <a href="tel:(702) 500-1902">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                      Call (702) 500-1902
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Builder Advantages</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-orange-300" />
                    <span>Direct partnerships with all active builders</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-orange-300" />
                    <span>Builder incentive negotiation expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-orange-300" />
                    <span>Construction timeline management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-orange-300" />
                    <span>15+ years new construction experience</span>
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
                Direct Skye Canyon Builder Partnerships
              </h2>
              <p className="text-xl text-gray-600">
                Exclusive relationships with Skye Canyon's premier builders
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {builders.map((builder, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <builder.icon className="w-8 h-8 text-orange-600" />
                      <Badge variant="secondary">Partner</Badge>
                    </div>
                    <CardTitle>{builder.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{builder.specialty}</p>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-orange-700">
                        {builder.partnership}
                      </p>
                    </div>
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
                Skye Canyon New Construction Services
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive support from contract to keys
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <service.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your Dream Skye Canyon Home?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Leverage exclusive builder relationships for the best new construction experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-orange-600 hover:bg-gray-100">
                  Schedule Builder Consultation
                </Button>
              </a>
              <a href="tel:(702) 500-1902">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
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