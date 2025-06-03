import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting optimized production build...');

try {
  // Clean existing build
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Create dist directory
  fs.mkdirSync('dist', { recursive: true });
  
  // Build client with optimizations
  console.log('Building client assets...');
  execSync('vite build --mode production', { 
    stdio: 'inherit',
    timeout: 300000 // 5 minutes timeout
  });
  
  // Build server
  console.log('Building server...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });
  
  // Copy public assets
  console.log('Copying public assets...');
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/public/', { stdio: 'inherit' });
  }
  
  console.log('Production build completed successfully!');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}