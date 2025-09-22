import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Menu, 
  X, 
  Phone, 
  Search, 
  Home, 
  TrendingUp, 
  MapPin, 
  User, 
  MessageCircle,
  Calculator,
  Mountain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ModernHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navigationItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Search Homes', href: '/properties', icon: Search },
    { label: 'Sell Your Home', href: '/services/seller-agent', icon: TrendingUp },
    { label: 'Neighborhood Guide', href: '/skye-canyon-guide', icon: MapPin },
    { label: 'Market Reports', href: '/market-analysis', icon: TrendingUp },
    { label: 'About', href: '/about', icon: User },
    { label: 'Contact', href: '/contact', icon: MessageCircle },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-amber-100">
      {/* Top Bar - Phone Number */}
      <div className="bg-gradient-to-r from-amber-50 to-blue-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <a 
                href="tel:702-222-1964" 
                className="text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
              >
                Call Now: (702) 222-1964
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-amber-500 to-blue-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                  Dr. Jan Duffy
                </h1>
                <p className="text-sm text-amber-600 font-medium">
                  Skye Canyon Expert 🏔️
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA and Search */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* MLS Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search MLS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-48 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
              <Button 
                type="submit" 
                size="sm" 
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Search
              </Button>
            </form>

            {/* Get Home Value CTA */}
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => {
                // Homebot widget integration
                if (typeof window !== 'undefined' && (window as any).Homebot) {
                  (window as any).Homebot('#homebot_homeowner', '35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43');
                }
              }}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Get Your Home Value
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Call Button */}
            <a 
              href="tel:702-222-1964"
              className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-amber-100 bg-gradient-to-b from-white to-amber-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="px-3 pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search MLS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
              </form>

              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile CTA Buttons */}
              <div className="px-3 pt-3 space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                  onClick={() => {
                    // Homebot widget integration
                    if (typeof window !== 'undefined' && (window as any).Homebot) {
                      (window as any).Homebot('#homebot_homeowner', '35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43');
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Get Your Home Value
                </Button>
                
                <a 
                  href="tel:702-222-1964"
                  className="flex items-center justify-center w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (702) 222-1964
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
