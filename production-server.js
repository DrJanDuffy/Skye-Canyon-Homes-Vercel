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

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

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

// Function to check if port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on('error', () => resolve(false));
  });
};

// Start server with port conflict handling
const startServer = async () => {
  try {
    // Check if port is available
    const available = await isPortAvailable(port);
    if (!available) {
      console.log(`Port ${port} is busy, attempting graceful restart...`);
      
      // Try alternative ports if main port is busy
      const alternativePorts = [port + 1, port + 2, port + 3];
      let selectedPort = port;
      
      for (const altPort of alternativePorts) {
        if (await isPortAvailable(altPort)) {
          selectedPort = altPort;
          console.log(`Using alternative port: ${selectedPort}`);
          break;
        }
      }
      
      if (selectedPort === port && !available) {
        console.error('No available ports found, forcing cleanup...');
        process.exit(1);
      }
    }
    
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Production server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Static files: ${staticPath}`);
    });
    
    httpServer.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;