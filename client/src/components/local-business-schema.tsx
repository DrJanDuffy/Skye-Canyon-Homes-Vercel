import { Helmet } from "react-helmet-async";

export default function LocalBusinessSchema() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®",
    "alternateName": "Dr. Jan Duffy REALTOR®",
    "description": "Looking for the best real estate agent in Skye Canyon or Northwest Las Vegas? Dr. Jan Duffy is a top-rated Nevada REALTOR®, specializing in luxury homes, new construction, custom builds, and resales. She partners with leading home builders like Toll Brothers and Lennar to provide expert guidance for buying or selling high-end homes. With extensive knowledge of Skye Canyon neighborhoods, amenities, and market trends, her listings sell 12% faster and at 98% of the asking price.",
    "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "telephone": "(702) 500-1902",
    "email": "jan@skyecanyonhomesforsale.com",
    "url": "https://skyecanyonhomesforsale.com",
    "foundingDate": "2009-09-20",
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
    "servedCuisine": null,
    "areaServed": [
      {
        "@type": "Place",
        "name": "Skye Canyon",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89166"
        }
      },
      {
        "@type": "Place",
        "name": "Centennial Hills",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV"
        }
      },
      {
        "@type": "Place", 
        "name": "Northwest Las Vegas",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV"
        }
      }
    ],
    "knowsAbout": [
      "Luxury Real Estate",
      "Guard-Gated Communities",
      "Skye Canyon Properties",
      "Las Vegas Real Estate Market",
      "New Construction Homes",
      "Investment Properties"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Berkshire Hathaway HomeServices Nevada Properties"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Real Estate License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Nevada Real Estate Division"
      },
      "identifier": "S.0197614"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buyer Representation",
          "description": "Expert guidance for purchasing Skye Canyon and Las Vegas area homes"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Seller Representation", 
          "description": "Professional marketing and sale of luxury properties"
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
    ],
    "sameAs": [
      "https://www.bhhsnv.com/agents/jan-duffy",
      "https://app.bhhsnv.com/a1drjanduffy-4986"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
    </Helmet>
  );
}