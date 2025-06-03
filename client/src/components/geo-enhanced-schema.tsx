import { Helmet } from "react-helmet-async";

export default function GeoEnhancedSchema() {
  const geoSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://skyecanyonhomesforsale.com/#realestateagent",
        "name": "Dr. Jan Duffy",
        "alternateName": "Jan Duffy REALTOR®",
        "url": "https://skyecanyonhomesforsale.com",
        "telephone": "(702) 500-1902",
        "email": "jan@skyecanyonhomesforsale.com",
        "foundingDate": "2009-09-20",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "10111 W Skye Canyon Park Dr",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89166",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.2648",
          "longitude": "-115.3275"
        },
        "areaServed": [
          {
            "@type": "Place",
            "name": "Skye Canyon",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.2648",
              "longitude": "-115.3275"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89166",
              "addressCountry": "US"
            }
          },
          {
            "@type": "Place",
            "name": "Centennial Hills",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.2297",
              "longitude": "-115.3234"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "addressCountry": "US"
            }
          },
          {
            "@type": "Place",
            "name": "Northwest Las Vegas",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.2194",
              "longitude": "-115.2656"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "addressCountry": "US"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Real Estate Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Skye Canyon Home Sales",
                "description": "Luxury home sales in Skye Canyon community",
                "provider": {
                  "@id": "https://skyecanyonhomesforsale.com/#realestateagent"
                },
                "areaServed": {
                  "@type": "Place",
                  "name": "Skye Canyon, Las Vegas, NV 89166"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Toll Brothers New Construction",
                "description": "New construction homes from Toll Brothers builder",
                "provider": {
                  "@id": "https://skyecanyonhomesforsale.com/#realestateagent"
                }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Lennar Home Communities",
                "description": "Lennar new home communities and developments",
                "provider": {
                  "@id": "https://skyecanyonhomesforsale.com/#realestateagent"
                }
              }
            }
          ]
        },
        "knowsAbout": [
          "Luxury Real Estate Sales",
          "Skye Canyon Properties",
          "Toll Brothers Homes",
          "Lennar Communities",
          "Las Vegas Real Estate Market",
          "Nevada Property Law",
          "New Construction Sales",
          "Custom Home Building",
          "Investment Properties",
          "Market Analysis"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://skyecanyonhomesforsale.com/#localbusiness",
        "name": "Dr. Jan Duffy Real Estate",
        "image": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
        "telephone": "(702) 500-1902",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "10111 W Skye Canyon Park Dr",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89166",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.2648",
          "longitude": "-115.3275"
        },
        "openingHours": [
          "Mo 09:00-18:00",
          "Tu 09:00-18:00",
          "We 09:00-18:00",
          "Th 09:00-18:00",
          "Fr 09:00-18:00",
          "Sa 09:00-17:00",
          "Su 11:00-16:00"
        ],
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "47",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://skyecanyonhomesforsale.com/#website",
        "url": "https://skyecanyonhomesforsale.com",
        "name": "Skye Canyon Homes for Sale - Dr. Jan Duffy",
        "description": "Find luxury Skye Canyon homes for sale with Dr. Jan Duffy, REALTOR®. Expert real estate services in Las Vegas, Nevada 89166.",
        "publisher": {
          "@id": "https://skyecanyonhomesforsale.com/#realestateagent"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://skyecanyonhomesforsale.com/properties?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(geoSchema)}
      </script>
    </Helmet>
  );
}