import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, GitBranch, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SyncStatus {
  success: boolean;
  message: string;
  commit_message?: string;
  timestamp?: string;
}

export default function DeploymentSyncManager() {
  const [isSync, setIsSync] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [deploymentInfo, setDeploymentInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkDeploymentStatus();
  }, []);

  const checkDeploymentStatus = async () => {
    try {
      const response = await fetch('/api/deployment-status');
      const data = await response.json();
      setDeploymentInfo(data);
    } catch (err) {
      console.error('Failed to check deployment status:', err);
    }
  };

  const triggerGitSync = async () => {
    setIsSync(true);
    setError(null);
    setSyncStatus(null);

    try {
      const response = await fetch('/api/trigger-git-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSyncStatus(data);
      } else {
        setError(data.error || 'Git sync failed');
      }
    } catch (err) {
      setError('Failed to trigger git sync');
    } finally {
      setIsSync(false);
    }
  };

  const triggerDeploymentWebhook = async () => {
    setIsSync(true);
    setError(null);

    try {
      const response = await fetch('/api/test-deployment-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSyncStatus(data);
        await checkDeploymentStatus();
      } else {
        setError(data.error || 'Deployment webhook failed');
      }
    } catch (err) {
      setError('Failed to trigger deployment webhook');
    } finally {
      setIsSync(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Post-Deployment Git Synchronization
        </CardTitle>
        <CardDescription>
          Sync your successful deployments to GitHub repository
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deployment Status */}
        {deploymentInfo && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Deployment Status</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Last Build:</strong> {deploymentInfo.last_build || 'Unknown'}</p>
              <p><strong>Status:</strong> 
                <Badge variant={deploymentInfo.is_deployed ? "default" : "secondary"} className="ml-2">
                  {deploymentInfo.is_deployed ? 'Deployed' : 'Not Deployed'}
                </Badge>
              </p>
              {deploymentInfo.last_sync && (
                <p><strong>Last Git Sync:</strong> {new Date(deploymentInfo.last_sync).toLocaleString()}</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={triggerGitSync}
            disabled={isSync}
            className="flex-1"
          >
            {isSync ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <GitBranch className="h-4 w-4 mr-2" />
                Trigger Manual Sync
              </>
            )}
          </Button>

          <Button 
            onClick={triggerDeploymentWebhook}
            disabled={isSync}
            variant="outline"
            className="flex-1"
          >
            {isSync ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Test Deployment Webhook'
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {syncStatus && syncStatus.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div>
                <strong>{syncStatus.message}</strong>
                {syncStatus.commit_message && (
                  <p className="text-sm mt-1">Commit: {syncStatus.commit_message}</p>
                )}
                {syncStatus.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(syncStatus.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p><strong>How to use:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>After a successful deployment in Replit, click "Trigger Manual Sync"</li>
            <li>This will push your latest changes to your GitHub repository</li>
            <li>Use "Test Deployment Webhook" to simulate the automated process</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="text-sm">
              <strong>Note:</strong> Git credentials must be configured in your Replit environment 
              for synchronization to work. This ensures your deployed changes are preserved 
              in your repository.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}