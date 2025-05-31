import RealScoutListings from "@/components/realscout-listings";

export default function FeaturedListings() {
  return (
    <section id="featured" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Skye Canyon Properties
          </h2>
          <p className="text-xl text-gray-600">
            Discover exclusive luxury homes in this prestigious Las Vegas community
          </p>
        </div>
        
        <RealScoutListings className="w-full" />
      </div>
    </section>
  );
}