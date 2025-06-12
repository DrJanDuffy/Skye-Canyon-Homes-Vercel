#!/usr/bin/env node

/**
 * Comprehensive fix for npm dependency conflicts
 * Bypasses ERESOLVE errors and starts the development server
 */

import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`[FIX] ${new Date().toLocaleTimeString()} - ${message}`);
}

function executeCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('sh', ['-c', command], {
      stdio: 'inherit',
      ...options
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}: ${command}`));
      }
    });
  });
}

async function fixDependencies() {
  log('Fixing dependency conflicts...');
  
  try {
    // Remove problematic files
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
      log('Removed package-lock.json');
    }
    
    if (fs.existsSync('node_modules')) {
      await executeCommand('rm -rf node_modules');
      log('Cleared node_modules');
    }
    
    // Create .npmrc with legacy peer deps
    const npmrcContent = `legacy-peer-deps=true
package-lock=false
fund=false
audit=false
strict-peer-deps=false`;
    
    fs.writeFileSync('.npmrc', npmrcContent);
    log('Created .npmrc with legacy peer deps');
    
    // Install with force and legacy peer deps
    log('Installing dependencies with legacy peer deps...');
    await executeCommand('npm install --legacy-peer-deps --force --no-audit --no-fund');
    
    log('Dependencies installed successfully');
    
  } catch (error) {
    log(`Dependency installation failed: ${error.message}`);
    
    // Fallback: Install critical packages individually
    log('Attempting fallback installation...');
    const criticalPackages = [
      'concurrently@^9.0.0',
      'tsx@^4.0.0',
      'vite@^5.0.0',
      'react@^18.4.0',
      'react-dom@^18.4.0'
    ];
    
    for (const pkg of criticalPackages) {
      try {
        await executeCommand(`npm install ${pkg} --legacy-peer-deps --force`);
        log(`Installed ${pkg}`);
      } catch (err) {
        log(`Failed to install ${pkg}: ${err.message}`);
      }
    }
  }
}

async function startDevelopmentServer() {
  log('Starting development server...');
  
  try {
    // Check if we can use concurrently
    const hasNodeModules = fs.existsSync('node_modules');
    const hasConcurrently = hasNodeModules && fs.existsSync('node_modules/.bin/concurrently');
    
    if (hasConcurrently) {
      log('Using concurrently to start both server and client...');
      await executeCommand('npm run dev');
    } else {
      log('Concurrently not available, starting servers manually...');
      
      // Start server in background
      const serverProcess = spawn('npm', ['run', 'dev:server'], {
        stdio: 'inherit',
        detached: false
      });
      
      // Wait a moment for server to start
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start client
      const clientProcess = spawn('npm', ['run', 'dev:client'], {
        stdio: 'inherit',
        detached: false
      });
      
      // Handle cleanup
      process.on('SIGINT', () => {
        serverProcess.kill();
        clientProcess.kill();
        process.exit();
      });
      
      log('Both servers started manually');
    }
    
  } catch (error) {
    log(`Failed to start development server: ${error.message}`);
    
    // Final fallback: Use direct commands
    log('Using direct server startup...');
    
    try {
      // Check if tsx is available
      const tsxPath = path.join(process.cwd(), 'node_modules', '.bin', 'tsx');
      if (fs.existsSync(tsxPath)) {
        await executeCommand('NODE_ENV=development npx tsx watch server/index.ts');
      } else {
        log('tsx not available, attempting alternative startup...');
        await executeCommand('node server/index.js');
      }
    } catch (fallbackError) {
      log(`All startup methods failed: ${fallbackError.message}`);
      process.exit(1);
    }
  }
}

async function main() {
  log('Starting comprehensive dependency fix and server startup...');
  
  try {
    await fixDependencies();
    await startDevelopmentServer();
  } catch (error) {
    log(`Process failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  log('Process interrupted, cleaning up...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Process terminated, cleaning up...');
  process.exit(0);
});

main();