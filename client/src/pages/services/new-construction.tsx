import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ComprehensiveSchemaMarkup from "@/components/comprehensive-schema";

export default function NewConstructionServices() {
  return (
    <>
      <Helmet>
        <title>New Construction Specialist - Skye Canyon Homes | Dr. Jan Duffy REALTOR®</title>
        <meta name="description" content="Direct partnerships with Toll Brothers, Lennar, DR Horton, and all active Skye Canyon builders. Exclusive Skye Canyon new construction focus. Call (702) 500-1902." />
        <meta name="keywords" content="new construction Skye Canyon, Toll Brothers Skye Canyon, Lennar Las Vegas, DR Horton 89166, Skye Canyon builders" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/services/new-construction" />
        <meta property="og:title" content="New Construction Specialist - Skye Canyon Homes" />
        <meta property="og:description" content="Direct partnerships with all active Skye Canyon builders including Toll Brothers, Lennar, and DR Horton." />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/services/new-construction" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ComprehensiveSchemaMarkup 
        pageType="service"
        serviceName="new-construction"
        breadcrumbs={[
          { name: "Home", url: "https://skyecanyonhomesforsale.com" },
          { name: "Services", url: "https://skyecanyonhomesforsale.com/services" },
          { name: "New Construction", url: "https://skyecanyonhomesforsale.com/services/new-construction" }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main>
          <section className="py-12 bg-orange-600 text-white" role="banner">
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
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                  aria-label="Call Dr. Jan Duffy at (702) 500-1902"
                >
                  Call (702) 500-1902
                </a>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white" aria-labelledby="services-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="services-heading" className="text-3xl font-bold text-center mb-12 text-gray-900">
                Exclusive Skye Canyon Builder Partnerships
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Direct Builder Relationships</h3>
                  <p className="text-gray-600">Established partnerships with Toll Brothers, Lennar, DR Horton, and all active Skye Canyon builders.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Exclusive Community Focus</h3>
                  <p className="text-gray-600">Only real estate agent in Las Vegas with exclusive Skye Canyon specialization since 2009.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Priority Access</h3>
                  <p className="text-gray-600">First access to new phases, floor plans, and builder incentives before public release.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Construction Oversight</h3>
                  <p className="text-gray-600">Professional guidance through the entire build process including inspections and quality control.</p>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="https://g.co/kgs/nbUf6Pj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
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