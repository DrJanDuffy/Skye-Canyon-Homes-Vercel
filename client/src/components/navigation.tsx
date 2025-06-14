import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Detect production environment for consistent menu behavior
    setIsProduction(window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element)?.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-realscout-blue tracking-tight">
                Dr. Jan Duffy
              </div>
              <div className="text-sm text-gray-600 font-medium">
                REALTOR® | Skye Canyon Specialist
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="tel:+17025001902"
              className="flex items-center text-realscout-blue hover:text-realscout-navy transition-colors font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              (702) 500-1902
            </a>
            <Link 
              href="/"
              className="text-gray-700 hover:text-realscout-blue transition-colors font-medium"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-realscout-blue transition-colors font-medium flex items-center">
                Properties
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <a href="/properties" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  All Properties
                </a>
                <a href="/voice-search" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Voice Search
                </a>
                <a href="/luxury-homes-las-vegas" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Luxury Homes
                </a>
                <a href="/skye-canyon-guide" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Skye Canyon Guide
                </a>
                <a href="/skye-canyon-schools" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Skye Canyon Schools
                </a>
                <a href="/skye-canyon-parks" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Skye Canyon Parks
                </a>
                <a href="/skye-canyon-communities" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  New Construction
                </a>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-realscout-blue transition-colors font-medium flex items-center">
                Market Info
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <a href="/market-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Market Analysis
                </a>
                <a href="/neighborhood-analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Neighborhood Heat Map
                </a>
                <a href="/las-vegas-real-estate" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Las Vegas Market
                </a>
                <a href="/northwest-las-vegas" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-realscout-blue transition-colors">
                  Northwest Las Vegas
                </a>
              </div>
            </div>
            <a 
              href="/about"
              className="text-gray-700 hover:text-realscout-blue transition-colors font-medium"
            >
              About Dr. Duffy
            </a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-realscout-blue transition-colors font-medium"
            >
              Contact
            </button>
            <a 
              href="https://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-realscout-blue text-white hover:bg-realscout-navy px-6 py-2">
                Get Started
              </Button>
            </a>
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
            <a 
              href="tel:+17025001902"
              className="flex items-center px-3 py-2 text-realscout-blue hover:text-realscout-navy hover:bg-blue-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4 mr-2" />
              (702) 500-1902
            </a>
            <a 
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <div className="px-3 py-1">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Properties</div>
              <div className="mt-1 space-y-1">
                <a 
                  href="/properties"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Properties
                </a>
                <a 
                  href="/luxury-homes-las-vegas"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Luxury Homes
                </a>
                <a 
                  href="/skye-canyon-guide"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skye Canyon Guide
                </a>
                <a 
                  href="/skye-canyon-schools"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skye Canyon Schools
                </a>
                <a 
                  href="/skye-canyon-parks"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skye Canyon Parks
                </a>
                <a 
                  href="/skye-canyon-communities"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Construction
                </a>
              </div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Market Info</div>
              <div className="mt-1 space-y-1">
                <a 
                  href="/market-analysis"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Market Analysis
                </a>
                <a 
                  href="/las-vegas-real-estate"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Las Vegas Market
                </a>
                <a 
                  href="/northwest-las-vegas"
                  className="block px-2 py-1 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Northwest Las Vegas
                </a>
              </div>
            </div>
            <a 
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Dr. Duffy
            </a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block px-3 py-2 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium w-full text-left"
            >
              Contact
            </button>
            <div className="px-3 pt-2">
              <a 
                href="https://drjanduffy.realscout.com/onboarding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-realscout-blue text-white text-center rounded-lg font-medium hover:bg-realscout-navy transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
