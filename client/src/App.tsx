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

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Skye Canyon Homes
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-blue-100">
            Dr. Jan Duffy, REALTOR®
          </p>
          <p className="text-xl md:text-2xl mb-12 text-blue-200 max-w-3xl mx-auto">
            Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise. 
            Luxury homes, investment properties, and comprehensive buyer/seller services in Las Vegas, Nevada.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="http://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Search Properties
            </a>
            <a 
              href="tel:(702) 500-1902"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              Call (702) 500-1902
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Skye Canyon Real Estate Expert
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over 15 years of experience in Skye Canyon and North Las Vegas, 
              I provide personalized service backed by deep market knowledge and strong community relationships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Luxury Homes</h3>
              <p className="text-gray-600">
                Specialized expertise in high-end Skye Canyon properties, from custom estates to golf course homes.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Analysis</h3>
              <p className="text-gray-600">
                Comprehensive market insights and property valuations to ensure you make informed decisions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Service</h3>
              <p className="text-gray-600">
                Dedicated support throughout your entire real estate journey, from first contact to closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From first-time buyers to luxury property investors, I offer tailored services 
              to meet all your Skye Canyon real estate needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Buyer Representation</h3>
              <p className="text-gray-600 text-sm">
                Expert guidance through the entire buying process with exclusive access to off-market properties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Services</h3>
              <p className="text-gray-600 text-sm">
                Strategic marketing, professional photography, and maximum exposure for your Skye Canyon property.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">New Construction</h3>
              <p className="text-gray-600 text-sm">
                Specialized knowledge of new construction homes and builder partnerships in Skye Canyon.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Properties</h3>
              <p className="text-gray-600 text-sm">
                Market analysis and investment opportunities in Skye Canyon's growing real estate market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RealScout Integration */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Search Skye Canyon Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access exclusive MLS listings, market insights, and personalized property recommendations 
              through our RealScout integration.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <realscout-office-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              search-type="buy" 
              data-production="true"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-12 text-blue-100">
            Let's discuss your Skye Canyon real estate goals and start your journey today.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-blue-100">
                <p className="flex items-center justify-center gap-2">
                  <span>📞</span>
                  <a href="tel:(702) 500-1902" className="hover:text-white transition-colors">
                    (702) 500-1902
                  </a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>✉️</span>
                  <a href="mailto:DrDuffy@SkyeCanyonHomesForSale.com" className="hover:text-white transition-colors">
                    DrDuffy@SkyeCanyonHomesForSale.com
                  </a>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span>10111 W. Skye Canyon Park Drive<br />Las Vegas, NV 89166</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2 text-blue-100">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="http://drjanduffy.realscout.com/onboarding" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Start Your Search
            </a>
            <a 
              href="tel:(702) 500-1902"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Dr. Jan Duffy</h3>
              <p className="text-gray-300 mb-4">
                Premier Skye Canyon real estate specialist with over 15 years of experience 
                serving the Las Vegas community.
              </p>
              <p className="text-gray-400 text-sm">
                Nevada Real Estate License S.0197614
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="http://drjanduffy.realscout.com/onboarding" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="tel:(702) 500-1902" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="mailto:DrDuffy@SkyeCanyonHomesForSale.com" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/DrJanDuffyRealtor" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="https://www.linkedin.com/in/drjanduffy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="text-2xl">💼</span>
                </a>
                <a href="https://www.instagram.com/drjanduffyrealtor" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dr. Jan Duffy Real Estate. All rights reserved.</p>
            <p className="text-sm mt-2">
              Serving Skye Canyon, Las Vegas, Nevada and surrounding areas.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
