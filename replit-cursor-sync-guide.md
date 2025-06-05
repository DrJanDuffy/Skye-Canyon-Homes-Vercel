# Replit-Cursor AI Git Synchronization Guide

## Overview
This guide ensures seamless synchronization between Replit and Cursor AI through GitHub, keeping both environments working on the latest version.

## Setup Requirements

### 1. GitHub Repository Configuration
- Repository must be connected to both Replit and Cursor AI
- Branch protection rules recommended for `main` branch
- GitHub Actions enabled for automated workflows

### 2. Replit Configuration
```bash
# In Replit Shell, run these commands:

# Set up Git user (replace with your details)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Make sync script executable
chmod +x sync-git-workflow.sh

# Create alias for easy syncing
echo 'alias gitsync="./sync-git-workflow.sh"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Cursor AI Configuration
```bash
# In Cursor terminal, ensure Git is configured:
git config --global user.name "Your Name" 
git config --global user.email "your.email@example.com"

# Set up auto-sync hook (optional)
echo "#!/bin/bash\ngit pull origin main" > .git/hooks/post-checkout
chmod +x .git/hooks/post-checkout
```

## Daily Workflow

### Starting Work Session

#### In Replit:
```bash
# Pull latest changes before starting work
./sync-git-workflow.sh pull
```

#### In Cursor AI:
```bash
# Pull latest changes before starting work  
git pull origin main
```

### During Development

#### Auto-sync from Replit:
```bash
# Quick sync (pull + push)
./sync-git-workflow.sh

# Or individual operations:
./sync-git-workflow.sh pull   # Get latest changes
./sync-git-workflow.sh push   # Push your changes
./sync-git-workflow.sh status # Check sync status
```

#### Manual sync from Cursor AI:
```bash
# Before making changes
git pull origin main

# After making changes
git add .
git commit -m "Feature: description of changes"
git push origin main
```

### End of Work Session

#### From Replit:
```bash
# Ensure all changes are synced
./sync-git-workflow.sh
```

#### From Cursor AI:
```bash
# Ensure all changes are pushed
git add .
git commit -m "End session: sync latest changes"
git push origin main
```

## Automated Synchronization

### GitHub Actions Workflow
The `.github/workflows/replit-cursor-sync.yml` file provides:
- Code validation on each push
- Automatic formatting to maintain consistency
- Build verification to catch issues early

### Replit Auto-sync (Optional)
Add to `.replit` file:
```toml
[deployment]
run = ["sh", "-c", "./sync-git-workflow.sh && npm run dev"]

[nix]
channel = "stable-22_11"

[gitHubImport]
requiredFiles = [".replit", "replit.nix"]

[languages]
[languages.typescript]
pattern = "**/{*.ts,*.js,*.tsx,*.jsx}"

[languages.typescript.languageServer]
start = "typescript-language-server --stdio"
```

## Conflict Resolution

### When Conflicts Occur:
1. **Stop current work**
2. **Run conflict resolution:**
   ```bash
   # In Replit
   ./sync-git-workflow.sh pull
   
   # If conflicts, manually resolve in editor
   git add .
   git commit -m "Resolve merge conflicts"
   git push origin main
   ```

3. **In Cursor AI:**
   ```bash
   git pull origin main
   # Resolve conflicts in Cursor editor
   git add .
   git commit -m "Resolve merge conflicts"
   git push origin main
   ```

## Best Practices

### 1. Commit Frequently
- Small, focused commits are easier to sync
- Use descriptive commit messages
- Commit before switching environments

### 2. Branch Strategy
```bash
# Create feature branches for major changes
git checkout -b feature/voice-search-enhancement
# Work on feature
git push origin feature/voice-search-enhancement
# Create PR to main
```

### 3. File Organization
- Keep environment-specific files in `.gitignore`
- Use consistent formatting (handled by GitHub Actions)
- Avoid large binary files in repo

### 4. Environment Variables
```bash
# In both environments, ensure consistent env vars
cp .env.example .env
# Set same values in both Replit Secrets and local .env
```

## Troubleshooting

### Sync Issues
```bash
# Check git status
git status

# Check remote connection
git remote -v

# Reset to remote if needed (WARNING: loses local changes)
git fetch origin
git reset --hard origin/main
```

### Replit-Specific Issues
```bash
# If Replit git gets confused
rm -rf .git
git init
git remote add origin https://github.com/username/repo.git
git pull origin main
```

### Cursor AI-Specific Issues
```bash
# Refresh git index
git rm -r --cached .
git add .
git commit -m "Refresh git index"
```

## Quick Reference Commands

### Replit Commands:
```bash
gitsync              # Full sync (pull + push)
gitsync pull         # Pull latest changes
gitsync push         # Push local changes  
gitsync status       # Check sync status
```

### Standard Git Commands:
```bash
git status           # Check current state
git log --oneline -5 # See recent commits
git diff             # See local changes
git stash            # Temporarily save changes
git stash pop        # Restore stashed changes
```

## Monitoring Sync Status

### GitHub Repository Insights:
- Check commit history for both environments
- Monitor GitHub Actions for build status
- Use network graph to visualize sync patterns

### Daily Checklist:
- [ ] Start session: Pull latest changes
- [ ] During work: Commit frequently with clear messages
- [ ] End session: Push all changes
- [ ] Verify: Check GitHub shows latest commits from your environment

This synchronization system ensures both Replit and Cursor AI always work with the latest code version, preventing conflicts and maintaining development continuity.