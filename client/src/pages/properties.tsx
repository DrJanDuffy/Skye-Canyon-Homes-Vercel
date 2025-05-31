import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import RealScoutListings from "@/components/realscout-listings";

export default function Properties() {
  const [searchFilters, setSearchFilters] = useState({
    priceMin: "none",
    priceMax: "none",
    bedrooms: "none",
    bathrooms: "none",
    sortBy: "price-desc"
  });

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  const filteredProperties = properties?.filter(property => {
    if (searchFilters.priceMin !== "none" && property.price < parseInt(searchFilters.priceMin)) return false;
    if (searchFilters.priceMax !== "none" && searchFilters.priceMax !== "999999999" && property.price > parseInt(searchFilters.priceMax)) return false;
    if (searchFilters.bedrooms !== "none" && property.bedrooms !== parseInt(searchFilters.bedrooms)) return false;
    if (searchFilters.bathrooms !== "none" && !property.bathrooms.includes(searchFilters.bathrooms)) return false;
    return true;
  });

  const sortedProperties = filteredProperties?.sort((a, b) => {
    switch (searchFilters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "bedrooms":
        return b.bedrooms - a.bedrooms;
      case "sqft":
        return b.sqft - a.sqft;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <section className="bg-realscout-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Sky Canyon Properties
            </h1>
            <p className="text-xl opacity-90">
              Discover luxury homes in Las Vegas's premier community
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <SlidersHorizontal className="w-5 h-5 mr-2 text-realscout-blue" />
            <h2 className="text-lg font-semibold">Filter Properties</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <Select value={searchFilters.priceMin} onValueChange={(value) => setSearchFilters({...searchFilters, priceMin: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="No Min" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Min</SelectItem>
                  <SelectItem value="500000">$500K</SelectItem>
                  <SelectItem value="750000">$750K</SelectItem>
                  <SelectItem value="1000000">$1M</SelectItem>
                  <SelectItem value="1500000">$1.5M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <Select value={searchFilters.priceMax} onValueChange={(value) => setSearchFilters({...searchFilters, priceMax: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="No Max" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Max</SelectItem>
                  <SelectItem value="1000000">$1M</SelectItem>
                  <SelectItem value="1500000">$1.5M</SelectItem>
                  <SelectItem value="2000000">$2M</SelectItem>
                  <SelectItem value="999999999">$2M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <Select value={searchFilters.bedrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bedrooms: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Any</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                  <SelectItem value="6">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <Select value={searchFilters.bathrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bathrooms: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Any</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <Select value={searchFilters.sortBy} onValueChange={(value) => setSearchFilters({...searchFilters, sortBy: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                  <SelectItem value="sqft">Largest Square Footage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoading ? "Loading..." : `${sortedProperties?.length || 0} Properties Found`}
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProperties && sortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search filters to see more results.</p>
              <Button 
                onClick={() => setSearchFilters({ priceMin: "none", priceMax: "none", bedrooms: "none", bathrooms: "none", sortBy: "price-desc" })}
                className="mt-4 bg-realscout-blue text-white hover:bg-realscout-navy"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}