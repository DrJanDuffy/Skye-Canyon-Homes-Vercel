import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Home, 
  Users, 
  Crown, 
  Building, 
  Truck, 
  TrendingUp, 
  ArrowRight,
  MapPin 
} from "lucide-react";

const services = [
  {
    id: "buyer-agent",
    title: "Expert Buyer Agent Services",
    description: "15+ years exclusive Skye Canyon specialization with direct builder relationships and off-market access.",
    icon: Home,
    highlight: "Average client saves $15K+",
    link: "/services/buyer-agent",
    color: "text-blue-600"
  },
  {
    id: "first-time-buyer",
    title: "First-Time Home Buyer Services",
    description: "Specialized guidance for new buyers through HOA requirements, builder incentives, and community amenities.",
    icon: Users,
    highlight: "200+ first-time buyers helped",
    link: "/services/first-time-buyer",
    color: "text-green-600"
  },
  {
    id: "luxury-properties",
    title: "Luxury Property Buying & Sales",
    description: "Certified Luxury Home Marketing Specialist with $50M+ in transactions since 2009.",
    icon: Crown,
    highlight: "98% of list price results",
    link: "/services/luxury-properties",
    color: "text-purple-600"
  },
  {
    id: "new-construction",
    title: "New Construction Sales & Leasing",
    description: "Direct partnerships with Toll Brothers, Lennar, DR Horton, and all active Skye Canyon builders.",
    icon: Building,
    highlight: "Only exclusive Skye Canyon focus",
    link: "/services/new-construction",
    color: "text-orange-600"
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-realscout-blue/10 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-5 h-5 mr-2 text-realscout-blue" />
            <span className="font-medium text-realscout-blue">Skye Canyon Specialized Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Real Estate Services in Skye Canyon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dr. Jan Duffy offers comprehensive real estate services exclusively focused on 
            Las Vegas' premier guard-gated community with 15+ years of specialized expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="h-full hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Specialized
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="bg-realscout-blue/5 p-3 rounded-lg">
                  <p className="text-sm font-medium text-realscout-blue">
                    ✓ {service.highlight}
                  </p>
                </div>
                <Link href={service.link}>
                  <Button className="w-full bg-realscout-blue hover:bg-realscout-navy text-white group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience specialized Skye Canyon service?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://g.co/kgs/nbUf6Pj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-realscout-blue hover:bg-realscout-navy text-white">
                Schedule Free Consultation
              </Button>
            </a>
            <a href="tel:(702) 500-1902">
              <Button variant="outline" className="border-realscout-blue text-realscout-blue hover:bg-realscout-blue hover:text-white">
                Call (702) 500-1902
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}