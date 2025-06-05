#!/bin/bash

# Git Sync Workflow for Replit <-> Cursor AI via GitHub
# This script ensures both environments stay synchronized

echo "🔄 Starting Git Sync Workflow..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Initializing..."
    git init
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
fi

# Function to sync from remote (pull latest changes)
sync_from_remote() {
    echo "📥 Pulling latest changes from GitHub..."
    
    # Stash any local changes
    git stash push -m "Auto-stash before sync $(date)"
    
    # Pull latest changes
    git pull origin main
    
    # Pop stashed changes if any
    if git stash list | grep -q "Auto-stash before sync"; then
        echo "🔄 Restoring local changes..."
        git stash pop
    fi
    
    echo "✅ Sync from remote complete"
}

# Function to sync to remote (push local changes)
sync_to_remote() {
    echo "📤 Pushing local changes to GitHub..."
    
    # Add all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        echo "ℹ️ No changes to commit"
        return
    fi
    
    # Commit with timestamp
    git commit -m "Auto-sync from Replit: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Push to remote
    git push origin main
    
    echo "✅ Sync to remote complete"
}

# Function to handle merge conflicts
handle_conflicts() {
    echo "⚠️ Merge conflicts detected. Manual resolution required."
    echo "Conflicts in the following files:"
    git status --porcelain | grep "^UU"
    echo ""
    echo "Please resolve conflicts manually, then run:"
    echo "git add ."
    echo "git commit -m 'Resolve merge conflicts'"
    echo "git push origin main"
}

# Main sync function
perform_sync() {
    # First, try to pull latest changes
    sync_from_remote
    
    # Check for merge conflicts
    if git ls-files -u | grep -q .; then
        handle_conflicts
        return 1
    fi
    
    # Then push any local changes
    sync_to_remote
    
    echo "🎉 Git sync completed successfully!"
}

# Check command line arguments
case "$1" in
    "pull")
        sync_from_remote
        ;;
    "push")
        sync_to_remote
        ;;
    "status")
        echo "📊 Git Status:"
        git status --short
        echo ""
        echo "📋 Recent commits:"
        git log --oneline -5
        ;;
    *)
        perform_sync
        ;;
esac