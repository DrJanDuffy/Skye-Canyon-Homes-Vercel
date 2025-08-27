import type { Express, Request, Response } from 'express';
import { optimizedStorage } from './optimized-storage';

interface PerformanceData {
  responseTime: number;
  endpoint: string;
  method: string;
  timestamp: Date;
  status: number;
}

class PerformanceDashboard {
  private metrics: PerformanceData[] = [];
  private readonly maxMetrics = 1000;

  recordMetric(data: PerformanceData) {
    this.metrics.push(data);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getRecentMetrics(hours: number = 1) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.metrics.filter((m) => m.timestamp > cutoff);
  }

  getPerformanceReport() {
    const recent = this.getRecentMetrics();
    if (recent.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        slowRequests: 0,
        errorRate: 0,
        topEndpoints: [],
        recommendations: ['No recent data available'],
      };
    }

    const avgResponseTime = recent.reduce((sum, m) => sum + m.responseTime, 0) / recent.length;
    const slowRequests = recent.filter((m) => m.responseTime > 1000);
    const errorRequests = recent.filter((m) => m.status >= 400);

    // Group by endpoint
    const endpointStats = new Map();
    recent.forEach((m) => {
      const key = `${m.method} ${m.endpoint}`;
      if (!endpointStats.has(key)) {
        endpointStats.set(key, { count: 0, totalTime: 0, maxTime: 0 });
      }
      const stats = endpointStats.get(key);
      stats.count++;
      stats.totalTime += m.responseTime;
      stats.maxTime = Math.max(stats.maxTime, m.responseTime);
    });

    const topEndpoints = Array.from(endpointStats.entries())
      .map(([endpoint, stats]: [string, any]) => ({
        endpoint,
        avgTime: Math.round(stats.totalTime / stats.count),
        maxTime: stats.maxTime,
        count: stats.count,
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 10);

    const recommendations = this.generateRecommendations(
      recent,
      avgResponseTime,
      slowRequests.length
    );

    return {
      totalRequests: recent.length,
      averageResponseTime: Math.round(avgResponseTime),
      slowRequests: slowRequests.length,
      errorRate: Math.round((errorRequests.length / recent.length) * 100),
      topEndpoints,
      recommendations,
    };
  }

  private generateRecommendations(
    metrics: PerformanceData[],
    avgTime: number,
    slowCount: number
  ): string[] {
    const recommendations = [];

    if (avgTime > 500) {
      recommendations.push('Average response time is high - consider database query optimization');
    }

    if (slowCount > metrics.length * 0.1) {
      recommendations.push('High number of slow requests detected - implement caching strategies');
    }

    const propertiesEndpoint = metrics.filter((m) => m.endpoint === '/api/properties');
    if (propertiesEndpoint.length > 0) {
      const avgPropertiesTime =
        propertiesEndpoint.reduce((sum, m) => sum + m.responseTime, 0) / propertiesEndpoint.length;
      if (avgPropertiesTime > 100) {
        recommendations.push(
          'Properties endpoint needs optimization - current caching may need tuning'
        );
      } else {
        recommendations.push('Properties endpoint performance is good - caching is effective');
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is within acceptable ranges');
    }

    return recommendations;
  }
}

export const performanceDashboard = new PerformanceDashboard();

export function setupPerformanceRoutes(app: Express) {
  // Performance monitoring middleware
  app.use((req: any, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;

      performanceDashboard.recordMetric({
        responseTime,
        endpoint: req.path,
        method: req.method,
        timestamp: new Date(),
        status: res.statusCode,
      });

      if (responseTime > 2000) {
        console.warn(
          `SLOW REQUEST: ${req.method} ${req.path} - ${responseTime}ms - Status: ${res.statusCode}`
        );
      }
    });
    next();
  });

  // Performance dashboard endpoint
  app.get('/api/performance/dashboard', (req: Request, res: Response) => {
    try {
      const report = performanceDashboard.getPerformanceReport();
      const cacheStats = optimizedStorage.getCacheStats();

      res.json({
        ...report,
        cache: cacheStats,
        serverUptime: Math.round(process.uptime()),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Performance dashboard error:', error);
      res.status(500).json({ error: 'Failed to generate performance report' });
    }
  });

  // Cache management endpoints
  app.post('/api/performance/cache/clear', (req: Request, res: Response) => {
    try {
      optimizedStorage.clearCache();
      res.json({ success: true, message: 'Cache cleared successfully' });
    } catch (error) {
      console.error('Cache clear error:', error);
      res.status(500).json({ error: 'Failed to clear cache' });
    }
  });

  // Health check with performance metrics
  app.get('/api/health/detailed', (req: Request, res: Response) => {
    const startTime = Date.now();
    const memUsage = process.memoryUsage();

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      responseTime: Date.now() - startTime,
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024),
      },
      cache: optimizedStorage.getCacheStats(),
      performance: performanceDashboard.getPerformanceReport(),
    });
  });
}
