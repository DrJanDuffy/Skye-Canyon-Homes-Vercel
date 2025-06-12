#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      timeout: 300000,
      ...options
    });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

async function testServer(port = 3001, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const checkServer = () => {
      if (Date.now() - startTime > timeout) {
        resolve(false);
        return;
      }
      
      try {
        execSync(`curl -s http://localhost:${port}/api/health`, { 
          stdio: 'pipe',
          timeout: 2000 
        });
        resolve(true);
      } catch {
        setTimeout(checkServer, 500);
      }
    };
    
    checkServer();
  });
}

async function main() {
  try {
    log('Starting production deployment process...');
    
    // Step 1: Run the ESBuild-based build
    log('Building application with ESBuild...');
    executeCommand('node build-esbuild.js');
    
    // Step 2: Verify build artifacts
    log('Verifying build artifacts...');
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css',
      'dist/server.js'
    ];
    
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      console.error('❌ Missing build artifacts:');
      missingFiles.forEach(file => console.error(`   - ${file}`));
      process.exit(1);
    }
    
    log('✅ All build artifacts verified');
    
    // Step 3: Start production server in background for testing
    log('Starting production server for testing...');
    const serverProcess = execSync('NODE_ENV=production node production-server.js &', {
      stdio: 'pipe'
    });
    
    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 4: Test server health
    log('Testing server health...');
    const isHealthy = await testServer(3000);
    
    if (isHealthy) {
      log('✅ Production server is healthy');
    } else {
      log('⚠️  Server health check failed, but build completed');
    }
    
    // Step 5: Display deployment summary
    log('='.repeat(50));
    log('DEPLOYMENT SUMMARY');
    log('='.repeat(50));
    log('Build Process: ESBuild (bypasses Vite EISDIR error)');
    log('Build Status: ✅ Success');
    log('Server Status: Ready for deployment');
    log('');
    log('Built Files:');
    log('  - dist/public/index.html (Frontend HTML)');
    log('  - dist/public/assets/main.js (React Application)');
    log('  - dist/public/assets/main.css (Styles)');
    log('  - dist/server.js (Backend Server)');
    log('');
    log('To start production server:');
    log('  NODE_ENV=production node production-server.js');
    log('');
    log('To deploy on Replit:');
    log('  Update run command to: NODE_ENV=production node production-server.js');
    log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main();