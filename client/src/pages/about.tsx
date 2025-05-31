import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Users, 
  Home, 
  TrendingUp,
  Star,
  Calendar,
  CheckCircle 
} from "lucide-react";
import Footer from "@/components/footer";

const achievements = [
  {
    icon: Home,
    title: "150+ Homes Sold",
    description: "Successfully closed over 150 transactions in Skye Canyon"
  },
  {
    icon: Users,
    title: "98% Client Satisfaction",
    description: "Consistently rated 5 stars by clients"
  },
  {
    icon: TrendingUp,
    title: "Top 1% Agent",
    description: "Ranked in top 1% of Las Vegas REALTORS®"
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Deep expertise in luxury real estate"
  }
];

const testimonials = [
  {
    name: "Michael & Sarah Chen",
    location: "Skye Canyon Drive",
    text: "Dr. Duffy made our home buying experience seamless. Her knowledge of Skye Canyon is unmatched.",
    rating: 5
  },
  {
    name: "Robert Johnson",
    location: "Canyon Vista Lane",
    text: "Professional, knowledgeable, and always available. Sold our home in just 10 days!",
    rating: 5
  },
  {
    name: "Jennifer Martinez",
    location: "Desert Bloom Court",
    text: "Outstanding service from start to finish. Dr. Duffy truly understands the luxury market.",
    rating: 5
  }
];

export default function About() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Dr. Jan Duffy
              </h1>
              <p className="text-xl mb-4 opacity-90">
                Your Trusted Sky Canyon Real Estate Expert
              </p>
              <p className="text-lg opacity-80 mb-8">
                With over 15 years of experience and a doctorate in business, 
                Dr. Duffy brings unparalleled expertise to every transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="bg-white text-realscout-blue hover:bg-gray-100"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-realscout-blue"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (702) 555-0123
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
                alt="Dr. Jan Duffy REALTOR professional portrait" 
                className="rounded-xl shadow-2xl w-full max-w-md mx-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-realscout-blue text-2xl font-bold">15+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Track Record
            </h2>
            <p className="text-xl text-gray-600">
              Delivering exceptional results for Sky Canyon clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="bg-realscout-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-realscout-blue" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Background
            </h2>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Dr. Jan Duffy is a distinguished real estate professional with over 15 years 
                  of experience in the Las Vegas luxury market. Her academic background includes 
                  a Doctorate in Business Administration, which provides her with unique insights 
                  into market trends, investment strategies, and client negotiations.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Specializing exclusively in Sky Canyon properties, Dr. Duffy has developed 
                  an intimate knowledge of this prestigious community. Her expertise extends 
                  beyond traditional real estate services to include investment analysis, 
                  market forecasting, and comprehensive client advisory services.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Her commitment to excellence and personalized service has earned her 
                  recognition as one of Las Vegas's top-performing REALTORS®. Dr. Duffy's 
                  approach combines cutting-edge technology with traditional relationship-building 
                  to ensure every client receives exceptional service.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-realscout-blue" />
                      Education & Credentials
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Doctorate in Business Administration
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Nevada Real Estate License
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Certified Luxury Home Marketing Specialist
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Graduate, REALTOR® Institute (GRI)
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-realscout-blue" />
                      Professional Memberships
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        National Association of REALTORS®
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Nevada Association of REALTORS®
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Las Vegas REALTORS® Association
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Institute for Luxury Home Marketing
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-600">
              Hear from satisfied Sky Canyon homeowners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 bg-realscout-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your Sky Canyon real estate goals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Call Direct</div>
                <div className="opacity-90">(702) 555-0123</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="opacity-90">jan.duffy@realscout.com</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Service Area</div>
                <div className="opacity-90">Sky Canyon, Las Vegas</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-realscout-blue hover:bg-gray-100">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-realscout-blue">
              <Home className="w-4 h-4 mr-2" />
              View Properties
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}