import DeploymentSyncManager from '@/components/deployment-sync-manager';

export default function DeploymentSyncPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Deployment Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage and synchronize your deployment changes with your GitHub repository. 
            This ensures your deployed code stays in sync with your version control.
          </p>
        </div>
        
        <DeploymentSyncManager />
        
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Deployment Workflow</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h3 className="font-medium">Make Changes in Replit</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Edit your code in the Replit environment</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h3 className="font-medium">Deploy to Production</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click the Deploy button in Replit and wait for success</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h3 className="font-medium">Sync to GitHub</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use the "Trigger Manual Sync" button above to push changes to your repository</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">✓</div>
                <div>
                  <h3 className="font-medium">Verification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check your GitHub repository to confirm the sync was successful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}