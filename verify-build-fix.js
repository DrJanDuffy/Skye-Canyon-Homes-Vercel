#!/usr/bin/env node

/**
 * Verification script to confirm the build fix is working
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';

function log(_message) {}

function checkPackageJson() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const buildScript = pkg.scripts.build;

  if (buildScript.includes('node build-esbuild.js')) {
    log('Package.json build script is correctly set to use ESBuild');
    return true;
  } else if (buildScript.includes('vite build')) {
    return false;
  }

  return false;
}

function testBuildProcess() {
  try {
    log('Testing ESBuild process directly...');
    execSync('node build-esbuild.js', { stdio: 'pipe' });
    log('ESBuild process completed successfully');

    // Verify build artifacts
    const artifacts = [
      'dist/server.js',
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css',
    ];

    for (const artifact of artifacts) {
      if (fs.existsSync(artifact)) {
        const size = Math.round(fs.statSync(artifact).size / 1024);
        log(`${artifact} exists (${size} KB)`);
      } else {
        throw new Error(`Missing artifact: ${artifact}`);
      }
    }

    return true;
  } catch (_error) {
    return false;
  }
}

function main() {
  const packageOk = checkPackageJson();
  const buildOk = testBuildProcess();

  if (buildOk) {
  }

  if (!packageOk) {
  }
}

main();
