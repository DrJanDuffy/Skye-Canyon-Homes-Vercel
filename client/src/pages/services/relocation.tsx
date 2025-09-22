import { Helmet } from 'react-helmet-async';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default function RelocationServices() {
  return (
    <>
      <Helmet>
        <title>Relocation Services - Skye Canyon Homes | Dr. Jan Duffy REALTOR®</title>
        <meta
          name="description"
          content="Comprehensive relocation services for families moving to Skye Canyon and Las Vegas. Expert assistance with local area knowledge and community insights. Call (702) 500-1902."
        />
        <meta
          name="keywords"
          content="Skye Canyon relocation, Las Vegas moving assistance, relocation services, new resident help, 89166 realtor"
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/relocation" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navigation />

      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skye Canyon Homes Relocation Expert
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Comprehensive relocation services for families moving to Las Vegas premier guard-gated
              community.
            </p>
            <a
              href="tel:+17025001902"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Call (702) 500-1902
            </a>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
}
