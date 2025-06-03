#!/usr/bin/env node

process.env.NODE_ENV = 'production';

// Import the deployment-optimized server configuration
import('./deployment-sync-fix.js').catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});