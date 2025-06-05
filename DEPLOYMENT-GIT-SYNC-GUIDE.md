# Post-Deployment Git Synchronization Guide

## Overview
After each successful deployment in Replit, use these admin-only commands to sync your changes to GitHub.

## Method 1: Admin Command Line (Recommended)

1. **After successful deployment**, use curl with admin authorization:
   ```bash
   curl -X POST https://your-deployed-app.replit.app/api/admin/trigger-git-sync \
     -H "Authorization: Admin YOUR_ADMIN_KEY"
   ```

2. **Test deployment webhook**:
   ```bash
   curl -X POST https://your-deployed-app.replit.app/api/admin/test-deployment-webhook \
     -H "Authorization: Admin YOUR_ADMIN_KEY"
   ```

## Method 2: Replit Shell Access

1. **In your Replit Shell**, run the admin sync directly:
   ```bash
   curl -X POST http://127.0.0.1:5000/api/admin/trigger-git-sync \
     -H "Authorization: Admin local_admin"
   ```

## Method 3: Command Line (If Git Access Available)

```bash
# Add all changes
git add .

# Create deployment commit
git commit -m "Post-deployment sync: $(date)"

# Push to GitHub
git push origin main
```

## Deployment Workflow

### Before Deployment
1. Make your code changes in Replit
2. Test functionality in development

### During Deployment
1. Click **Deploy** in Replit
2. Wait for deployment to complete successfully
3. Verify deployment is working

### After Successful Deployment
1. **Immediately after success**, trigger git sync using Method 1 or 2
2. Verify changes appear in your GitHub repository
3. Check deployment status dashboard for confirmation

## Status Verification

Check if git sync was successful:
- Visit: `/api/deployment-status` 
- Look for recent commit timestamps
- Verify GitHub repository shows latest changes

## Important Notes

⚠️ **Only sync after successful deployments**
- Failed deployments should not be pushed to GitHub
- Always verify deployment works before syncing

✅ **Git sync preserves your repository history**
- Creates timestamped commits for each deployment
- Maintains clean deployment tracking
- Prevents code loss between Replit and GitHub

## Troubleshooting

**If git sync fails:**
1. Check if GitHub repository is properly configured
2. Verify git credentials are set up in Replit
3. Ensure repository has write access
4. Check console logs for specific error messages

**If no changes to sync:**
- Git will skip creating empty commits
- This is normal behavior when no files changed

## Automation Setup (Future Enhancement)

For fully automated sync, you would need:
1. Replit deployment webhooks configuration
2. External service to monitor deployment status
3. Automated trigger system

Currently using manual trigger approach for reliability and control.