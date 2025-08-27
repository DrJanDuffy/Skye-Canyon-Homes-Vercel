#!/usr/bin/env node

/**
 * Production server starter for Replit deployment
 * Ensures proper port binding and static asset serving
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`[Production] ${message}`);
}

function checkBuildArtifacts() {
  const requiredFiles = [
    'dist/server.js',
    'dist/public/index.html',
    'dist/public/assets/main.js',
    'dist/public/assets/main.css',
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      log(`❌ Missing build artifact: ${file}`);
      log('Run: node build-esbuild.js first');
      process.exit(1);
    }
  }

  log('✅ All build artifacts verified');
}

function startProductionServer() {
  log('Starting production server from dist/server.js...');

  const serverProcess = spawn('node', ['server.js'], {
    cwd: 'dist',
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });

  serverProcess.on('error', (error) => {
    log(`❌ Server error: ${error.message}`);
    process.exit(1);
  });

  serverProcess.on('exit', (code) => {
    log(`Server exited with code: ${code}`);
    process.exit(code || 0);
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    log('Received SIGTERM, shutting down gracefully...');
    serverProcess.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    log('Received SIGINT, shutting down gracefully...');
    serverProcess.kill('SIGINT');
  });
}

function main() {
  log('Replit production deployment starting...');

  // Verify build artifacts exist
  checkBuildArtifacts();

  // Start the production server
  startProductionServer();
}

main();
