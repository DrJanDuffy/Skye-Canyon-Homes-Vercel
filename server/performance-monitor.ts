import type { NextFunction, Request, Response } from 'express';

interface PerformanceMetrics {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private readonly maxMetrics = 1000; // Keep last 1000 requests

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const startTime = Date.now();

      // Capture original end method
      const originalEnd = res.end;

      res.end = function (chunk?: any, encoding?: any) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Record performance metric
        const metric: PerformanceMetrics = {
          endpoint: req.path,
          method: req.method,
          responseTime,
          statusCode: res.statusCode,
          timestamp: new Date(),
          userAgent: req.get('User-Agent'),
          ip: req.ip,
        };

        this.recordMetric(metric);

        // Call original end method
        originalEnd.call(res, chunk, encoding);
      }.bind(this);

      next();
    };
  }

  private recordMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);

    // Keep only last maxMetrics entries
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log slow requests
    if (metric.responseTime > 2000) {
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getAnalytics() {
    const recentMetrics = this.metrics.filter(
      (m) => Date.now() - m.timestamp.getTime() < 24 * 60 * 60 * 1000 // Last 24 hours
    );

    if (recentMetrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        slowRequests: 0,
        errorRate: 0,
        topEndpoints: [],
      };
    }

    const totalRequests = recentMetrics.length;
    const averageResponseTime =
      recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests;
    const slowRequests = recentMetrics.filter((m) => m.responseTime > 1000).length;
    const errorRequests = recentMetrics.filter((m) => m.statusCode >= 400).length;
    const errorRate = (errorRequests / totalRequests) * 100;

    // Top endpoints by request count
    const endpointCounts = recentMetrics.reduce(
      (acc, m) => {
        const key = `${m.method} ${m.endpoint}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const topEndpoints = Object.entries(endpointCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([endpoint, count]) => ({ endpoint, count }));

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      slowRequests,
      errorRate: Math.round(errorRate * 100) / 100,
      topEndpoints,
    };
  }

  getSlowEndpoints() {
    const endpointTimes = this.metrics.reduce(
      (acc, m) => {
        if (!acc[m.endpoint]) {
          acc[m.endpoint] = [];
        }
        acc[m.endpoint].push(m.responseTime);
        return acc;
      },
      {} as Record<string, number[]>
    );

    return Object.entries(endpointTimes)
      .map(([endpoint, times]) => ({
        endpoint,
        averageTime: Math.round(times.reduce((sum, time) => sum + time, 0) / times.length),
        maxTime: Math.max(...times),
        requestCount: times.length,
      }))
      .filter((e) => e.averageTime > 500)
      .sort((a, b) => b.averageTime - a.averageTime);
  }
}

export const performanceMonitor = new PerformanceMonitor();
