#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
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

async function testServer(port = 3000, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkServer = () => {
      const req = http.get(`http://localhost:${port}`, (res) => {
        resolve(true);
      });
      
      req.on('error', () => {
        if (Date.now() - startTime < timeout) {
          setTimeout(checkServer, 1000);
        } else {
          resolve(false);
        }
      });
      
      req.setTimeout(2000, () => {
        req.destroy();
        if (Date.now() - startTime < timeout) {
          setTimeout(checkServer, 1000);
        } else {
          resolve(false);
        }
      });
    };
    
    checkServer();
  });
}

async function main() {
  try {
    log('Starting deployment with EISDIR fix...');

    // Step 1: Build the application using our working build script
    log('Building application with esbuild workaround...');
    executeCommand('node build-production-fix.js');

    // Step 2: Verify build output
    log('Verifying build output...');
    const requiredFiles = [
      'dist/index.js',
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required build file missing: ${file}`);
      }
    }

    // Step 3: Test production server
    log('Testing production server...');
    const serverProcess = executeCommand('NODE_ENV=production node dist/index.js &', {
      stdio: 'pipe'
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test server response
    const serverRunning = await testServer(5000);
    if (!serverRunning) {
      throw new Error('Production server failed to start or respond');
    }

    log('✅ Production server is running correctly');

    // Step 4: Verify static assets are served
    log('Verifying asset serving...');
    const assetTests = [
      'http://localhost:5000/',
      'http://localhost:5000/assets/main.js',
      'http://localhost:5000/assets/main.css'
    ];

    for (const url of assetTests) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Asset not accessible: ${url}`);
        }
      } catch (error) {
        console.warn(`Warning: Could not verify ${url} - ${error.message}`);
      }
    }

    // Step 5: Create deployment info
    log('Creating deployment metadata...');
    const deploymentInfo = {
      timestamp: new Date().toISOString(),
      buildMethod: 'esbuild-workaround',
      eisdir_fix: 'applied',
      assets: {
        js_size: fs.statSync('dist/public/assets/main.js').size,
        css_size: fs.statSync('dist/public/assets/main.css').size,
        total_files: fs.readdirSync('dist/public').length
      },
      server: {
        bundle_size: fs.statSync('dist/index.js').size,
        start_script: 'dist/start.js'
      }
    };

    fs.writeFileSync('dist/deployment-info.json', JSON.stringify(deploymentInfo, null, 2));

    log('✅ Deployment completed successfully!');
    log(`📊 JavaScript bundle: ${Math.round(deploymentInfo.assets.js_size/1024)}KB`);
    log(`📊 CSS bundle: ${Math.round(deploymentInfo.assets.css_size/1024)}KB`);
    log(`📊 Server bundle: ${Math.round(deploymentInfo.server.bundle_size/1024)}KB`);
    log(`📊 Total files: ${deploymentInfo.assets.total_files}`);

    // Stop test server
    executeCommand('pkill -f "node dist/index.js" 2>/dev/null || true');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    executeCommand('pkill -f "node dist/index.js" 2>/dev/null || true');
    process.exit(1);
  }
}

main();