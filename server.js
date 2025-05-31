#!/usr/bin/env node

process.env.NODE_ENV = 'production';

import('./dist/index.js').catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});