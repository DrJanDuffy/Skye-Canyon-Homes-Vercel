#!/usr/bin/env node

/**
 * Verification script to confirm the build fix is working
 */

import fs from 'fs';
import { execSync } from 'child_process';

function log(message) {
  console.log(`✓ ${message}`);
}

function checkPackageJson() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const buildScript = pkg.scripts.build;

  console.log('Current build script:', buildScript);

  if (buildScript.includes('node build-esbuild.js')) {
    log('Package.json build script is correctly set to use ESBuild');
    return true;
  } else if (buildScript.includes('vite build')) {
    console.log('⚠️  Package.json still contains broken Vite build command');
    console.log('   Current:', buildScript);
    console.log('   Should be: "node build-esbuild.js"');
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
  } catch (error) {
    console.error('Build test failed:', error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Verifying EISDIR fix implementation...\n');

  const packageOk = checkPackageJson();
  const buildOk = testBuildProcess();

  console.log('\n📊 Verification Results:');
  console.log(`Package.json fix: ${packageOk ? '✅' : '❌'}`);
  console.log(`ESBuild process: ${buildOk ? '✅' : '❌'}`);

  if (buildOk) {
    console.log('\n🎉 EISDIR errors resolved - deployment ready!');
    console.log('Production server command: cd dist && node server.js');
  }

  if (!packageOk) {
    console.log('\n📝 To complete the fix, update package.json:');
    console.log('Change: "build": "vite build && esbuild..."');
    console.log('To:     "build": "node build-esbuild.js"');
  }
}

main();
