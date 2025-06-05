# Quick Git Sync Commands for Replit-Cursor Integration

## Essential Commands

### In Replit Shell:
```bash
# Full sync (recommended before/after work sessions)
./sync-git-workflow.sh

# Pull latest changes from GitHub
./sync-git-workflow.sh pull

# Push your changes to GitHub  
./sync-git-workflow.sh push

# Check current sync status
./sync-git-workflow.sh status
```

### In Cursor AI Terminal:
```bash
# Pull latest changes
git pull origin main

# Push your changes
git add .
git commit -m "Your commit message"
git push origin main

# Check status
git status
```

## Setup Instructions

### 1. First Time Setup (Replit):
```bash
# Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Make sync script executable
chmod +x sync-git-workflow.sh

# Test sync
./sync-git-workflow.sh status
```

### 2. First Time Setup (Cursor AI):
```bash
# Configure Git user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Connect to repository
git remote add origin https://github.com/username/repo-name.git
git pull origin main
```

## Workflow Best Practices

### Start of Work Session:
1. **Replit**: `./sync-git-workflow.sh pull`
2. **Cursor**: `git pull origin main`

### During Development:
- Commit frequently with descriptive messages
- Use `./sync-git-workflow.sh` in Replit after significant changes

### End of Work Session:
1. **Replit**: `./sync-git-workflow.sh`
2. **Cursor**: `git add . && git commit -m "Session end" && git push origin main`

## Troubleshooting

### If sync fails:
```bash
# Check what's wrong
git status

# If conflicts exist, resolve manually then:
git add .
git commit -m "Resolve conflicts"
git push origin main
```

### Reset if needed (WARNING: loses uncommitted changes):
```bash
git fetch origin
git reset --hard origin/main
```

This ensures both environments always work with the latest code version.