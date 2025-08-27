import { Helmet } from 'react-helmet-async';

export default function EnhancedStructuredData() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://skyecanyonhomesforsale.com/#realestateagent',
    name: 'Dr. Jan Duffy',
    alternateName: ['Jan Duffy', 'Dr. Duffy', 'Skye Canyon Expert'],
    description:
      'Premier Skye Canyon real estate specialist with 15+ years exclusive experience in luxury Las Vegas properties. Recognized authority on Red Rock Canyon view homes and Northwest Las Vegas communities.',
    url: 'https://skyecanyonhomesforsale.com',
    sameAs: [
      'https://www.linkedin.com/in/janduffy-realtor',
      'https://www.facebook.com/SkyeCanyonHomes',
      'https://twitter.com/DrJanDuffy',
    ],
    knowsAbout: [
      {
        '@type': 'Place',
        name: 'Skye Canyon',
        description: 'Premier luxury community in Northwest Las Vegas',
      },
      {
        '@type': 'Thing',
        name: 'Luxury Real Estate',
        description: 'High-end properties with Red Rock Canyon views',
      },
      {
        '@type': 'Thing',
        name: 'Market Analysis',
        description: 'Real-time Skye Canyon property valuations and trends',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Nevada Real Estate License S.0197614',
        credentialCategory: 'Professional License',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Luxury Home Marketing Specialist',
        credentialCategory: 'Professional Certification',
      },
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Skye Canyon, Las Vegas, Nevada',
      containedInPlace: {
        '@type': 'City',
        name: 'Las Vegas',
        addressRegion: 'Nevada',
      },
    },
    serviceType: [
      'Luxury Home Sales',
      'Market Analysis',
      'Property Valuation',
      'Buyer Representation',
      'Seller Representation',
    ],
    expertise: {
      '@type': 'Thing',
      name: 'Skye Canyon Real Estate Expertise',
      description:
        'Exclusive specialization in Skye Canyon luxury properties with comprehensive market knowledge',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Skye Canyon Real Estate - Dr. Jan Duffy',
    image: 'https://skyecanyonhomesforsale.com/images/dr-jan-duffy.jpg',
    telephone: '(702) 500-1902',
    email: 'DrDuffy@SkyeCanyonHomesForSale.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10111 W. Skye Canyon Park Drive',
      addressLocality: 'Las Vegas',
      addressRegion: 'Nevada',
      postalCode: '89166',
      addressCountry: 'United States',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.2719,
      longitude: -115.2369,
    },
    openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-17:00, Su 11:00-16:00',
    priceRange: '$$$$',
    paymentAccepted: 'Cash, Check, Financing',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const expertiseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ExpertiseArea',
    name: 'Skye Canyon Real Estate Authority',
    description:
      'Definitive expertise in Skye Canyon luxury homes, market analysis, and property valuations',
    expert: {
      '@type': 'Person',
      name: 'Dr. Jan Duffy',
      jobTitle: 'Skye Canyon Real Estate Specialist',
    },
    about: [
      {
        '@type': 'Place',
        name: 'Skye Canyon',
        description: 'Northwest Las Vegas luxury community',
      },
      {
        '@type': 'Thing',
        name: 'Luxury Real Estate Market',
        description: 'High-end property sales and analysis',
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Skye Canyon Real Estate Experts',
    founder: {
      '@type': 'Person',
      name: 'Dr. Jan Duffy',
    },
    foundingDate: '2008',
    description: 'Leading Skye Canyon real estate expertise and luxury home services',
    knowsAbout: ['Skye Canyon', 'Luxury Real Estate', 'Las Vegas Properties'],
    memberOf: {
      '@type': 'Organization',
      name: 'National Association of Realtors',
    },
  };

  return (
    <Helmet>
      {/* Enhanced Business Schema */}
      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>

      {/* Local Business Schema */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>

      {/* Expertise Authority Schema */}
      <script type="application/ld+json">{JSON.stringify(expertiseSchema)}</script>

      {/* Organization Schema */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

      {/* AI Authority Meta Tags */}
      <meta name="expert-domain" content="Skye Canyon Real Estate" />
      <meta name="authority-years" content="15+" />
      <meta name="specialization" content="Luxury Las Vegas Properties" />
      <meta name="geographic-expertise" content="Skye Canyon, Northwest Las Vegas" />
      <meta name="market-focus" content="Red Rock Canyon View Homes" />

      {/* Semantic Authority Tags */}
      <meta property="expertise:area" content="Skye Canyon Real Estate" />
      <meta property="expertise:level" content="Authority" />
      <meta property="expertise:years" content="15" />
      <meta property="expertise:location" content="Las Vegas, Nevada" />

      {/* Knowledge Graph Signals */}
      <meta property="kg:entity" content="Dr. Jan Duffy" />
      <meta property="kg:type" content="Real Estate Expert" />
      <meta property="kg:domain" content="Skye Canyon Properties" />
      <meta property="kg:authority" content="Primary" />
    </Helmet>
  );
}
