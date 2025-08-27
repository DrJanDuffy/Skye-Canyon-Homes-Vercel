import type { Express, Request, Response, NextFunction } from 'express';

// Performance monitoring types
interface PerformanceMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
}

// Enhanced request interface
declare global {
  namespace Express {
    interface Request {
      startTime?: number;
    }
  }
}

class PerformanceOptimizer {
  private metrics: PerformanceMetrics[] = [];
  private readonly maxMetrics = 1000;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  // Cache with TTL
  setCache(key: string, data: any, ttlMs: number = 60000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // Performance monitoring middleware
  performanceMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      req.startTime = Date.now();

      res.on('finish', () => {
        const responseTime = Date.now() - (req.startTime || 0);

        const metric: PerformanceMetrics = {
          endpoint: req.path,
          method: req.method,
          responseTime,
          statusCode: res.statusCode,
          timestamp: new Date(),
          userAgent: req.get('user-agent'),
          ip: req.ip,
        };

        this.recordMetric(metric);

        // Log slow requests with detailed information
        if (responseTime > 1000) {
          console.warn(`SLOW REQUEST: ${req.method} ${req.path} - ${responseTime}ms`);
          console.warn(`Status: ${res.statusCode}, IP: ${req.ip}`);

          // Critical performance alert
          if (responseTime > 5000) {
            console.error(`CRITICAL PERFORMANCE: ${req.method} ${req.path} - ${responseTime}ms`);
          }
        }
      });

      next();
    };
  }

  private recordMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  // Get performance analytics
  getAnalytics() {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const recentMetrics = this.metrics.filter((m) => m.timestamp.getTime() > oneHourAgo);

    if (recentMetrics.length === 0) {
      return {
        averageResponseTime: 0,
        totalRequests: 0,
        slowRequests: 0,
        errorRate: 0,
        topEndpoints: [],
      };
    }

    const averageResponseTime =
      recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / recentMetrics.length;
    const slowRequests = recentMetrics.filter((m) => m.responseTime > 1000).length;
    const errorRequests = recentMetrics.filter((m) => m.statusCode >= 400).length;

    // Group by endpoint
    const endpointStats = new Map<string, { count: number; totalTime: number; maxTime: number }>();
    recentMetrics.forEach((m) => {
      const key = `${m.method} ${m.endpoint}`;
      const existing = endpointStats.get(key) || { count: 0, totalTime: 0, maxTime: 0 };
      existing.count++;
      existing.totalTime += m.responseTime;
      existing.maxTime = Math.max(existing.maxTime, m.responseTime);
      endpointStats.set(key, existing);
    });

    const topEndpoints = Array.from(endpointStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        averageTime: Math.round(stats.totalTime / stats.count),
        maxTime: stats.maxTime,
        requestCount: stats.count,
      }))
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, 10);

    return {
      averageResponseTime: Math.round(averageResponseTime),
      totalRequests: recentMetrics.length,
      slowRequests,
      errorRate: Math.round((errorRequests / recentMetrics.length) * 100),
      topEndpoints,
    };
  }

  // Get slow endpoints for optimization
  getSlowEndpoints() {
    return this.metrics
      .filter((m) => m.responseTime > 2000)
      .reduce(
        (acc, m) => {
          const key = `${m.method} ${m.endpoint}`;
          if (!acc[key]) {
            acc[key] = { count: 0, averageTime: 0, maxTime: 0, times: [] };
          }
          acc[key].count++;
          acc[key].times.push(m.responseTime);
          acc[key].maxTime = Math.max(acc[key].maxTime, m.responseTime);
          return acc;
        },
        {} as Record<string, any>
      );
  }
}

export const performanceOptimizer = new PerformanceOptimizer();

// Database connection optimization
export function optimizeConnection() {
  // Connection pool settings for better performance
  const connectionConfig = {
    max: 20, // Maximum number of connections
    idleTimeoutMillis: 30000, // Close connections after 30 seconds of inactivity
    connectionTimeoutMillis: 2000, // Fail fast on connection issues
    acquireTimeoutMillis: 10000, // Maximum time to wait for a connection
  };

  console.log('Database connection optimized with pool settings:', connectionConfig);
  return connectionConfig;
}

// Query performance logger
export async function logSlowQueries(query: string, duration: number) {
  if (duration > 1000) {
    console.warn(`SLOW QUERY (${duration}ms): ${query.substring(0, 100)}...`);

    if (duration > 5000) {
      console.error(`CRITICAL SLOW QUERY (${duration}ms): ${query.substring(0, 200)}...`);
    }
  }
}

// Response caching helper
export function withCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 300000 // 5 minutes default
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      // Check cache first
      const cached = performanceOptimizer.getCache(cacheKey);
      if (cached) {
        console.log(`Cache HIT: ${cacheKey}`);
        resolve(cached);
        return;
      }

      console.log(`Cache MISS: ${cacheKey}`);
      const result = await fetcher();

      // Store in cache
      performanceOptimizer.setCache(cacheKey, result, ttlMs);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
