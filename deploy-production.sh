#!/bin/bash

echo "Building production deployment..."

# Clean existing build
rm -rf dist
mkdir -p dist/public/assets

# Build server
echo "Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify

# Copy public assets
echo "Copying public assets..."
cp -r public/* dist/public/ 2>/dev/null || true

echo "Production build completed successfully!"
echo "To run production: NODE_ENV=production node dist/index.js"