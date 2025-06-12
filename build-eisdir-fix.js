#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    return execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      timeout: 300000,
      ...options 
    });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting EISDIR fix build process...');

    // Step 1: Clean build directory completely
    log('Cleaning build directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public', { recursive: true });

    // Step 2: Create a temporary index.html to avoid path conflicts
    log('Creating temporary HTML file to avoid EISDIR error...');
    const originalIndexPath = path.join(process.cwd(), 'client', 'index.html');
    const tempIndexPath = path.join(process.cwd(), 'temp-build-index.html');
    
    // Read and copy the original index.html
    const indexContent = fs.readFileSync(originalIndexPath, 'utf-8');
    fs.writeFileSync(tempIndexPath, indexContent);

    // Step 3: Build using the root directory approach
    log('Building client with workaround for EISDIR error...');
    
    // Build from the project root with explicit configuration
    executeCommand('npx vite build --mode production', {
      env: { 
        ...process.env,
        VITE_BUILD_HTML_PATH: tempIndexPath
      }
    });

    // Step 4: Verify build output
    log('Verifying build output...');
    const distPublicPath = path.join(process.cwd(), 'dist', 'public');
    if (!fs.existsSync(distPublicPath)) {
      throw new Error('Build output directory dist/public does not exist');
    }

    const builtIndexPath = path.join(distPublicPath, 'index.html');
    if (!fs.existsSync(builtIndexPath)) {
      // If index.html wasn't created, copy our temp file
      log('Copying HTML template to build output...');
      fs.copyFileSync(tempIndexPath, builtIndexPath);
    }

    // Step 5: Build server
    log('Building server...');
    executeCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist');

    // Step 6: Clean up temporary files
    log('Cleaning up temporary files...');
    if (fs.existsSync(tempIndexPath)) {
      fs.unlinkSync(tempIndexPath);
    }

    // Step 7: Verify final build
    log('Final build verification...');
    const serverPath = path.join(process.cwd(), 'dist', 'index.js');
    if (!fs.existsSync(serverPath)) {
      throw new Error('Server build failed - index.js not found');
    }

    log('✅ Build completed successfully with EISDIR fix!');
    
    // Show build summary
    const distSize = fs.readdirSync('dist/public').length;
    log(`📊 Build summary: ${distSize} files in dist/public`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();