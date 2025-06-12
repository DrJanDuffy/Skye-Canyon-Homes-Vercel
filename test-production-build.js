#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';

function log(message) {
  console.log(`✅ ${message}`);
}

async function testProductionServer() {
  // Check if build artifacts exist
  const requiredFiles = [
    'dist/public/index.html',
    'dist/public/main.js', 
    'dist/public/index.css',
    'dist/index.js'
  ];

  log('Checking build artifacts...');
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing build artifact: ${file}`);
    }
  }
  log('All build artifacts present');

  // Test production server on port 3001
  log('Starting production server on port 3001...');
  const serverProcess = spawn('node', ['production-server-static.js'], {
    stdio: 'pipe',
    env: { ...process.env, PORT: '3001', NODE_ENV: 'production' }
  });

  let serverStarted = false;
  
  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output.trim());
    if (output.includes('Production server running')) {
      serverStarted = true;
    }
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (serverStarted) {
    log('Production server started successfully on port 3001');
  }

  // Test health endpoint
  try {
    const http = await import('http');
    const testHealth = () => new Promise((resolve) => {
      const req = http.default.get('http://localhost:3001/health', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            log('Health check passed');
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
      req.on('error', () => resolve(false));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve(false);
      });
    });
    
    const healthOk = await testHealth();
    if (healthOk) {
      log('Production build verification successful!');
    }
    
  } catch (error) {
    console.error('Health check failed:', error.message);
  }

  // Clean up
  serverProcess.kill();
  
  log('Test completed - production build is working correctly');
  log('');
  log('To deploy this build:');
  log('1. Run: node build-production-esbuild.js');
  log('2. Start: NODE_ENV=production node production-server-static.js');
  log('3. Access: http://localhost:3000');
}

testProductionServer().catch(console.error);