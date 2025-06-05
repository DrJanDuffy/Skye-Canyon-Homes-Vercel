#!/bin/bash

# Deployment script with automatic Git synchronization
# Run this script before deploying to automatically push to GitHub

echo "Starting deployment with Git synchronization..."

# Function to check if git is configured
check_git_config() {
    if ! git config user.name >/dev/null 2>&1; then
        echo "Configuring Git user..."
        git config user.name "Replit Deployment"
        git config user.email "deployment@replit.dev"
    fi
}

# Function to initialize git repository if needed
init_git_repo() {
    if [ ! -d ".git" ]; then
        echo "Initializing Git repository..."
        git init
        git branch -M main
        echo "Git repository initialized. Please add your remote:"
        echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
        return 1
    fi
    return 0
}

# Function to sync with GitHub
sync_with_github() {
    echo "Syncing with GitHub..."
    
    # Check if remote exists
    if ! git remote get-url origin >/dev/null 2>&1; then
        echo "No Git remote configured. Please run:"
        echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
        return 1
    fi
    
    # Add all changes
    git add .
    
    # Check if there are changes
    if git diff --staged --quiet; then
        echo "No changes to commit"
    else
        # Create commit with timestamp
        TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
        git commit -m "Pre-deployment sync: $TIMESTAMP"
        echo "Changes committed"
    fi
    
    # Push to GitHub
    echo "Pushing to GitHub..."
    if git push origin main 2>/dev/null || git push origin master 2>/dev/null; then
        echo "Successfully pushed to GitHub"
    else
        echo "Push failed. Please check your repository access."
        return 1
    fi
    
    return 0
}

# Main execution
main() {
    # Initialize git if needed
    if ! init_git_repo; then
        echo "Please configure Git repository and re-run this script"
        exit 1
    fi
    
    # Configure git
    check_git_config
    
    # Sync with GitHub
    if sync_with_github; then
        echo "Git synchronization completed successfully"
        echo ""
        echo "Your code has been pushed to GitHub"
        echo "You can now proceed with Replit deployment"
        echo ""
        echo "To deploy:"
        echo "1. Click the Deploy button in Replit"
        echo "2. Your latest changes are now on GitHub"
    else
        echo "Git synchronization failed"
        exit 1
    fi
}

# Run main function
main