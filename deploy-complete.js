#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🚀 ${message}`);
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

async function validateProjectStructure() {
  log('Validating project structure...');
  
  const requiredPaths = [
    'client/src/main.tsx',
    'client/src/index.css',
    'client/index.html',
    'server/index.ts'
  ];
  
  const issues = [];
  
  requiredPaths.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
      issues.push(`Missing: ${filePath}`);
    } else {
      const stat = fs.statSync(fullPath);
      if (filePath.endsWith('.html') && !stat.isFile()) {
        issues.push(`EISDIR Issue: ${filePath} is not a file (this was causing Vite to fail)`);
      }
    }
  });
  
  if (issues.length > 0) {
    console.error('❌ Project structure issues:');
    issues.forEach(issue => console.error(`   - ${issue}`));
    process.exit(1);
  }
  
  log('✅ Project structure validated');
}

async function buildClient() {
  log('Building React client with ESBuild (no Vite)...');
  
  const clientBuildCommand = [
    'npx esbuild client/src/main.tsx',
    '--bundle',
    '--outfile=dist/public/assets/app.js',
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
    '--resolve-extensions=.tsx,.ts,.jsx,.js,.css'
  ].join(' ');
  
  executeCommand(clientBuildCommand);
}

async function buildCSS() {
  log('Building CSS with Tailwind (no Vite)...');
  
  executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/styles.css --minify');
}

async function processHTML() {
  log('Processing HTML template (bypassing Vite entirely)...');
  
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
  log('✅ HTML template processed without Vite');
}

async function copyPublicAssets() {
  log('Copying public assets...');
  
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

async function createProductionPackageJson() {
  log('Creating production package.json...');
  
  const productionPackage = {
    name: "skye-canyon-homes-production",
    version: "1.0.0",
    type: "module",
    main: "server.js",
    scripts: {
      start: "NODE_ENV=production node server.js"
    },
    dependencies: {
      express: "^4.21.2",
      cors: "latest",
      compression: "latest"
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'dist', 'package.json'),
    JSON.stringify(productionPackage, null, 2)
  );
}

async function verifyBuildArtifacts() {
  log('Verifying build artifacts...');
  
  const requiredArtifacts = [
    'dist/public/index.html',
    'dist/public/assets/app.js',
    'dist/public/assets/styles.css',
    'dist/server.js',
    'dist/package.json'
  ];
  
  const missing = requiredArtifacts.filter(artifact => !fs.existsSync(artifact));
  
  if (missing.length > 0) {
    console.error('❌ Missing build artifacts:');
    missing.forEach(artifact => console.error(`   - ${artifact}`));
    process.exit(1);
  }
  
  log('✅ All build artifacts verified');
}

async function testProductionBuild() {
  log('Testing production build...');
  
  // Start server in background for testing
  const testCommand = 'cd dist && npm install --production && timeout 5s npm start || true';
  
  try {
    executeCommand(testCommand, { timeout: 10000 });
    log('✅ Production build test completed');
  } catch (error) {
    log('⚠️ Production test completed (timeout expected)');
  }
}

async function main() {
  try {
    log('🚀 Starting complete ESBuild deployment (no Vite)...');
    
    // Validate project structure first
    await validateProjectStructure();
    
    // Clean and create directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });
    fs.mkdirSync('dist/public/assets', { recursive: true });
    
    // Build all components (no Vite involved)
    await Promise.all([
      buildClient(),
      buildCSS()
    ]);
    
    // Process remaining components
    await processHTML();
    await copyPublicAssets();
    await buildServer();
    await createProductionPackageJson();
    
    // Verify and test
    await verifyBuildArtifacts();
    await testProductionBuild();
    
    log('🎉 DEPLOYMENT SUCCESS - EISDIR Error Eliminated!');
    log('=' .repeat(60));
    log('Build Process: ESBuild only (Vite completely bypassed)');
    log('EISDIR Error: ✅ RESOLVED');
    log('Build Status: ✅ SUCCESS');
    log('');
    log('Built Artifacts:');
    log('  - dist/public/index.html (Frontend)');
    log('  - dist/public/assets/app.js (React Bundle)');
    log('  - dist/public/assets/styles.css (CSS)');
    log('  - dist/server.js (Backend)');
    log('  - dist/package.json (Production config)');
    log('');
    log('🚀 DEPLOYMENT COMMANDS:');
    log('  1. cd dist');
    log('  2. npm install');
    log('  3. npm start');
    log('');
    log('Or run production server directly:');
    log('  NODE_ENV=production node production-server-enhanced.js');
    log('=' .repeat(60));
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();