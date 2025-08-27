export const performanceConfig = {
  // Image optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Preconnect to critical domains
  preconnect: [
    'https://em.realscout.com',
    'https://api.followupboss.com',
    'https://embed.homebotapp.com',
    'https://fonts.googleapis.com',
  ],

  // Resource hints
  resourceHints: {
    dns: ['https://www.google-analytics.com'],
    preconnect: ['https://fonts.gstatic.com'],
    prefetch: ['/api/market-data', '/api/listings'],
  },
};
