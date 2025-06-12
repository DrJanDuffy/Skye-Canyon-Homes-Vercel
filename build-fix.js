#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔧 Starting build process with fixes...');

try {
  // Clean existing build directory
  console.log('📁 Cleaning dist directory...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });

  // Copy client/index.html to a temporary location to avoid path conflicts
  console.log('📄 Preparing HTML template...');
  const indexContent = fs.readFileSync('client/index.html', 'utf-8');
  fs.writeFileSync('temp-index.html', indexContent);

  // Build with explicit configuration to avoid directory conflicts
  console.log('⚡ Building client assets...');
  execSync('npx vite build --config ../vite.config.ts --mode production --outDir ../dist/public', {
    cwd: 'client',
    stdio: 'inherit',
    timeout: 300000
  });

  // Build server
  console.log('🖥️ Building server...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });

  // Copy public assets if they exist
  console.log('📦 Copying public assets...');
  if (fs.existsSync('public')) {
    const publicFiles = fs.readdirSync('public');
    publicFiles.forEach(file => {
      const srcPath = path.join('public', file);
      const destPath = path.join('dist/public', file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      } else if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    });
  }

  // Clean up temporary file
  if (fs.existsSync('temp-index.html')) {
    fs.unlinkSync('temp-index.html');
  }

  console.log('✅ Production build completed successfully!');
  console.log('📊 Build summary:');
  console.log(`   - Client assets: dist/public/`);
  console.log(`   - Server bundle: dist/index.js`);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Clean up on failure
  if (fs.existsSync('temp-index.html')) {
    fs.unlinkSync('temp-index.html');
  }
  
  process.exit(1);
}