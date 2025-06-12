#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🛠️ ${message}`);
}

async function main() {
  try {
    log('Starting bypass build to fix EISDIR error...');

    // Clean and create directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 1: Create a fresh copy of index.html to avoid file system issues
    log('Creating fresh index.html copy...');
    const originalContent = fs.readFileSync('client/index.html', 'utf-8');
    const freshIndexPath = path.join(__dirname, 'fresh-index.html');
    fs.writeFileSync(freshIndexPath, originalContent);

    // Step 2: Build TypeScript/React using esbuild instead of Vite
    log('Building React app with esbuild...');
    
    // Build the main TypeScript entry point
    execSync(`npx esbuild client/src/main.tsx --bundle --outfile=dist/public/assets/main.js --format=esm --target=es2020 --jsx=automatic --jsx-import-source=react --loader:.tsx=tsx --loader:.ts=tsx --loader:.css=css --external:react --external:react-dom`, {
      stdio: 'inherit'
    });

    // Build CSS using Tailwind
    log('Building CSS...');
    execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify', {
      stdio: 'inherit'
    });

    // Step 3: Process HTML template
    log('Processing HTML template...');
    let htmlContent = fs.readFileSync(freshIndexPath, 'utf-8');
    
    // Replace development script with production assets
    htmlContent = htmlContent.replace(
      '<script type="module" src="/src/main.tsx"></script>',
      `<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script type="module" src="/assets/main.js"></script>`
    );

    // Add CSS
    htmlContent = htmlContent.replace(
      '</head>',
      '    <link rel="stylesheet" href="/assets/main.css">\n  </head>'
    );

    // Write processed HTML to final location
    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Step 4: Build server
    log('Building server...');
    execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
      stdio: 'inherit'
    });

    // Step 5: Copy public assets
    if (fs.existsSync('public')) {
      log('Copying public assets...');
      const copyAssets = (src, dest) => {
        const items = fs.readdirSync(src);
        for (const item of items) {
          const srcPath = path.join(src, item);
          const destPath = path.join(dest, item);
          if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyAssets(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      copyAssets('public', 'dist/public');
    }

    // Cleanup
    if (fs.existsSync(freshIndexPath)) {
      fs.unlinkSync(freshIndexPath);
    }

    // Verify build
    const requiredFiles = ['dist/index.js', 'dist/public/index.html', 'dist/public/assets/main.js', 'dist/public/assets/main.css'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Missing: ${file}`);
      }
    }

    log('Build completed successfully - bypassed EISDIR error!');
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();