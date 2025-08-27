import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function App(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Homes | Dr. Jan Duffy, REALTOR®</title>
        <meta name="description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®. Expert market knowledge, personalized service, and exclusive listings in North Las Vegas." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/" />
        
        {/* RealScout Web Components Integration */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          type="module"
        />
        
        {/* Schema.org Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RealEstateAgent", "LocalBusiness"],
            "@id": "https://skyecanyonhomesforsale.com/#localbusiness",
            "name": "Dr. Jan Duffy - Skye Canyon Real Estate Expert",
            "alternateName": "Skye Canyon Homes for Sale",
            "description": "Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise. Luxury homes, investment properties, and comprehensive buyer/seller services in Las Vegas, Nevada.",
            "url": "https://skyecanyonhomesforsale.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://skyecanyonhomesforsale.com/images/dr-jan-duffy-logo.png",
              "width": 300,
              "height": 100
            },
            "image": [
              "https://skyecanyonhomesforsale.com/images/dr-jan-duffy-realtor.jpg",
              "https://skyecanyonhomesforsale.com/images/skye-canyon-homes.jpg"
            ],
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
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 36.2469,
              "longitude": -115.3242
            },
            "openingHours": [
              "Mo-Fr 08:00-20:00",
              "Sa 09:00-18:00", 
              "Su 10:00-16:00"
            ],
            "priceRange": "$300,000 - $2,000,000+",
            "currenciesAccepted": "USD",
            "paymentAccepted": ["Cash", "Check", "Credit Card"],
            "areaServed": [
              {
                "@type": "City",
                "name": "Las Vegas",
                "address": {
                  "@type": "PostalAddress",
                  "addressRegion": "NV",
                  "addressCountry": "US"
                }
              },
              {
                "@type": "Place",
                "name": "Skye Canyon",
                "address": {
                  "@type": "PostalAddress",
                  "postalCode": "89166",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV",
                  "addressCountry": "US"
                }
              }
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 36.2469,
                "longitude": -115.3242
              },
              "geoRadius": "25000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Real Estate Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Buyer Agent Services",
                    "description": "Expert buyer representation for Skye Canyon properties",
                    "serviceType": "Real Estate Buyer Agent"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Luxury Property Sales",
                    "description": "Specialized luxury home marketing and sales",
                    "serviceType": "Luxury Real Estate"
                  }
                },
                {
                  "@type": "Service",
                  "name": "First-Time Buyer Assistance",
                  "description": "Comprehensive support for first-time homebuyers",
                  "serviceType": "First-Time Buyer Services"
                },
                {
                  "@type": "Service",
                  "name": "New Construction Sales",
                  "description": "New construction home sales and builder partnerships",
                  "serviceType": "New Construction Real Estate"
                }
              ]
            },
            "knowsAbout": [
              "Skye Canyon Real Estate",
              "Las Vegas Luxury Homes",
              "Investment Properties",
              "New Construction",
              "Golf Course Communities", 
              "First-Time Homebuyers",
              "Market Analysis"
            ],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "name": "Nevada Real Estate License S.0197614",
              "credentialCategory": "license",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Nevada Real Estate Division"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": [
              "https://www.facebook.com/DrJanDuffyRealtor",
              "https://www.linkedin.com/in/drjanduffy",
              "https://www.instagram.com/drjanduffyrealtor"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Header */}
        <header className="bg-white shadow-lg border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-4xl font-bold text-blue-900">Skye Canyon Homes</h1>
              </div>
              <div className="text-blue-700 font-semibold text-xl">Dr. Jan Duffy, REALTOR®</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Luxury Homes in Skye Canyon
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the finest properties in Las Vegas's premier master-planned community. 
              Expert guidance from Dr. Jan Duffy, your Skye Canyon real estate specialist with 
              15+ years of exclusive community expertise.
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-blue-200">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Phone</h3>
              <p className="text-xl font-semibold text-gray-800">(702) 500-1902</p>
              <p className="text-gray-600 mt-2">Available for immediate consultation</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-blue-200">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Email</h3>
              <p className="text-xl font-semibold text-gray-800">DrDuffy@SkyeCanyonHomesForSale.com</p>
              <p className="text-gray-600 mt-2">Quick response guaranteed</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-blue-200">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Office</h3>
              <p className="text-xl font-semibold text-gray-800">10111 W. Skye Canyon Park Drive</p>
              <p className="text-gray-600 mt-2">Las Vegas, NV 89166</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <a 
              href="http://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
            >
              🔍 Search Skye Canyon Properties
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Luxury Homes</h3>
              <p className="text-gray-600">Premium properties $600K-$2M+ with exceptional amenities, mountain views, and resort-style living</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">⛳</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">TPC Golf Course</h3>
              <p className="text-gray-600">Access to world-class golf and resort-style amenities in one of Las Vegas's most prestigious communities</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Top Schools</h3>
              <p className="text-gray-600">A-rated schools including Canyon Springs High School, perfect for families seeking educational excellence</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Market Expertise</h3>
              <p className="text-gray-600">15+ years of exclusive community expertise with deep understanding of local market trends</p>
            </div>
          </div>

          {/* RealScout Integration */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">RealScout Property Search</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Access exclusive MLS listings, market insights, and personalized property recommendations
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                search-type="buy" 
                location="Skye Canyon, Las Vegas, NV" 
                data-production="true"
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Dr. Jan Duffy Real Estate</h3>
            <p className="text-lg mb-2">Premier Skye Canyon Real Estate Specialist</p>
            <p className="text-gray-400 mb-2">Nevada Real Estate License S.0197614</p>
            <p className="text-gray-400 mb-2">© 2024 Dr. Jan Duffy Real Estate. All rights reserved.</p>
            <p className="text-gray-400">Expert real estate services in Skye Canyon, Las Vegas, Nevada</p>
          </div>
        </footer>
      </div>
    </>
  );
}
