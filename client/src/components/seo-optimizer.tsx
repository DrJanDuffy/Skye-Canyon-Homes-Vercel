import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'property';
  propertyData?: {
    price?: string;
    address?: string;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
  };
}

export default function SEOOptimizer({
  title,
  description,
  keywords = [],
  image = '/images/skye-canyon-hero.jpg',
  type = 'website',
  propertyData,
}: SEOOptimizerProps) {
  const [location] = useLocation();

  // Dynamic SEO based on page and user context
  const getPageSEO = () => {
    const baseTitle = 'Skye Canyon | Dr. Jan Duffy, REALTOR®';
    const baseDescription =
      'Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®. Expert market knowledge, personalized service, and exclusive listings in North Las Vegas.';

    switch (location) {
      case '/':
        return {
          title: title || baseTitle,
          description: description || baseDescription,
          keywords: [
            'Skye Canyon homes',
            'Las Vegas real estate',
            'Dr. Jan Duffy',
            'luxury homes',
            'North Las Vegas',
            'REALTOR',
          ],
        };

      case '/properties':
        return {
          title: title || 'Skye Canyon Properties for Sale | Dr. Jan Duffy REALTOR®',
          description:
            description ||
            'Browse exclusive Skye Canyon properties with Dr. Jan Duffy. Luxury homes, detailed listings, and expert guidance in North Las Vegas real estate.',
          keywords: [
            'Skye Canyon properties',
            'homes for sale',
            'Las Vegas listings',
            'luxury real estate',
          ],
        };

      case '/about':
        return {
          title: title || 'About Dr. Jan Duffy | Skye Canyon Real Estate Expert',
          description:
            description ||
            'Meet Dr. Jan Duffy, your dedicated Skye Canyon real estate expert. Years of experience, local market expertise, and proven results in Las Vegas.',
          keywords: [
            'Dr. Jan Duffy',
            'real estate agent',
            'Skye Canyon expert',
            'Las Vegas REALTOR',
          ],
        };

      case '/market-analysis':
        return {
          title: title || 'Skye Canyon Market Analysis | Current Home Values & Trends',
          description:
            description ||
            'Get the latest Skye Canyon market analysis from Dr. Jan Duffy. Current home values, market trends, and pricing insights for informed decisions.',
          keywords: ['Skye Canyon market', 'home values', 'market analysis', 'real estate trends'],
        };

      default:
        return {
          title: title || baseTitle,
          description: description || baseDescription,
          keywords:
            keywords.length > 0 ? keywords : ['Skye Canyon', 'real estate', 'Dr. Jan Duffy'],
        };
    }
  };

  const seoData = getPageSEO();
  const canonicalUrl = `https://skyecanyonhomesforsale.com${location}`;

  // Generate property-specific structured data
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Dr. Jan Duffy',
      jobTitle: 'REALTOR®',
      url: 'https://skyecanyonhomesforsale.com',
      telephone: '+1-702-500-1902',
      email: 'jan@skyecanyonhomesforsale.com',
      areaServed: {
        '@type': 'Place',
        name: 'Skye Canyon, Las Vegas, Nevada',
      },
      knowsAbout: [
        'Skye Canyon Real Estate',
        'Luxury Homes',
        'Las Vegas Property Market',
        'Home Buying',
        'Home Selling',
      ],
    };

    if (propertyData && location.includes('/property')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'SingleFamilyResidence',
        name: propertyData.address,
        address: {
          '@type': 'PostalAddress',
          streetAddress: propertyData.address || '10111 W. Skye Canyon Park Drive',
          addressLocality: 'Las Vegas',
          addressRegion: 'Nevada',
          postalCode: '89166',
        },
        offers: {
          '@type': 'Offer',
          price: propertyData.price,
          priceCurrency: 'USD',
        },
        numberOfRooms: propertyData.bedrooms,
        numberOfBathroomsTotal: propertyData.bathrooms,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: propertyData.sqft,
          unitCode: 'SQF',
        },
      };
    }

    return baseData;
  };

  useEffect(() => {
    // Preload critical resources based on page
    const preloadLinks = [
      { rel: 'preload', href: '/api/properties', as: 'fetch' },
      { rel: 'preload', href: '/api/market-data', as: 'fetch' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ];

    preloadLinks.forEach((link) => {
      const linkElement = document.createElement('link');
      Object.assign(linkElement, link);
      document.head.appendChild(linkElement);
    });

    // Set up page-specific meta tags for social sharing
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, viewport-fit=cover'
      );
    }
  }, []);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={`https://skyecanyonhomesforsale.com${image}`} />
      <meta property="og:site_name" content="Skye Canyon Homes for Sale" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={seoData.title} />
      <meta property="twitter:description" content={seoData.description} />
      <meta property="twitter:image" content={`https://skyecanyonhomesforsale.com${image}`} />

      {/* Real Estate Specific */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Skye Canyon, Las Vegas" />
      <meta name="geo.position" content="36.2719;-115.3331" />
      <meta name="ICBM" content="36.2719, -115.3331" />

      {/* Mobile Optimization */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(getStructuredData())}</script>

      {/* Preload Critical Resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preload" href={image} as="image" />

      {/* DNS Prefetch for External Services */}
      <link rel="dns-prefetch" href="//api.followupboss.com" />
      <link rel="dns-prefetch" href="//api.cloudcma.com" />
      <link rel="dns-prefetch" href="//www.simplifyingthemarket.com" />
    </Helmet>
  );
}
