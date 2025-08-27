import type { Express } from 'express';

export function optimizeServerConfiguration(app: Express) {
  // Configure proper host binding for Replit deployment
  const PORT = process.env.PORT || 5000;
  const HOST = '0.0.0.0'; // Critical for Replit connectivity

  // Connection timeout optimization
  app.use((_req, res, next) => {
    // Set response timeout to prevent hanging connections
    res.setTimeout(30000, () => {
      if (!res.headersSent) {
        res.status(504).json({ error: 'Gateway Timeout' });
      }
    });
    next();
  });

  // Improved error handling for connection issues
  app.use((err: any, _req: any, res: any, _next: any) => {
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'Database connection issue',
      });
    }

    if (err.code === 'ETIMEDOUT') {
      return res.status(504).json({
        error: 'Gateway timeout',
        message: 'Request took too long to process',
      });
    }

    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
      });
    }
  });

  return { PORT, HOST };
}

export function logServerHealth() {
  const _memUsage = process.memoryUsage();
}
