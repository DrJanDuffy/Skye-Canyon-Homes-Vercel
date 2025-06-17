import { Helmet } from "react-helmet-async";

interface LocalCitationSchemaProps {
  pageType?: string;
}

export default function LocalCitationsSchema({ pageType = "homepage" }: LocalCitationSchemaProps) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dr. Jan Duffy REALTOR®",
    "description": "Premier Skye Canyon real estate specialist in Las Vegas NV 89166. Expert in luxury homes, new construction, and Desert Highlands Golf Course properties.",
    "url": "https://skyecanyonhomesforsale.com",
    "image": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
    "logo": "https://skyecanyonhomesforsale.com/logo.png",
    "telephone": "(702) 500-1902",
    "email": "jan@skyecanyonhomesforsale.com",
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
      "latitude": "36.2719",
      "longitude": "-115.2328"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Las Vegas",
        "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
      },
      {
        "@type": "Neighborhood",
        "name": "Skye Canyon",
        "containedIn": "Las Vegas, NV"
      },
      {
        "@type": "PostalCode",
        "name": "89166"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "36.2719",
        "longitude": "-115.2328"
      },
      "geoRadius": "25000"
    },
    "priceRange": "$300,000 - $2,000,000+",
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-17:00", 
      "Su 11:00-16:00"
    ],
    "specialties": [
      "Skye Canyon Real Estate",
      "Luxury Home Sales",
      "New Construction",
      "Golf Course Properties",
      "Buyer Representation",
      "Seller Services"
    ],
    "knowsAbout": [
      "Skye Canyon Community",
      "Desert Highlands Golf Course",
      "Las Vegas Real Estate Market",
      "Nevada Real Estate Law",
      "Luxury Property Marketing",
      "New Construction Process"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Las Vegas Board of REALTORS",
        "url": "https://www.lvrealtors.com"
      },
      {
        "@type": "Organization", 
        "name": "National Association of REALTORS",
        "url": "https://www.nar.realtor"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Nevada Real Estate Division"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Dr. Jan Duffy made our Skye Canyon home purchase seamless. Her knowledge of the community and market expertise helped us find our perfect luxury home.",
        "datePublished": "2024-11-15"
      }
    ],
    "sameAs": [
      "https://g.co/kgs/nbUf6Pj",
      "https://www.zillow.com/profile/DrJanDuffy/",
      "https://www.realtor.com/realestateagents/dr-jan-duffy_las-vegas_nv_2665289_000000000",
      "https://www.yelp.com/biz/dr-jan-duffy-realtor-las-vegas",
      "https://www.facebook.com/DrJanDuffyRealtor",
      "https://www.linkedin.com/in/drjanduffy"
    ]
  };

  const localSEOCitations = [
    {
      name: "Skye Canyon homes for sale",
      url: "https://skyecanyonhomesforsale.com/properties"
    },
    {
      name: "Las Vegas 89166 real estate agent",
      url: "https://skyecanyonhomesforsale.com"
    },
    {
      name: "Desert Highlands Golf Course homes",
      url: "https://skyecanyonhomesforsale.com/luxury-homes-las-vegas"
    },
    {
      name: "Northwest Las Vegas realtor",
      url: "https://skyecanyonhomesforsale.com/northwest-las-vegas"
    }
  ];

  return (
    <Helmet>
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Enhanced Citation Meta Tags */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas" />
      <meta name="geo.position" content="36.2719;-115.2328" />
      <meta name="ICBM" content="36.2719, -115.2328" />
      
      {/* Local Business Citations */}
      <meta name="business.name" content="Dr. Jan Duffy REALTOR®" />
      <meta name="business.phone" content="(702) 500-1902" />
      <meta name="business.address" content="10111 W Skye Canyon Park Dr, Las Vegas, NV 89166" />
      <meta name="business.hours" content="Mo-Fr 09:00-18:00, Sa 09:00-17:00, Su 11:00-16:00" />
      
      {/* Local SEO Enhancement */}
      <meta name="locality" content="Skye Canyon" />
      <meta name="region" content="Las Vegas" />
      <meta name="postal-code" content="89166" />
      <meta name="country-name" content="United States" />
      
      {/* Enhanced Dublin Core for Local SEO */}
      <meta name="DC.coverage" content="Skye Canyon, Las Vegas, NV 89166" />
      <meta name="DC.spatial" content="Las Vegas, Nevada, United States" />
      <meta name="DC.temporal" content="2009-2024" />
      
      {/* Local Business Verification */}
      <link rel="me" href="https://g.co/kgs/nbUf6Pj" />
      <link rel="canonical" href={`https://skyecanyonhomesforsale.com${window.location.pathname}`} />
      
      {/* Citation Building Meta */}
      {localSEOCitations.map((citation, index) => (
        <link 
          key={index}
          rel="related" 
          href={citation.url} 
          title={citation.name}
        />
      ))}
    </Helmet>
  );
}