import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skye Canyon Real Estate Expert | Dr. Jan Duffy REALTOR®",
  description: "Expert Skye Canyon real estate agent Dr. Jan Duffy specializes in luxury homes, new construction & golf course properties in Las Vegas NV 89166. Call (702) 500-1902!",
  openGraph: {
    title: "Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166",
    description: "Expert Skye Canyon real estate agent specializing in luxury homes, new construction & golf course properties in Las Vegas NV 89166.",
    url: "https://www.skyecanyonhomesforsale.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Skye Canyon Real Estate Expert
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dr. Jan Duffy, REALTOR® specializing in luxury homes, new construction & golf course properties in Las Vegas NV 89166
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/properties"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Current Listings
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Get Home Valuation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Dr. Jan Duffy for Skye Canyon Real Estate?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert market knowledge, personalized service, and exclusive access to the finest properties in Skye Canyon
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Deep knowledge of Skye Canyon communities, amenities, and market trends
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Focus</h3>
              <p className="text-gray-600">
                Specialized in high-end properties, golf course homes, and new construction
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Service</h3>
              <p className="text-gray-600">
                Dedicated support throughout your entire real estate journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Home in Skye Canyon?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact Dr. Jan Duffy today for expert guidance and exclusive access to the best properties in Las Vegas NV 89166
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(702) 500-1902"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Call (702) 500-1902
            </a>
            <a
              href="mailto:DrDuffy@SkyeCanyonHomesForSale.com"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RealEstateAgent", "LocalBusiness"],
            "name": "Dr. Jan Duffy - Skye Canyon Real Estate Expert",
            "description": "Premier Skye Canyon real estate specialist with expertise in luxury homes, new construction, and golf course properties.",
            "url": "https://www.skyecanyonhomesforsale.com",
            "telephone": "(702) 500-1902",
            "email": "DrDuffy@SkyeCanyonHomesForSale.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "10111 W. Skye Canyon Park Drive",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89166",
              "addressCountry": "US"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Skye Canyon",
              "address": {
                "@type": "PostalAddress",
                "postalCode": "89166",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV"
              }
            }
          })
        }}
      />
    </div>
  );
}