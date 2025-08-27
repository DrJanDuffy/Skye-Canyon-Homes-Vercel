#!/usr/bin/env node

/**
 * Complete ESBuild replacement for Vite
 * Eliminates EISDIR errors by bypassing Vite entirely
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
      timeout: 60000,
      ...options,
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function validateProject() {
  log('Project structure analysis:');

  const requiredFiles = ['client/index.html', 'client/src/main.tsx', 'server/index.ts'];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      throw new Error(`Required file missing: ${file}`);
    }
    log(`✓ Found ${file}`);
  }
}

async function buildClient() {
  log('Building client with ESBuild...');

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

  log('✓ Client build completed');
}

async function buildCSS() {
  log('Building CSS with Tailwind...');

  executeCommand(
    'npx tailwindcss -i client/src/index-simple.css -o dist/public/assets/main.css --minify'
  );

  log('✓ CSS build completed');
}

async function processHTML() {
  log('Creating HTML (bypassing Vite processing)...');

  const htmlPath = path.join(__dirname, 'client', 'index.html');

  if (!fs.existsSync(htmlPath)) {
    throw new Error('client/index.html not found');
  }

  let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  // Replace dev script with production assets
  htmlContent = htmlContent
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      '<script type="module" src="/assets/main.js"></script>'
    )
    .replace('</head>', '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

  fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), htmlContent);

  log('✓ HTML processing completed');
}

async function copyAssets() {
  log('Copying public assets...');

  const publicPath = path.join(__dirname, 'public');
  if (fs.existsSync(publicPath)) {
    executeCommand('cp -r public/* dist/public/');
    log('✓ Public assets copied');
  } else {
    log('ℹ No public directory found, skipping');
  }
}

async function buildServer() {
  log('Building server with ESBuild...');

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

  log('✓ Server build completed');
}

async function createPackageJson() {
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

  // Create deployment workaround script
  const startScript = `#!/bin/bash
# Deployment workaround for typo in run command
cd "$(dirname "$0")"
node server.js
`;

  fs.writeFileSync(path.join(__dirname, 'dist', 'start.sh'), startScript);
  executeCommand('chmod +x dist/start.sh');

  log('✓ Production package.json created');
  log('✓ Deployment workaround script created');
}

async function verifyBuild() {
  log('Verifying build artifacts...');

  const requiredFiles = [
    'dist/public/index.html',
    'dist/public/assets/main.js',
    'dist/public/assets/main.css',
    'dist/server.js',
    'dist/package.json',
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing build artifact: ${file}`);
    }

    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      throw new Error(`Empty build artifact: ${file}`);
    }

    log(`✓ ${file} (${Math.round(stats.size / 1024)} KB)`);
  }
}

async function main() {
  try {
    log('Starting complete ESBuild process...');
    console.time('Build time');

    // Clean and prepare
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Execute build steps
    await validateProject();
    await buildClient();
    await buildCSS();
    await processHTML();
    await copyAssets();
    await buildServer();
    await createPackageJson();
    await verifyBuild();

    console.timeEnd('Build time');
    log('Build completed successfully!');

    // Show build summary
    const serverSize = Math.round(fs.statSync('dist/server.js').size / 1024);
    const clientSize = Math.round(fs.statSync('dist/public/assets/main.js').size / 1024);
    const cssSize = Math.round(fs.statSync('dist/public/assets/main.css').size / 1024);

    console.log(`\n📊 Build Summary:`);
    console.log(`Server: ${serverSize} KB`);
    console.log(`Client: ${clientSize} KB`);
    console.log(`CSS: ${cssSize} KB`);

    console.log(`\n✅ Ready for deployment!`);
    console.log(`Run: cd dist && node server.js`);
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
