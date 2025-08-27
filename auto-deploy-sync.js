#!/usr/bin/env node

/**
 * Automated deployment with Git synchronization
 * This script handles both git push and deployment preparation
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');

function log(_message) {}

function executeCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'inherit',
      ...options,
    });
    return result;
  } catch (error) {
    log(`Command failed: ${command}`);
    log(`Error: ${error.message}`);
    throw error;
  }
}

function initializeGitIfNeeded() {
  if (!fs.existsSync('.git')) {
    log('Initializing Git repository...');
    executeCommand('git init');
    executeCommand('git branch -M main');
  }

  // Check if remote exists
  try {
    executeCommand('git remote get-url origin', { stdio: 'pipe' });
  } catch {
    log('No remote found. Please add your GitHub repository:');
    log('git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git');
    return false;
  }

  return true;
}

function syncToGitHub() {
  log('Starting Git synchronization...');

  if (!initializeGitIfNeeded()) {
    log('Git remote not configured. Skipping push.');
    return;
  }

  // Configure git user if not set
  try {
    executeCommand('git config user.name', { stdio: 'pipe' });
  } catch {
    executeCommand('git config user.name "Replit Auto-Deploy"');
  }

  try {
    executeCommand('git config user.email', { stdio: 'pipe' });
  } catch {
    executeCommand('git config user.email "auto-deploy@replit.dev"');
  }

  // Add all changes
  log('Adding changes...');
  executeCommand('git add .');

  // Check if there are changes to commit
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8', stdio: 'pipe' });
    if (!status.trim()) {
      log('No changes to commit');
      return;
    }
  } catch (_error) {
    log('Could not check git status');
  }

  // Create commit
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const commitMessage = `Auto-deploy: ${timestamp}`;

  try {
    executeCommand(`git commit -m "${commitMessage}"`);
    log('Changes committed successfully');
  } catch (_error) {
    log('No changes to commit or commit failed');
  }

  // Push to GitHub
  log('Pushing to GitHub...');
  try {
    executeCommand('git push origin main');
    log('Successfully pushed to GitHub');
  } catch (_error) {
    try {
      executeCommand('git push origin master');
      log('Successfully pushed to GitHub (master branch)');
    } catch (error2) {
      log('Push failed. Please check your repository access and remote URL.');
      throw error2;
    }
  }
}

function main() {
  try {
    log('Starting automated deployment sync...');
    syncToGitHub();
    log('Deployment sync completed successfully');
  } catch (_error) {
    log('Deployment sync failed');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { syncToGitHub };
