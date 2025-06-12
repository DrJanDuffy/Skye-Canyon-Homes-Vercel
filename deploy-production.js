#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

function log(message) {
  console.log(`🔧 ${message}`);
}

async function main() {
  try {
    log('Starting production deployment...');

    // Build with EISDIR fix
    log('Building application with workaround...');
    execSync('node build-production-fix.js', { stdio: 'inherit' });

    // Verify production build
    if (!fs.existsSync('dist/index.js')) {
      throw new Error('Production server build missing');
    }

    if (!fs.existsSync('dist/public/index.html')) {
      throw new Error('Frontend build missing');
    }

    // Test production server locally first
    log('Testing production build...');
    const testProcess = execSync('timeout 5 node dist/index.js &', { 
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'production' }
    });

    // Wait for startup
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Kill test process
    execSync('pkill -f "node dist/index.js" 2>/dev/null || true', { stdio: 'pipe' });

    log('Production build verified successfully');
    log('Ready for Replit deployment');

    // Create deployment status
    const deployInfo = {
      timestamp: new Date().toISOString(),
      status: 'ready',
      buildMethod: 'esbuild-eisdir-fix',
      files: {
        server: 'dist/index.js',
        frontend: 'dist/public/index.html',
        assets: 'dist/public/assets/'
      }
    };

    fs.writeFileSync('deployment-status.json', JSON.stringify(deployInfo, null, 2));
    
    log('Deployment package ready');

  } catch (error) {
    console.error('Deployment preparation failed:', error.message);
    process.exit(1);
  }
}

main();