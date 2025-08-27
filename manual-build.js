#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });

  const _buildResult = execSync(
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
  let htmlContent = fs.readFileSync('client/index.html', 'utf-8');

  // Replace the development script tag with production assets
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    `<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script type="module" src="/assets/main.js"></script>`
  );

  fs.writeFileSync('dist/public/index.html', htmlContent);
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
  execSync(
    'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
    {
      stdio: 'inherit',
    }
  );
} catch (error) {
  if (error.stdout) {
  }
  if (error.stderr) {
  }
  process.exit(1);
}
