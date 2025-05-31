import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

export default function CallToAction() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-realscout-blue to-realscout-light text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Call Skye Canyon Home?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Let Dr. Jan Duffy guide you to your perfect Skye Canyon property
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://drjanduffy.realscout.com/onboarding" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-white text-realscout-blue px-8 py-4 hover:bg-gray-100">
              <Calendar className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </a>
          <Button 
            variant="outline"
            className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-realscout-blue"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call (702) 500-1902
          </Button>
        </div>
        
        <div className="mt-8 text-sm opacity-80">
          <p>Available 7 days a week for your convenience</p>
        </div>
      </div>
    </section>
  );
}
