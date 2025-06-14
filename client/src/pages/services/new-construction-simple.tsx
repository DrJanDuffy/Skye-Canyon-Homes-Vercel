import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function NewConstructionServicesSimple() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="py-12 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skye Canyon Homes New Construction Expert
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Direct partnerships with Toll Brothers, Lennar, DR Horton, and all active Skye Canyon builders. Only exclusive Skye Canyon focus.
            </p>
            <a 
              href="tel:+17025001902"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors"
            >
              Call (702) 500-1902
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}