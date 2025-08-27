/**
 * Server-side schema markup generator
 * Generates structured data for injection into HTML
 */

export interface SchemaConfig {
  pageType?: 'homepage' | 'service' | 'about' | 'properties' | 'generic';
  serviceName?: string;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  reviews?: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

export function generateSchemaMarkup(config: SchemaConfig = {}): string {
  const { pageType = 'generic', serviceName, breadcrumbs = [], reviews = [] } = config;

  // Base LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': 'https://skyecanyonhomesforsale.com/#localbusiness',
    name: 'Dr. Jan Duffy - Skye Canyon Real Estate Expert',
    alternateName: 'Skye Canyon Homes for Sale',
    description:
      'Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise. Luxury homes, investment properties, and comprehensive buyer/seller services in Las Vegas, Nevada.',
    url: 'https://skyecanyonhomesforsale.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://skyecanyonhomesforsale.com/images/dr-jan-duffy-logo.png',
      width: 300,
      height: 100,
    },
    image: [
      'https://skyecanyonhomesforsale.com/images/dr-jan-duffy-realtor.jpg',
      'https://skyecanyonhomesforsale.com/images/skye-canyon-homes.jpg',
      'https://skyecanyonhomesforsale.com/images/luxury-properties.jpg',
    ],
    telephone: '(702) 500-1902',
    email: 'DrDuffy@SkyeCanyonHomesForSale.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10111 W. Skye Canyon Park Drive',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89166',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2469,
      longitude: -115.3242,
    },
    openingHours: ['Mo-Fr 08:00-20:00', 'Sa 09:00-18:00', 'Su 10:00-16:00'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: '$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: ['Cash', 'Check', 'Credit Card'],
    areaServed: [
      {
        '@type': 'City',
        name: 'Las Vegas',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'NV',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'Place',
        name: 'Skye Canyon',
        address: {
          '@type': 'PostalAddress',
          postalCode: '89166',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          addressCountry: 'US',
        },
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 36.2469,
        longitude: -115.3242,
      },
      geoRadius: '25000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Buyer Agent Services',
            description: 'Expert buyer representation for Skye Canyon properties',
            serviceType: 'Real Estate Buyer Agent',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Luxury Property Sales',
            description: 'Specialized luxury home marketing and sales',
            serviceType: 'Luxury Real Estate',
          },
        },
        {
          '@type': 'Service',
          name: 'First-Time Buyer Assistance',
          description: 'Comprehensive support for first-time homebuyers',
          serviceType: 'First-Time Buyer Services',
        },
        {
          '@type': 'Service',
          name: 'New Construction Sales',
          description: 'New construction home sales and builder partnerships',
          serviceType: 'New Construction Real Estate',
        },
      ],
    },
    knowsAbout: [
      'Skye Canyon Real Estate',
      'Las Vegas Luxury Homes',
      'Investment Properties',
      'New Construction',
      'Golf Course Communities',
      'First-Time Homebuyers',
      'Market Analysis',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Nevada Real Estate License S.0197614',
      credentialCategory: 'license',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/DrJanDuffyRealtor',
      'https://www.linkedin.com/in/drjanduffy',
      'https://www.instagram.com/drjanduffyrealtor',
    ],
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://skyecanyonhomesforsale.com/#organization',
    name: 'Dr. Jan Duffy Real Estate',
    legalName: 'Dr. Jan Duffy Real Estate Services',
    url: 'https://skyecanyonhomesforsale.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://skyecanyonhomesforsale.com/images/dr-jan-duffy-logo.png',
    },
    foundingDate: '2010',
    founder: {
      '@type': 'Person',
      name: 'Dr. Jan Duffy',
      jobTitle: 'REALTOR®',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Nevada Real Estate License S.0197614',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '(702) 500-1902',
      contactType: 'customer service',
      availableLanguage: 'English',
      areaServed: 'US-NV',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10111 W. Skye Canyon Park Drive',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89166',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://skyecanyonhomesforsale.com/#website',
    name: 'Skye Canyon Homes for Sale',
    alternateName: 'Dr. Jan Duffy Real Estate',
    url: 'https://skyecanyonhomesforsale.com',
    description:
      'Premier Skye Canyon real estate website featuring luxury homes, market insights, and expert real estate services in Las Vegas, Nevada.',
    publisher: {
      '@id': 'https://skyecanyonhomesforsale.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://skyecanyonhomesforsale.com/properties?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };

  // Generate service schema if applicable
  const getServiceSchema = () => {
    if (!serviceName) return null;

    const serviceSchemas: Record<string, any> = {
      'Buyer Agent Services': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Skye Canyon Buyer Agent Services',
        description:
          'Expert buyer representation for Skye Canyon luxury homes and investment properties with 15+ years of local expertise.',
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Dr. Jan Duffy',
        },
        areaServed: 'Las Vegas, NV',
        serviceType: 'Real Estate Buyer Agent',
      },
      'First-Time Buyer Services': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Skye Canyon First-Time Buyer Services',
        description:
          'Comprehensive support for first-time homebuyers including loan guidance, inspection coordination, and closing assistance.',
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Dr. Jan Duffy',
        },
        serviceType: 'First-Time Homebuyer Assistance',
      },
      'Luxury Properties': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Skye Canyon Luxury Property Services',
        description:
          'Specialized luxury home marketing and sales with premium service for high-end Skye Canyon properties.',
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Dr. Jan Duffy',
        },
        serviceType: 'Luxury Real Estate',
      },
      'New Construction': {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Skye Canyon New Construction Services',
        description:
          'New construction home sales with direct builder partnerships and comprehensive construction guidance.',
        provider: {
          '@type': 'RealEstateAgent',
          name: 'Dr. Jan Duffy',
        },
        serviceType: 'New Construction Real Estate',
      },
    };

    return serviceSchemas[serviceName as keyof typeof serviceSchemas] || null;
  };

  // Generate review schema
  const getReviewSchema = () => {
    if (reviews.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Dr. Jan Duffy Real Estate',
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
      })),
    };
  };

  // Generate breadcrumb schema
  const getBreadcrumbSchema = () => {
    if (breadcrumbs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  };

  const schemas = [
    localBusinessSchema,
    organizationSchema,
    websiteSchema,
    getServiceSchema(),
    getReviewSchema(),
    getBreadcrumbSchema(),
  ].filter(Boolean);

  // Generate HTML script tags
  return schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n');
}

