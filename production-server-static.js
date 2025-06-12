#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.set({
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',  
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  next();
});

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Load and setup API routes from server bundle
async function setupApiRoutes() {
  try {
    if (fs.existsSync(path.join(__dirname, 'dist', 'index.js'))) {
      console.log('Loading server bundle...');
      const serverModule = await import('./dist/index.js');
      
      // If the server module exports an Express app, mount it
      if (serverModule.default && typeof serverModule.default === 'function') {
        app.use('/api', serverModule.default);
        console.log('API routes loaded from server bundle');
      } else {
        console.log('Server bundle found but no default export');
      }
    } else {
      console.log('No server bundle found at dist/index.js');
      
      // Basic fallback API endpoints
      app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', message: 'Fallback API active' });
      });
      
      app.get('/api/properties', (req, res) => {
        res.json({ message: 'Server bundle not available', properties: [] });
      });
    }
  } catch (error) {
    console.error('Error loading server bundle:', error.message);
    
    // Fallback API routes
    app.get('/api/*', (req, res) => {
      res.status(503).json({ 
        error: 'API temporarily unavailable',
        message: 'Server bundle could not be loaded'
      });
    });
  }
}

// Setup API routes
await setupApiRoutes();

// Serve static files from dist/public with proper caching
const staticPath = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(staticPath)) {
  console.log('Serving static files from:', staticPath);
  
  app.use(express.static(staticPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));
} else {
  console.warn('Static files directory not found:', staticPath);
}

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'public', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>Application Not Built</title></head>
        <body>
          <h1>Application Not Built</h1>
          <p>Please run the build process first:</p>
          <pre>node build-production-esbuild.js</pre>
        </body>
      </html>
    `);
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
});