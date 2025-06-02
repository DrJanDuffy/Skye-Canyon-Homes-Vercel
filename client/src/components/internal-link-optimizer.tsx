import { useEffect } from 'react';

// Enhanced internal linking for better SEO and user navigation
export default function InternalLinkOptimizer() {
  useEffect(() => {
    // Add contextual internal links to improve SEO
    const addContextualLinks = () => {
      // Find text content and add relevant internal links
      const content = document.querySelectorAll('p, div, span');
      
      content.forEach((element) => {
        const text = element.textContent || '';
        
        // Skip if element already has links or is inside a link
        if (element.querySelector('a') || element.closest('a')) return;
        
        // Define keyword-to-URL mappings for internal linking
        const linkMappings = [
          { keywords: ['Skye Canyon homes', 'Skye Canyon properties'], url: '/properties', title: 'View Skye Canyon Properties' },
          { keywords: ['luxury homes', 'luxury properties'], url: '/luxury-homes-las-vegas', title: 'Luxury Homes in Las Vegas' },
          { keywords: ['market analysis', 'market data'], url: '/market-analysis', title: 'Las Vegas Market Analysis' },
          { keywords: ['Dr. Jan Duffy', 'REALTOR'], url: '/about', title: 'About Dr. Jan Duffy REALTOR' },
          { keywords: ['Las Vegas real estate'], url: '/las-vegas-real-estate', title: 'Las Vegas Real Estate Market' },
          { keywords: ['Skye Canyon schools'], url: '/skye-canyon-schools', title: 'Skye Canyon Schools Information' },
          { keywords: ['Skye Canyon parks'], url: '/skye-canyon-parks', title: 'Skye Canyon Parks and Recreation' },
          { keywords: ['new construction'], url: '/skye-canyon-communities', title: 'New Construction in Skye Canyon' }
        ];

        linkMappings.forEach(({ keywords, url, title }) => {
          keywords.forEach(keyword => {
            if (text.toLowerCase().includes(keyword.toLowerCase()) && !element.innerHTML.includes(`href="${url}"`)) {
              const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
              if (regex.test(text)) {
                element.innerHTML = element.innerHTML.replace(
                  regex, 
                  `<a href="${url}" title="${title}" class="internal-link text-realscout-blue hover:text-realscout-navy underline">${keyword}</a>`
                );
              }
            }
          });
        });
      });
    };

    // Add structured breadcrumb links
    const addBreadcrumbSchema = () => {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://skyecanyonhomesforsale.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Skye Canyon Properties",
            "item": "https://skyecanyonhomesforsale.com/properties"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "About Dr. Jan Duffy",
            "item": "https://skyecanyonhomesforsale.com/about"
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    };

    // Add related links sidebar
    const addRelatedLinks = () => {
      const relatedLinksHTML = `
        <div class="related-links bg-gray-50 p-6 rounded-lg mt-8">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">Related Resources</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Property Search</h4>
              <ul class="space-y-1 text-sm">
                <li><a href="/properties" class="text-realscout-blue hover:text-realscout-navy">All Skye Canyon Properties</a></li>
                <li><a href="/luxury-homes-las-vegas" class="text-realscout-blue hover:text-realscout-navy">Luxury Homes</a></li>
                <li><a href="/skye-canyon-communities" class="text-realscout-blue hover:text-realscout-navy">New Construction</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Market Information</h4>
              <ul class="space-y-1 text-sm">
                <li><a href="/market-analysis" class="text-realscout-blue hover:text-realscout-navy">Market Analysis</a></li>
                <li><a href="/las-vegas-real-estate" class="text-realscout-blue hover:text-realscout-navy">Las Vegas Market</a></li>
                <li><a href="/northwest-las-vegas" class="text-realscout-blue hover:text-realscout-navy">Northwest Las Vegas</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Community Guide</h4>
              <ul class="space-y-1 text-sm">
                <li><a href="/skye-canyon-guide" class="text-realscout-blue hover:text-realscout-navy">Skye Canyon Guide</a></li>
                <li><a href="/skye-canyon-schools" class="text-realscout-blue hover:text-realscout-navy">Schools</a></li>
                <li><a href="/skye-canyon-parks" class="text-realscout-blue hover:text-realscout-navy">Parks & Recreation</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Contact & Services</h4>
              <ul class="space-y-1 text-sm">
                <li><a href="/about" class="text-realscout-blue hover:text-realscout-navy">About Dr. Jan Duffy</a></li>
                <li><a href="tel:+17025001902" class="text-realscout-blue hover:text-realscout-navy">Call (702) 500-1902</a></li>
                <li><a href="https://drjanduffy.realscout.com/onboarding" class="text-realscout-blue hover:text-realscout-navy">Schedule Consultation</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;

      // Add to main content areas
      const contentAreas = document.querySelectorAll('main, .main-content, article');
      contentAreas.forEach(area => {
        if (!area.querySelector('.related-links')) {
          area.insertAdjacentHTML('beforeend', relatedLinksHTML);
        }
      });
    };

    // Execute optimizations
    setTimeout(() => {
      addContextualLinks();
      addBreadcrumbSchema();
      addRelatedLinks();
    }, 1000);

    // Monitor for new content and re-optimize
    const observer = new MutationObserver(() => {
      setTimeout(addContextualLinks, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}