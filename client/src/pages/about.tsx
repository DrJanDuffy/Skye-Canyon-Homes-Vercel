import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import drDuffyPhoto from "@assets/design 05_new 2.jpg";
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
import Breadcrumb from "@/components/breadcrumb";
import BackToTop from "@/components/back-to-top";
import FAQSection from "@/components/faq-section";

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
    <>
      <Helmet>
        <title>About Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert | Las Vegas NV</title>
        <meta name="description" content="Meet Dr. Jan Duffy, your trusted Skye Canyon real estate specialist. Licensed Nevada REALTOR® with 15+ years experience in Las Vegas luxury homes. License S.0197614." />
        <meta name="keywords" content="Dr. Jan Duffy, Skye Canyon REALTOR, Las Vegas real estate agent, Nevada license S.0197614, luxury home specialist" />
        <meta property="og:title" content="About Dr. Jan Duffy REALTOR® | Skye Canyon Expert" />
        <meta property="og:description" content="Meet Dr. Jan Duffy, your trusted Skye Canyon real estate specialist with 15+ years experience in Las Vegas luxury homes." />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/about" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb items={[{ label: "About Dr. Duffy" }]} />
      </div>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-realscout-blue/10 text-realscout-blue rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Skye Canyon Specialist</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Meet Dr. Jan Duffy, REALTOR®
              </h1>
              <p className="text-xl mb-4 text-gray-700 font-medium">
                Your Trusted Skye Canyon Real Estate Expert
              </p>
              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Providing comprehensive real estate services for Skye Canyon buyers, sellers, 
                and investors with personalized attention and local market expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="bg-realscout-blue text-white hover:bg-realscout-navy"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline"
                  className="border-realscout-blue text-realscout-blue hover:bg-realscout-blue hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (702) 500-1902
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-realscout-blue to-realscout-navy rounded-2xl p-1 shadow-2xl">
                <div className="bg-white rounded-xl p-4">
                  <img 
                    src={drDuffyPhoto}
                    alt="Dr. Jan Duffy REALTOR professional portrait" 
                    className="rounded-lg w-full max-w-md mx-auto object-cover"
                    style={{ imageRendering: 'auto', maxWidth: '400px', height: 'auto' }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border-2 border-realscout-blue">
                <div className="text-realscout-blue text-2xl font-bold">15+</div>
                <div className="text-gray-600 text-sm font-medium">Years Experience</div>
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
              Delivering exceptional results for Skye Canyon clients
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
                  Dr. Jan Duffy offers comprehensive real estate services for Skye Canyon clients, 
                  including buyer representation, listing services, investment property analysis, 
                  and market consultation. Her approach combines detailed market research with 
                  personalized client service to ensure optimal outcomes for every transaction.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Services include property valuation, market analysis, negotiation strategy, 
                  transaction management, and post-closing support. Whether you're buying your 
                  first home, selling to upgrade, or building an investment portfolio, 
                  Dr. Duffy provides the expertise and guidance you need.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Dr. Duffy's client-focused approach combines comprehensive market knowledge 
                  with advanced technology tools to streamline your real estate experience. 
                  From initial consultation to closing day, she provides clear communication, 
                  strategic guidance, and dedicated support throughout your transaction.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-realscout-blue" />
                      Education & Credentials
                    </h2>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Skye Canyon Market Specialist
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Nevada Real Estate License S.0197614
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
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-realscout-blue" />
                      Professional Memberships
                    </h2>
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
              Hear from satisfied Skye Canyon homeowners
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
            Let's discuss your Skye Canyon real estate goals
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
                <div className="opacity-90">DrDuffy@SkyeCanyonHomesForSale.com</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Service Area</div>
                <div className="opacity-90">Skye Canyon, Las Vegas</div>
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

      {/* FAQ Section for About Dr. Jan Duffy */}
      <FAQSection 
        title="About Dr. Jan Duffy - Your Skye Canyon Real Estate Expert"
        pageType="general"
        faqs={[
          {
            question: "What are Dr. Jan Duffy's qualifications as a REALTOR®?",
            answer: "Dr. Jan Duffy holds Nevada Real Estate License S.0197614 and has over 15 years of experience specializing in Skye Canyon and Las Vegas luxury real estate. She is affiliated with Berkshire Hathaway HomeServices Nevada Properties."
          },
          {
            question: "Why choose Dr. Jan Duffy for Skye Canyon homes?",
            answer: "Dr. Jan Duffy specializes exclusively in Skye Canyon properties and has extensive knowledge of the guard-gated community, Desert Highlands Golf Course, and local amenities. Her expertise ensures clients get the best value and service."
          },
          {
            question: "What areas does Dr. Jan Duffy serve?",
            answer: "While specializing in Skye Canyon (89166), Dr. Jan Duffy also serves Northwest Las Vegas, Henderson, Summerlin, and other luxury communities throughout the Las Vegas valley."
          },
          {
            question: "How can I contact Dr. Jan Duffy?",
            answer: "Call (702) 500-1902 or visit the office at 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166. Office hours are Monday-Friday 9AM-6PM, Saturday 9AM-5PM, Sunday 11AM-4PM."
          },
          {
            question: "Does Dr. Jan Duffy work with first-time buyers?",
            answer: "Yes, Dr. Jan Duffy works with all types of buyers including first-time homebuyers, luxury home purchasers, investors, and those relocating to Las Vegas. She provides personalized service for every client's needs."
          }
        ]}
      />
      
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}