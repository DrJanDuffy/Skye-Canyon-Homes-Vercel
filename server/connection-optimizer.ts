import type { Express } from "express";

export function optimizeServerConfiguration(app: Express) {
  // Configure proper host binding for Replit deployment
  const PORT = process.env.PORT || 5000;
  const HOST = '0.0.0.0'; // Critical for Replit connectivity
  
  // Connection timeout optimization
  app.use((req, res, next) => {
    // Set response timeout to prevent hanging connections
    res.setTimeout(30000, () => {
      console.error(`Request timeout: ${req.method} ${req.path}`);
      if (!res.headersSent) {
        res.status(504).json({ error: 'Gateway Timeout' });
      }
    });
    next();
  });

  // Improved error handling for connection issues
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('Server error:', err);
    
    if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused error - check database connectivity');
      return res.status(503).json({ 
        error: 'Service temporarily unavailable',
        message: 'Database connection issue'
      });
    }
    
    if (err.code === 'ETIMEDOUT') {
      console.error('Connection timeout error');
      return res.status(504).json({
        error: 'Gateway timeout',
        message: 'Request took too long to process'
      });
    }
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
      });
    }
  });

  return { PORT, HOST };
}

export function logServerHealth() {
  const memUsage = process.memoryUsage();
  console.log('Server Health Check:', {
    uptime: Math.round(process.uptime()),
    memory: {
      rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB'
    },
    timestamp: new Date().toISOString()
  });
}