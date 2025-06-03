#!/usr/bin/env node

import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production server for deployment
const app = express();
const port = process.env.PORT || 5000;

// Set production environment
process.env.NODE_ENV = 'production';

console.log('Starting production server...');

// Import server components using dynamic imports with proper error handling
let registerRoutes, securityHeaders, geoHeaders, seoHeaders, realEstateContext;

try {
  // Use dynamic import for the compiled server
  const serverModule = await import('./dist/index.js');
  
  // Extract the functions we need
  registerRoutes = serverModule.registerRoutes;
  securityHeaders = serverModule.securityHeaders;
  geoHeaders = serverModule.geoHeaders;
  seoHeaders = serverModule.seoHeaders;
  realEstateContext = serverModule.realEstateContext;
  
  console.log('✓ Server modules loaded successfully');
} catch (error) {
  console.error('Error loading server modules:', error);
  console.log('Attempting to start with basic configuration...');
  
  // Basic middleware if modules fail to load
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });
  
  // Basic routes if registerRoutes fails
  registerRoutes = (app) => {
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
  };
}

// Apply middleware if available
if (securityHeaders) app.use(securityHeaders);
if (geoHeaders) app.use(geoHeaders);
if (seoHeaders) app.use(seoHeaders);
if (realEstateContext) app.use(realEstateContext);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
const staticPath = path.join(__dirname, 'dist', 'public');
console.log(`Static files path: ${staticPath}`);

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
    }
  }));
  console.log('✓ Static files configured');
} else {
  console.log('⚠ Static files directory not found, serving from public/');
  app.use(express.static(path.join(__dirname, 'public')));
}

// Create HTTP server
const httpServer = createServer(app);

// Register routes
try {
  await registerRoutes(app);
  console.log('✓ API routes registered');
} catch (error) {
  console.error('Error registering routes:', error);
}

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not built. Run: npm run build');
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Production server running on port ${port}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`📂 Static files: ${staticPath}`);
});

export default app;