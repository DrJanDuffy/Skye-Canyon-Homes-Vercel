#!/usr/bin/env node

import { execSync } from 'child_process';
import { spawn } from 'child_process';
import fs from 'fs';

function log(message) {
  console.log(`🚀 ${message}`);
}

function findAvailablePort(startPort = 3001) {
  for (let port = startPort; port < startPort + 100; port++) {
    try {
      execSync(`lsof -i :${port}`, { stdio: 'pipe' });
    } catch (error) {
      // Port is available if lsof fails
      return port;
    }
  }
  throw new Error('No available ports found');
}

function killProcessOnPort(port) {
  try {
    const result = execSync(`lsof -ti :${port}`, { stdio: 'pipe', encoding: 'utf8' });
    if (result.trim()) {
      execSync(`kill -9 ${result.trim()}`, { stdio: 'pipe' });
      log(`Killed process on port ${port}`);
    }
  } catch (error) {
    // Port is already free
  }
}

async function main() {
  try {
    log('Starting production deployment...');
    
    // Step 1: Build the application
    log('Building application...');
    execSync('node build-production.js', { stdio: 'inherit' });
    
    // Step 2: Verify build files
    if (!fs.existsSync('dist/public/index.html') || !fs.existsSync('dist/index.js')) {
      throw new Error('Build verification failed');
    }
    
    // Step 3: Find available port
    const availablePort = findAvailablePort(3001);
    log(`Using port ${availablePort}`);
    
    // Step 4: Clean up any existing processes
    killProcessOnPort(availablePort);
    
    // Step 5: Start production server
    log('Starting production server...');
    const serverProcess = spawn('node', ['production-server.js'], {
      env: { ...process.env, PORT: availablePort },
      stdio: 'inherit',
      detached: true
    });
    
    serverProcess.unref();
    
    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    log(`✅ Production server started on port ${availablePort}`);
    log(`🌐 Access your application at: http://localhost:${availablePort}`);
    log(`📋 Health check: http://localhost:${availablePort}/health`);
    
  } catch (error) {
    console.error('❌ Production start failed:', error.message);
    process.exit(1);
  }
}

main();