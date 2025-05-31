export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://skyecanyonhomesforsale.com/#agent",
        "name": "Dr. Jan Duffy",
        "jobTitle": "REALTOR®",
        "image": "https://skyecanyonhomesforsale.com/images/dr-jan-duffy.jpg",
        "telephone": "+1-702-123-4567",
        "email": "DrDuffy@SkyeCanyonHomesForSale.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Skye Canyon",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89166",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.2887,
          "longitude": -115.3366
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 36.2887,
            "longitude": -115.3366
          },
          "geoRadius": "5000"
        },
        "knowsAbout": [
          "Skye Canyon real estate",
          "Las Vegas luxury homes",
          "Guard-gated communities",
          "Northwest Las Vegas properties"
        ],
        "hasCredential": [
          "Doctorate in Business Administration",
          "Nevada Real Estate License",
          "Certified Luxury Home Marketing Specialist"
        ],
        "award": "Top 1% REALTOR® Las Vegas",
        "memberOf": {
          "@type": "Organization",
          "name": "National Association of REALTORS®"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Skye Canyon Homes for Sale",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "House",
                "name": "Skye Canyon Homes",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV"
                }
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "url": "https://skyecanyonhomesforsale.com",
        "name": "Skye Canyon Homes for Sale",
        "description": "Exclusive Skye Canyon real estate in Las Vegas, NV",
        "publisher": {
          "@id": "https://skyecanyonhomesforsale.com/#agent"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://skyecanyonhomesforsale.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the average home price in Skye Canyon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Skye Canyon homes typically range from $450,000 to $900,000+, with a median price of approximately $650,000."
            }
          },
          {
            "@type": "Question",
            "name": "Is Skye Canyon a gated community?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Skye Canyon is a 24/7 guard-gated community with controlled access and roving security patrols."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Real Estate Services",
        "provider": {
          "@id": "https://skyecanyonhomesforsale.com/#agent"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Skye Canyon, Las Vegas, NV 89166"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Real Estate Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Home Buying Assistance",
                "description": "Expert guidance for buying Skye Canyon homes"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Home Selling Services",
                "description": "Professional home selling in Skye Canyon"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Free Home Valuation",
                "description": "Instant CMA for Skye Canyon properties"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}