#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Create Express app
const app = express();

// Enable compression
app.use(compression());

// Security and performance headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
});

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import and setup the built server API routes
let serverApp;
try {
  // The built server exports the configured Express app
  const serverModule = await import('./dist/index.js');
  console.log('✅ Server API routes loaded successfully');
} catch (error) {
  console.warn('⚠️ Server routes not found, continuing with static file serving only');
  console.warn('Error details:', error.message);
}

// Serve static files with proper caching
app.use(express.static(path.join(__dirname, 'dist/public'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  immutable: true,
  fallthrough: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  res.sendFile(path.join(__dirname, 'dist/public/index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production server running on http://0.0.0.0:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist/public')}`);
  console.log(`🔗 Health check available at: http://0.0.0.0:${PORT}/health`);
});