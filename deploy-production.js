#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🚀 ${message}`);
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

async function testServer(port = 3001, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const checkServer = () => {
      try {
        execSync(`curl -f http://localhost:${port}/health`, { 
          stdio: 'pipe',
          timeout: 2000 
        });
        log(`✅ Server responding on port ${port}`);
        resolve(true);
      } catch (error) {
        if (Date.now() - startTime < timeout) {
          setTimeout(checkServer, 1000);
        } else {
          log(`⚠️ Server not responding after ${timeout}ms`);
          resolve(false);
        }
      }
    };
    checkServer();
  });
}

async function main() {
  try {
    log('Starting production deployment process...');
    
    // Step 1: Run the production build
    log('Building application...');
    executeCommand('node build-production.js');
    
    // Step 2: Verify build output
    log('Verifying build output...');
    if (!fs.existsSync('dist/public/index.html')) {
      throw new Error('Build failed - index.html not found');
    }
    if (!fs.existsSync('dist/index.js')) {
      throw new Error('Build failed - server bundle not found');
    }
    
    // Step 3: Start production server in background
    log('Starting production server...');
    const serverProcess = execSync('node production-server.js > server.log 2>&1 &', {
      stdio: 'pipe'
    });
    
    // Step 4: Wait for server to be ready
    log('Waiting for server to be ready...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 5: Test server health
    const serverHealthy = await testServer();
    
    if (serverHealthy) {
      log('✅ Production deployment successful!');
      log('🌐 Application is running on http://localhost:3001');
      log('📋 Health check: http://localhost:3001/health');
      log('📊 Server logs: tail -f server.log');
      
      // Display build statistics
      const stats = fs.statSync('dist/public/assets/main.js');
      const sizeKB = Math.round(stats.size / 1024);
      log(`📦 Bundle size: ${sizeKB}KB`);
      
    } else {
      throw new Error('Server failed to start properly');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main();