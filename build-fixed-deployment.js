#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    execSync(command, {
      stdio: 'inherit',
      timeout: 300000,
      ...options,
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting deployment-ready build process...');

    // Clean and create directories
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 1: Backup original index.html to prevent EISDIR errors
    log('Backing up index.html to prevent file system conflicts...');
    const originalIndexPath = 'client/index.html';
    const backupIndexPath = 'temp-index-backup.html';

    if (fs.existsSync(originalIndexPath)) {
      fs.copyFileSync(originalIndexPath, backupIndexPath);
    }

    // Step 2: Use alternative build method to avoid Vite EISDIR issue
    log('Building with alternative method to avoid EISDIR errors...');

    // Build CSS first
    executeCommand(
      'npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify'
    );

    // Bundle React app with esbuild
    const esbuildCommand = [
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
      '--minify',
      '--sourcemap',
      '--define:process.env.NODE_ENV=\\"production\\"',
      '--define:import.meta.env.PROD=true',
      '--define:import.meta.env.DEV=false',
    ].join(' ');

    executeCommand(esbuildCommand);

    // Step 3: Process HTML template manually
    log('Processing HTML template...');
    let htmlContent = fs.readFileSync(backupIndexPath, 'utf-8');

    // Update script and CSS references
    htmlContent = htmlContent
      .replace('src="/src/main.tsx"', 'src="/assets/main.js" type="module"')
      .replace('</head>', '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Step 4: Copy public assets
    log('Copying static assets...');
    if (fs.existsSync('public')) {
      executeCommand('cp -r public/* dist/public/ 2>/dev/null || true');
    }

    // Step 5: Build server
    log('Building server...');
    executeCommand(
      'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify'
    );

    // Step 6: Create production-ready server
    log('Creating production server...');
    const productionServer = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: true
}));

// API routes would go here
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Production server running on port \${PORT}\`);
});
`;

    fs.writeFileSync('dist/production-server.js', productionServer);

    // Step 7: Clean up temporary files
    log('Cleaning up temporary files...');
    if (fs.existsSync(backupIndexPath)) {
      fs.unlinkSync(backupIndexPath);
    }

    // Step 8: Create package.json for production
    log('Creating production package.json...');
    const prodPackage = {
      name: 'skye-canyon-production',
      version: '1.0.0',
      type: 'module',
      main: 'production-server.js',
      scripts: {
        start: 'node production-server.js',
      },
      dependencies: {
        express: '^4.21.2',
      },
    };

    fs.writeFileSync('dist/package.json', JSON.stringify(prodPackage, null, 2));

    log('✅ Deployment build completed successfully!');
    log('📁 Output structure:');
    log('   ├── dist/');
    log('   │   ├── public/');
    log('   │   │   ├── index.html');
    log('   │   │   └── assets/');
    log('   │   │       ├── main.js');
    log('   │   │       └── main.css');
    log('   │   ├── production-server.js');
    log('   │   └── package.json');
    log('');
    log('🚀 Ready for deployment!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
