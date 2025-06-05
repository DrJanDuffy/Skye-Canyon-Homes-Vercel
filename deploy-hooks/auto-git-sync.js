#!/usr/bin/env node

/**
 * Automated Git synchronization for Replit deployments
 * This script runs before deployment to push changes to GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function log(message) {
  console.log(`[Git Sync] ${message}`);
}

function executeCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      ...options 
    });
    return result.trim();
  } catch (error) {
    log(`Command failed: ${command}`);
    log(`Error: ${error.message}`);
    return null;
  }
}

function initializeGitRepo() {
  if (!fs.existsSync('.git')) {
    log('Initializing Git repository...');
    executeCommand('git init');
    
    // Add GitHub remote if not exists
    const remotes = executeCommand('git remote -v') || '';
    if (!remotes.includes('origin')) {
      log('Adding GitHub remote origin...');
      // Note: Update this URL with your actual repository
      executeCommand('git remote add origin https://github.com/YOUR_USERNAME/skye-canyon-real-estate.git');
    }
  }
}

function syncWithGitHub() {
  log('Starting automated Git synchronization...');
  
  try {
    // Initialize if needed
    initializeGitRepo();
    
    // Configure git user if not set
    const gitUser = executeCommand('git config user.name');
    const gitEmail = executeCommand('git config user.email');
    
    if (!gitUser) {
      executeCommand('git config user.name "Replit Deployment"');
    }
    if (!gitEmail) {
      executeCommand('git config user.email "deployment@replit.com"');
    }
    
    // Check current status
    log('Checking repository status...');
    const status = executeCommand('git status --porcelain');
    
    if (!status) {
      log('No changes to commit');
      return;
    }
    
    // Add all changes
    log('Adding changes to staging...');
    executeCommand('git add .');
    
    // Create commit with timestamp
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const commitMessage = `Auto-deployment sync: ${timestamp}`;
    
    log(`Creating commit: ${commitMessage}`);
    executeCommand(`git commit -m "${commitMessage}"`);
    
    // Push to GitHub
    log('Pushing to GitHub repository...');
    const pushResult = executeCommand('git push origin main') || 
                      executeCommand('git push origin master');
    
    if (pushResult !== null) {
      log('Successfully pushed to GitHub');
    } else {
      log('Push failed - check repository configuration');
    }
    
  } catch (error) {
    log(`Synchronization failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncWithGitHub();
}

module.exports = { syncWithGitHub };