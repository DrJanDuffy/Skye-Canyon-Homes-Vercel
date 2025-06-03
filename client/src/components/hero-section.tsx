import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import RealScoutSearchWidget from "@/components/realscout-search-widget";

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
      className="relative hero-section text-white py-20 min-h-[600px] flex items-center"
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp"
            type="image/webp"
          />
          <source 
            media="(max-width: 1200px)" 
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80&fm=webp"
            type="image/webp"
          />
          <source 
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85&fm=webp"
            type="image/webp"
          />
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury real estate background" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-pulse">
            <span className="text-sm font-medium text-white">🏆 Top Skye Canyon Specialist</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Skye Canyon Homes for Sale
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Luxury Real Estate Expert | Toll Brothers & Lennar Partner | Serving Skye Canyon, Centennial Hills & Northwest Las Vegas Since 2009
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
        
        {/* RealScout Search Widget */}
        <div className="relative z-10 -mb-20">
          <RealScoutSearchWidget variant="hero" className="shadow-2xl" />
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
    </section>
  );
}
