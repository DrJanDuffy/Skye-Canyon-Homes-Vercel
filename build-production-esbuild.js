#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { build } from 'esbuild';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    throw error;
  }
}

async function main() {
  log('Starting ESBuild production build...');

  try {
    // Clean existing build directory
    log('Cleaning dist directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });

    // Build CSS with Tailwind
    log('Building CSS...');
    executeCommand('npx tailwindcss -i ./client/src/index.css -o ./dist/public/index.css --minify');

    // Build React application with ESBuild
    log('Building React application...');
    await build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      minify: true,
      sourcemap: false,
      target: ['es2020'],
      format: 'esm',
      outdir: 'dist/public',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
        '.css': 'css',
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.gif': 'file',
        '.svg': 'file',
        '.webp': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.ttf': 'file',
        '.eot': 'file'
      },
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.VITE_API_URL': '""',
        'import.meta.env.MODE': '"production"',
        'import.meta.env.PROD': 'true',
        'import.meta.env.DEV': 'false'
      },
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(process.cwd(), 'client/src'),
        '@shared': path.resolve(process.cwd(), 'shared'),
        '@assets': path.resolve(process.cwd(), 'attached_assets')
      },
      external: ['react', 'react-dom'],
      splitting: true,
      chunkNames: 'chunks/[name]-[hash]',
      assetNames: 'assets/[name]-[hash]'
    });

    // Create production HTML file
    log('Creating production HTML...');
    const htmlTemplate = fs.readFileSync('client/index.html', 'utf-8');
    const productionHtml = htmlTemplate
      .replace('<script type="module" src="/src/main.tsx"></script>', 
               '<script type="module" src="/main.js"></script>\n    <link rel="stylesheet" href="/index.css">')
      .replace('</head>', '    <link rel="preload" href="/main.js" as="script">\n  </head>');
    
    fs.writeFileSync('dist/public/index.html', productionHtml);

    // Copy public assets if they exist
    log('Copying public assets...');
    if (fs.existsSync('public')) {
      const copyRecursive = (src, dest) => {
        const stat = fs.statSync(src);
        if (stat.isDirectory()) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          fs.readdirSync(src).forEach(item => {
            copyRecursive(path.join(src, item), path.join(dest, item));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };

      const publicFiles = fs.readdirSync('public');
      publicFiles.forEach(file => {
        if (file !== 'index.html') {
          const srcPath = path.join('public', file);
          const destPath = path.join('dist/public', file);
          copyRecursive(srcPath, destPath);
        }
      });
    }

    // Build server using traditional ESBuild command
    log('Building server...');
    executeCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --sourcemap --target=node18');

    log('Production build completed successfully!');
    log('Files generated:');
    log('- dist/public/index.html (Frontend)');
    log('- dist/public/main.js (React bundle)');
    log('- dist/public/index.css (Styles)');
    log('- dist/index.js (Server)');

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();