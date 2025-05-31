import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-realscout-blue">
              Sky Canyon Homes
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('search')}
              className="text-gray-700 hover:text-realscout-blue transition-colors"
            >
              Search Homes
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="text-gray-700 hover:text-realscout-blue transition-colors"
            >
              Featured Listings
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-realscout-blue transition-colors"
            >
              About Dr. Duffy
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-realscout-blue transition-colors"
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-realscout-blue text-white hover:bg-realscout-navy"
            >
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <button 
              onClick={() => scrollToSection('search')}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Search Homes
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Featured Listings
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              About Dr. Duffy
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-gray-700 w-full text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
