import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default function FirstTimeBuyerServicesSimple() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skye Canyon Homes First-Time Buyer Expert
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Specialized guidance for new buyers through HOA requirements, builder incentives, and
              community amenities. 200+ first-time buyers helped.
            </p>
            <a
              href="tel:+17025001902"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
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
