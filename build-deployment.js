#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    const result = execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      timeout: 300000,
      ...options,
    });
    return result;
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    console.error(error.message);
    throw error;
  }
}

async function main() {
  try {
    log('Starting deployment build process...');

    // Step 1: Clean existing build directory
    log('Cleaning dist directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });

    // Step 2: Verify client/index.html exists and is readable
    log('Verifying client/index.html...');
    const indexPath = path.join(__dirname, 'client', 'index.html');
    if (!fs.existsSync(indexPath)) {
      throw new Error('client/index.html does not exist');
    }

    const indexStat = fs.statSync(indexPath);
    if (indexStat.isDirectory()) {
      throw new Error('client/index.html is a directory, not a file');
    }

    // Test readability
    try {
      fs.readFileSync(indexPath, 'utf-8');
      log('✅ client/index.html is readable');
    } catch (error) {
      throw new Error(`client/index.html is not readable: ${error.message}`);
    }

    // Step 3: Create a temporary index.html to avoid path conflicts
    log('Preparing build environment...');
    const tempIndexPath = path.join(__dirname, 'temp-index.html');
    const originalIndexContent = fs.readFileSync(indexPath, 'utf-8');
    fs.writeFileSync(tempIndexPath, originalIndexContent);

    // Step 4: Build client using a different approach
    log('Building client assets...');

    // Build TypeScript/React files first
    executeCommand('npx vite build --mode production', {
      cwd: path.join(__dirname, 'client'),
    });

    // Clean up temporary file
    if (fs.existsSync(tempIndexPath)) {
      fs.unlinkSync(tempIndexPath);
    }

    // Step 5: Verify build output
    log('Verifying build output...');
    const distPublicPath = path.join(__dirname, 'dist', 'public');
    if (!fs.existsSync(distPublicPath)) {
      throw new Error('Build output directory dist/public does not exist');
    }

    const indexHtmlPath = path.join(distPublicPath, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
      throw new Error('Built index.html not found in dist/public');
    }

    // Step 6: Build server
    log('Building server...');
    executeCommand(
      'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist'
    );

    // Step 7: Copy additional assets if they exist
    log('Copying additional assets...');
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      const copyAssets = (src, dest) => {
        const items = fs.readdirSync(src);
        for (const item of items) {
          const srcPath = path.join(src, item);
          const destPath = path.join(dest, item);
          if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyAssets(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      copyAssets(publicDir, distPublicPath);
    }

    // Step 7: Verify final build
    log('Verifying final build structure...');
    const requiredFiles = ['dist/index.js', 'dist/public/index.html'];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required build file missing: ${file}`);
      }
    }

    log('✅ Build completed successfully!');
    log(`📁 Build output: ${path.resolve('dist')}`);
    log(`🌐 Static files: ${path.resolve('dist/public')}`);
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
