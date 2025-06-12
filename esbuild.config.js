#!/usr/bin/env node

import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Build configuration for client
const clientConfig = {
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
    '.css': 'css',
    '.svg': 'dataurl',
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.gif': 'dataurl'
  },
  minify: isProduction,
  sourcemap: true,
  treeShaking: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'import.meta.env.PROD': 'true',
    'import.meta.env.DEV': 'false',
    'import.meta.env.MODE': JSON.stringify('production')
  },
  alias: {
    '@': path.resolve('client/src'),
    '@shared': path.resolve('shared')
  },
  external: isProduction ? [] : ['react', 'react-dom']
};

// Build configuration for server
const serverConfig = {
  entryPoints: ['server/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'esm',
  target: 'node18',
  packages: 'external',
  minify: isProduction,
  sourcemap: true
};

async function buildClient() {
  console.log('Building client...');
  await build(clientConfig);
}

async function buildServer() {
  console.log('Building server...');
  await build(serverConfig);
}

async function buildCSS() {
  console.log('Building CSS...');
  const { execSync } = await import('child_process');
  execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify', {
    stdio: 'inherit'
  });
}

async function processHTML() {
  console.log('Processing HTML template...');
  
  // Ensure dist/public directory exists
  if (!fs.existsSync('dist/public')) {
    fs.mkdirSync('dist/public', { recursive: true });
  }
  
  // Read the original HTML file
  let htmlContent = fs.readFileSync('client/index.html', 'utf-8');
  
  // Update asset references for production
  htmlContent = htmlContent
    .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/main.js" type="module"')
    .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');
  
  // Write processed HTML to dist
  fs.writeFileSync('dist/public/index.html', htmlContent);
}

async function copyPublicAssets() {
  console.log('Copying public assets...');
  if (fs.existsSync('public')) {
    const { execSync } = await import('child_process');
    try {
      execSync('cp -r public/* dist/public/', { stdio: 'inherit' });
    } catch (error) {
      // Directory might be empty, which is fine
      console.log('No additional public assets to copy');
    }
  }
}

async function main() {
  try {
    // Clean dist directory
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Build all components
    await buildCSS();
    await buildClient();
    await buildServer();
    await processHTML();
    await copyPublicAssets();
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { buildClient, buildServer, buildCSS, processHTML };