#!/bin/bash

# Replit-specific deployment script
# Ensures ESBuild process runs correctly in Replit environment

echo "🚀 Replit deployment starting..."

# Clean any existing build
rm -rf dist

# Run ESBuild process
node build-esbuild.js

# Verify build success
if [ ! -f "dist/server.js" ]; then
    echo "❌ Build failed - server.js not found"
    exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
    echo "❌ Build failed - index.html not found"
    exit 1
fi

echo "✅ Build verification passed"
echo "📁 Starting production server..."

# Start production server
cd dist && node server.js