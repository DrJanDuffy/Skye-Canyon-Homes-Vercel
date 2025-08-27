#!/usr/bin/env node

import { build } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message) {
  console.log(`🔧 ${message}`);
}

async function main() {
  try {
    log('Building for production deployment...');

    // Clean and prepare
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Build client
    log('Building React client...');
    await build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      outfile: 'dist/public/assets/main.js',
      format: 'esm',
      target: 'es2020',
      jsx: 'automatic',
      jsxImportSource: 'react',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'tsx',
        '.css': 'css',
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.jpeg': 'dataurl',
      },
      minify: true,
      sourcemap: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.PROD': 'true',
        'import.meta.env.DEV': 'false',
        'import.meta.env.MODE': '"production"',
      },
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(__dirname, 'attached_assets'),
      },
    });

    // Build CSS
    log('Building CSS...');
    execSync(
      'npx tailwindcss -i client/src/index-simple.css -o dist/public/assets/main.css --minify',
      {
        stdio: 'inherit',
      }
    );

    // Process HTML
    log('Processing HTML...');
    let html = fs.readFileSync('client/index.html', 'utf-8');
    html = html
      .replace(
        '<script type="module" src="/src/main.tsx"></script>',
        '<script type="module" src="/assets/main.js"></script>'
      )
      .replace('</head>', '    <link rel="stylesheet" href="/assets/main.css">\n  </head>');
    fs.writeFileSync('dist/public/index.html', html);

    // Copy assets
    log('Copying assets...');
    if (fs.existsSync('public')) {
      execSync('cp -r public/* dist/public/', { stdio: 'inherit' });
    }

    // Build server
    log('Building server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      outfile: 'dist/server.js',
      format: 'esm',
      target: 'node18',
      platform: 'node',
      packages: 'external',
      minify: true,
      alias: {
        '@shared': path.resolve(__dirname, 'shared'),
      },
    });

    // Create package.json
    log('Creating package.json...');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    fs.writeFileSync(
      'dist/package.json',
      JSON.stringify(
        {
          name: pkg.name,
          version: pkg.version,
          type: 'module',
          scripts: { start: 'node server.js' },
          dependencies: {
            express: pkg.dependencies.express,
            postgres: pkg.dependencies.postgres,
            'drizzle-orm': pkg.dependencies['drizzle-orm'],
            '@neondatabase/serverless': pkg.dependencies['@neondatabase/serverless'],
            'express-session': pkg.dependencies['express-session'],
            'connect-pg-simple': pkg.dependencies['connect-pg-simple'],
            passport: pkg.dependencies.passport,
            'passport-local': pkg.dependencies['passport-local'],
            compression: pkg.dependencies.compression,
            cors: pkg.dependencies.cors,
            'express-rate-limit': pkg.dependencies['express-rate-limit'],
            memorystore: pkg.dependencies.memorystore,
            ws: pkg.dependencies.ws,
            '@anthropic-ai/sdk': pkg.dependencies['@anthropic-ai/sdk'],
          },
        },
        null,
        2
      )
    );

    log('Production build completed successfully!');
    log('Run: cd dist && node server.js');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();
