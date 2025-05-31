import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export default function AgentBio() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/dr-jan-duffy-headshot.jpg" 
              alt="Dr. Jan Duffy REALTOR professional headshot" 
              className="rounded-xl shadow-lg w-full max-w-md mx-auto lg:mx-0"
            />
          </div>
          
          <div>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Dr. Jan Duffy
              </h2>
              <div className="text-xl text-realscout-blue font-semibold mb-2">
                REALTOR® | Skye Canyon Specialist
              </div>
              <div className="text-gray-600 mb-4">
                Licensed in Nevada | MLS# 12345678
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700 mb-8">
              <p>
                Dr. Jan Duffy provides comprehensive real estate services for Skye Canyon buyers and sellers. 
                From initial property search to closing, she guides clients through every step of their 
                real estate transaction with personalized attention and local market expertise.
              </p>
              <p>
                Whether you're buying your first home, selling your current property, or investing in 
                Skye Canyon real estate, Dr. Duffy offers strategic guidance, market analysis, and 
                negotiation expertise to help you achieve your real estate goals.
              </p>
            </div>
            
            {/* Credentials */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real Estate License - Nevada</li>
                  <li>• Certified Luxury Specialist</li>
                  <li>• Skye Canyon Market Specialist</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Memberships</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• NAR (National Association)</li>
                  <li>• Nevada REALTORS®</li>
                  <li>• Las Vegas REALTORS®</li>
                </ul>
              </div>
            </div>
            
            {/* Contact Options */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-realscout-blue mr-3" />
                <span>(702) 555-0123</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-realscout-blue mr-3" />
                <span>DrDuffy@SkyeCanyonHomesForSale.com</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 text-realscout-blue mr-3" />
                <span>Serving Skye Canyon, Las Vegas, NV</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-realscout-blue text-white hover:bg-realscout-navy"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-realscout-blue text-realscout-blue hover:bg-realscout-blue hover:text-white"
              >
                View Testimonials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
