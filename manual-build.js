#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting manual build process...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });

  // Build React components using esbuild directly
  console.log('Building React application with esbuild...');

  const buildResult = execSync(
    `npx esbuild client/src/main.tsx \\
    --bundle \\
    --minify \\
    --sourcemap \\
    --target=es2020 \\
    --format=esm \\
    --outfile=dist/public/assets/main.js \\
    --define:process.env.NODE_ENV='"production"' \\
    --define:import.meta.env.MODE='"production"' \\
    --define:import.meta.env.PROD='true' \\
    --define:import.meta.env.DEV='false' \\
    --jsx=automatic \\
    --jsx-dev=false \\
    --loader:.tsx=tsx \\
    --loader:.ts=ts \\
    --loader:.css=css \\
    --external:react \\
    --external:react-dom`,
    {
      stdio: 'pipe',
      encoding: 'utf-8',
    }
  );

  console.log('Build output:', buildResult);

  // Copy and process index.html manually
  console.log('Processing HTML template...');
  let htmlContent = fs.readFileSync('client/index.html', 'utf-8');

  // Replace the development script tag with production assets
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    `<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script type="module" src="/assets/main.js"></script>`
  );

  fs.writeFileSync('dist/public/index.html', htmlContent);

  // Build CSS using PostCSS and Tailwind
  console.log('Building CSS...');
  execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify', {
    stdio: 'inherit',
  });

  // Add CSS link to HTML
  htmlContent = htmlContent.replace(
    '</head>',
    '    <link rel="stylesheet" href="/assets/main.css">\n  </head>'
  );
  fs.writeFileSync('dist/public/index.html', htmlContent);

  // Copy public assets
  if (fs.existsSync('public')) {
    console.log('Copying public assets...');
    const copyAssets = (src, dest) => {
      const items = fs.readdirSync(src);
      for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        if (fs.statSync(srcPath).isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyAssets(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    copyAssets('public', 'dist/public');
  }

  // Build server
  console.log('Building server...');
  execSync(
    'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
    {
      stdio: 'inherit',
    }
  );

  console.log('Manual build completed successfully!');
  console.log('Files created:');
  console.log('- dist/public/index.html');
  console.log('- dist/public/assets/main.js');
  console.log('- dist/public/assets/main.css');
  console.log('- dist/index.js');
} catch (error) {
  console.error('Manual build failed:', error.message);
  if (error.stdout) console.log('stdout:', error.stdout.toString());
  if (error.stderr) console.log('stderr:', error.stderr.toString());
  process.exit(1);
}
