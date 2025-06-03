import { Helmet } from "react-helmet-async";

export default function PropertyListingSchema() {
  const propertyListingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Luxury Homes in Skye Canyon Las Vegas",
    "description": "Exclusive luxury home listings in Skye Canyon, featuring new construction from Toll Brothers and Lennar, custom builds, and premium resale properties.",
    "url": "https://skyecanyonhomesforsale.com/properties",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Dr. Jan Duffy",
      "telephone": "(702) 500-1902",
      "email": "jan@skyecanyonhomesforsale.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10111 W Skye Canyon Park Dr",
        "addressLocality": "Las Vegas",
        "addressRegion": "NV",
        "postalCode": "89166",
        "addressCountry": "US"
      }
    },
    "propertyType": [
      "Single Family Home",
      "Luxury Home",
      "New Construction",
      "Custom Build",
      "Gated Community Home"
    ],
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
    "priceRange": "$400,000 - $2,500,000",
    "availabilityStarts": "2025-01-01",
    "offers": {
      "@type": "Offer",
      "availability": "InStock",
      "price": "400000",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "itemCondition": "NewCondition"
    },
    "containsPlace": [
      {
        "@type": "Accommodation",
        "name": "Toll Brothers Luxury Homes",
        "description": "New construction luxury homes featuring premium finishes and modern designs",
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": 2500,
          "maxValue": 6000,
          "unitCode": "SQF"
        },
        "numberOfRooms": {
          "@type": "QuantitativeValue",
          "minValue": 3,
          "maxValue": 6
        }
      },
      {
        "@type": "Accommodation",
        "name": "Lennar Communities",
        "description": "Energy-efficient new homes with smart home technology and modern amenities",
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": 2200,
          "maxValue": 5500,
          "unitCode": "SQF"
        },
        "numberOfRooms": {
          "@type": "QuantitativeValue",
          "minValue": 3,
          "maxValue": 5
        }
      }
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Gated Community Access",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Mountain Views",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Golf Course Access",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parks and Recreation",
        "value": true
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(propertyListingSchema)}
      </script>
    </Helmet>
  );
}