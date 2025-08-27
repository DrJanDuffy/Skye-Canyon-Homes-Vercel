#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    return execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      timeout: 300000,
      ...options,
    });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting manual build process to fix EISDIR error...');

    // Step 1: Clean build directory
    log('Cleaning build directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public', { recursive: true });

    // Step 2: Build React components only (skip HTML processing)
    log('Building React components...');
    process.chdir('client');

    // Use Vite to build just the JS/CSS assets without HTML processing
    executeCommand('npx vite build --config ../vite.config.ts --mode production --minify', {
      env: { ...process.env, VITE_SKIP_HTML: 'true' },
    });

    process.chdir('..');

    // Step 3: Manually process and copy index.html
    log('Processing HTML template manually...');
    let htmlContent = fs.readFileSync('client/index.html', 'utf-8');

    // Find the built assets
    const assetsDir = path.join('dist', 'public', 'assets');
    let jsFiles = [];
    let cssFiles = [];

    if (fs.existsSync(assetsDir)) {
      const assets = fs.readdirSync(assetsDir);
      jsFiles = assets.filter((file) => file.endsWith('.js'));
      cssFiles = assets.filter((file) => file.endsWith('.css'));
    }

    // Replace the development script with built assets
    htmlContent = htmlContent.replace(
      '<script type="module" src="/src/main.tsx"></script>',
      jsFiles.map((file) => `<script type="module" src="/assets/${file}"></script>`).join('\n    ')
    );

    // Add CSS links
    const cssLinks = cssFiles
      .map((file) => `<link rel="stylesheet" href="/assets/${file}">`)
      .join('\n    ');
    htmlContent = htmlContent.replace('</head>', `    ${cssLinks}\n  </head>`);

    // Write the processed HTML
    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Step 4: Build server
    log('Building server...');
    executeCommand(
      'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist'
    );

    // Step 5: Copy public assets
    log('Copying public assets...');
    if (fs.existsSync('public')) {
      const copyDir = (src, dest) => {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      copyDir('public', 'dist/public');
    }

    // Step 6: Verify build
    log('Verifying build...');
    const requiredFiles = ['dist/index.js', 'dist/public/index.html'];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Missing required file: ${file}`);
      }
      log(`✅ Found: ${file}`);
    }

    log('✅ Manual build completed successfully!');
    log(`Build output: ${path.resolve('dist')}`);
  } catch (error) {
    console.error('❌ Manual build failed:', error.message);
    process.exit(1);
  }
}

main();
