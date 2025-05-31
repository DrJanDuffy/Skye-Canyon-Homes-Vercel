import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [searchType, setSearchType] = useState<'simple' | 'advanced'>('simple');
  const [searchFilters, setSearchFilters] = useState({
    propertyType: 'all',
    priceMin: '0',
    priceMax: '999999999'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a property search
    console.log('Search filters:', searchFilters);
  };

  return (
    <section 
      id="search" 
      className="relative bg-gradient-to-br from-realscout-blue via-realscout-light to-realscout-navy text-white py-20"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=85" 
          alt="Luxury real estate background" 
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-pulse">
            <span className="text-sm font-medium text-white">🏆 Top Skye Canyon Specialist</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Skye Canyon Homes for Sale | Dr. Jan Duffy, REALTOR®
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Luxury Real Estate Expert in Las Vegas, Nevada 89166
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold">150+</div>
              <div className="text-sm opacity-80">Homes Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm opacity-80">Client Satisfaction</div>
            </div>
          </div>
        </div>
        
        {/* Search Widget Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Find Your Dream Home in Skye Canyon</h3>
            <p className="opacity-90">Search luxury properties in Las Vegas's premier community</p>
          </div>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <Select value={searchFilters.propertyType} onValueChange={(value) => setSearchFilters({...searchFilters, propertyType: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="townhome">Townhome</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <Select value={searchFilters.priceMin} onValueChange={(value) => setSearchFilters({...searchFilters, priceMin: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Min</SelectItem>
                    <SelectItem value="500000">$500K</SelectItem>
                    <SelectItem value="750000">$750K</SelectItem>
                    <SelectItem value="1000000">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <Select value={searchFilters.priceMax} onValueChange={(value) => setSearchFilters({...searchFilters, priceMax: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="999999999">No Max</SelectItem>
                    <SelectItem value="1000000">$1M</SelectItem>
                    <SelectItem value="1500000">$1.5M</SelectItem>
                    <SelectItem value="2000000">$2M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-realscout-blue text-white hover:bg-realscout-navy"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
          
          {/* Quick Links */}
          <div className="text-center mt-6 space-x-4">
            <a 
              href="/properties" 
              className="text-sm text-white/80 hover:text-white underline"
            >
              View All Skye Canyon Listings →
            </a>
            <a 
              href="https://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white underline"
            >
              Schedule a Tour →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
