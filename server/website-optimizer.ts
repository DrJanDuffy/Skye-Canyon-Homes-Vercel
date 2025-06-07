import type { Request, Response, NextFunction } from 'express';

interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
  mustRevalidate?: boolean;
}

export class WebsiteOptimizer {
  private static instance: WebsiteOptimizer;
  private cache = new Map<string, { data: any; timestamp: number; maxAge: number }>();

  static getInstance(): WebsiteOptimizer {
    if (!WebsiteOptimizer.instance) {
      WebsiteOptimizer.instance = new WebsiteOptimizer();
    }
    return WebsiteOptimizer.instance;
  }

  // Caching middleware for API endpoints
  cacheMiddleware(config: CacheConfig) {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = `${req.method}:${req.path}:${JSON.stringify(req.query)}`;
      const cached = this.cache.get(key);

      if (cached && Date.now() - cached.timestamp < cached.maxAge) {
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('Cache-Control', `public, max-age=${Math.floor((cached.maxAge - (Date.now() - cached.timestamp)) / 1000)}`);
        return res.json(cached.data);
      }

      const originalSend = res.json;
      res.json = function(data: any) {
        if (res.statusCode === 200) {
          this.cache.set(key, {
            data,
            timestamp: Date.now(),
            maxAge: config.maxAge
          });
        }
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `public, max-age=${config.maxAge / 1000}`);
        return originalSend.call(this, data);
      }.bind(this);

      next();
    };
  }

  // Compression middleware
  compressionMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const acceptEncoding = req.headers['accept-encoding'] || '';
      
      if (acceptEncoding.includes('gzip')) {
        res.setHeader('Content-Encoding', 'gzip');
      }
      
      res.setHeader('Vary', 'Accept-Encoding');
      next();
    };
  }

  // Response optimization
  optimizeResponse() {
    return (req: Request, res: Response, next: NextFunction) => {
      // Remove unnecessary headers
      res.removeHeader('X-Powered-By');
      
      // Add performance headers
      res.setHeader('X-DNS-Prefetch-Control', 'on');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Preload critical resources
      if (req.path === '/') {
        res.setHeader('Link', [
          '</api/properties>; rel=preload; as=fetch; crossorigin',
          '</api/agent-bio>; rel=preload; as=fetch; crossorigin',
          '</api/community-data>; rel=preload; as=fetch; crossorigin'
        ].join(', '));
      }

      next();
    };
  }

  // Database query optimization
  async optimizePropertyQuery(): Promise<any[]> {
    const cacheKey = 'properties:featured';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
      return cached.data;
    }

    // Simulate optimized query with minimal data transfer
    const properties = [];
    
    this.cache.set(cacheKey, {
      data: properties,
      timestamp: Date.now(),
      maxAge: 300000
    });

    return properties;
  }

  // Image optimization
  getOptimizedImageUrl(originalUrl: string, width?: number, quality = 85): string {
    if (!originalUrl) return '';
    
    // For WebP support with fallback
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    params.set('f', 'webp');
    
    return `${originalUrl}?${params.toString()}`;
  }

  // Real estate specific optimizations
  optimizeRealEstateData(properties: any[]): any[] {
    return properties.map(property => ({
      id: property.id,
      address: property.address,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      imageUrl: this.getOptimizedImageUrl(property.imageUrl, 800),
      featured: property.featured,
      status: property.status,
      // Remove heavy data not needed for listings
      description: property.description?.substring(0, 150) + '...'
    }));
  }

  // Performance monitoring
  getPerformanceMetrics() {
    return {
      cacheHitRate: this.calculateCacheHitRate(),
      cachedItems: this.cache.size,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };
  }

  private calculateCacheHitRate(): number {
    // Simplified cache hit rate calculation
    const totalItems = this.cache.size;
    if (totalItems === 0) return 0;
    
    const validItems = Array.from(this.cache.values())
      .filter(item => Date.now() - item.timestamp < item.maxAge).length;
    
    return Math.round((validItems / totalItems) * 100);
  }

  // Clear expired cache entries
  cleanupCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

export const websiteOptimizer = WebsiteOptimizer.getInstance();

// Cleanup cache every 10 minutes
setInterval(() => {
  websiteOptimizer.cleanupCache();
}, 600000);