import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, GitBranch, Upload } from 'lucide-react';

interface DeploymentStatus {
  gitConfigured: boolean;
  lastSync: string | null;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  commitCount: number;
  remoteUrl: string | null;
}

export default function DeploymentStatus() {
  const [status, setStatus] = useState<DeploymentStatus>({
    gitConfigured: false,
    lastSync: null,
    syncStatus: 'idle',
    commitCount: 0,
    remoteUrl: null
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkDeploymentStatus();
  }, []);

  const checkDeploymentStatus = async () => {
    try {
      const response = await fetch('/api/deployment-status');
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error('Failed to check deployment status:', error);
    }
  };

  const triggerSync = async () => {
    // Security: Sync functionality moved to admin-only endpoints
    setStatus(prev => ({ ...prev, syncStatus: 'error' }));
    console.log('Git sync functionality restricted to admin access only');
  };

  const triggerDeploymentSuccess = async () => {
    try {
      const response = await fetch('/api/deployment-success', { method: 'POST' });
      const result = await response.json();
      
      if (response.ok) {
        setStatus(prev => ({ 
          ...prev, 
          lastSync: new Date().toISOString(),
          commitCount: prev.commitCount + 1
        }));
        console.log('Post-deployment sync triggered:', result.message);
      }
    } catch (error) {
      console.error('Failed to trigger deployment success:', error);
    }
  };

  if (!isVisible && status.gitConfigured) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Deployment Status</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>

      {isVisible && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {status.gitConfigured ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-sm">
              Git {status.gitConfigured ? 'configured' : 'not configured'}
            </span>
          </div>

          {status.remoteUrl && (
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {status.remoteUrl}
              </span>
            </div>
          )}

          {status.lastSync && (
            <div className="text-xs text-gray-500">
              Last sync: {new Date(status.lastSync).toLocaleString()}
            </div>
          )}

          <button
            onClick={triggerSync}
            disabled={status.syncStatus === 'syncing'}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm py-2 px-3 rounded-md transition-colors"
          >
            <Upload className="w-4 h-4" />
            {status.syncStatus === 'syncing' ? 'Syncing...' : 'Sync to GitHub'}
          </button>

          {status.syncStatus === 'error' && (
            <div className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              Sync failed. Check git configuration.
            </div>
          )}

          {status.syncStatus === 'success' && (
            <div className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
              Successfully synced to GitHub
            </div>
          )}
        </div>
      )}
    </div>
  );
}