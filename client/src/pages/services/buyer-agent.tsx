import { Helmet } from 'react-helmet-async';
import ComprehensiveSchemaMarkup from '@/components/comprehensive-schema';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default function BuyerAgentServices() {
  return (
    <>
      <Helmet>
        <title>Expert Buyer Agent Services - Skye Canyon Homes | Dr. Jan Duffy REALTOR®</title>
        <meta
          name="description"
          content="Premier Skye Canyon buyer agent with 15+ years exclusive community expertise. Direct builder access, off-market properties, and expert negotiation. Call (702) 500-1902."
        />
        <meta
          name="keywords"
          content="Skye Canyon buyer agent, Las Vegas buyer agent, luxury home buyer agent, new construction buyer agent, 89166 realtor"
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/buyer-agent" />
        <meta property="og:title" content="Expert Buyer Agent Services - Skye Canyon Homes" />
        <meta
          property="og:description"
          content="Premier Skye Canyon buyer agent with 15+ years exclusive community expertise. Average client saves $15K+."
        />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/buyer-agent" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ComprehensiveSchemaMarkup
        pageType="service"
        serviceName="buyer-agent"
        breadcrumbs={[
          { name: 'Home', url: 'https://skyecanyonhomesforsale.com' },
          { name: 'Services', url: 'https://skyecanyonhomesforsale.com/services' },
          { name: 'Buyer Agent', url: 'https://skyecanyonhomesforsale.com/services/buyer-agent' },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main>
          <section className="py-12 bg-blue-600 text-white" role="banner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Skye Canyon Homes Expert Buyer Agent
                </h1>
                <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                  15+ years exclusive Skye Canyon specialization with direct builder relationships
                  and off-market access. Average client saves $15K+.
                </p>
                <a
                  href="tel:+17025001902"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                Comprehensive Skye Canyon Buyer Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Market Analysis & Property Search
                  </h3>
                  <p className="text-gray-600">
                    Exclusive access to off-market properties and comprehensive market analysis for
                    informed decisions.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Negotiation</h3>
                  <p className="text-gray-600">
                    Skilled negotiation that averages $15K+ savings for clients with 15+ years of
                    experience.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Builder Relationships
                  </h3>
                  <p className="text-gray-600">
                    Direct partnerships with Skye Canyon builders for priority access to new
                    construction.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    Transaction Management
                  </h3>
                  <p className="text-gray-600">
                    Complete transaction oversight from offer to closing with expert guidance
                    throughout.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
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
