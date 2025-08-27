// Advanced caching configuration for optimal performance
export const cacheConfig = {
  // Static asset caching
  staticAssets: {
    cacheDuration: 31536000, // 1 year in seconds
    maxSize: 50 * 1024 * 1024, // 50MB
  },

  // API response caching
  apiCache: {
    marketStats: 5 * 60 * 1000, // 5 minutes
    propertyListings: 2 * 60 * 1000, // 2 minutes
    marketInsights: 10 * 60 * 1000, // 10 minutes
    userSession: 30 * 60 * 1000, // 30 minutes
  },

  // Image optimization
  imageOptimization: {
    quality: 85,
    formats: ['webp', 'avif'],
    sizes: [320, 640, 960, 1280, 1920],
    lazyLoadThreshold: 100, // pixels
  },

  // Service Worker config
  serviceWorker: {
    updateInterval: 24 * 60 * 60 * 1000, // 24 hours
    cacheStrategy: 'CacheFirst',
    precacheAssets: ['/', '/properties', '/about', '/market-analysis'],
  },
};

// Memory optimization utilities
export const memoryOptimization = {
  // Clean up unused query cache
  cleanupQueries: () => {
    if (typeof window !== 'undefined' && window.performance) {
      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc();
      }
    }
  },

  // Debounced scroll handler
  debounceScroll: (callback: () => void, delay = 16) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  },

  // Component cleanup
  componentCleanup: (cleanup: (() => void)[]) => {
    cleanup.forEach((fn) => fn());
  },
};
