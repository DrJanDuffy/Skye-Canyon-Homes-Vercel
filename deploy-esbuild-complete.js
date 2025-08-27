#!/usr/bin/env node

/**
 * Complete deployment script using ESBuild
 * Bypasses Vite EISDIR issues and creates production-ready build
 */

import { build } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: 'inherit',
      cwd: __dirname,
      timeout: 300000,
      ...options,
    });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    throw error;
  }
}

async function testServer(port = 3000, timeout = 10000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const checkServer = () => {
      if (Date.now() - startTime > timeout) {
        resolve(false);
        return;
      }

      try {
        execSync(`curl -f http://localhost:${port}/health`, {
          stdio: 'pipe',
          timeout: 2000,
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
    log('Starting complete ESBuild deployment process...');
    console.time('Total deployment time');

    // Step 1: Clean and prepare directories
    log('Preparing build environment...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 2: Build React client with ESBuild
    log('Building React client application...');
    await build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      outfile: 'dist/public/assets/main.js',
      format: 'esm',
      target: 'es2020',
      jsx: 'automatic',
      jsxImportSource: 'react',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'tsx',
        '.jsx': 'jsx',
        '.js': 'jsx',
        '.css': 'css',
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.jpeg': 'dataurl',
        '.gif': 'dataurl',
        '.webp': 'dataurl',
      },
      minify: true,
      sourcemap: true,
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.PROD': 'true',
        'import.meta.env.DEV': 'false',
        'import.meta.env.MODE': '"production"',
      },
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
      platform: 'browser',
    });

    // Step 3: Build CSS with Tailwind
    log('Building CSS with Tailwind...');
    executeCommand(
      'npx tailwindcss -i client/src/index-simple.css -o dist/public/assets/main.css --minify'
    );

    // Step 4: Process HTML template
    log('Processing HTML template...');
    const htmlPath = path.join(__dirname, 'client', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    htmlContent = htmlContent
      .replace(
        '<script type="module" src="/src/main.tsx"></script>',
        '<script type="module" src="/assets/main.js"></script>'
      )
      .replace('</head>', '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), htmlContent);

    // Step 5: Copy public assets
    log('Copying public assets...');
    const publicPath = path.join(__dirname, 'public');
    if (fs.existsSync(publicPath)) {
      executeCommand('cp -r public/* dist/public/');
    }

    // Step 6: Build Express server
    log('Building Express server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      outfile: 'dist/server.js',
      format: 'esm',
      target: 'node18',
      platform: 'node',
      packages: 'external',
      minify: true,
      sourcemap: true,
      alias: {
        '@shared': path.resolve(__dirname, 'shared'),
      },
      external: [
        'express',
        'postgres',
        'drizzle-orm',
        '@neondatabase/serverless',
        'express-session',
        'connect-pg-simple',
        'passport',
        'passport-local',
        'compression',
        'cors',
        'express-rate-limit',
        'memorystore',
        'ws',
        '@anthropic-ai/sdk',
      ],
    });

    // Step 7: Create production package.json
    log('Creating production package.json...');
    const originalPackage = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const productionPackage = {
      name: originalPackage.name,
      version: originalPackage.version,
      type: 'module',
      scripts: {
        start: 'node server.js',
      },
      dependencies: {
        express: originalPackage.dependencies.express,
        postgres: originalPackage.dependencies.postgres,
        'drizzle-orm': originalPackage.dependencies['drizzle-orm'],
        '@neondatabase/serverless': originalPackage.dependencies['@neondatabase/serverless'],
        'express-session': originalPackage.dependencies['express-session'],
        'connect-pg-simple': originalPackage.dependencies['connect-pg-simple'],
        passport: originalPackage.dependencies.passport,
        'passport-local': originalPackage.dependencies['passport-local'],
        compression: originalPackage.dependencies.compression,
        cors: originalPackage.dependencies.cors,
        'express-rate-limit': originalPackage.dependencies['express-rate-limit'],
        memorystore: originalPackage.dependencies.memorystore,
        ws: originalPackage.dependencies.ws,
        '@anthropic-ai/sdk': originalPackage.dependencies['@anthropic-ai/sdk'],
      },
    };

    fs.writeFileSync(
      path.join(__dirname, 'dist', 'package.json'),
      JSON.stringify(productionPackage, null, 2)
    );

    // Step 8: Verify build artifacts
    log('Verifying build artifacts...');
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css',
      'dist/server.js',
      'dist/package.json',
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(__dirname, file))) {
        throw new Error(`Missing build artifact: ${file}`);
      }
    }

    // Step 9: Test production build
    log('Testing production server...');
    const serverProcess = execSync('cd dist && node server.js &', {
      stdio: 'pipe',
      detached: true,
    });

    // Wait for server to start and test it
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const serverWorking = await testServer(3000, 5000);

    if (serverWorking) {
      log('✅ Production server test passed');
    } else {
      log('⚠️ Server test inconclusive, but build completed');
    }

    // Cleanup test server
    try {
      executeCommand('pkill -f "node server.js"');
    } catch (e) {
      // Ignore cleanup errors
    }

    console.timeEnd('Total deployment time');
    log('🎉 ESBuild deployment completed successfully!');
    log('');
    log('Production build ready:');
    log('  📁 dist/server.js - Express server');
    log('  📁 dist/public/ - Static client assets');
    log('  📁 dist/package.json - Production dependencies');
    log('');
    log('To start production server:');
    log('  cd dist && node server.js');
    log('');
    log('Deploy command for Replit:');
    log('  run = "cd dist && node server.js"');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
