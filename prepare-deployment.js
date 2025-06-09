import fs from 'fs';
import path from 'path';

/**
 * Deployment Preparation for Task Master AI
 * Ensures all components are ready for Vercel deployment
 */

function prepareForDeployment() {
  console.log("Preparing Task Master AI for Vercel deployment...");
  
  // Verify all required files exist
  const requiredFiles = [
    'taskmaster.json',
    'server/task-manager.ts',
    'client/src/pages/task-dashboard.tsx',
    'package.json'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log("Missing files:", missingFiles);
    return false;
  }
  
  // Check package.json for task-master-ai dependency
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasTaskMasterAI = packageJson.dependencies && packageJson.dependencies['task-master-ai'];
  
  if (!hasTaskMasterAI) {
    console.log("Warning: task-master-ai not found in package.json dependencies");
  }
  
  // Verify route registration in App.tsx
  const appContent = fs.readFileSync('client/src/App.tsx', 'utf8');
  const hasTaskRoute = appContent.includes('/task-dashboard');
  
  if (!hasTaskRoute) {
    console.log("Warning: /task-dashboard route not found in App.tsx");
  }
  
  // Create deployment checklist
  const checklist = {
    timestamp: new Date().toISOString(),
    files: {
      configuration: fs.existsSync('taskmaster.json'),
      taskManager: fs.existsSync('server/task-manager.ts'),
      dashboard: fs.existsSync('client/src/pages/task-dashboard.tsx'),
      routes: hasTaskRoute
    },
    dependencies: {
      taskMasterAI: hasTaskMasterAI,
      totalDependencies: Object.keys(packageJson.dependencies || {}).length
    },
    readyForDeployment: missingFiles.length === 0 && hasTaskMasterAI && hasTaskRoute
  };
  
  fs.writeFileSync('deployment-checklist.json', JSON.stringify(checklist, null, 2));
  
  console.log("Deployment checklist created:");
  console.log(`- Configuration files: ${checklist.files.configuration ? 'Ready' : 'Missing'}`);
  console.log(`- Task manager backend: ${checklist.files.taskManager ? 'Ready' : 'Missing'}`);
  console.log(`- Dashboard interface: ${checklist.files.dashboard ? 'Ready' : 'Missing'}`);
  console.log(`- Route registration: ${checklist.files.routes ? 'Ready' : 'Missing'}`);
  console.log(`- Dependencies: ${checklist.dependencies.totalDependencies} packages`);
  console.log(`- Task Master AI: ${checklist.dependencies.taskMasterAI ? 'Installed' : 'Missing'}`);
  console.log(`- Ready for deployment: ${checklist.readyForDeployment ? 'Yes' : 'No'}`);
  
  if (checklist.readyForDeployment) {
    console.log("\nNext steps:");
    console.log("1. git add .");
    console.log("2. git commit -m 'feat: Task Master AI integration'");
    console.log("3. git push origin main");
    console.log("4. Vercel will automatically deploy the changes");
    console.log("5. Verify at https://sky-canyon-homes.vercel.app/task-dashboard");
  }
  
  return checklist.readyForDeployment;
}

// Run preparation
prepareForDeployment();