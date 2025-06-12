#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`🔧 ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    execSync(command, { 
      stdio: 'inherit', 
      timeout: 300000, // 5 minutes
      ...options 
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

async function main() {
  try {
    log('Starting esbuild-based production build...');

    // Clean existing build directory
    log('Cleaning dist directory...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist/public/assets', { recursive: true });

    // Step 1: Build CSS with Tailwind
    log('Building CSS assets...');
    executeCommand('npx tailwindcss -i client/src/index.css -o dist/public/assets/main.css --minify');

    // Step 2: Build React app with esbuild
    log('Building React application...');
    executeCommand(`npx esbuild client/src/main.tsx \\
      --bundle \\
      --outfile=dist/public/assets/main.js \\
      --format=esm \\
      --target=es2020 \\
      --jsx=automatic \\
      --jsx-import-source=react \\
      --loader:.tsx=tsx \\
      --loader:.ts=tsx \\
      --loader:.css=css \\
      --loader:.svg=dataurl \\
      --loader:.png=dataurl \\
      --loader:.jpg=dataurl \\
      --loader:.jpeg=dataurl \\
      --minify \\
      --sourcemap \\
      --define:process.env.NODE_ENV='"production"' \\
      --define:import.meta.env.PROD=true \\
      --define:import.meta.env.DEV=false \\
      --external:react \\
      --external:react-dom`);

    // Step 3: Create optimized index.html
    log('Creating optimized index.html...');
    const indexTemplate = fs.readFileSync('client/index.html', 'utf-8');
    const optimizedIndex = indexTemplate
      .replace('src="/src/main.tsx"', 'src="/assets/main.js"')
      .replace('</head>', '  <link rel="stylesheet" href="/assets/main.css">\n</head>');
    
    fs.writeFileSync('dist/public/index.html', optimizedIndex);

    // Step 4: Copy static assets
    log('Copying static assets...');
    if (fs.existsSync('public')) {
      executeCommand('cp -r public/* dist/public/ || true');
    }

    // Step 5: Build server
    log('Building server...');
    executeCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify');

    // Step 6: Create production server that serves static files
    log('Creating production server configuration...');
    const productionServerConfig = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

    fs.writeFileSync('dist/server-static.js', productionServerConfig);

    // Step 7: Create start script
    log('Creating start script...');
    const startScript = `#!/usr/bin/env node
import './server-static.js';
`;
    fs.writeFileSync('dist/start.js', startScript);

    log('✅ Build completed successfully!');
    log('📦 Built files:');
    log('   - dist/public/index.html (optimized HTML)');
    log('   - dist/public/assets/main.js (bundled React app)');
    log('   - dist/public/assets/main.css (compiled CSS)');
    log('   - dist/index.js (original server)');
    log('   - dist/server-static.js (static file server)');
    log('   - dist/start.js (production start script)');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();