export const defaultHomepageReviews = [
  {
    author: 'Sarah Mitchell',
    rating: 5,
    reviewBody:
      'Dr. Jan Duffy made our Skye Canyon home purchase seamless. Her knowledge of the community and market expertise helped us find our perfect luxury home.',
    datePublished: '2024-11-15',
  },
  {
    author: 'Michael Rodriguez',
    rating: 5,
    reviewBody:
      'Outstanding service from Dr. Duffy! She guided us through our first-time home purchase in Skye Canyon with professionalism and patience.',
    datePublished: '2024-10-22',
  },
  {
    author: 'Jennifer Chen',
    rating: 5,
    reviewBody:
      "Sold our Skye Canyon home in just 8 days! Dr. Duffy's marketing strategy and local connections delivered exceptional results.",
    datePublished: '2024-12-03',
  },
  {
    author: 'David Thompson',
    rating: 5,
    reviewBody:
      "Dr. Duffy's expertise in luxury Skye Canyon properties is unmatched. She helped us navigate the competitive market and secure our dream home.",
    datePublished: '2024-09-18',
  },
  {
    author: 'Lisa Anderson',
    rating: 5,
    reviewBody:
      'Professional, knowledgeable, and responsive. Dr. Duffy made our new construction purchase stress-free with her builder relationships.',
    datePublished: '2024-11-28',
  },
];
