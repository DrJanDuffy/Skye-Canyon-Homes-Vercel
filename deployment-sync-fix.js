#!/usr/bin/env node

import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production deployment server that matches development preview
const app = express();
const port = process.env.PORT || 5000;

// Import server components - handle both dev and production paths
let registerRoutes, securityHeaders, geoHeaders, seoHeaders, realEstateContext;

try {
  // Import from TypeScript source files
  const routes = await import('./server/routes.ts');
  const middleware = await import('./server/middleware.ts');
  registerRoutes = routes.registerRoutes;
  ({ securityHeaders, geoHeaders, seoHeaders, realEstateContext } = middleware);
} catch (_error) {
  process.exit(1);
}

// Apply middleware in the same order as development
app.use(securityHeaders);
app.use(geoHeaders);
app.use(seoHeaders);
app.use(realEstateContext);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files with proper configuration
const publicPath = path.join(__dirname, 'public');
const distPublicPath = path.join(__dirname, 'dist', 'public');

// Use dist/public if it exists (production), otherwise use public (development)
const staticPath = fs.existsSync(distPublicPath) ? distPublicPath : publicPath;

app.use(
  express.static(staticPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }
    },
  })
);

// Create HTTP server
const httpServer = createServer(app);

// Register API routes
await registerRoutes(app);

// SPA fallback - serve index.html for all unmatched routes
app.get('*', (_req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not built. Run: npm run build');
  }
});

// Enhanced error handling
app.use((err, _req, res, _next) => {
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start server
httpServer.listen(port, '0.0.0.0', () => {});

export default app;
