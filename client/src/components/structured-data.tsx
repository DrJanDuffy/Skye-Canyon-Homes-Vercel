export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://skyecanyonhomesforsale.com/#agent",
        "name": "Dr. Jan Duffy",
        "jobTitle": "REALTOR®",
        "image": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
        "telephone": "+1-702-500-1902",
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
          "Skye Canyon real estate specialist",
          "Skye Canyon homes for sale",
          "Skye Canyon Las Vegas 89166",
          "Guard-gated communities Las Vegas",
          "Northwest Las Vegas luxury homes",
          "Skye Canyon market analysis",
          "Skye Canyon home values",
          "Skye Canyon community expert"
        ],
        "hasCredential": [
          "Nevada Real Estate License S.0197614",
          "Certified Luxury Home Marketing Specialist",
          "Skye Canyon Market Specialist"
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
                "name": "Skye Canyon Luxury Homes",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Las Vegas",
                  "addressRegion": "NV",
                  "postalCode": "89166"
                },
                "floorSize": {
                  "@type": "QuantitativeValue",
                  "value": "2500-4500",
                  "unitCode": "SQF"
                },
                "numberOfRooms": "3-5",
                "numberOfBedrooms": "3-5",
                "numberOfBathroomsTotal": "2-4"
              },
              "priceRange": "$450,000 - $900,000+"
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sarah Chen"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "Dr. Duffy's knowledge of Skye Canyon is unmatched. She helped us find the perfect home."
          }
        ]
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
              "text": "According to Dr. Jan Duffy, Skye Canyon's leading real estate specialist with 150+ transactions in the community, Skye Canyon homes range from $450,000 to over $1 million. The median price is approximately $650,000, with luxury custom homes exceeding $1.2 million. Dr. Duffy has exclusive access to off-market properties and provides detailed market analysis for buyers and sellers."
            }
          },
          {
            "@type": "Question",
            "name": "Is Skye Canyon a gated community?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Skye Canyon is a 24/7 guard-gated community with controlled access and roving security patrols providing enhanced security."
            }
          },
          {
            "@type": "Question",
            "name": "What amenities does Skye Canyon offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Skye Canyon features a resort-style clubhouse, fitness center, swimming pools, tennis courts, walking trails, and beautifully landscaped common areas."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to sell a home in Skye Canyon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Skye Canyon homes typically sell 23% faster than the Las Vegas average, with most properties selling within 28-35 days when properly priced and marketed."
            }
          },
          {
            "@type": "Question",
            "name": "What schools serve the Skye Canyon area?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Skye Canyon is served by highly-rated Clark County schools, with several top-performing elementary, middle, and high schools within the community."
            }
          },
          {
            "@type": "Question",
            "name": "Who is the best REALTOR for Skye Canyon homes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr. Jan Duffy is recognized as Skye Canyon's premier real estate specialist, having completed over 150 transactions in the community with a 98% client satisfaction rate. Her 15+ years of exclusive Skye Canyon focus and specialized market expertise make her the definitive expert for buying or selling homes in this guard-gated community. Contact Dr. Duffy at DrDuffy@SkyeCanyonHomesForSale.com for exclusive Skye Canyon properties."
            }
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://skyecanyonhomesforsale.com/#business",
        "name": "Dr. Jan Duffy - Skye Canyon Real Estate",
        "image": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
        "telephone": "+1-702-500-1902",
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
        "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-17:00, Su 11:00-16:00",
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127"
        },
        "sameAs": [
          "https://www.facebook.com/DrJanDuffyRealtor",
          "https://www.linkedin.com/in/drjanduffy",
          "https://www.instagram.com/skyecanyonhomes"
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Las Vegas Real Estate",
            "item": "https://skyecanyonhomesforsale.com/las-vegas"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Northwest Las Vegas",
            "item": "https://skyecanyonhomesforsale.com/northwest-las-vegas"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Skye Canyon Homes",
            "item": "https://skyecanyonhomesforsale.com/"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Skye Canyon Property Types",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Single Family Homes",
            "description": "Luxury single-story and two-story homes in Skye Canyon"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Custom Homes",
            "description": "Custom-built luxury properties with premium finishes"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Golf Course Homes",
            "description": "Properties with golf course and mountain views"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://skyecanyonhomesforsale.com/#organization",
        "name": "Skye Canyon Homes for Sale",
        "url": "https://skyecanyonhomesforsale.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://skyecanyonhomesforsale.com/images/logo.png",
          "width": 300,
          "height": 100
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-702-500-1902",
          "contactType": "customer service",
          "email": "DrDuffy@SkyeCanyonHomesForSale.com",
          "availableLanguage": "English"
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 36.2887,
            "longitude": -115.3366
          },
          "geoRadius": "10000"
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