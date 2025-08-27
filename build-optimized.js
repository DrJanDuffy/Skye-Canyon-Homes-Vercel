import esbuild from 'esbuild';
import fs from 'fs';

async function buildOptimized() {
  console.log('🚀 Starting optimized build...');
  
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  if (!fs.existsSync('dist/public')) {
    fs.mkdirSync('dist/public');
  }
  if (!fs.existsSync('dist/public/assets')) {
    fs.mkdirSync('dist/public/assets');
  }

  try {
    // Build client with esbuild
    console.log('📦 Building client...');
    await esbuild.build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      minify: true,
      sourcemap: false,
      target: ['es2020'],
      format: 'iife',
      globalName: 'SkyeCanyonApp',
      outfile: 'dist/public/assets/main.js',
      define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'window'
      },
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js'
      },
      plugins: [],
      external: [],
      platform: 'browser'
    });

    console.log('✅ Client built successfully');

    // Create optimized CSS
    console.log('🎨 Creating CSS...');
    const cssContent = `
      /* Skye Canyon Homes - Optimized CSS */
      .min-h-screen { min-height: 100vh; }
      .bg-gradient-to-br { background: linear-gradient(to bottom right, #dbeafe, #bfdbfe); }
      .from-blue-50 { background-color: #eff6ff; }
      .to-blue-100 { background-color: #dbeafe; }
      .bg-white { background-color: white; }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      .max-w-7xl { max-width: 80rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
      .flex { display: flex; }
      .justify-between { justify-content: space-between; }
      .items-center { align-items: center; }
      .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
      .font-bold { font-weight: 700; }
      .text-blue-900 { color: #1e3a8a; }
      .text-blue-700 { color: #1d4ed8; }
      .font-semibold { font-weight: 600; }
      .text-center { text-align: center; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .text-gray-900 { color: #111827; }
      .mb-6 { margin-bottom: 1.5rem; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .text-gray-600 { color: #4b5563; }
      .mb-8 { margin-bottom: 2rem; }
      .max-w-3xl { max-width: 48rem; }
      .bg-white { background-color: white; }
      .rounded-lg { border-radius: 0.5rem; }
      .p-8 { padding: 2rem; }
      .max-w-2xl { max-width: 42rem; }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .mb-4 { margin-bottom: 1rem; }
      .space-y-3 > * + * { margin-top: 0.75rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .text-gray-700 { color: #374151; }
      .mt-8 { margin-top: 2rem; }
      .inline-flex { display: inline-flex; }
      .px-8 { padding-left: 2rem; padding-right: 2rem; }
      .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
      .border { border-width: 1px; }
      .border-transparent { border-color: transparent; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .font-medium { font-weight: 500; }
      .rounded-lg { border-radius: 0.5rem; }
      .text-white { color: white; }
      .bg-blue-600 { background-color: #2563eb; }
      .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
      .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; }
      .duration-200 { transition-duration: 200ms; }
      .mt-16 { margin-top: 4rem; }
      .grid { display: grid; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .gap-8 { gap: 2rem; }
      .p-6 { padding: 1.5rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .mb-4 { margin-bottom: 1rem; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .bg-gray-900 { background-color: #111827; }
      .text-white { color: white; }
      .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      .text-gray-400 { color: #9ca3af; }
      .mt-2 { margin-top: 0.5rem; }
    `;

    fs.writeFileSync('dist/public/assets/main.css', cssContent);
    console.log('✅ CSS created successfully');

    // Create optimized HTML
    console.log('📄 Creating HTML...');
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Skye Canyon Homes | Dr. Jan Duffy, REALTOR®</title>
  <meta name="description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®. Expert market knowledge and personalized service." />
  <link rel="stylesheet" href="/assets/main.css">
</head>
<body>
  <div id="root"></div>
  <script src="/assets/main.js"></script>
</body>
</html>`;

    fs.writeFileSync('dist/public/index.html', htmlContent);
    console.log('✅ HTML created successfully');

    // Create server file
    console.log('🖥️ Creating server...');
    const serverContent = `const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/properties', (req, res) => {
  res.json([
    {
      id: 1,
      address: "123 Skye Canyon Drive, Las Vegas, NV 89166",
      price: 1250000,
      bedrooms: 4,
      bathrooms: "3.5",
      sqft: 3200,
      description: "Luxury Skye Canyon home with mountain views",
      status: "active"
    }
  ]);
});

// All routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`;

    fs.writeFileSync('dist/server.js', serverContent);
    console.log('✅ Server created successfully');

    // Create package.json for production
    const packageJson = {
      "name": "skye-canyon-homes",
      "version": "1.0.0",
      "main": "server.js",
      "scripts": {
        "start": "node server.js"
      },
      "dependencies": {
        "express": "^4.18.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    };

    fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json created successfully');

    console.log('🎉 Build completed successfully!');
    console.log('📁 Output directory: dist/');
    console.log('📄 Files created:');
    console.log('   - dist/public/index.html');
    console.log('   - dist/public/assets/main.js');
    console.log('   - dist/public/assets/main.css');
    console.log('   - dist/server.js');
    console.log('   - dist/package.json');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildOptimized();
