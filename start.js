import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import the main server setup
// Check if we need to use the compiled version
const routesPath = process.env.NODE_ENV === 'production' ? './dist/routes.js' : './server/routes.js';
const middlewarePath = process.env.NODE_ENV === 'production' ? './dist/middleware.js' : './server/middleware.js';

const { registerRoutes } = await import(routesPath);
const { securityHeaders, geoHeaders, seoHeaders, realEstateContext } = await import(middlewarePath);

const app = express();
const port = process.env.PORT || 5000;

// Production middleware for deployment
app.use(securityHeaders);
app.use(geoHeaders);
app.use(seoHeaders);
app.use(realEstateContext);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from dist/public in production
const distPath = path.join(__dirname, 'dist', 'public');
app.use(express.static(distPath, {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  }
}));

// Create HTTP server
const httpServer = createServer(app);

// Register API routes
await registerRoutes(app);

// Serve the main application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Serving static files from: ${distPath}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'production'}`);
});