#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🚀 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`);
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

async function main() {
  try {
    log('Starting ESBuild production build to bypass Vite EISDIR issues...');

    // Step 1: Clean and prepare build directory
    log('Cleaning build directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 2: Build CSS with Tailwind
    log('Building CSS with Tailwind...');
    executeCommand(
      'npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify'
    );

    // Step 3: Build React application with ESBuild
    log('Building React application with ESBuild...');
    const clientBuildArgs = [
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
      '--loader:.woff=dataurl',
      '--loader:.woff2=dataurl',
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

    executeCommand(clientBuildArgs);

    // Step 4: Process and copy HTML template
    log('Processing HTML template...');
    const indexPath = path.join(__dirname, 'client', 'index.html');
    let htmlContent = fs.readFileSync(indexPath, 'utf-8');

    // Update asset references for production
    htmlContent = htmlContent
      .replace(/src="\/src\/main\.tsx"/g, 'src="/assets/main.js" type="module"')
      .replace(/<\/head>/g, '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');

    fs.writeFileSync('dist/public/index.html', htmlContent);

    // Step 5: Copy public assets
    log('Copying public assets...');
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      const copyAssets = (src, dest) => {
        const items = fs.readdirSync(src);
        for (const item of items) {
          const srcPath = path.join(src, item);
          const destPath = path.join(dest, item);
          const stat = fs.statSync(srcPath);

          if (stat.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyAssets(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };

      copyAssets(publicDir, 'dist/public');
    }

    // Step 6: Build server
    log('Building server...');
    const serverBuildArgs = [
      'npx esbuild server/index.ts',
      '--platform=node',
      '--packages=external',
      '--bundle',
      '--format=esm',
      '--outdir=dist',
      '--minify',
      '--sourcemap',
      '--alias:@shared=shared',
    ].join(' ');

    executeCommand(serverBuildArgs);

    // Step 7: Verify build output
    log('Verifying build output...');
    const requiredFiles = [
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css',
      'dist/index.js',
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required build output missing: ${file}`);
      }
    }

    // Step 8: Display build summary
    log('Build completed successfully!');
    console.log('\n📊 Build Summary:');

    for (const file of requiredFiles) {
      const stats = fs.statSync(file);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`  ✅ ${file} (${sizeKB}KB)`);
    }

    console.log('\n🎉 Production build ready! Run with: NODE_ENV=production node dist/index.js');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();
