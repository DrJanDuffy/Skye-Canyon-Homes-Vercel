#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [START] ${message}`);
}

function findAvailablePort(startPort = 3001) {
  for (let port = startPort; port < startPort + 100; port++) {
    try {
      execSync(`lsof -i :${port}`, { stdio: 'ignore' });
    } catch {
      return port; // Port is available
    }
  }
  return startPort; // Fallback
}

function killProcessOnPort(port) {
  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
    log(`Killed process on port ${port}`);
  } catch {
    // No process to kill or permission denied
  }
}

async function main() {
  log('🚀 Starting production deployment...');

  // Find available port
  const PORT = process.env.PORT || findAvailablePort(3001);
  
  // Kill any existing process on the port
  killProcessOnPort(PORT);

  // Check if build exists, if not build first
  if (!fs.existsSync('dist/public/index.html')) {
    log('📦 No build found, running build first...');
    try {
      execSync('node build-esbuild.js', { stdio: 'inherit' });
    } catch (error) {
      log('❌ Build failed, falling back to deployment script');
      process.env.PORT = PORT;
      execSync('node deploy-production.js', { stdio: 'inherit' });
      return;
    }
  }

  // Start production server
  log(`🚀 Starting production server on port ${PORT}...`);
  process.env.PORT = PORT;
  process.env.NODE_ENV = 'production';
  
  try {
    execSync('node production-server.js', { stdio: 'inherit' });
  } catch (error) {
    log('⚠️ Production server failed, falling back to deployment script');
    execSync('node deploy-production.js', { stdio: 'inherit' });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Failed to start production:', error);
    process.exit(1);
  });
}