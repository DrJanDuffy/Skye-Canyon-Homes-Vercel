import { Helmet } from "react-helmet-async";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://skyecanyonhomesforsale.com/#agent",
        "name": "Dr. Jan Duffy",
        "description": "Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise and 150+ successful transactions.",
        "url": "https://skyecanyonhomesforsale.com",
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
        "knowsAbout": [
          "Luxury Real Estate",
          "Skye Canyon Properties",
          "Las Vegas Real Estate Market",
          "Investment Properties",
          "New Construction",
          "Golf Course Communities"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "Nevada Real Estate License",
          "credentialCategory": "license",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Nevada Real Estate Division"
          }
        },
        "memberOf": {
          "@type": "Organization",
          "name": "National Association of Realtors"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Las Vegas",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "addressCountry": "US"
            }
          },
          {
            "@type": "Neighborhood",
            "name": "Skye Canyon",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89166",
              "addressCountry": "US"
            }
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "47",
          "bestRating": "5"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Michael Thompson"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5"
            },
            "reviewBody": "Dr. Duffy made our Skye Canyon home purchase seamless. Her expertise and professionalism are unmatched."
          },
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
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}