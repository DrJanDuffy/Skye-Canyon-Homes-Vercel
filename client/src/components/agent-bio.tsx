import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import drDuffyPhoto from "@assets/design 05_new 2.jpg";

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
              src={drDuffyPhoto} 
              alt="Dr. Jan Duffy REALTOR professional headshot" 
              className="rounded-xl shadow-lg w-full max-w-md mx-auto lg:mx-0"
              style={{ imageRendering: 'auto', maxWidth: '400px', height: 'auto' }}
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
                Licensed in Nevada | License# S.0197614
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700 mb-8">
              <p>
                Dr. Jan Duffy is a top-rated Nevada REALTOR® specializing in luxury homes, new construction, 
                custom builds, and resales in Skye Canyon and Northwest Las Vegas. She partners with leading 
                home builders like Toll Brothers and Lennar to provide expert guidance for buying or selling 
                high-end homes.
              </p>
              <p>
                With extensive knowledge of Skye Canyon neighborhoods, amenities, and market trends, her listings 
                sell 12% faster and at 98% of the asking price. Whether you're interested in luxury homes in 
                Skye Canyon, Centennial Hills, or Northwest Las Vegas, Dr. Duffy is the trusted real estate 
                expert you need.
              </p>
            </div>
            
            {/* Credentials */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Credentials</h3>
                <h4 className="font-medium text-gray-700 mb-2">Education & Licensing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Nevada Real Estate License S.0197614</li>
                  <li>• Certified Luxury Specialist</li>
                  <li>• Skye Canyon Market Specialist</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Professional Memberships</h4>
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
                <span>(702) 500-1902</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-realscout-blue mr-3" />
                <span>DrDuffy@SkyeCanyonHomesForSale.com</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 text-realscout-blue mr-3" />
                <span>10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166</span>
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
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
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
