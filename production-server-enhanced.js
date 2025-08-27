#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'production';

// Configuration
const config = {
  distDir: path.join(__dirname, 'dist'),
  publicDir: path.join(__dirname, 'dist', 'public'),
  staticDir: path.join(__dirname, 'public'),
  clientDir: path.join(__dirname, 'client'),
  isProduction: NODE_ENV === 'production',
};

function log(_message) {
  const _timestamp = new Date().toLocaleTimeString();
}

// Enhanced security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CSP for production
  if (config.isProduction) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://em.realscout.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data:;"
    );
  }
  next();
});

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
    buildArtifacts: {
      distExists: fs.existsSync(config.distDir),
      publicExists: fs.existsSync(config.publicDir),
      indexExists: fs.existsSync(path.join(config.publicDir, 'index.html')),
      assetsExist: fs.existsSync(path.join(config.publicDir, 'assets')),
    },
  });
});

// Load API routes from built server if available
const loadApiRoutes = async () => {
  const serverPath = path.join(__dirname, 'dist', 'server.js');

  if (fs.existsSync(serverPath)) {
    try {
      // Import the built server module
      const serverModule = await import(`file://${serverPath}`);

      if (serverModule.setupApiRoutes) {
        serverModule.setupApiRoutes(app);
        log('✅ API routes loaded from built server');
        return true;
      } else if (serverModule.default) {
        // Handle default export
        if (typeof serverModule.default === 'function') {
          serverModule.default(app);
          log('✅ API routes loaded from default export');
          return true;
        }
      }
    } catch (error) {
      log(`⚠️  Could not load API routes: ${error.message}`);
    }
  }

  // Fallback API routes
  app.get('/api/status', (_req, res) => {
    res.json({
      message: 'Production server running',
      version: '1.0.0',
      environment: NODE_ENV,
      buildStatus: fs.existsSync(serverPath) ? 'available' : 'fallback',
    });
  });

  app.get('/api/properties', (_req, res) => {
    res.json({
      message: 'API server running in fallback mode. Build server.js for full functionality.',
      status: 'fallback',
      data: [],
    });
  });

  log('⚠️  Using fallback API routes');
  return false;
};

// Static file serving with enhanced fallback strategy
const serveStaticFiles = () => {
  const staticOptions = {
    maxAge: config.isProduction ? '1y' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)) {
        res.setHeader('Cache-Control', `public, max-age=${config.isProduction ? 31536000 : 0}`);
      }
    },
  };

  // Priority order for serving static files
  const staticDirs = [
    { path: config.publicDir, name: 'dist/public (built assets)' },
    { path: config.staticDir, name: 'public (static assets)' },
    { path: config.clientDir, name: 'client (development)' },
  ];

  staticDirs.forEach(({ path: dirPath, name }) => {
    if (fs.existsSync(dirPath)) {
      app.use(express.static(dirPath, staticOptions));
      log(`📁 Serving static files from: ${name}`);
    }
  });
};

// SPA fallback - serve index.html for client-side routing
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }

  // Skip files with extensions
  if (path.extname(req.path)) {
    return next();
  }

  // Try to find and serve index.html
  const indexPaths = [
    path.join(config.publicDir, 'index.html'),
    path.join(config.staticDir, 'index.html'),
    path.join(config.clientDir, 'index.html'),
    path.join(__dirname, 'index.html'),
  ];

  for (const indexPath of indexPaths) {
    if (fs.existsSync(indexPath)) {
      const stat = fs.statSync(indexPath);
      if (stat.isFile()) {
        return res.sendFile(indexPath);
      }
    }
  }

  // If no index.html found, serve helpful error page
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Skye Canyon Homes - Build Required</title>
        <style>
            body { font-family: system-ui, sans-serif; margin: 40px; line-height: 1.6; background: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .status { padding: 20px; border-radius: 8px; margin: 20px 0; }
            .info { background: #f0f9ff; border-left: 4px solid #3b82f6; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
            code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            pre { background: #1f2937; color: #f9fafb; padding: 16px; border-radius: 6px; overflow-x: auto; }
            a { color: #3b82f6; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏠 Skye Canyon Homes</h1>
            <div class="status info">
                <h3>✅ Server is running</h3>
                <p><strong>Environment:</strong> ${NODE_ENV}</p>
                <p><strong>Port:</strong> ${PORT}</p>
                <p><strong>Health Check:</strong> <a href="/health">/health</a></p>
            </div>
            <div class="status warning">
                <h3>⚠️ Build Required</h3>
                <p>The application build is not found. Please run the build process:</p>
                <pre>node build-esbuild.js</pre>
                <p>Then restart the server:</p>
                <pre>NODE_ENV=production node production-server-enhanced.js</pre>
            </div>
            <div class="status info">
                <h4>📁 Looking for files in:</h4>
                <ul>
                    ${indexPaths.map((p) => `<li><code>${p}</code> ${fs.existsSync(p) ? '✅' : '❌'}</li>`).join('')}
                </ul>
            </div>
        </div>
    </body>
    </html>
  `);
});

// API 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path,
    method: req.method,
    available: ['/api/status', '/api/properties', '/health'],
  });
});

// Global error handler
app.use((err, req, res, _next) => {
  if (req.path.startsWith('/api/')) {
    res.status(500).json({
      error: config.isProduction ? 'Internal server error' : err.message,
      ...(config.isProduction ? {} : { stack: err.stack }),
    });
  } else {
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Server Error</title></head>
      <body style="font-family: system-ui, sans-serif; margin: 40px;">
        <h1>🚨 Server Error</h1>
        <p>${config.isProduction ? 'Something went wrong.' : err.message}</p>
        <a href="/">← Back to home</a>
      </body>
      </html>
    `);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Initialize server
const startServer = async () => {
  // Setup static file serving
  serveStaticFiles();

  // Load API routes
  await loadApiRoutes();

  // Start server
  const server = app.listen(PORT, HOST, () => {
    log(`Server running on http://${HOST}:${PORT}`);
    log(`Environment: ${NODE_ENV}`);
    log(`Build artifacts check:`);

    // Check build artifacts
    const artifacts = [
      { path: path.join(config.publicDir, 'index.html'), name: 'HTML template' },
      { path: path.join(config.publicDir, 'assets', 'app.js'), name: 'React bundle' },
      { path: path.join(config.publicDir, 'assets', 'styles.css'), name: 'CSS bundle' },
      { path: path.join(config.distDir, 'server.js'), name: 'Server bundle' },
    ];

    let missingCount = 0;
    artifacts.forEach(({ path: filePath, name }) => {
      const exists = fs.existsSync(filePath);
      log(`  ${exists ? '✅' : '❌'} ${name}`);
      if (!exists) {
        missingCount++;
      }
    });

    if (missingCount === 0) {
      log('🎉 All build artifacts found - ready for production!');
    } else {
      log(`⚠️  ${missingCount} build artifacts missing - run: node build-esbuild.js`);
    }
  });

  // Handle server errors
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
    } else {
    }
    process.exit(1);
  });
};

// Start the server
startServer().catch((_err) => {
  process.exit(1);
});

export default app;
