import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  MapPin,
  DollarSign,
  Users,
  Camera,
  ExternalLink
} from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";

const luxuryServices = [
  {
    icon: Camera,
    title: "Professional Marketing",
    description: "High-end photography, virtual tours, and premium marketing materials"
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Detailed CMA with luxury market trends and comparable sales data"
  },
  {
    icon: Users,
    title: "Qualified Buyer Network",
    description: "Access to pre-qualified luxury buyers and investor relationships"
  },
  {
    icon: Award,
    title: "Luxury Certification",
    description: "Certified Luxury Home Marketing Specialist credentials and training"
  }
];

const priceRanges = [
  {
    range: "$800K - $1.2M",
    properties: "Golf course adjacency, premium upgrades",
    neighborhoods: "Desert Highlands, Canyon Vista"
  },
  {
    range: "$1.2M - $1.8M", 
    properties: "Golf course frontage, custom features",
    neighborhoods: "TPC Las Vegas, Granite Park"
  },
  {
    range: "$1.8M - $2M+",
    properties: "Custom estates, exclusive locations",
    neighborhoods: "Guard gate proximity, premium lots"
  }
];

export default function LuxuryPropertyServices() {
  return (
    <>
      <Helmet>
        <title>Luxury Property Buying & Sales Skye Canyon | Dr. Jan Duffy Las Vegas NV</title>
        <meta name="description" content="Skye Canyon luxury real estate expert with $50M+ transactions. Certified Luxury Home Marketing Specialist for $800K-$2M+ homes and TPC Las Vegas golf properties. 98% of list price results." />
        <meta name="keywords" content="luxury homes Skye Canyon, TPC Las Vegas golf properties, luxury real estate agent, certified luxury specialist, Desert Highlands homes, high-end properties Las Vegas" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Skye Canyon Luxury Property Buying & Sales",
            "description": "Certified Luxury Home Marketing Specialist with $50M+ in premium transactions",
            "provider": {
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duffy",
              "telephone": "(702) 500-1902",
              "hasCredential": "Certified Luxury Home Marketing Specialist"
            },
            "areaServed": "Skye Canyon, Las Vegas, NV",
            "serviceType": "Luxury Real Estate Services",
            "priceRange": "$800,000 - $2,000,000+"
          })}
        </script>
        
        <meta property="og:title" content="Luxury Property Buying & Sales Skye Canyon | Dr. Jan Duffy Las Vegas NV" />
        <meta property="og:description" content="Certified luxury specialist with $50M+ transactions and 98% of list price results in Skye Canyon's premium market." />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/luxury-properties" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/luxury-properties" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { label: "Services", href: "/#services" },
            { label: "Luxury Property Services" }
          ]} />
        </div>

        <section className="bg-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-white/20 text-white mb-6">
                  <Crown className="w-4 h-4 mr-2" />
                  Certified Luxury Specialist
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes Luxury Real Estate Expert
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Dr. Jan Duffy specializes in Skye Canyon's premium market with $50M+ in luxury 
                  transactions and proven expertise in $800K-$2M+ properties.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://g.co/kgs/nbUf6Pj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-purple-600 hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Luxury Listings
                    </Button>
                  </a>
                  <a href="tel:(702) 500-1902">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                      Call (702) 500-1902
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-white/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6">Luxury Market Results</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-300" />
                    <span>$50M+ in luxury transactions since 2009</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-300" />
                    <span>98% of list price sale results</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-300" />
                    <span>TPC Las Vegas golf course specialist</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-300" />
                    <span>Institute for Luxury Home Marketing certified</span>
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
                Premium Skye Canyon Luxury Services
              </h2>
              <p className="text-xl text-gray-600">
                White-glove service for discerning clients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {luxuryServices.map((service, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <service.icon className="w-8 h-8 text-purple-600" />
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
                Skye Canyon Luxury Market Segments
              </h2>
              <p className="text-xl text-gray-600">
                Specialized expertise across all premium price ranges
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {priceRanges.map((range, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-purple-600">{range.range}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{range.properties}</p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-700">
                        Areas: {range.neighborhoods}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Skye Canyon Luxury Market Success?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Experience certified luxury expertise with proven premium market results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://g.co/kgs/nbUf6Pj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Schedule Luxury Consultation
                </Button>
              </a>
              <a href="tel:(702) 500-1902">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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