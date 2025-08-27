import esbuild from 'esbuild';
import fs from 'fs';

async function buildWorking() {
  console.log('🚀 Starting working build...');
  
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
    // Build client with esbuild - React-specific configuration
    console.log('📦 Building client...');
    await esbuild.build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      minify: false, // Disable minification for debugging
      sourcemap: true, // Enable sourcemaps for debugging
      target: ['es2020'],
      format: 'iife',
      globalName: 'SkyeCanyonApp',
      outfile: 'dist/public/assets/main.js',
      define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'window',
        'process.env': '{}'
      },
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js'
      },
      jsx: 'automatic', // Enable automatic JSX transformation
      jsxImportSource: 'react', // Specify React as JSX source
      platform: 'browser',
      mainFields: ['browser', 'module', 'main'],
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      external: [], // Don't externalize any packages
      metafile: true, // Generate metadata for analysis
      write: true
    });

    console.log('✅ Client built successfully');

    // Create simple CSS
    console.log('🎨 Creating CSS...');
    const cssContent = `
      /* Skye Canyon Homes - Working CSS */
      .min-h-screen { min-height: 100vh; }
      .bg-gradient-to-br { background: linear-gradient(to bottom right, #dbeafe, #bfdbfe); }
      .bg-white { background-color: white; }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
      .max-w-7xl { max-width: 80rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
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
      .font-medium { font-weight: 500; }
      .text-white { color: white; }
      .bg-blue-600 { background-color: #2563eb; }
      .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
      .transition-colors { transition-property: color, background-color, border-color; }
      .duration-200 { transition-duration: 200ms; }
      .mt-16 { margin-top: 4rem; }
      .grid { display: grid; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .gap-8 { gap: 2rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .mb-4 { margin-bottom: 1rem; }
      .text-xl { font-size: 1.125rem; line-height: 1.75rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .bg-gray-900 { background-color: #111827; }
      .text-white { color: white; }
      .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      .text-gray-400 { color: #9ca3af; }
      .mt-2 { margin-top: 0.5rem; }
    `;

    fs.writeFileSync('dist/public/assets/main.css', cssContent);
    console.log('✅ CSS created successfully');

    // Copy the original HTML file instead of creating a new one
    console.log('📄 Copying original HTML...');
    if (fs.existsSync('client/index.html')) {
      fs.copyFileSync('client/index.html', 'dist/public/index.html');
      console.log('✅ Original HTML copied successfully');
      
      // Now update the HTML file to fix script and CSS references
      console.log('🔧 Updating HTML references...');
      let htmlContent = fs.readFileSync('dist/public/index.html', 'utf8');
      
      // Replace the script reference from /src/main.tsx to /assets/main.js
      htmlContent = htmlContent.replace(
        'src="/src/main.tsx"',
        'src="/assets/main.js"'
      );
      
      // Remove type="module" from the script tag
      htmlContent = htmlContent.replace(
        '<script type="module" src="/assets/main.js"></script>',
        '<script src="/assets/main.js"></script>'
      );
      
      // Add CSS link after the canonical link
      if (!htmlContent.includes('/assets/main.css')) {
        htmlContent = htmlContent.replace(
          '<link rel="canonical" href="/" />',
          '<link rel="canonical" href="/" />\n    <link rel="stylesheet" href="/assets/main.css">'
        );
      }
      
      // IMPORTANT: Remove the React root div and script to preserve original HTML
      htmlContent = htmlContent.replace(
        '    <!-- RealScout initialization will be handled by React -->\n    <div id="root"></div>\n    <script type="module" src="/assets/main.js"></script>',
        '    <!-- RealScout Web Components will initialize automatically -->\n    <realscout-office-listings agent-encoded-id="QWdlbnQtMjI1MDUw" search-type="buy" location="Skye Canyon, Las Vegas, NV" data-production="true"></realscout-office-listings>'
      );
      
      fs.writeFileSync('dist/public/index.html', htmlContent);
      console.log('✅ HTML references updated successfully - Original rich content preserved!');
    } else {
      console.log('⚠️ Original HTML not found, creating basic HTML');
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
    }

    // Create server
    console.log('🖥️ Creating server...');
    const serverContent = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
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
      description: "Luxury Skye Canyon home with mountain views and TPC golf course access",
      imageUrl: "/images/luxury-home-1.jpg",
      status: "active",
      featured: true
    }
  ]);
});

// All routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

export default app;`;

    fs.writeFileSync('dist/server.js', serverContent);
    console.log('✅ Server created successfully');

    // Create package.json
    console.log('📦 Creating package.json...');
    const packageJson = {
      name: "skye-canyon-homes",
      version: "1.0.0",
      type: "module",
      main: "server.js",
      dependencies: {
        "express": "^4.18.2"
      },
      engines: {
        "node": ">=18.0.0"
      }
    };

    fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json created successfully');

    console.log('🎉 Build completed successfully!');
    console.log('📁 Output directory: dist/');
    console.log('📄 Files created:');
    console.log('   - dist/public/index.html (preserved from original)');
    console.log('   - dist/public/assets/main.js');
    console.log('   - dist/public/assets/main.css');
    console.log('   - dist/server.js');
    console.log('   - dist/package.json');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildWorking();
