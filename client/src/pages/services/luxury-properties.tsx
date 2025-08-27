import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ComprehensiveSchemaMarkup from '@/components/comprehensive-schema';

export default function LuxuryPropertyServices() {
  return (
    <>
      <Helmet>
        <title>Luxury Property Specialist - Skye Canyon Homes | Dr. Jan Duffy REALTOR®</title>
        <meta
          name="description"
          content="Certified Luxury Home Marketing Specialist with $50M+ in Skye Canyon transactions. 98% of list price results. Call (702) 500-1902."
        />
        <meta
          name="keywords"
          content="luxury homes Skye Canyon, luxury real estate Las Vegas, golf course homes, custom luxury properties, 89166 luxury homes"
        />
        <link
          rel="canonical"
          href="https://skyecanyonhomesforsale.com/services/luxury-properties"
        />
        <meta property="og:title" content="Luxury Property Specialist - Skye Canyon Homes" />
        <meta
          property="og:description"
          content="Certified Luxury Home Marketing Specialist with $50M+ in transactions and 98% of list price results."
        />
        <meta
          property="og:url"
          content="https://skyecanyonhomesforsale.com/services/luxury-properties"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ComprehensiveSchemaMarkup
        pageType="service"
        serviceName="luxury-properties"
        breadcrumbs={[
          { name: 'Home', url: 'https://skyecanyonhomesforsale.com' },
          { name: 'Services', url: 'https://skyecanyonhomesforsale.com/services' },
          {
            name: 'Luxury Properties',
            url: 'https://skyecanyonhomesforsale.com/services/luxury-properties',
          },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main>
          <section className="py-12 bg-purple-600 text-white" role="banner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes Luxury Property Expert
                </h1>
                <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                  Certified Luxury Home Marketing Specialist with $50M+ in transactions since 2009.
                  98% of list price results.
                </p>
                <a
                  href="tel:+17025001902"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                  aria-label="Call Dr. Jan Duffy at (702) 500-1902"
                >
                  Call (702) 500-1902
                </a>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white" aria-labelledby="services-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                id="services-heading"
                className="text-3xl font-bold text-center mb-12 text-gray-900"
              >
                Elite Skye Canyon Luxury Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Certified Luxury Marketing
                  </h3>
                  <p className="text-gray-600">
                    Institute for Luxury Home Marketing certification with proven $50M+ transaction
                    history.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Golf Course Estates</h3>
                  <p className="text-gray-600">
                    Specialized expertise in Desert Highlands Golf Course properties and premium
                    locations.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Custom Home Expertise
                  </h3>
                  <p className="text-gray-600">
                    Deep knowledge of luxury builders, architectural styles, and high-end finishes.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Elite Results</h3>
                  <p className="text-gray-600">
                    Consistent 98% of list price achievement with average 21-day market time.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                  aria-label="Schedule consultation with Dr. Jan Duffy on Google Business Profile"
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
