#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Production Deployment Script');
console.log('================================');

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

try {
  // Step 1: Clean and prepare
  log('Cleaning previous build artifacts...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/public', { recursive: true });
  fs.mkdirSync('dist/public/assets', { recursive: true });

  // Step 2: Build React application
  log('Building React application...');
  execSync(`npx esbuild client/src/main.tsx \\
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
    --external:react-dom`, { 
    stdio: 'inherit'
  });

  // Step 3: Build CSS with Tailwind
  log('Building optimized CSS...');
  execSync('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify', {
    stdio: 'inherit'
  });

  // Step 4: Process HTML template
  log('Processing HTML template...');
  let htmlContent = fs.readFileSync('client/index.html', 'utf-8');
  
  // Replace development scripts with production assets
  htmlContent = htmlContent.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    `<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script type="module" src="/assets/main.js"></script>`
  );

  // Add CSS link
  htmlContent = htmlContent.replace(
    '</head>',
    '    <link rel="stylesheet" href="/assets/main.css">\n  </head>'
  );

  fs.writeFileSync('dist/public/index.html', htmlContent);

  // Step 5: Copy public assets
  if (fs.existsSync('public')) {
    log('Copying public assets...');
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

  // Step 6: Build server
  log('Building server bundle...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });

  // Step 7: Create production startup script
  log('Creating production startup script...');
  const startupScript = `#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting Skye Canyon Real Estate Platform...');
console.log('Production mode enabled');

const server = spawn('node', [path.join(__dirname, 'index.js')], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: process.env.PORT || '5000'
  }
});

server.on('close', (code) => {
  console.log(\`Server process exited with code \${code}\`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.kill('SIGINT');
});
`;

  fs.writeFileSync('dist/start.js', startupScript);
  execSync('chmod +x dist/start.js');

  // Step 8: Create deployment verification
  log('Creating deployment verification...');
  const deploymentInfo = {
    buildTime: new Date().toISOString(),
    version: '1.0.0',
    environment: 'production',
    files: {
      server: 'index.js',
      client: 'public/index.html',
      assets: ['public/assets/main.js', 'public/assets/main.css'],
      startup: 'start.js'
    },
    deployment: {
      command: 'node start.js',
      port: 'PORT environment variable or 5000',
      host: '0.0.0.0'
    }
  };

  fs.writeFileSync('dist/deployment-info.json', JSON.stringify(deploymentInfo, null, 2));

  // Step 9: Verify build integrity
  log('Verifying build integrity...');
  const requiredFiles = [
    'dist/index.js',
    'dist/public/index.html',
    'dist/public/assets/main.js',
    'dist/public/assets/main.css',
    'dist/start.js'
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
    const stats = fs.statSync(file);
    if (stats.size === 0) {
      throw new Error(`File is empty: ${file}`);
    }
  }

  // Step 10: Display deployment summary
  log('✅ Production deployment completed successfully!');
  console.log('\n📦 Build Summary:');
  console.log(`   Server bundle: ${(fs.statSync('dist/index.js').size / 1024).toFixed(1)}KB`);
  console.log(`   Client assets: ${(fs.statSync('dist/public/assets/main.js').size / 1024).toFixed(1)}KB`);
  console.log(`   Styles: ${(fs.statSync('dist/public/assets/main.css').size / 1024).toFixed(1)}KB`);
  
  console.log('\n🚀 Deployment Instructions:');
  console.log('   1. Deploy the entire "dist" directory');
  console.log('   2. Set NODE_ENV=production');
  console.log('   3. Run: node start.js');
  console.log('   4. Server will listen on PORT environment variable or 5000');

  console.log('\n🔧 Replit Deployment:');
  console.log('   The build is now ready for Replit deployment.');
  console.log('   Use the Deploy button to deploy to production.');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}