#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

async function setupApiRoutes() {
  try {
    // Import and setup API routes from the built server
    const serverModule = await import('./dist/index.js');
    if (serverModule.default && typeof serverModule.default === 'function') {
      serverModule.default(app);
    }
  } catch (error) {
    console.warn('API routes not available:', error.message);
    
    // Fallback API endpoints
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', mode: 'static', timestamp: new Date().toISOString() });
    });
    
    app.get('/api/status', (req, res) => {
      res.json({ 
        status: 'running', 
        mode: 'production-static',
        buildTime: new Date().toISOString()
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    server: 'production-static',
    timestamp: new Date().toISOString() 
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production server running on http://0.0.0.0:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist/public')}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'production'}`);
});