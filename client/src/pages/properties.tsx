import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import RealScoutListings from "@/components/realscout-listings";
import RealScoutCurrentListings from "@/components/realscout-current-listings";
import FollowUpBossListings from "@/components/followup-boss-listings";
import Breadcrumb from "@/components/breadcrumb";
import BackToTop from "@/components/back-to-top";

export default function Properties() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <section className="bg-realscout-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Skye Canyon Properties
            </h1>
            <p className="text-xl opacity-90">
              Discover luxury homes in Las Vegas's premier community
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb items={[{ label: "Properties" }]} />
      </div>

      {/* Current MLS Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current MLS Listings
            </h2>
            <p className="text-xl text-gray-600">
              Latest properties for sale from Dr. Jan Duffy's active portfolio
            </p>
          </div>
          <RealScoutCurrentListings className="w-full" />
        </div>
      </section>

      {/* All Available Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Available Properties
            </h2>
            <p className="text-xl text-gray-600">
              Complete listing of Skye Canyon homes and Las Vegas area properties
            </p>
          </div>
          <RealScoutListings className="w-full" />
        </div>
      </section>

      {/* Client Portfolio */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Portfolio
            </h2>
            <p className="text-xl text-gray-600">
              Properties managed through Dr. Jan Duffy's CRM system
            </p>
          </div>
          <FollowUpBossListings />
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
}