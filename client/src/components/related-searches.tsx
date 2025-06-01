import { Card, CardContent } from "@/components/ui/card";
import { Search, TrendingUp, MapPin, Home } from "lucide-react";

interface RelatedSearchesProps {
  searchType: 'skye-canyon' | 'luxury-homes' | 'las-vegas' | 'general';
}

export default function RelatedSearches({ searchType }: RelatedSearchesProps) {
  const getRelatedSearches = () => {
    switch (searchType) {
      case 'skye-canyon':
        return [
          { term: "Skye Canyon new construction", category: "New Homes" },
          { term: "Desert Highlands Golf Course homes", category: "Golf Community" },
          { term: "Guard gated communities Las Vegas", category: "Security" },
          { term: "89166 luxury homes for sale", category: "Location" },
          { term: "Skye Canyon HOA fees", category: "Community Info" },
          { term: "Northwest Las Vegas real estate", category: "Area" }
        ];
      case 'luxury-homes':
        return [
          { term: "Million dollar homes Las Vegas", category: "Price Range" },
          { term: "Custom homes Las Vegas", category: "Home Type" },
          { term: "Las Vegas gated communities", category: "Amenities" },
          { term: "High end real estate Nevada", category: "Market" },
          { term: "Luxury home builders Las Vegas", category: "Construction" },
          { term: "Executive homes for sale", category: "Property Type" }
        ];
      case 'las-vegas':
        return [
          { term: "Henderson homes for sale", category: "Location" },
          { term: "Summerlin real estate", category: "Community" },
          { term: "Las Vegas new home communities", category: "New Construction" },
          { term: "Nevada real estate market", category: "Market Trends" },
          { term: "Las Vegas relocation services", category: "Moving" },
          { term: "Clark County property search", category: "Area Search" }
        ];
      default:
        return [
          { term: "Real estate agent near me", category: "Services" },
          { term: "Home buying process", category: "Information" },
          { term: "Property market analysis", category: "Market Data" },
          { term: "First time home buyer", category: "Buyer Type" },
          { term: "Real estate consultation", category: "Services" },
          { term: "Home valuation", category: "Property Value" }
        ];
    }
  };

  const searches = getRelatedSearches();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">People Also Search For</h2>
          <p className="text-lg text-gray-600">Explore related topics and find exactly what you're looking for</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searches.map((search, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {search.category === "Location" && <MapPin className="w-5 h-5 text-realscout-blue mt-1" />}
                    {search.category === "New Homes" && <Home className="w-5 h-5 text-realscout-blue mt-1" />}
                    {search.category === "Market Trends" && <TrendingUp className="w-5 h-5 text-realscout-blue mt-1" />}
                    {!["Location", "New Homes", "Market Trends"].includes(search.category) && 
                      <Search className="w-5 h-5 text-realscout-blue mt-1" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-realscout-blue transition-colors">
                      {search.term}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{search.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need help with a specific search? 
            <a href="tel:(702)500-1902" className="text-realscout-blue font-semibold ml-1 hover:underline">
              Call Dr. Jan Duffy at (702) 500-1902
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}