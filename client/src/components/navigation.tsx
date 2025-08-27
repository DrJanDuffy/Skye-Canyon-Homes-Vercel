import { Menu, Phone, X, Home, Building2, TrendingUp, User, MessageCircle, MapPin, Star, Calculator, FileText, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Detect production environment for consistent menu behavior
    setIsProduction(
      window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    );
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
          {/* Left Side - Flashing Phone Number */}
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <a
                href="tel:+17025001902"
                className="group flex items-center text-2xl font-bold text-realscout-blue hover:text-realscout-navy transition-all duration-300"
              >
                <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative">
                  (702) 500-1902
                  {/* Flashing effect */}
                  <span className="absolute inset-0 bg-realscout-blue opacity-20 animate-pulse rounded"></span>
                </span>
              </a>
              <div className="text-sm text-gray-600 font-medium mt-1">
                Skye Canyon Expert | Las Vegas NV 89166
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Home
            </Link>

            {/* Properties Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group">
                <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Properties
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl py-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 transform -translate-y-2 group-hover:translate-y-0">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-realscout-blue text-sm uppercase tracking-wide">Property Search</h3>
                </div>
                <Link
                  href="/properties"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  All Properties
                </Link>
                <Link
                  href="/luxury-homes-las-vegas"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Star className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Luxury Homes
                </Link>
                <Link
                  href="/skye-canyon-guide"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Skye Canyon Guide
                </Link>
                <Link
                  href="/skye-canyon-communities"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Users className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  New Construction
                </Link>
                <div className="px-4 py-2 border-t border-gray-100 mt-2">
                  <a
                    href="https://drjanduffy.realscout.com/onboarding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-realscout-blue text-white text-sm font-medium rounded-lg hover:bg-realscout-navy transition-colors"
                  >
                    Start Property Search
                  </a>
                </div>
              </div>
            </div>

            {/* Market Info Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group">
                <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Market Info
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl py-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 transform -translate-y-2 group-hover:translate-y-0">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-realscout-blue text-sm uppercase tracking-wide">Market Analysis</h3>
                </div>
                <Link
                  href="/market-analysis"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <TrendingUp className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Market Analysis
                </Link>
                <Link
                  href="/neighborhood-analysis"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Neighborhood Heat Map
                </Link>
                <Link
                  href="/las-vegas-real-estate"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Las Vegas Market
                </Link>
                <Link
                  href="/northwest-las-vegas"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Northwest Las Vegas
                </Link>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group">
                <Award className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Services
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl py-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 transform -translate-y-2 group-hover:translate-y-0">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-realscout-blue text-sm uppercase tracking-wide">Our Services</h3>
                </div>
                <Link
                  href="/buyer-services"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <User className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Buyer Services
                </Link>
                <Link
                  href="/seller-services"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Seller Services
                </Link>
                <Link
                  href="/home-valuation"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <Calculator className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Home Valuation
                </Link>
                <Link
                  href="/consultation"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-realscout-blue transition-colors group/item"
                >
                  <MessageCircle className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-realscout-blue transition-colors" />
                  Free Consultation
                </Link>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group"
            >
              <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              About Dr. Duffy
            </Link>

            {/* Contact */}
            <a
              href="https://g.co/kgs/nbUf6Pj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-realscout-blue transition-colors font-medium group"
            >
              <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Contact
            </a>

            {/* CTA Button */}
            <a
              href="https://drjanduffy.realscout.com/onboarding"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-realscout-blue text-white hover:bg-realscout-navy px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
            {/* Phone Number - Mobile */}
            <a
              href="tel:+17025001902"
              className="flex items-center px-3 py-3 text-realscout-blue hover:text-realscout-navy hover:bg-blue-50 rounded-lg font-bold text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-5 h-5 mr-3" />
              (702) 500-1902
            </a>

            {/* Home */}
            <Link
              href="/"
              className="flex items-center px-3 py-3 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4 mr-3" />
              Home
            </Link>

            {/* Properties Section */}
            <div className="px-3 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Properties
              </div>
              <div className="space-y-1">
                <Link
                  href="/properties"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                  All Properties
                </Link>
                <Link
                  href="/luxury-homes-las-vegas"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star className="w-4 h-4 mr-3 text-gray-400" />
                  Luxury Homes
                </Link>
                <Link
                  href="/skye-canyon-guide"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  Skye Canyon Guide
                </Link>
                <Link
                  href="/skye-canyon-communities"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  New Construction
                </Link>
              </div>
            </div>

            {/* Market Info Section */}
            <div className="px-3 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Market Info
              </div>
              <div className="space-y-1">
                <Link
                  href="/market-analysis"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TrendingUp className="w-4 h-4 mr-3 text-gray-400" />
                  Market Analysis
                </Link>
                <Link
                  href="/neighborhood-analysis"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  Neighborhood Heat Map
                </Link>
                <Link
                  href="/las-vegas-real-estate"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                  Las Vegas Market
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div className="px-3 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Services
              </div>
              <div className="space-y-1">
                <Link
                  href="/buyer-services"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3 text-gray-400" />
                  Buyer Services
                </Link>
                <Link
                  href="/seller-services"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                  Seller Services
                </Link>
                <Link
                  href="/home-valuation"
                  className="flex items-center px-2 py-2 text-gray-600 hover:text-realscout-blue hover:bg-gray-50 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calculator className="w-4 h-4 mr-3 text-gray-400" />
                  Home Valuation
                </Link>
              </div>
            </div>

            {/* About */}
            <Link
              href="/about"
              className="flex items-center px-3 py-3 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-4 h-4 mr-3" />
              About Dr. Duffy
            </Link>

            {/* Contact */}
            <a
              href="https://g.co/kgs/nbUf6Pj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-3 text-gray-700 hover:text-realscout-blue hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="w-4 h-4 mr-3" />
              Contact
            </a>

            {/* CTA Button - Mobile */}
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
