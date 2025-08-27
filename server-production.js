#!/usr/bin/env node

import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Security headers for production
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist/public
app.use(
  express.static(path.join(__dirname, 'dist/public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
    etag: true,
    lastModified: true,
  })
);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Catch-all handler for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

const server = createServer(app);

server.listen(port, '0.0.0.0', () => {});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

export default app;
