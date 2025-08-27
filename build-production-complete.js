#!/usr/bin/env node

/**
 * Complete ESBuild-based production build system
 * Replaces Vite to resolve EISDIR errors and deployment issues
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
    const result = execSync(command, {
      stdio: 'inherit',
      cwd: __dirname,
      ...options,
    });
    return result;
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    console.error(error.message);
    throw error;
  }
}

async function validateProjectStructure() {
  log('Validating project structure...');

  const requiredFiles = [
    'client/index.html',
    'client/src/main.tsx',
    'server/index.ts',
    'tailwind.config.ts',
    'postcss.config.js',
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      throw new Error(`Required file missing: ${file}`);
    }
  }

  log('✅ Project structure validated');
}

async function buildClient() {
  log('Building React client with ESBuild...');

  // Create output directories
  fs.mkdirSync('dist/public/assets', { recursive: true });

  try {
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
        '.woff': 'dataurl',
        '.woff2': 'dataurl',
        '.ttf': 'dataurl',
        '.eot': 'dataurl',
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
      external: [],
      platform: 'browser',
      splitting: false,
      metafile: true,
      write: true,
    });

    log('✅ Client build completed');
  } catch (error) {
    console.error('Client build failed:', error);
    throw error;
  }
}

async function buildCSS() {
  log('Building CSS with Tailwind...');

  try {
    executeCommand(
      'npx tailwindcss -i client/src/index-simple.css -o dist/public/assets/main.css --minify',
      { stdio: 'inherit' }
    );

    log('✅ CSS build completed');
  } catch (error) {
    console.error('CSS build failed:', error);
    throw error;
  }
}

async function processHTML() {
  log('Processing HTML template...');

  try {
    // Read the original HTML template
    const htmlPath = path.join(__dirname, 'client', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Update script and style references for production build
    htmlContent = htmlContent
      .replace(
        '<script type="module" src="/src/main.tsx"></script>',
        '<script type="module" src="/assets/main.js"></script>'
      )
      .replace('</head>', '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

    // Write the processed HTML
    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), htmlContent);

    log('✅ HTML template processed');
  } catch (error) {
    console.error('HTML processing failed:', error);
    throw error;
  }
}

async function copyPublicAssets() {
  log('Copying public assets...');

  try {
    const publicPath = path.join(__dirname, 'public');
    if (fs.existsSync(publicPath)) {
      executeCommand('cp -r public/* dist/public/');
    }

    // Copy root assets if they exist
    const rootAssets = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'manifest.json'];
    rootAssets.forEach((asset) => {
      const assetPath = path.join(__dirname, asset);
      if (fs.existsSync(assetPath)) {
        fs.copyFileSync(assetPath, path.join(__dirname, 'dist', 'public', asset));
        log(`Copied ${asset}`);
      }
    });

    log('✅ Public assets copied');
  } catch (error) {
    console.error('Asset copying failed:', error);
    throw error;
  }
}

async function buildServer() {
  log('Building Express server...');

  try {
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

    log('✅ Server build completed');
  } catch (error) {
    console.error('Server build failed:', error);
    throw error;
  }
}

async function createProductionPackageJson() {
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
      // Only include runtime dependencies needed for production
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

  log('✅ Production package.json created');
}

async function verifyBuildArtifacts() {
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
      throw new Error(`Build artifact missing: ${file}`);
    }

    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      throw new Error(`Build artifact is empty: ${file}`);
    }
  }

  log('✅ All build artifacts verified');
}

async function testProductionBuild() {
  log('Testing production build...');

  // Basic syntax check on built files
  try {
    const serverContent = fs.readFileSync('dist/server.js', 'utf-8');
    if (!serverContent.includes('express')) {
      throw new Error('Server build appears incomplete - missing express');
    }

    const clientContent = fs.readFileSync('dist/public/assets/main.js', 'utf-8');
    if (clientContent.length < 1000) {
      throw new Error('Client build appears incomplete - file too small');
    }

    log('✅ Production build test passed');
  } catch (error) {
    console.error('Production build test failed:', error);
    throw error;
  }
}

async function main() {
  try {
    log('Starting complete production build process...');
    console.time('Total build time');

    // Clean existing build
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }

    // Create base directories
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Execute build steps in order
    await validateProjectStructure();
    await buildClient();
    await buildCSS();
    await processHTML();
    await copyPublicAssets();
    await buildServer();
    await createProductionPackageJson();
    await verifyBuildArtifacts();
    await testProductionBuild();

    console.timeEnd('Total build time');
    log('🎉 Production build completed successfully!');
    log('');
    log('To start the production server:');
    log('  cd dist && npm start');
    log('');
    log('Build artifacts:');
    log('  - dist/server.js (Express server)');
    log('  - dist/public/ (Static assets)');
    log('  - dist/package.json (Production dependencies)');
  } catch (error) {
    console.error('❌ Production build failed:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
