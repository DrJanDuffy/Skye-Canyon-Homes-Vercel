#!/usr/bin/env node

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [PROD] ${message}`);
}

async function createProductionServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Security and performance middleware
  app.use(compression());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Serve static files from dist/public
  const staticPath = path.join(__dirname, 'dist', 'public');
  app.use(express.static(staticPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Load and apply middleware from the built server
  let serverRoutes;
  try {
    const serverModule = await import('./dist/server.js');
    if (serverModule.default || serverModule.registerRoutes) {
      log('✅ Server module loaded successfully');
      serverRoutes = serverModule.registerRoutes || serverModule.default;
    }
  } catch (error) {
    log(`⚠️  Could not load server module: ${error.message}`);
  }

  // Setup routes if available
  if (serverRoutes && typeof serverRoutes === 'function') {
    try {
      await serverRoutes(app);
      log('✅ API routes registered successfully');
    } catch (error) {
      log(`⚠️  Error setting up routes: ${error.message}`);
    }
  } else {
    // Minimal fallback API routes
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', server: 'production-fallback' });
    });
    
    app.get('/api/properties', (req, res) => {
      res.json([]);
    });
    
    app.get('/api/market-insights', (req, res) => {
      res.json({ insights: [] });
    });
  }

  // Serve React app for all other routes (SPA fallback)
  app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ 
        error: 'Application not built', 
        message: 'Run build-esbuild.js first' 
      });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    log(`❌ Error: ${err.message}`);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });

  // Start server
  const server = app.listen(PORT, '0.0.0.0', () => {
    log(`🚀 Production server running on port ${PORT}`);
    log(`📁 Serving static files from: ${staticPath}`);
    log(`🌐 Access your app at: http://localhost:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log('🛑 Received SIGTERM, shutting down gracefully');
    server.close(() => {
      log('✅ Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    log('🛑 Received SIGINT, shutting down gracefully');
    server.close(() => {
      log('✅ Process terminated');
      process.exit(0);
    });
  });

  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createProductionServer().catch(error => {
    console.error('❌ Failed to start production server:', error);
    process.exit(1);
  });
}

export { createProductionServer };