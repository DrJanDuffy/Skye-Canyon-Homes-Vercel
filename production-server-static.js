#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Performance monitoring middleware
app.use((_req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 1000) {
    }
    if (duration > 5000) {
    }
  });
  next();
});

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist/public
app.use(
  express.static(path.join(__dirname, 'dist/public'), {
    maxAge: '1y',
    etag: true,
    lastModified: true,
  })
);

async function setupApiRoutes() {
  try {
    // Import and setup API routes from the built server
    const serverModule = await import('./dist/index.js');
    if (serverModule.default && typeof serverModule.default === 'function') {
      serverModule.default(app);
    }
  } catch (_error) {
    // Fallback API endpoints
    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok', mode: 'static', timestamp: new Date().toISOString() });
    });

    app.get('/api/status', (_req, res) => {
      res.json({
        status: 'running',
        mode: 'production-static',
        buildTime: new Date().toISOString(),
      });
    });
  }
}

// Setup API routes
await setupApiRoutes();

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  const indexPath = path.join(__dirname, 'dist/public/index.html');
  res.sendFile(indexPath);
});

// Health check endpoint with system info
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    server: 'production-static',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// Error handling
app.use((_err, _req, res, _next) => {
  res.status(500).json({ error: 'Internal server error' });
});

// Resource usage monitoring
const startResourceMonitoring = () => {
  setInterval(() => {
    const usage = process.memoryUsage();
    const _cpuUsage = process.cpuUsage();

    if (usage.heapUsed > 512 * 1024 * 1024) {
    }
  }, 60000); // Check every minute
};

const server = app.listen(PORT, '0.0.0.0', () => {
  // Start resource monitoring
  startResourceMonitoring();
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
