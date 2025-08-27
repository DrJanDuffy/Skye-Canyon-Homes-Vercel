#!/usr/bin/env node

/**
 * Replit-compatible deployment sync script
 * Integrates with Replit's deployment process
 */

const { spawn } = require('child_process');

function log(message) {
  console.log(`[Deploy Sync] ${message}`);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      ...options,
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function checkGitStatus() {
  try {
    await runCommand('git', ['status'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

async function syncToGitHub() {
  log('Starting GitHub synchronization...');

  if (!(await checkGitStatus())) {
    log('Git not available or repository not initialized');
    log('Please configure git repository manually if needed');
    return;
  }

  try {
    // Add changes
    log('Staging changes...');
    await runCommand('git', ['add', '.']);

    // Create commit
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    log(`Creating commit with timestamp: ${timestamp}`);

    try {
      await runCommand('git', ['commit', '-m', `Deployment sync: ${timestamp}`]);
      log('Changes committed');
    } catch {
      log('No changes to commit');
    }

    // Push to remote
    log('Pushing to GitHub...');
    try {
      await runCommand('git', ['push', 'origin', 'main']);
      log('Successfully pushed to GitHub');
    } catch {
      try {
        await runCommand('git', ['push', 'origin', 'master']);
        log('Successfully pushed to GitHub (master branch)');
      } catch {
        log('Push failed - please check repository configuration');
      }
    }
  } catch (error) {
    log(`Sync failed: ${error.message}`);
  }
}

// Hook for Replit deployments
function setupDeploymentHook() {
  log('Setting up deployment hook...');

  // Create a deployment trigger file
  const deployScript = `#!/bin/bash
# Replit deployment hook
echo "Running pre-deployment sync..."
node replit-deploy-sync.js
echo "Sync completed"
`;

  require('fs').writeFileSync('.replit-deploy', deployScript, { mode: 0o755 });
  log('Deployment hook created');
}

async function main() {
  log('Replit deployment sync initialized');

  if (process.argv.includes('--setup')) {
    setupDeploymentHook();
    return;
  }

  if (process.argv.includes('--sync')) {
    await syncToGitHub();
    return;
  }

  // Default behavior
  await syncToGitHub();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncToGitHub, setupDeploymentHook };
