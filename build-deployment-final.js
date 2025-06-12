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
      timeout: 300000,
      ...options 
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting comprehensive deployment build...');

    // Clean and prepare directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Backup index.html to prevent EISDIR conflicts
    const indexBackupPath = 'index-build-backup.html';
    if (fs.existsSync('client/index.html')) {
      fs.copyFileSync('client/index.html', indexBackupPath);
    }

    // Build CSS with Tailwind
    log('Compiling CSS with Tailwind...');
    executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/styles.css --minify');

    // Build React application with esbuild (avoids Vite EISDIR issues)
    log('Building React application with esbuild...');
    const buildCommand = [
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
      '--minify',
      '--sourcemap',
      '--tree-shaking=true',
      '--define:process.env.NODE_ENV=\\"production\\"',
      '--define:import.meta.env.PROD=true',
      '--define:import.meta.env.DEV=false',
      '--define:import.meta.env.MODE=\\"production\\"'
    ].join(' ');
    
    executeCommand(buildCommand);

    // Process HTML template
    log('Processing HTML template...');
    let htmlContent = fs.readFileSync(indexBackupPath, 'utf-8');
    
    // Update references to built assets
    htmlContent = htmlContent
      .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/app.js" type="module"')
      .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/styles.css">\n  </head>')
      .replace(/href="\/favicon\.ico"/g, 'href="/favicon.ico"');
    
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
      '--minify',
      '--sourcemap',
      '--keep-names'
    ].join(' '));

    // Create production server that serves static files
    log('Creating production-ready server...');
    const productionServerCode = `
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
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files with caching
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
  etag: true,
  lastModified: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Handle SPA routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Production server running on port \${PORT}\`);
  console.log(\`📂 Serving static files from: \${path.join(__dirname, 'public')}\`);
});

export default app;
`;

    fs.writeFileSync('dist/server-production.js', productionServerCode);

    // Create deployment package.json
    log('Creating deployment package.json...');
    const deploymentPackage = {
      name: "skye-canyon-real-estate",
      version: "1.0.0",
      type: "module",
      main: "server-production.js",
      scripts: {
        start: "node server-production.js",
        "start:original": "node index.js"
      },
      dependencies: {
        express: "^4.21.2"
      },
      engines: {
        node: ">=18.0.0"
      }
    };
    
    fs.writeFileSync('dist/package.json', JSON.stringify(deploymentPackage, null, 2));

    // Create start script
    fs.writeFileSync('dist/start.sh', `#!/bin/bash
echo "Starting Skye Canyon Real Estate Application..."
node server-production.js
`);
    executeCommand('chmod +x dist/start.sh');

    // Clean up
    if (fs.existsSync(indexBackupPath)) {
      fs.unlinkSync(indexBackupPath);
    }

    // Verify build output
    log('Verifying build output...');
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/assets/app.js',
      'dist/public/assets/styles.css',
      'dist/server-production.js',
      'dist/package.json'
    ];

    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    if (missingFiles.length > 0) {
      throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
    }

    // Display build summary
    log('✅ Build completed successfully!');
    console.log('\n📦 Build Output:');
    console.log('├── dist/');
    console.log('│   ├── public/');
    console.log('│   │   ├── index.html');
    console.log('│   │   └── assets/');
    console.log('│   │       ├── app.js');
    console.log('│   │       ├── app.js.map');
    console.log('│   │       ├── styles.css');
    console.log('│   │       └── styles.css.map');
    console.log('│   ├── server-production.js (static file server)');
    console.log('│   ├── index.js (original server with API)');
    console.log('│   ├── package.json');
    console.log('│   └── start.sh');
    console.log('\n🚀 Deployment Options:');
    console.log('1. Static files only: Use dist/public/ directory');
    console.log('2. With static server: Use dist/server-production.js');
    console.log('3. Full application: Use dist/index.js (includes API routes)');
    console.log('\n✨ Ready for deployment to any platform!');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();