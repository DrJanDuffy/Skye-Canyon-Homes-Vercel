#!/usr/bin/env node

process.env.NODE_ENV = 'production';

// Use the production server that handles module resolution correctly
import('./production-server.js').catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});