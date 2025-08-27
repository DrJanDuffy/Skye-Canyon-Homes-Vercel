#!/usr/bin/env node

/**
 * Final production deployment script
 * Resolves EISDIR errors and creates deployment-ready build
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(_message) {}

function executeCommand(command, options = {}) {
  return execSync(command, {
    stdio: 'inherit',
    cwd: __dirname,
    timeout: 60000,
    ...options,
  });
}

async function main() {
  try {
    log('Starting final production deployment build...');

    // Step 1: Clean and prepare
    log('Preparing build environment...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 2: Build React client with ESBuild (bypasses Vite EISDIR issue)
    log('Building React client with ESBuild...');
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
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
      platform: 'browser',
    });

    // Step 3: Build CSS with Tailwind
    log('Building optimized CSS...');
    executeCommand(
      'npx tailwindcss -i client/src/index-simple.css -o dist/public/assets/main.css --minify'
    );

    // Step 4: Process HTML template (avoids Vite HTML processing issues)
    log('Processing HTML template...');
    const htmlPath = path.join(__dirname, 'client', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Update asset references for production
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
      loader: {
        '.ts': 'ts',
        '.js': 'js',
      },
      minify: true,
      sourcemap: true,
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      resolveExtensions: ['.ts', '.js', '.json'],
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
      const stats = fs.statSync(path.join(__dirname, file));
      if (stats.size === 0) {
        throw new Error(`Empty build artifact: ${file}`);
      }
    }
    log('Production build completed successfully!');

    // Display build summary
    const _serverSize = Math.round(fs.statSync('dist/server.js').size / 1024);
    const _clientSize = Math.round(fs.statSync('dist/public/assets/main.js').size / 1024);
    const _cssSize = Math.round(fs.statSync('dist/public/assets/main.css').size / 1024);
  } catch (_error) {
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
