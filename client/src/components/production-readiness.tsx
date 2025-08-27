import { useEffect } from 'react';

// Production readiness optimizations
export default function ProductionReadiness() {
  useEffect(() => {
    // Remove development-only elements in production
    if (process.env.NODE_ENV === 'production') {
      // Remove any development banners or debug elements
      const devBanners = document.querySelectorAll('[data-dev-only]');
      devBanners.forEach((banner) => banner.remove());

      // Optimize for production environment
      document.documentElement.setAttribute('data-env', 'production');
    }

    // Add production-specific meta tags
    const addProductionMeta = () => {
      // Add structured data for better SEO
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Dr. Jan Duffy',
        url: 'https://skyecanyonhomesforsale.com',
        telephone: '+1-702-xxx-xxxx',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          addressCountry: 'US',
        },
        areaServed: 'Skye Canyon, Las Vegas, NV',
        knowsAbout: ['Luxury Real Estate', 'New Construction', 'Skye Canyon Properties'],
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    addProductionMeta();

    // Optimize performance for production
    const optimizeForProduction = () => {
      // Enable service worker for caching in production
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed, continue without it
        });
      }

      // Preload critical routes
      const criticalRoutes = ['/properties', '/about'];
      criticalRoutes.forEach((route) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    };

    optimizeForProduction();
  }, []);

  return null;
}
