#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🛠️ ${message}`);
}

async function main() {
  try {
    log('Starting production build with EISDIR workaround...');

    // Clean build directory
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 1: Build React components using esbuild instead of Vite
    log('Building React application with esbuild...');
    
    // Build the main TypeScript entry point
    execSync(`npx esbuild client/src/main.tsx --bundle --outfile=dist/public/assets/main.js --format=esm --target=es2020 --jsx=automatic --jsx-import-source=react --loader:.tsx=tsx --loader:.ts=tsx --loader:.css=css --define:process.env.NODE_ENV='"production"' --minify`, {
      stdio: 'inherit'
    });

    // Step 2: Build CSS using Tailwind
    log('Building CSS with Tailwind...');
    execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify', {
      stdio: 'inherit'
    });

    // Step 3: Copy and process HTML template manually
    log('Processing HTML template...');
    const htmlContent = fs.readFileSync('client/index.html', 'utf-8');
    
    // Replace the module script with the built assets
    const processedHtml = htmlContent
      .replace('<script type="module" src="/src/main.tsx"></script>', 
               '<script type="module" src="/assets/main.js"></script>\n    <link rel="stylesheet" href="/assets/main.css">');
    
    fs.writeFileSync('dist/public/index.html', processedHtml);

    // Step 4: Copy static assets
    log('Copying static assets...');
    const publicDir = 'public';
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      files.forEach(file => {
        if (file !== 'index.html') {
          const srcPath = path.join(publicDir, file);
          const destPath = path.join('dist/public', file);
          if (fs.statSync(srcPath).isDirectory()) {
            fs.cpSync(srcPath, destPath, { recursive: true });
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      });
    }

    // Step 5: Build server
    log('Building server...');
    execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --define:process.env.NODE_ENV=\'"production"\'', {
      stdio: 'inherit'
    });

    // Step 6: Create production start script
    log('Creating production start script...');
    const startScript = `#!/usr/bin/env node
import('./index.js').catch(console.error);
`;
    fs.writeFileSync('dist/start.js', startScript);
    fs.chmodSync('dist/start.js', '755');

    log('✅ Production build completed successfully!');
    
    // Show build summary
    const publicFiles = fs.readdirSync('dist/public').length;
    const totalSize = fs.statSync('dist/public/assets/main.js').size + 
                     fs.statSync('dist/public/assets/main.css').size;
    log(`📊 Build summary: ${publicFiles} files, ${Math.round(totalSize/1024)}KB assets`);

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();