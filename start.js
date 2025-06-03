#!/usr/bin/env node

// Simple production server startup script
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Starting Dr. Jan Duffy Real Estate Website...');

// Check if build exists
if (!existsSync('./dist/public/index.html')) {
  console.log('Building application...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

// Start the simplified server
console.log('Starting production server...');
try {
  const { default: app } = await import('./server.js');
  console.log('Server started successfully');
} catch (error) {
  console.error('Server startup failed:', error.message);
  process.exit(1);
}