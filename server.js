#!/usr/bin/env node

process.env.NODE_ENV = 'production';

// Use the compiled server bundle for production deployment
import('./dist/index.js').catch((err) => {
  console.error('Failed to start server:', err);
  console.error('Make sure to run: npm run build');
  process.exit(1);
});