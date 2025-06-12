#!/usr/bin/env node

/**
 * Production Express server with static file serving
 * Designed to work with the ESBuild-based build system
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  console.log(`${timestamp} [production] ${message}`);
}

async function createProductionServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Essential middleware
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

  // Static file serving with proper caching
  const publicPath = path.join(__dirname, 'public');
  app.use('/assets', express.static(path.join(publicPath, 'assets'), {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));

  app.use(express.static(publicPath, {
    maxAge: '1h',
    etag: true,
    lastModified: true,
    index: false // Don't serve index.html automatically
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // API routes placeholder - these would be imported from your actual API routes
  app.get('/api/test', (req, res) => {
    res.json({ message: 'Production API is working' });
  });

  // Catch-all handler for SPA - serve index.html for all non-API routes
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }

    try {
      res.sendFile(path.join(publicPath, 'index.html'));
    } catch (error) {
      log(`Error serving index.html: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });

  // Error handling
  app.use((err, req, res, next) => {
    log(`Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // 404 handler
  app.use((req, res) => {
    log(`404 - ${req.method} ${req.path}`);
    res.status(404).json({ error: 'Not Found' });
  });

  // Start server
  const server = app.listen(PORT, '0.0.0.0', () => {
    log(`Server running on port ${PORT}`);
    log(`Environment: ${process.env.NODE_ENV || 'production'}`);
    log(`Static files served from: ${publicPath}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    log('SIGINT received, shutting down gracefully');
    server.close(() => {
      log('Server closed');
      process.exit(0);
    });
  });

  return server;
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createProductionServer().catch(error => {
    console.error('Failed to start production server:', error);
    process.exit(1);
  });
}

export { createProductionServer };