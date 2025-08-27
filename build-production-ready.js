#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🔧 ${message}`);
}

async function main() {
  try {
    log('Starting EISDIR-free build process...');

    // Clean build directory
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public', { recursive: true });

    // Step 1: Build CSS
    log('Building CSS...');
    execSync('npx tailwindcss -i client/src/index.css -o dist/public/main.css --minify', {
      stdio: 'inherit',
    });

    // Step 2: Build JavaScript with esbuild (bypasses Vite EISDIR issue)
    log('Building JavaScript...');
    execSync(
      [
        'npx esbuild client/src/main.tsx',
        '--bundle',
        '--outfile=dist/public/main.js',
        '--format=esm',
        '--target=es2020',
        '--jsx=automatic',
        '--minify',
      ].join(' '),
      { stdio: 'inherit' }
    );

    // Step 3: Create HTML file (avoiding client/index.html path conflicts)
    log('Creating HTML file...');
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Skye Canyon Homes for Sale | Las Vegas NV Real Estate</title>
    <link rel="stylesheet" href="/main.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Step 4: Copy static assets
    log('Copying static assets...');
    if (fs.existsSync('public')) {
      execSync('cp -r public/* dist/public/ 2>/dev/null || true', { stdio: 'inherit' });
    }

    // Step 5: Build server
    log('Building server...');
    execSync(
      'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
      { stdio: 'inherit' }
    );

    log('✅ Build completed successfully!');
    log('Output: dist/public/ (static files) + dist/index.js (server)');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
