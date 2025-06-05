# Automated Git Push for Deployments

This project now includes automated Git synchronization that pushes your changes to GitHub whenever you deploy.

## Quick Setup

1. **Configure your GitHub repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   ```

2. **Before deploying, run**:
   ```bash
   ./deploy-with-git-sync.sh
   ```

3. **Then deploy normally** using Replit's Deploy button

## Available Scripts

### `deploy-with-git-sync.sh`
Main deployment script that:
- Initializes Git repository if needed
- Adds all changes to Git
- Creates a timestamped commit
- Pushes to your GitHub repository
- Prepares for Replit deployment

### `auto-deploy-sync.js`
Node.js version of the sync script that can be integrated into build processes:
```bash
node auto-deploy-sync.js
```

## Automatic Features

- **Git initialization**: Automatically sets up Git if not already configured
- **User configuration**: Sets deployment user credentials
- **Change detection**: Only commits when there are actual changes
- **Timestamped commits**: Each deployment gets a unique timestamp
- **Branch flexibility**: Works with both `main` and `master` branches
- **Error handling**: Provides clear feedback on any issues

## Deployment Workflow

1. Make your code changes in Replit
2. Run `./deploy-with-git-sync.sh` to sync with GitHub
3. Click Deploy in Replit
4. Your GitHub repository is automatically updated

## Troubleshooting

**No remote configured**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

**Permission denied**:
- Ensure your GitHub repository allows pushes
- Check that your SSH keys or tokens are configured

**Push failed**:
- Verify the repository URL is correct
- Check your GitHub repository access permissions

## Integration with CI/CD

The automated git push ensures your GitHub repository stays synchronized, enabling:
- Continuous integration workflows
- Code backup and version history
- Collaboration with team members
- External deployment pipelines

Your deployments now automatically maintain a complete Git history on GitHub.