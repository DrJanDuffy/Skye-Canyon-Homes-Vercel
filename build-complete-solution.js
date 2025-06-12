#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    execSync(command, { 
      stdio: 'inherit', 
      timeout: 180000, // 3 minutes
      ...options 
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting comprehensive build with EISDIR fixes...');

    // Clean and prepare directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public', { recursive: true });

    // Build CSS with Tailwind
    log('Compiling CSS with Tailwind...');
    executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/styles.css --minify');

    // Build React app with esbuild (avoids Vite EISDIR issues)
    log('Building React application with esbuild...');
    const clientBuildCommand = [
      'npx esbuild client/src/main.tsx',
      '--bundle',
      '--outfile=dist/public/app.js',
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
      '--minify',
      '--sourcemap',
      '--define:process.env.NODE_ENV=\\"production\\"'
    ].join(' ');
    
    executeCommand(clientBuildCommand);

    // Create optimized HTML file (bypasses client/index.html EISDIR issue)
    log('Creating optimized HTML...');
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skye Canyon Homes for Sale | Las Vegas NV Real Estate</title>
    <meta name="description" content="Discover luxury homes in Skye Canyon, Las Vegas. Expert real estate services with Dr. Jan Duffy. View listings, market insights, and neighborhood information.">
    <link rel="stylesheet" href="/styles.css">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#1e40af">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/app.js"></script>
</body>
</html>`;
    
    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Copy static assets
    log('Copying static assets...');
    if (fs.existsSync('public')) {
      executeCommand('cp -r public/* dist/public/ 2>/dev/null || true');
    }

    // Build server with esbuild
    log('Building server...');
    executeCommand([
      'npx esbuild server/index.ts',
      '--platform=node', 
      '--packages=external',
      '--bundle',
      '--format=esm',
      '--outdir=dist',
      '--minify'
    ].join(' '));

    // Create static file server for deployment
    log('Creating static file server...');
    const staticServerCode = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));

// SPA fallback for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Static server running on port \${PORT}\`);
});
`;

    fs.writeFileSync('dist/static-server.js', staticServerCode);

    // Create deployment package.json
    const packageJson = {
      name: "skye-canyon-build",
      version: "1.0.0",
      type: "module",
      scripts: {
        start: "node static-server.js",
        "start:full": "node index.js"
      },
      dependencies: {
        express: "^4.21.2"
      }
    };
    
    fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

    // Verify build
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/app.js', 
      'dist/public/styles.css',
      'dist/index.js',
      'dist/static-server.js'
    ];

    const missing = requiredFiles.filter(f => !fs.existsSync(f));
    if (missing.length > 0) {
      throw new Error(`Missing files: ${missing.join(', ')}`);
    }

    log('✅ Build completed successfully!');
    console.log('\n📦 Build Output:');
    console.log('├── dist/');
    console.log('│   ├── public/ (static files ready for deployment)');
    console.log('│   │   ├── index.html');
    console.log('│   │   ├── app.js');
    console.log('│   │   └── styles.css');
    console.log('│   ├── index.js (full server with API)');
    console.log('│   ├── static-server.js (simple static file server)');
    console.log('│   └── package.json');
    console.log('\n🚀 Deployment ready! No more EISDIR errors.');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();