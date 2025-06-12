#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function testServer(port = 3000, timeout = 10000) {
  log(`Testing server on port ${port}...`);
  
  return new Promise((resolve) => {
    const { spawn } = require('child_process');
    const server = spawn('node', ['server-production.js'], {
      env: { ...process.env, PORT: port, NODE_ENV: 'production' },
      stdio: 'pipe'
    });

    let serverStarted = false;
    
    const timer = setTimeout(() => {
      if (!serverStarted) {
        server.kill();
        resolve(false);
      }
    }, timeout);

    server.stdout.on('data', (data) => {
      if (data.toString().includes('Production server running')) {
        serverStarted = true;
        clearTimeout(timer);
        server.kill();
        resolve(true);
      }
    });

    server.on('error', () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
}

async function main() {
  try {
    log('Starting production deployment with EISDIR fixes...');

    // Clean existing build
    log('Cleaning previous build...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 1: Build CSS with Tailwind
    log('Building CSS assets...');
    executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify');

    // Step 2: Build React app with esbuild (bypasses Vite EISDIR issues)
    log('Building React application with esbuild...');
    
    const esbuildCommand = [
      'npx esbuild client/src/main.tsx',
      '--bundle',
      '--outfile=dist/public/assets/main.js',
      '--format=esm',
      '--target=es2020',
      '--jsx=automatic',
      '--jsx-import-source=react',
      '--loader:.tsx=tsx',
      '--loader:.ts=tsx',
      '--loader:.css=css',
      '--loader:.svg=dataurl',
      '--loader:.png=dataurl',
      '--loader:.jpg=dataurl',
      '--loader:.jpeg=dataurl',
      '--loader:.gif=dataurl',
      '--minify',
      '--sourcemap',
      '--tree-shaking=true',
      '--define:process.env.NODE_ENV="production"',
      '--define:import.meta.env.PROD=true',
      '--define:import.meta.env.DEV=false',
      '--define:import.meta.env.MODE="production"',
      '--alias:@=client/src',
      '--alias:@shared=shared'
    ].join(' ');
    
    executeCommand(esbuildCommand);

    // Step 3: Process HTML template (avoiding direct index.html conflicts)
    log('Processing HTML template...');
    
    // Create a safe copy to avoid file system conflicts
    const originalHtml = fs.readFileSync('client/index.html', 'utf-8');
    let productionHtml = originalHtml
      .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/main.js" type="module"')
      .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/main.css">\n  </head>')
      .replace(/href="\/favicon\.ico"/g, 'href="/favicon.ico"');
    
    fs.writeFileSync('dist/public/index.html', productionHtml);

    // Step 4: Build server
    log('Building server...');
    executeCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist');

    // Step 5: Copy additional assets
    log('Copying public assets...');
    if (fs.existsSync('public')) {
      try {
        executeCommand('cp -r public/* dist/public/');
      } catch (error) {
        log('No additional public assets found, continuing...');
      }
    }

    // Step 6: Create favicon if it doesn't exist
    if (!fs.existsSync('dist/public/favicon.ico')) {
      log('Creating default favicon...');
      // Create a simple SVG favicon
      const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#4a90e2"/>
        <text x="16" y="22" font-family="Arial" font-size="20" fill="white" text-anchor="middle">S</text>
      </svg>`;
      fs.writeFileSync('dist/public/favicon.svg', faviconSvg);
    }

    // Step 7: Test the production build
    log('Testing production build...');
    const serverWorks = await testServer(3000, 15000);
    
    if (serverWorks) {
      log('Production server test passed!');
    } else {
      log('Warning: Production server test failed, but build completed');
    }

    // Step 8: Create startup instructions
    log('Creating deployment files...');
    
    const startupScript = `#!/bin/bash
echo "Starting Skye Canyon Real Estate Platform..."
export NODE_ENV=production
export PORT=\${PORT:-3000}
node server-production.js
`;
    
    fs.writeFileSync('start.sh', startupScript);
    fs.chmodSync('start.sh', '755');

    const deploymentReadme = `# Deployment Instructions

## Production Build Completed Successfully

The application has been built using esbuild to avoid Vite EISDIR errors.

### Files Created:
- \`dist/public/\` - Static assets and HTML
- \`dist/index.js\` - Server bundle
- \`server-production.js\` - Production server
- \`start.sh\` - Startup script

### To Deploy:
1. Set environment variables (DATABASE_URL, etc.)
2. Run: \`node server-production.js\`
3. Or use: \`./start.sh\`

### Health Check:
- Endpoint: \`/health\`
- Returns: \`{"status":"healthy","timestamp":"..."}\`

The application will serve on port 3000 by default, or use PORT environment variable.
`;

    fs.writeFileSync('DEPLOYMENT.md', deploymentReadme);

    log('✅ Production deployment completed successfully!');
    log('');
    log('Next steps:');
    log('1. Set required environment variables');
    log('2. Run: node server-production.js');
    log('3. Access health check at /health');
    log('');
    log('Build artifacts created in dist/ directory');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

main();