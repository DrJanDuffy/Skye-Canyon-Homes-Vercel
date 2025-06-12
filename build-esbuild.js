#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🔧 ${message}`);
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
  
  // Build the main React application
  const clientBuildCommand = [
    'npx esbuild client/src/main.tsx',
    '--bundle',
    '--outfile=dist/public/assets/main.js',
    '--format=esm',
    '--target=es2020',
    '--jsx=automatic',
    '--jsx-import-source=react',
    '--loader:.tsx=tsx',
    '--loader:.ts=tsx',
    '--loader:.css=css',
    '--loader:.svg=dataurl',
    '--loader:.png=dataurl',
    '--loader:.jpg=dataurl',
    '--loader:.jpeg=dataurl',
    '--loader:.gif=dataurl',
    '--loader:.webp=dataurl',
    '--minify',
    '--sourcemap',
    '--tree-shaking=true',
    '--define:process.env.NODE_ENV=\\"production\\"',
    '--define:import.meta.env.PROD=true',
    '--define:import.meta.env.DEV=false',
    '--define:import.meta.env.MODE=\\"production\\"',
    '--alias:@=./client/src',
    '--alias:@/components=./client/src/components',
    '--alias:@/hooks=./client/src/hooks',
    '--alias:@/lib=./client/src/lib',
    '--alias:@/utils=./client/src/utils',
    '--alias:@/pages=./client/src/pages',
    '--external:react',
    '--external:react-dom'
  ].join(' ');
  
  executeCommand(clientBuildCommand);
}

async function buildCSS() {
  log('Building CSS with Tailwind...');
  
  executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify');
}

async function processHTML() {
  log('Processing HTML template...');
  
  // Read the original HTML template
  const htmlPath = path.join(__dirname, 'client', 'index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  // Update script and style references for production
  htmlContent = htmlContent
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      '<script type="module" src="/assets/main.js"></script>'
    )
    .replace(
      '</head>',
      '    <link rel="stylesheet" href="/assets/main.css">\n  </head>'
    );
  
  // Write the processed HTML to the dist directory
  fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), htmlContent);
}

async function copyPublicAssets() {
  log('Copying public assets...');
  
  const publicPath = path.join(__dirname, 'public');
  const distPublicPath = path.join(__dirname, 'dist', 'public');
  
  if (fs.existsSync(publicPath)) {
    executeCommand(`cp -r public/* dist/public/`);
  }
  
  // Copy favicon and other root assets if they exist
  const rootAssets = ['favicon.ico', 'robots.txt', 'sitemap.xml', 'manifest.json'];
  rootAssets.forEach(asset => {
    const assetPath = path.join(__dirname, asset);
    if (fs.existsSync(assetPath)) {
      fs.copyFileSync(assetPath, path.join(distPublicPath, asset));
    }
  });
}

async function buildServer() {
  log('Building server with ESBuild...');
  
  const serverBuildCommand = [
    'npx esbuild server/index.ts',
    '--platform=node',
    '--packages=external',
    '--bundle',
    '--format=esm',
    '--outfile=dist/server.js',
    '--target=node18',
    '--sourcemap',
    '--minify',
    '--define:process.env.NODE_ENV=\\"production\\"'
  ].join(' ');
  
  executeCommand(serverBuildCommand);
}

async function main() {
  try {
    log('Starting ESBuild-based production build...');
    
    // Clean and create directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });
    fs.mkdirSync('dist/public/assets', { recursive: true });
    
    // Build client assets
    await Promise.all([
      buildClient(),
      buildCSS()
    ]);
    
    // Process HTML and copy assets
    await processHTML();
    await copyPublicAssets();
    
    // Build server
    await buildServer();
    
    log('✅ Build completed successfully!');
    log('Built files:');
    log('  - dist/public/index.html (Frontend)');
    log('  - dist/public/assets/main.js (React bundle)');
    log('  - dist/public/assets/main.css (Styles)');
    log('  - dist/server.js (Server)');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();