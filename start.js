#!/usr/bin/env node

// Simple production server startup script
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// Check if build exists
if (!existsSync('./dist/public/index.html')) {
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (_error) {
    process.exit(1);
  }
}
try {
  const { default: app } = await import('./server.js');
} catch (_error) {
  process.exit(1);
}
