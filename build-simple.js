#!/usr/bin/env node

/**
 * Simple, working build script for Skye Canyon Homes
 * Creates production-ready dist folder
 */

import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Skye Canyon Homes build...');

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Create directories
fs.mkdirSync('dist/public/assets', { recursive: true });

console.log('📁 Created dist directory structure');

// Build client bundle
async function buildClient() {
  try {
    console.log('🔨 Building client bundle...');
    
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
        '.jsx': 'jsx',
        '.js': 'jsx',
        '.css': 'css'
      },
      minify: true,
      sourcemap: false,
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.PROD': 'true',
        'import.meta.env.DEV': 'false'
      },
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
        '@shared': path.resolve(__dirname, 'shared')
      },
      platform: 'browser'
    });
    
    console.log('✅ Client bundle built successfully');
  } catch (error) {
    console.error('❌ Client build failed:', error.message);
    throw error;
  }
}

// Build CSS
async function buildCSS() {
  try {
    console.log('🎨 Building CSS...');
    
    // Simple CSS copy for now (Tailwind build can be added later)
    const cssContent = fs.readFileSync('client/src/index-simple.css', 'utf-8');
    fs.writeFileSync('dist/public/assets/main.css', cssContent);
    
    console.log('✅ CSS built successfully');
  } catch (error) {
    console.error('❌ CSS build failed:', error.message);
    throw error;
  }
}

// Process HTML
async function processHTML() {
  try {
    console.log('📄 Processing HTML...');
    
    let htmlContent = fs.readFileSync('client/index.html', 'utf-8');
    
    // Replace dev script with production assets
    htmlContent = htmlContent
      .replace(
        '<script type="module" src="/src/main.tsx"></script>',
        '<script type="module" src="/assets/main.js"></script>'
      )
      .replace(
        '</head>',
        '    <link rel="stylesheet" href="/assets/main.css">\n  </head>'
      );
    
    fs.writeFileSync('dist/public/index.html', htmlContent);
    
    console.log('✅ HTML processed successfully');
  } catch (error) {
    console.error('❌ HTML processing failed:', error.message);
    throw error;
  }
}

// Build server
async function buildServer() {
  try {
    console.log('🖥️ Building server...');
    
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      outfile: 'dist/server.js',
      format: 'esm',
      target: 'node18',
      platform: 'node',
      packages: 'external',
      loader: {
        '.ts': 'ts'
      },
      minify: true,
      sourcemap: false,
      treeShaking: true,
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      external: [
        'express',
        'postgres',
        'drizzle-orm',
        '@neondatabase/serverless',
        'express-session',
        'connect-pg-simple',
        'passport',
        'passport-local',
        'compression',
        'cors',
        'express-rate-limit',
        'memorystore',
        'ws',
        '@anthropic-ai/sdk'
      ]
    });
    
    console.log('✅ Server built successfully');
  } catch (error) {
    console.error('❌ Server build failed:', error.message);
    throw error;
  }
}

// Create package.json
async function createPackageJson() {
  try {
    console.log('📦 Creating production package.json...');
    
    const productionPackage = {
      name: 'skye-canyon-homes',
      version: '1.0.0',
      type: 'module',
      scripts: {
        start: 'node server.js'
      },
      dependencies: {
        express: '^4.21.2',
        postgres: '^3.4.7',
        'drizzle-orm': '^0.39.1',
        '@neondatabase/serverless': '^0.10.4',
        'express-session': '^1.18.1',
        'connect-pg-simple': '^10.0.0',
        passport: '^0.7.0',
        'passport-local': '^1.0.0',
        compression: '^1.8.0',
        cors: '^2.8.5',
        'express-rate-limit': '^7.5.0',
        memorystore: '^1.6.7',
        ws: '^8.18.0',
        '@anthropic-ai/sdk': '^0.37.0'
      }
    };
    
    fs.writeFileSync(
      'dist/package.json',
      JSON.stringify(productionPackage, null, 2)
    );
    
    console.log('✅ Production package.json created');
  } catch (error) {
    console.error('❌ Package.json creation failed:', error.message);
    throw error;
  }
}

// Main build function
async function main() {
  try {
    console.time('⏱️ Total build time');
    
    await buildClient();
    await buildCSS();
    await processHTML();
    await buildServer();
    await createPackageJson();
    
    console.timeEnd('⏱️ Total build time');
    
    // Verify build
    const files = [
      'dist/public/index.html',
      'dist/public/assets/main.js',
      'dist/public/assets/main.css',
      'dist/server.js',
      'dist/package.json'
    ];
    
    console.log('\n📋 Build verification:');
    for (const file of files) {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`✅ ${file} (${Math.round(stats.size / 1024)} KB)`);
      } else {
        console.log(`❌ ${file} - MISSING`);
      }
    }
    
    console.log('\n🎉 Build completed successfully!');
    console.log('🚀 Ready for deployment!');
    console.log('💡 Run: cd dist && npm install && npm start');
    
  } catch (error) {
    console.error('\n💥 Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build
main();
