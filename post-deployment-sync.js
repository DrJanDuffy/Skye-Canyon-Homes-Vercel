#!/usr/bin/env node

/**
 * Post-deployment Git synchronization
 * This script runs AFTER successful deployment to push changes to GitHub
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');

function log(_message) {}

function executeCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      ...options,
    });
    return result.trim();
  } catch (error) {
    log(`Command failed: ${command}`);
    log(`Error: ${error.message}`);
    return null;
  }
}

function checkDeploymentSuccess() {
  // Check if deployment was successful by looking for deployment markers
  // This could be a file created by successful deployment or environment variable
  return (
    process.env.DEPLOYMENT_SUCCESS === 'true' ||
    fs.existsSync('.deployment-success') ||
    process.argv.includes('--deployment-success')
  );
}

function createDeploymentRecord() {
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    success: true,
    version: process.env.npm_package_version || '1.0.0',
    commit: executeCommand('git rev-parse HEAD') || 'unknown',
  };

  fs.writeFileSync('.last-deployment.json', JSON.stringify(deploymentInfo, null, 2));
  return deploymentInfo;
}

async function syncToGitHubAfterDeployment() {
  log('Starting post-deployment Git synchronization...');

  if (!checkDeploymentSuccess()) {
    log('Deployment was not successful - skipping Git sync');
    return;
  }

  // Initialize git if needed
  if (!fs.existsSync('.git')) {
    log('Git repository not initialized - skipping sync');
    log('To enable auto-sync, run: git init && git remote add origin YOUR_REPO_URL');
    return;
  }

  // Check if remote exists
  const remoteUrl = executeCommand('git remote get-url origin');
  if (!remoteUrl) {
    log('No Git remote configured - skipping sync');
    log('To enable auto-sync, run: git remote add origin YOUR_REPO_URL');
    return;
  }

  try {
    // Configure git user if not set
    if (!executeCommand('git config user.name')) {
      executeCommand('git config user.name "Replit Auto-Deploy"');
    }
    if (!executeCommand('git config user.email')) {
      executeCommand('git config user.email "auto-deploy@replit.dev"');
    }

    // Create deployment record
    const deploymentInfo = createDeploymentRecord();

    // Add all changes including deployment record
    log('Adding changes to Git...');
    executeCommand('git add .');

    // Check if there are changes to commit
    const status = executeCommand('git status --porcelain');
    if (!status) {
      log('No changes to commit after successful deployment');
      return;
    }

    // Create commit with deployment info
    const commitMessage = `Successful deployment: ${deploymentInfo.timestamp}`;
    log(`Creating commit: ${commitMessage}`);

    const commitResult = executeCommand(`git commit -m "${commitMessage}"`);
    if (!commitResult) {
      log('Failed to create commit');
      return;
    }

    // Push to GitHub
    log('Pushing to GitHub...');
    const pushResult =
      executeCommand('git push origin main') || executeCommand('git push origin master');

    if (pushResult !== null) {
      log('Successfully pushed deployment to GitHub');
      log(`Repository: ${remoteUrl}`);
      log(`Commit: ${deploymentInfo.commit}`);
    } else {
      log('Failed to push to GitHub - check repository access');
    }
  } catch (error) {
    log(`Post-deployment sync failed: ${error.message}`);
  }
}

// Webhook endpoint for deployment success
function createDeploymentWebhook() {
  const _webhookCode = `
// Add this to your deployment success handler
app.post('/api/deployment-success', (req, res) => {
  const { execSync } = require('child_process');
  
  try {
    // Mark deployment as successful
    require('fs').writeFileSync('.deployment-success', new Date().toISOString());
    
    // Trigger post-deployment sync
    execSync('node post-deployment-sync.js --deployment-success', { 
      stdio: 'inherit' 
    });
    
    res.json({ success: true, message: 'Post-deployment sync triggered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger sync' });
  }
});
`;

  log('Webhook code for deployment success:');
}

// Run if called directly
if (require.main === module) {
  if (process.argv.includes('--create-webhook')) {
    createDeploymentWebhook();
  } else {
    syncToGitHubAfterDeployment();
  }
}

module.exports = { syncToGitHubAfterDeployment, createDeploymentRecord };
