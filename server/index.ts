import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import {
  geoHeaders,
  rateLimiter,
  realEstateContext,
  schemaInjection,
  securityHeaders,
  seoHeaders,
} from './middleware';
import { registerRoutes } from './routes';
import { log, serveStatic, setupVite } from './vite';

const app = express();

// Apply security and performance middleware
app.use(securityHeaders);
app.use(geoHeaders);
app.use(seoHeaders);
app.use(realEstateContext);
app.use(schemaInjection);

// Apply rate limiting to API routes
app.use('/api', rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = (bodyJson, ...args) => {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = `${logLine.slice(0, 79)}…`;
      }

      log(logLine);
    }
  });

  next();
});

// Add static file serving for public directory (for images)
app.use(express.static(path.join(process.cwd(), 'public')));

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Configure for all Replit domain access including preview
  const port = parseInt(process.env.PORT || '5000', 10);

  server.listen(
    {
      port,
      host: '0.0.0.0',
    },
    () => {
      log(`serving on port ${port} and host 0.0.0.0`);
      log(`Preview access: Available on all Replit domains`);
      log(`Production access: https://skyecanyonhomes.replit.app/`);
    }
  );
})();
