#!/usr/bin/env node

/**
 * ESBuild-based production deployment script
 * Replaces Vite to resolve EISDIR errors
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(_message) {}

async function buildProduction() {
  log('Building application with ESBuild...');

  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist/public/assets', { recursive: true });

  // Build CSS
  execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/styles.css --minify', {
    stdio: 'inherit',
  });

  // Copy public assets
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/public/', { stdio: 'inherit' });
  }

  // Build React client
  await build({
    entryPoints: ['client/src/main.tsx'],
    bundle: true,
    minify: true,
    outfile: 'dist/public/assets/app.js',
    format: 'esm',
    target: ['es2020'],
    platform: 'browser',
    define: {
      'process.env.NODE_ENV': '"production"',
      'import.meta.env.PROD': 'true',
    },
    jsx: 'automatic',
    jsxImportSource: 'react',
  });

  // Process HTML
  const htmlContent = fs
    .readFileSync('client/index.html', 'utf-8')
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      '<script type="module" src="/assets/app.js"></script>'
    )
    .replace('</head>', '    <link rel="stylesheet" href="/assets/styles.css">\n  </head>');

  fs.writeFileSync('dist/public/index.html', htmlContent);

  log('Build completed successfully');
}

async function startServer() {
  const express = (await import('express')).default;
  const compression = (await import('compression')).default;
  const path = await import('node:path');

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(compression());
  app.use(express.json());
  app.use(express.static('dist/public'));

  // Basic API routes
  app.get('/health', (_req, res) => res.json({ status: 'healthy' }));
  app.get('/api/*', (_req, res) => res.json({ message: 'API endpoint' }));
  app.post('/api/*', (_req, res) => res.json({ success: true }));

  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    log(`Server running on port ${PORT}`);
  });
}

async function main() {
  try {
    await buildProduction();
    await startServer();
  } catch (_error) {
    process.exit(1);
  }
}

main();
