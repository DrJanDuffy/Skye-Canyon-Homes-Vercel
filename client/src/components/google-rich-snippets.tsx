import { useEffect } from 'react';

export default function GoogleRichSnippets() {
  useEffect(() => {
    // Enhanced schema for Google rich snippets with images
    const realEstateAgentSchema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®',
      alternateName: 'Dr. Jan Duffy REALTOR®',
      description:
        'Looking for the best real estate agent in Skye Canyon or Northwest Las Vegas? Dr. Jan Duffy is a top-rated Nevada REALTOR®, specializing in luxury homes, new construction, custom builds, and resales. She partners with leading home builders like Toll Brothers and Lennar.',
      url: 'https://skyecanyonhomesforsale.com',
      foundingDate: '2009-09-20',
      image: [
        {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          caption: 'Dr. Jan Duffy - Las Vegas REALTOR',
          width: 400,
          height: 400,
        },
        {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          caption: 'Luxury Skye Canyon Home',
          width: 1200,
          height: 800,
        },
        {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          caption: 'Modern Las Vegas Real Estate',
          width: 1200,
          height: 800,
        },
        {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          caption: 'Team of Real Estate Professionals',
          width: 1200,
          height: 800,
        },
      ],
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        width: 400,
        height: 400,
      },
      telephone: '(702) 500-1902',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '10111 W Skye Canyon Park Dr',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        addressCountry: 'US',
        postalCode: '89166',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Las Vegas',
          containedInPlace: {
            '@type': 'State',
            name: 'Nevada',
          },
        },
        {
          '@type': 'Neighborhood',
          name: 'Skye Canyon',
          containedInPlace: {
            '@type': 'City',
            name: 'Las Vegas',
          },
        },
        {
          '@type': 'Neighborhood',
          name: 'Centennial Hills',
          containedInPlace: {
            '@type': 'City',
            name: 'Las Vegas',
          },
        },
      ],
      knowsAbout: [
        'Luxury Real Estate',
        'New Construction Homes',
        'Skye Canyon Properties',
        'Northwest Las Vegas',
        'Centennial Hills',
        'Toll Brothers Homes',
        'Lennar Homes',
        'Custom Builds',
        'Investment Properties',
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Buying Services',
            description: 'Expert guidance for purchasing luxury homes in Skye Canyon and Las Vegas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Selling Services',
            description: 'Professional home selling with market expertise and staging services',
          },
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional License',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Nevada Real Estate Division',
          },
        },
      ],
    };

    // Organization schema for business entity
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Skye Canyon Homes for Sale',
      url: 'https://skyecanyonhomesforsale.com',
      logo: 'https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg',
      image: [
        'https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ],
      description:
        'Premier real estate services specializing in Skye Canyon luxury homes and Las Vegas properties',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    };

    // Website schema for the site itself
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Skye Canyon Homes for Sale',
      url: 'https://skyecanyonhomesforsale.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://skyecanyonhomesforsale.com/properties?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      author: {
        '@type': 'Person',
        name: 'Dr. Jan Duffy',
      },
    };

    // Add all schemas to the page
    const schemas = [realEstateAgentSchema, organizationSchema, websiteSchema];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `google-schema-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup
      schemas.forEach((_, index) => {
        const script = document.getElementById(`google-schema-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null;
}
