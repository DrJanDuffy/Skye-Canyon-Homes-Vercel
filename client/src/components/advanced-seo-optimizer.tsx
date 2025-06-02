import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Advanced on-site SEO optimization
export default function AdvancedSEOOptimizer() {
  const [location] = useLocation();

  useEffect(() => {
    // Enhanced heading structure optimization
    const optimizeHeadingStructure = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let hasH1 = false;

      headings.forEach((heading, index) => {
        const tagName = heading.tagName.toLowerCase();
        
        // Ensure only one H1 per page
        if (tagName === 'h1') {
          if (hasH1) {
            // Convert additional H1s to H2s
            const newH2 = document.createElement('h2');
            newH2.innerHTML = heading.innerHTML;
            newH2.className = heading.className;
            heading.parentNode?.replaceChild(newH2, heading);
          } else {
            hasH1 = true;
          }
        }

        // Add structured data attributes
        heading.setAttribute('data-heading-level', tagName.replace('h', ''));
        
        // Optimize heading content for SEO
        const text = heading.textContent || '';
        if (text.length > 0 && text.length < 10) {
          heading.setAttribute('data-seo-warning', 'heading-too-short');
        }
      });
    };

    // Add semantic HTML5 structure
    const addSemanticStructure = () => {
      // Wrap main content areas with semantic tags
      const mainContent = document.querySelector('.hero-section')?.parentElement;
      if (mainContent && !mainContent.querySelector('main')) {
        const main = document.createElement('main');
        main.setAttribute('role', 'main');
        main.id = 'main-content';
        
        // Move content into main element
        const children = Array.from(mainContent.children);
        children.forEach(child => {
          if (!child.matches('nav, header, footer')) {
            main.appendChild(child);
          }
        });
        
        mainContent.appendChild(main);
      }

      // Add article tags for property listings
      const propertyCards = document.querySelectorAll('.property-card');
      propertyCards.forEach(card => {
        if (card.tagName.toLowerCase() !== 'article') {
          const article = document.createElement('article');
          article.className = card.className;
          article.innerHTML = card.innerHTML;
          card.parentNode?.replaceChild(article, card);
        }
      });
    };

    // Enhanced meta descriptions based on page content
    const optimizeMetaDescriptions = () => {
      const pageDescriptions = {
        '/': 'Discover luxury homes for sale in Skye Canyon Las Vegas with Dr. Jan Duffy, licensed REALTOR. Expert guidance for buying and selling premium properties in Nevada\'s premier community.',
        '/about': 'Meet Dr. Jan Duffy, your trusted Skye Canyon real estate specialist. Licensed Nevada REALTOR S.0197614 with 15+ years experience in Las Vegas luxury home sales.',
        '/properties': 'Browse current Skye Canyon homes for sale. Updated MLS listings of luxury properties, new construction, and investment opportunities in Las Vegas, Nevada.',
        '/luxury-homes-las-vegas': 'Luxury homes for sale in Las Vegas featuring Skye Canyon\'s most exclusive properties. Premium estates, custom homes, and gated communities.',
        '/market-analysis': 'Las Vegas real estate market analysis and Skye Canyon property trends. Current home values, market statistics, and investment insights from Dr. Jan Duffy.',
        '/skye-canyon-guide': 'Complete Skye Canyon community guide covering neighborhoods, amenities, schools, and lifestyle in Las Vegas\' premier master-planned community.',
        '/skye-canyon-schools': 'Skye Canyon schools information including ratings, boundaries, and educational opportunities in the Northwest Las Vegas area.',
        '/skye-canyon-parks': 'Skye Canyon parks and recreation including trails, golf courses, and outdoor activities in Northwest Las Vegas, Nevada.'
      };

      const currentDesc = pageDescriptions[location] || pageDescriptions['/'];
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', currentDesc);
    };

    // Add keyword-rich alt text to images without proper alt text
    const optimizeImageAltText = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt') || '';
        const src = img.getAttribute('src') || '';
        
        if (!alt || alt.length < 10) {
          let optimizedAlt = '';
          
          if (src.includes('headshot') || src.includes('duffy')) {
            optimizedAlt = 'Dr. Jan Duffy REALTOR professional headshot - Licensed Nevada real estate agent specializing in Skye Canyon luxury homes';
          } else if (src.includes('property') || src.includes('home')) {
            optimizedAlt = 'Luxury home for sale in Skye Canyon Las Vegas - Premium real estate in Nevada\'s master-planned community';
          } else if (src.includes('skye-canyon') || src.includes('las-vegas')) {
            optimizedAlt = 'Skye Canyon Las Vegas community featuring luxury homes, parks, and mountain views in Northwest Nevada';
          } else {
            optimizedAlt = 'Skye Canyon real estate and luxury homes in Las Vegas Nevada with Dr. Jan Duffy REALTOR';
          }
          
          img.setAttribute('alt', optimizedAlt);
        }
      });
    };

    // Add local business schema markup
    const addLocalBusinessSchema = () => {
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (!existingSchema) {
        const localBusinessSchema = {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Dr. Jan Duffy REALTOR",
          "image": "https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg",
          "url": "https://skyecanyonhomesforsale.com",
          "telephone": "+1-702-500-1902",
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
            "longitude": -115.2866
          },
          "openingHours": "Mo-Su 08:00-20:00",
          "serviceArea": {
            "@type": "City",
            "name": "Las Vegas, Nevada"
          },
          "knowsAbout": [
            "Skye Canyon Real Estate",
            "Luxury Homes Las Vegas",
            "Nevada Real Estate License S.0197614"
          ],
          "memberOf": {
            "@type": "Organization",
            "name": "Las Vegas REALTORS Association"
          }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(localBusinessSchema);
        document.head.appendChild(script);
      }
    };

    // Execute optimizations
    optimizeHeadingStructure();
    addSemanticStructure();
    optimizeMetaDescriptions();
    optimizeImageAltText();
    addLocalBusinessSchema();

  }, [location]);

  return null;
}