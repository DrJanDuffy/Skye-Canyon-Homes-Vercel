#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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
  try {
    log('Starting production build with EISDIR fix...');

    // Clean existing build directory
    log('Cleaning dist directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/public', { recursive: true });
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Create a safe copy of index.html to avoid EISDIR conflicts
    log('Creating safe HTML template...');
    const indexContent = fs.readFileSync('client/index.html', 'utf-8');
    const tempIndexPath = path.join(process.cwd(), 'temp-index-build.html');
    fs.writeFileSync(tempIndexPath, indexContent);

    // Build CSS with Tailwind
    log('Building CSS assets...');
    executeCommand(
      'npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify'
    );

    // Build React application with esbuild (avoids Vite EISDIR issues)
    log('Building React application with esbuild...');
    const buildCommand = [
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
      '--minify',
      '--sourcemap',
      '--tree-shaking=true',
      '--define:process.env.NODE_ENV=\\"production\\"',
      '--define:import.meta.env.PROD=true',
      '--define:import.meta.env.DEV=false',
      '--define:import.meta.env.MODE=\\"production\\"',
      '--alias:@=client/src',
      '--alias:@shared=shared',
    ].join(' ');

    executeCommand(buildCommand);

    // Process and copy HTML template
    log('Processing HTML template...');
    let htmlContent = fs.readFileSync(tempIndexPath, 'utf-8');

    // Update asset references for production
    htmlContent = htmlContent
      .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/main.js" type="module"')
      .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Build server
    log('Building server...');
    executeCommand(
      'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist'
    );

    // Copy public assets
    log('Copying public assets...');
    if (fs.existsSync('public')) {
      executeCommand('cp -r public/* dist/public/');
    }

    // Create production server launcher
    log('Creating production server launcher...');
    const serverLauncher = `#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';

const serverPath = path.join(process.cwd(), 'dist', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
`;

    fs.writeFileSync('start-production.js', serverLauncher);
    fs.chmodSync('start-production.js', '755');

    // Cleanup temporary files
    log('Cleaning up temporary files...');
    if (fs.existsSync(tempIndexPath)) {
      fs.unlinkSync(tempIndexPath);
    }

    log('Production build completed successfully!');
    log('Run "node start-production.js" to start the production server');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();
