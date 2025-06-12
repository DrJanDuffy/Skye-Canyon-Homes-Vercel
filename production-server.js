#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🚀 ${message}`);
}

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist', 'public'), {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// API routes - try to load from built server if available
const serverPath = path.join(__dirname, 'dist', 'server.js');
if (fs.existsSync(serverPath)) {
  try {
    const serverModule = await import(serverPath);
    if (serverModule.setupApiRoutes) {
      serverModule.setupApiRoutes(app);
      log('API routes loaded from built server');
    }
  } catch (error) {
    log(`Warning: Could not load API routes from built server: ${error.message}`);
  }
} else {
  // Fallback API routes for basic functionality
  app.use(express.json());
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  app.get('/api/properties', (req, res) => {
    res.json({ 
      message: 'API server not fully built. Please run the complete build process.',
      status: 'fallback'
    });
  });
  
  log('Using fallback API routes');
}

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'public', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>Build Required</title></head>
        <body>
          <h1>Build Required</h1>
          <p>Please run the build process first:</p>
          <pre>node build-esbuild.js</pre>
        </body>
      </html>
    `);
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

app.listen(PORT, '0.0.0.0', () => {
  log(`Production server running on port ${PORT}`);
  log(`Access at: http://localhost:${PORT}`);
  log(`Serving static files from: ${path.join(__dirname, 'dist', 'public')}`);
  
  // Check if build artifacts exist
  const buildFiles = [
    'dist/public/index.html',
    'dist/public/assets/main.js',
    'dist/public/assets/main.css'
  ];
  
  const missingFiles = buildFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));
  
  if (missingFiles.length > 0) {
    log('⚠️  Missing build artifacts:');
    missingFiles.forEach(file => log(`   - ${file}`));
    log('Run: node build-esbuild.js');
  } else {
    log('✅ All build artifacts found');
  }
});