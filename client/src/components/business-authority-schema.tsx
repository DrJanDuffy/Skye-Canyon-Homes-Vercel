import { Helmet } from "react-helmet-async";

export default function BusinessAuthoritySchema() {
  const businessAuthoritySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dr. Jan Duffy Real Estate",
    "alternateName": "Skye Canyon Las Vegas Luxury Homes",
    "description": "Top-rated Nevada REALTOR® specializing in luxury homes, new construction partnerships with Toll Brothers and Lennar, serving Skye Canyon, Centennial Hills, and Northwest Las Vegas since 2009.",
    "foundingDate": "2009-09-20",
    "url": "https://skyecanyonhomesforsale.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
      "width": 400,
      "height": 400
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(702) 500-1902",
      "contactType": "Sales",
      "availableLanguage": "English",
      "areaServed": ["US-NV"]
    },
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
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Berkshire Hathaway HomeServices Nevada Properties"
      },
      {
        "@type": "Organization",
        "name": "Nevada Association of REALTORS®"
      },
      {
        "@type": "Organization",
        "name": "Las Vegas REALTORS®"
      }
    ],
    "award": [
      "Top Skye Canyon Specialist",
      "Luxury Home Expert",
      "New Construction Partner - Toll Brothers",
      "New Construction Partner - Lennar"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "knowsAbout": [
      "Luxury Real Estate Sales",
      "New Construction Homes",
      "Toll Brothers Properties", 
      "Lennar Communities",
      "Skye Canyon Real Estate",
      "Centennial Hills Properties",
      "Northwest Las Vegas Market",
      "Custom Home Building",
      "Investment Properties",
      "Market Analysis"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Buyer Representation",
            "description": "Expert guidance for purchasing luxury homes in Skye Canyon and Northwest Las Vegas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Seller Representation",
            "description": "Professional marketing and sale of luxury properties with 98% of asking price results"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "New Construction Consultation",
            "description": "Specialized guidance for Toll Brothers and Lennar new home purchases"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Market Analysis",
            "description": "Comprehensive real estate market insights and property valuations"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.bhhsnv.com/agents/jan-duffy",
      "https://app.bhhsnv.com/a1drjanduffy-4986",
      "https://www.facebook.com/skyecanyonhomes",
      "https://www.instagram.com/skyecanyonhomes",
      "https://www.linkedin.com/in/drjanduffy"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessAuthoritySchema)}
      </script>
    </Helmet>
  );
}