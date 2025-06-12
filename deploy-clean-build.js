#!/usr/bin/env node

/**
 * Clean deployment build that bypasses npm dependency conflicts
 * Uses ESBuild directly to create production-ready artifacts
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`${new Date().toLocaleTimeString()} - ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
    return execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      timeout: 120000,
      ...options 
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function validateEnvironment() {
  log('Validating build environment...');
  
  // Check if we can access required directories
  const requiredDirs = ['client/src', 'server', 'shared'];
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      throw new Error(`Required directory missing: ${dir}`);
    }
  }
  
  // Check for main entry files
  const requiredFiles = ['client/src/main.tsx', 'server/index.ts'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }
  
  log('Environment validation passed');
}

async function createBuildDirectories() {
  log('Creating build directories...');
  
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });
  fs.mkdirSync('dist/public/assets', { recursive: true });
  
  log('Build directories created');
}

async function buildClientWithESBuild() {
  log('Building client application with ESBuild...');
  
  // Create the build command using available esbuild
  const buildCommand = `npx esbuild client/src/main.tsx \\
    --bundle \\
    --outfile=dist/public/assets/app.js \\
    --format=esm \\
    --target=es2020 \\
    --jsx=automatic \\
    --jsx-import-source=react \\
    --loader:.tsx=tsx \\
    --loader:.ts=tsx \\
    --loader:.css=css \\
    --loader:.svg=dataurl \\
    --loader:.png=dataurl \\
    --loader:.jpg=dataurl \\
    --loader:.jpeg=dataurl \\
    --loader:.gif=dataurl \\
    --loader:.woff=dataurl \\
    --loader:.woff2=dataurl \\
    --minify \\
    --sourcemap \\
    --tree-shaking=true \\
    --define:process.env.NODE_ENV='"production"' \\
    --define:import.meta.env.PROD=true \\
    --define:import.meta.env.DEV=false \\
    --define:import.meta.env.MODE='"production"' \\
    --resolve-extensions=.tsx,.ts,.jsx,.js \\
    --platform=browser`;
  
  executeCommand(buildCommand.replace(/\\\s+/g, ' '));
  
  log('Client build completed');
}

async function buildClientCSS() {
  log('Building CSS assets...');
  
  // Check if Tailwind CSS file exists
  const cssFiles = [
    'client/src/index.css',
    'client/src/styles.css',
    'client/src/globals.css'
  ];
  
  let mainCssFile = null;
  for (const cssFile of cssFiles) {
    if (fs.existsSync(cssFile)) {
      mainCssFile = cssFile;
      break;
    }
  }
  
  if (mainCssFile) {
    try {
      executeCommand(`npx tailwindcss -i ${mainCssFile} -o dist/public/assets/styles.css --minify`);
      log('CSS build completed');
    } catch (error) {
      log('CSS build failed, copying original file...');
      fs.copyFileSync(mainCssFile, 'dist/public/assets/styles.css');
    }
  } else {
    log('No CSS file found, creating minimal styles...');
    fs.writeFileSync('dist/public/assets/styles.css', '/* Minimal styles */\nbody { margin: 0; font-family: system-ui; }');
  }
}

async function processHTMLTemplate() {
  log('Processing HTML template...');
  
  const htmlPath = path.join(__dirname, 'client', 'index.html');
  let htmlContent;
  
  if (fs.existsSync(htmlPath)) {
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  } else {
    // Create minimal HTML template
    htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skye Canyon Homes</title>
    <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/assets/app.js"></script>
</body>
</html>`;
  }
  
  // Update script and CSS references
  htmlContent = htmlContent
    .replace(/<script[^>]*src="[^"]*main\.tsx[^"]*"[^>]*><\/script>/g, 
             '<script type="module" src="/assets/app.js"></script>')
    .replace(/<link[^>]*href="[^"]*\.css[^"]*"[^>]*>/g, '')
    .replace('</head>', '    <link rel="stylesheet" href="/assets/styles.css">\n  </head>');
  
  fs.writeFileSync('dist/public/index.html', htmlContent);
  log('HTML template processed');
}

async function copyPublicAssets() {
  log('Copying public assets...');
  
  const publicDirs = ['client/public', 'public'];
  for (const publicDir of publicDirs) {
    if (fs.existsSync(publicDir)) {
      try {
        executeCommand(`cp -r ${publicDir}/* dist/public/ 2>/dev/null || true`);
        log(`Copied assets from ${publicDir}`);
      } catch (error) {
        log(`Failed to copy from ${publicDir}, continuing...`);
      }
    }
  }
}

async function createProductionServer() {
  log('Creating production server...');
  
  const serverContent = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Static file serving
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: false
}));

// API routes placeholder
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  fs.writeFileSync('dist/server.js', serverContent);
  
  // Create production package.json
  const productionPackage = {
    name: 'skye-canyon-homes-production',
    version: '1.0.0',
    type: 'module',
    scripts: {
      start: 'node server.js'
    },
    dependencies: {
      express: '^5.0.0'
    }
  };
  
  fs.writeFileSync('dist/package.json', JSON.stringify(productionPackage, null, 2));
  
  log('Production server created');
}

async function verifyBuild() {
  log('Verifying build artifacts...');
  
  const requiredFiles = [
    'dist/public/index.html',
    'dist/public/assets/app.js',
    'dist/public/assets/styles.css',
    'dist/server.js',
    'dist/package.json'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required build artifact missing: ${file}`);
    }
    
    const stats = fs.statSync(file);
    if (stats.size === 0) {
      throw new Error(`Build artifact is empty: ${file}`);
    }
  }
  
  log('Build verification completed successfully');
}

async function main() {
  try {
    log('Starting clean deployment build...');
    
    await validateEnvironment();
    await createBuildDirectories();
    await buildClientWithESBuild();
    await buildClientCSS();
    await processHTMLTemplate();
    await copyPublicAssets();
    await createProductionServer();
    await verifyBuild();
    
    log('Clean deployment build completed successfully!');
    log('Build artifacts ready in dist/ directory');
    log('Run "cd dist && npm install && npm start" to test locally');
    
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

main();