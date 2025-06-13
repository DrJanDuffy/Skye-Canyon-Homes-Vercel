#!/usr/bin/env node

/**
 * Direct development server startup without concurrently dependency
 * Starts both server and client processes manually
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function log(message) {
  console.log(`[DEV] ${new Date().toLocaleTimeString()} - ${message}`);
}

async function startServers() {
  log('Starting development servers...');
  
  // Start the backend server
  const serverProcess = spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
    stdio: ['inherit', 'inherit', 'inherit'],
    env: { ...process.env, NODE_ENV: 'development' },
    cwd: __dirname
  });
  
  // Give server time to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Start the frontend client
  const clientProcess = spawn('npx', ['vite', '--host'], {
    stdio: ['inherit', 'inherit', 'inherit'],
    cwd: __dirname
  });
  
  log('Both servers started successfully');
  log('Backend: http://localhost:5000');
  log('Frontend: http://localhost:5173');
  
  // Handle graceful shutdown
  const cleanup = () => {
    log('Shutting down servers...');
    serverProcess.kill('SIGTERM');
    clientProcess.kill('SIGTERM');
    process.exit(0);
  };
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  // Keep the process alive
  serverProcess.on('close', (code) => {
    log(`Server process exited with code ${code}`);
    clientProcess.kill('SIGTERM');
    process.exit(code);
  });
  
  clientProcess.on('close', (code) => {
    log(`Client process exited with code ${code}`);
    serverProcess.kill('SIGTERM');
    process.exit(code);
  });
}

startServers().catch((error) => {
  console.error('Failed to start development servers:', error);
  process.exit(1);
});