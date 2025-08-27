const esbuild = require('esbuild');
const path = require('path');

esbuild
  .build({
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
      '.gif': 'dataurl',
    },
    minify: true,
    sourcemap: true,
    treeShaking: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      'import.meta.env.PROD': 'true',
      'import.meta.env.DEV': 'false',
      'import.meta.env.MODE': '"production"',
    },
    alias: {
      '@': path.resolve('client/src'),
      '@shared': path.resolve('shared'),
    },
  })
  .catch(() => process.exit(1));
