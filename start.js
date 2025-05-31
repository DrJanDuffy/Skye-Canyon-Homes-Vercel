#!/usr/bin/env node

// Set production environment
process.env.NODE_ENV = 'production';

// Start the production server
import('./dist/index.js').catch(err => {
  console.error('Failed to start production server:', err);
  process.exit(1);
});