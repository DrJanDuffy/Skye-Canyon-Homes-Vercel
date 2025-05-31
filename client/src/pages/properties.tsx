import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import RealScoutListings from "@/components/realscout-listings";

export default function Properties() {
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

      {/* Live MLS Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RealScoutListings className="w-full" />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}