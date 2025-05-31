import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLazyLoading } from "@/hooks/use-lazy-loading";

interface OptimizedListingsProps {
  className?: string;
  limit?: number;
}

export default function OptimizedListings({ className = "", limit = 6 }: OptimizedListingsProps) {
  const { isInView, elementRef } = useLazyLoading(0.1, "100px");
  
  const { data: listings, isLoading } = useQuery({
    queryKey: ['/api/properties'],
    enabled: isInView,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const optimizedListings = useMemo(() => {
    if (!listings || !Array.isArray(listings)) return [];
    return listings.slice(0, limit);
  }, [listings, limit]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: limit }).map((_, i) => (
        <div key={i} className="loading-skeleton rounded-lg h-80"></div>
      ))}
    </div>
  );

  return (
    <section ref={elementRef} className={className}>
      {!isInView ? (
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">Loading properties...</div>
        </div>
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimizedListings.map((listing: any, index: number) => (
            <div
              key={listing.id || index}
              className="bg-white rounded-lg shadow-lg overflow-hidden property-card"
              style={{ viewTransition: `property-${index}` }}
            >
              <div className="relative h-48">
                <img
                  src={listing.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=75'}
                  alt={listing.address || 'Property image'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-realscout-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                  {listing.status || 'Active'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {listing.address || 'Property Address'}
                </h3>
                <p className="text-2xl font-bold text-realscout-blue mb-2">
                  ${listing.price?.toLocaleString() || '0'}
                </p>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>{listing.bedrooms || 0} Beds</span>
                  <span>{listing.bathrooms || 0} Baths</span>
                  <span>{listing.sqft?.toLocaleString() || 0} Sq Ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}