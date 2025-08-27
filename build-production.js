#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Running: ${command}`);
    return execSync(command, {
      stdio: 'inherit',
      encoding: 'utf8',
      timeout: 300000,
      ...options,
    });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    throw error;
  }
}

async function buildClient() {
  log('Building React client with ESBuild...');

  // Clean and create directories
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist/public/assets', { recursive: true });

  // Build TypeScript/React using ESBuild
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
    '--alias:@assets=attached_assets',
  ].join(' ');

  executeCommand(buildCommand);
}

async function buildCSS() {
  log('Building CSS with Tailwind...');
  executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify');
}

async function processHTML() {
  log('Processing HTML template...');

  // Read the original HTML file
  let htmlContent = fs.readFileSync('client/index.html', 'utf-8');

  // Update asset references for production
  htmlContent = htmlContent
    .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/main.js" type="module"')
    .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

  // Write the processed HTML to the dist directory
  fs.writeFileSync('dist/public/index.html', htmlContent);
}

async function copyPublicAssets() {
  log('Copying public assets...');

  // Copy public directory if it exists
  if (fs.existsSync('client/public')) {
    executeCommand('cp -r client/public/* dist/public/');
  }

  // Copy attached assets if they exist
  if (fs.existsSync('attached_assets')) {
    fs.mkdirSync('dist/public/assets/attached', { recursive: true });
    executeCommand('cp -r attached_assets/* dist/public/assets/attached/');
  }
}

async function buildServer() {
  log('Building server with ESBuild...');
  executeCommand(
    'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist'
  );
}

async function main() {
  try {
    log('Starting production build process...');

    await buildClient();
    await buildCSS();
    await processHTML();
    await copyPublicAssets();
    await buildServer();

    log('✅ Production build completed successfully!');
    log('Built files are in the dist/ directory');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
