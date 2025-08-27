#!/usr/bin/env node

import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(_message) {}

function executeCommand(command, options = {}) {
  execSync(command, { stdio: 'inherit', ...options });
}

async function testServer(port = 3000, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const checkServer = () => {
      if (Date.now() - startTime > timeout) {
        resolve(false);
        return;
      }

      import('node:http').then(({ default: http }) => {
        const req = http.get(`http://localhost:${port}/health`, (res) => {
          if (res.statusCode === 200) {
            resolve(true);
          } else {
            setTimeout(checkServer, 500);
          }
        });

        req.on('error', () => {
          setTimeout(checkServer, 500);
        });

        req.setTimeout(1000, () => {
          req.destroy();
          setTimeout(checkServer, 500);
        });
      });
    };

    checkServer();
  });
}

async function main() {
  log('Starting complete production deployment...');

  try {
    // Step 1: Build the application using ESBuild
    log('Building application with ESBuild...');
    executeCommand('node build-production-esbuild.js');

    // Step 2: Verify build artifacts exist
    log('Verifying build artifacts...');
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/main.js',
      'dist/public/index.css',
      'dist/index.js',
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required build artifact missing: ${file}`);
      }
    }

    log('All build artifacts verified successfully');

    // Step 3: Test production server
    log('Starting production server for testing...');

    const serverProcess = spawn('node', ['production-server-static.js'], {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'production' },
    });

    let _serverOutput = '';
    serverProcess.stdout.on('data', (data) => {
      _serverOutput += data.toString();
    });

    serverProcess.stderr.on('data', (_data) => {});

    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Test server health
    log('Testing server health...');
    const isHealthy = await testServer(3000, 10000);

    if (isHealthy) {
      log('Production server is healthy and responding');

      // Test static file serving
      try {
        const http = await import('node:http');
        const testStatic = () =>
          new Promise((resolve) => {
            const req = http.default.get('http://localhost:3000/', (res) => {
              if (res.statusCode === 200) {
                log('Static file serving is working');
                resolve(true);
              } else {
                resolve(false);
              }
            });
            req.on('error', () => resolve(false));
            req.setTimeout(5000, () => {
              req.destroy();
              resolve(false);
            });
          });

        await testStatic();
      } catch (_error) {
        log('Static file test failed, but server is running');
      }
    } else {
      throw new Error('Production server health check failed');
    }

    // Kill test server
    serverProcess.kill();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    log('Deployment verification completed successfully!');
    log('');
    log('Deployment Summary:');
    log('✅ ESBuild compilation completed');
    log('✅ Build artifacts generated');
    log('✅ Production server tested');
    log('✅ Health endpoints responding');
    log('');
    log('To start the production server:');
    log('NODE_ENV=production node production-server-static.js');
    log('');
    log('Available endpoints:');
    log('- http://localhost:3000/ (Main application)');
    log('- http://localhost:3000/health (Health check)');
    log('- http://localhost:3000/api/* (API routes)');
  } catch (_error) {
    log('Deployment failed:');
    process.exit(1);
  }
}

main();
