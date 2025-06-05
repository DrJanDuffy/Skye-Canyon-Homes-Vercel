#!/bin/bash

# Pre-deployment Git synchronization script
# This script runs automatically before deployment to sync with GitHub

echo "🚀 Starting pre-deployment Git synchronization..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a Git repository. Initializing..."
    git init
    git remote add origin https://github.com/YOUR_USERNAME/skye-canyon-real-estate.git
fi

# Check git status
echo "📋 Checking Git status..."
git status

# Add all changes
echo "📦 Adding all changes to Git..."
git add .

# Create commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MESSAGE="Auto-deployment sync: ${TIMESTAMP}"

echo "💾 Creating commit: ${COMMIT_MESSAGE}"
git commit -m "${COMMIT_MESSAGE}" || echo "ℹ️ No changes to commit"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main || git push origin master

echo "✅ Pre-deployment Git synchronization completed!"