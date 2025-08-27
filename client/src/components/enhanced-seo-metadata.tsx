import { Helmet } from 'react-helmet-async';

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: any;
  pageType?: 'website' | 'article' | 'property' | 'location' | 'service';
}

export default function EnhancedSEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://skyecanyonhomesforsale.com/images/skye-canyon-og-image.jpg',
  structuredData,
  pageType = 'website',
}: SEOMetadataProps) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy',
    url: 'https://skyecanyonhomesforsale.com',
    logo: 'https://skyecanyonhomesforsale.com/images/dr-jan-duffy-logo.png',
    image: 'https://skyecanyonhomesforsale.com/images/dr-jan-duffy-realtor.jpg',
    description:
      'Expert real estate services in Skye Canyon and Las Vegas, Nevada specializing in luxury homes and investment properties.',
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
    telephone: '(702) 500-1902',
    email: 'DrDuffy@SkyeCanyonHomesForSale.com',
    priceRange: '$$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 36.2469,
        longitude: -115.3242,
      },
      geoRadius: '25000',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Las Vegas',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'Neighborhood',
        name: 'Skye Canyon',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          postalCode: '89166',
          addressCountry: 'US',
        },
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Nevada Real Estate License',
      credentialCategory: 'license',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Nevada Real Estate Division',
      },
    },
    knowsAbout: [
      'Luxury Real Estate',
      'Skye Canyon Properties',
      'Las Vegas Real Estate Market',
      'Investment Properties',
      'New Construction',
      'Golf Course Communities',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'National Association of Realtors',
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Skye Canyon Homes for Sale" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@DrJanDuffy" />

      {/* Additional SEO Meta Tags */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="Dr. Jan Duffy" />
      <meta name="publisher" content="Skye Canyon Homes for Sale" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas, Nevada" />
      <meta name="geo.position" content="36.2469;-115.3242" />
      <meta name="ICBM" content="36.2469, -115.3242" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || baseStructuredData)}
      </script>

      {/* Google Search Console */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />

      {/* Additional Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Skye Canyon Homes for Sale',
          alternateName: 'Dr. Jan Duffy Real Estate',
          url: 'https://skyecanyonhomesforsale.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://skyecanyonhomesforsale.com/properties?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>

      {/* Breadcrumb Structured Data for Navigation */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://skyecanyonhomesforsale.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Properties',
              item: 'https://skyecanyonhomesforsale.com/properties',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Skye Canyon Guide',
              item: 'https://skyecanyonhomesforsale.com/skye-canyon-guide',
            },
          ],
        })}
      </script>
    </Helmet>
  );
}
