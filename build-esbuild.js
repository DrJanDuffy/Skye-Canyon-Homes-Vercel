#!/usr/bin/env node

import { execSync } from 'child_process';
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [BUILD] ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      timeout: 300000,
      ...options
    });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

async function buildClient() {
  log('Building React client with ESBuild...');
  
  try {
    await build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: 'dist/public/assets/app.js',
      format: 'esm',
      target: ['es2020'],
      platform: 'browser',
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.MODE': '"production"',
        'import.meta.env.PROD': 'true',
        'import.meta.env.DEV': 'false'
      },
      loader: {
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.gif': 'file',
        '.svg': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.eot': 'file',
        '.ttf': 'file'
      },
      publicPath: '/assets/',
      assetNames: '[name]-[hash]',
      external: [],
      jsx: 'automatic',
      jsxImportSource: 'react'
    });
    
    log('✅ Client build completed');
  } catch (error) {
    console.error('❌ Client build failed:', error);
    process.exit(1);
  }
}

async function buildCSS() {
  log('Building CSS with Tailwind...');
  
  try {
    // Ensure output directory exists
    fs.mkdirSync('dist/public/assets', { recursive: true });
    
    // Build CSS using Tailwind CLI
    executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/styles.css --minify');
    
    log('✅ CSS build completed');
  } catch (error) {
    console.error('❌ CSS build failed:', error);
    process.exit(1);
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
        '<script type="module" src="/assets/app.js"></script>'
      )
      .replace(
        '</head>',
        '    <link rel="stylesheet" href="/assets/styles.css">\n  </head>'
      );
    
    // Write the processed HTML
    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), htmlContent);
    log('✅ HTML template processed');
  } catch (error) {
    console.error('❌ HTML processing failed:', error);
    process.exit(1);
  }
}

async function copyPublicAssets() {
  log('Copying public assets...');
  
  try {
    const publicPath = path.join(__dirname, 'public');
    if (fs.existsSync(publicPath)) {
      executeCommand(`cp -r public/* dist/public/`);
    }
    
    // Copy root assets
    const rootAssets = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'manifest.json'];
    rootAssets.forEach(asset => {
      const assetPath = path.join(__dirname, asset);
      if (fs.existsSync(assetPath)) {
        fs.copyFileSync(assetPath, path.join(__dirname, 'dist', 'public', asset));
        log(`Copied ${asset}`);
      }
    });
    
    log('✅ Public assets copied');
  } catch (error) {
    console.error('❌ Asset copying failed:', error);
    process.exit(1);
  }
}

async function buildServer() {
  log('Building server with ESBuild...');
  
  try {
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      minify: false, // Keep readable for debugging
      sourcemap: true,
      outfile: 'dist/server.js',
      format: 'esm',
      target: ['node18'],
      platform: 'node',
      packages: 'external',
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      banner: {
        js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);'
      },
      alias: {
        '@shared': './shared'
      },
      resolve: {
        extensions: ['.ts', '.js', '.json']
      }
    });
    
    log('✅ Server build completed');
  } catch (error) {
    console.error('❌ Server build failed:', error);
    process.exit(1);
  }
}

async function main() {
  log('🚀 Starting ESBuild-based production build...');
  
  // Clean existing build directory
  log('🧹 Cleaning dist directory...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });
  fs.mkdirSync('dist/public/assets', { recursive: true });
  
  try {
    // Build all components in parallel where possible
    await Promise.all([
      buildCSS(),
      copyPublicAssets()
    ]);
    
    // Build client after CSS is ready
    await buildClient();
    
    // Process HTML after client build
    await processHTML();
    
    // Build server
    await buildServer();
    
    log('🎉 Build completed successfully!');
    
    // Show build stats
    const clientStats = fs.statSync('dist/public/assets/app.js');
    const cssStats = fs.statSync('dist/public/assets/styles.css');
    const serverStats = fs.statSync('dist/server.js');
    
    log(`📊 Build Stats:`);
    log(`   Client: ${(clientStats.size / 1024).toFixed(1)}KB`);
    log(`   CSS: ${(cssStats.size / 1024).toFixed(1)}KB`);
    log(`   Server: ${(serverStats.size / 1024).toFixed(1)}KB`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}