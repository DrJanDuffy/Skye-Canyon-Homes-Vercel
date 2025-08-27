#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;"
  );
  next();
});

// Serve static files from dist/public
const publicPath = path.join(__dirname, 'dist/public');
app.use(
  express.static(publicPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
    etag: true,
    lastModified: true,
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    memory: process.memoryUsage(),
    version: '1.0.0',
  };

  // Check if build files exist
  const buildCheck = {
    indexHtml: fs.existsSync(path.join(publicPath, 'index.html')),
    mainJs: fs.existsSync(path.join(publicPath, 'assets/main.js')),
    mainCss: fs.existsSync(path.join(publicPath, 'assets/main.css')),
  };

  healthCheck.buildFiles = buildCheck;
  res.json(healthCheck);
});

// API endpoints for basic functionality (stub for now)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'API ready',
    timestamp: new Date().toISOString(),
    endpoints: ['/health', '/api/status'],
  });
});

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Application not built',
      message: 'Run the build process first',
      buildPath: publicPath,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${port}`);
  console.log(`Health check: http://0.0.0.0:${port}/health`);
  console.log(`API status: http://0.0.0.0:${port}/api/status`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
