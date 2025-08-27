#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

try {
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });
  const indexContent = fs.readFileSync('client/index.html', 'utf-8');
  fs.writeFileSync('temp-index.html', indexContent);
  execSync('npx vite build --config ../vite.config.ts --mode production --outDir ../dist/public', {
    cwd: 'client',
    stdio: 'inherit',
    timeout: 300000,
  });
  execSync(
    'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
    {
      stdio: 'inherit',
    }
  );
  if (fs.existsSync('public')) {
    const publicFiles = fs.readdirSync('public');
    publicFiles.forEach((file) => {
      const srcPath = path.join('public', file);
      const destPath = path.join('dist/public', file);
      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      } else if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    });
  }

  // Clean up temporary file
  if (fs.existsSync('temp-index.html')) {
    fs.unlinkSync('temp-index.html');
  }
} catch (_error) {
  // Clean up on failure
  if (fs.existsSync('temp-index.html')) {
    fs.unlinkSync('temp-index.html');
  }

  process.exit(1);
}
