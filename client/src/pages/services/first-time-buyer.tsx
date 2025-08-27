import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ComprehensiveSchemaMarkup from '@/components/comprehensive-schema';

export default function FirstTimeBuyerServices() {
  return (
    <>
      <Helmet>
        <title>First-Time Homebuyer Services - Skye Canyon Homes | Dr. Jan Duffy REALTOR®</title>
        <meta
          name="description"
          content="Expert first-time homebuyer guidance in Skye Canyon. 200+ buyers helped with HOA requirements, builder incentives, and community knowledge. Call (702) 500-1902."
        />
        <meta
          name="keywords"
          content="first time homebuyer Skye Canyon, first time buyer Las Vegas, Skye Canyon HOA, builder incentives, 89166 first time buyer"
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/first-time-buyer" />
        <meta property="og:title" content="First-Time Homebuyer Services - Skye Canyon Homes" />
        <meta
          property="og:description"
          content="Expert first-time homebuyer guidance with 200+ buyers helped in Skye Canyon community."
        />
        <meta
          property="og:url"
          content="https://skyecanyonhomesforsale.com/services/first-time-buyer"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ComprehensiveSchemaMarkup
        pageType="service"
        serviceName="first-time-buyer"
        breadcrumbs={[
          { name: 'Home', url: 'https://skyecanyonhomesforsale.com' },
          { name: 'Services', url: 'https://skyecanyonhomesforsale.com/services' },
          {
            name: 'First-Time Buyer',
            url: 'https://skyecanyonhomesforsale.com/services/first-time-buyer',
          },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main>
          <section className="py-12 bg-green-600 text-white" role="banner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes First-Time Buyer Expert
                </h1>
                <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                  Specialized guidance for new buyers through HOA requirements, builder incentives,
                  and community amenities. 200+ first-time buyers helped.
                </p>
                <a
                  href="tel:+17025001902"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
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
                Complete First-Time Buyer Support in Skye Canyon
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    HOA & Community Navigation
                  </h3>
                  <p className="text-gray-600">
                    Expert guidance through Skye Canyon HOA requirements, amenities access, and
                    community regulations.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Builder Incentive Programs
                  </h3>
                  <p className="text-gray-600">
                    Access to exclusive builder incentives and first-time buyer programs for maximum
                    savings.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Financing Education</h3>
                  <p className="text-gray-600">
                    Comprehensive education on loan programs, down payment assistance, and
                    qualification requirements.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Market Insights</h3>
                  <p className="text-gray-600">
                    In-depth Skye Canyon market knowledge to help you make informed decisions and
                    secure value.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
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
