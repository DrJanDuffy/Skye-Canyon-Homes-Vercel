import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, CheckCircle, RefreshCw, TestTube, XCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/queryClient';

interface ValidationResult {
  isValid: boolean;
  status: string;
  message: string;
  errorDetails?: any;
}

export default function FollowUpBossStatus() {
  return (
    <>
      <Helmet>
        <title>Follow Up Boss Status | Dr. Jan Duffy REALTOR®</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/followup-boss-status" />
      </Helmet>
      
      <div>
        {(() => {
          const queryClient = useQueryClient();

  const {
    data: validation,
    isLoading,
    error,
  } = useQuery<ValidationResult>({
    queryKey: ['/api/followup-boss/validate'],
    refetchInterval: 30000, // Check every 30 seconds
  });

  const testMutation = useMutation({
    mutationFn: () => apiRequest('/api/followup-boss/test', 'POST', {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/followup-boss/validate'] });
    },
  });

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'missing_key':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'expired':
        return 'destructive';
      case 'missing_key':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow Up Boss Integration Status</h1>
        <p className="text-gray-600">Monitor and manage your CRM API connection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(validation?.status)}
              API Connection Status
            </CardTitle>
            <CardDescription>Current status of your Follow Up Boss API integration</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Connection Status:</span>
              <Badge variant={getStatusColor(validation?.status)}>
                {validation?.status || 'Unknown'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">API Valid:</span>
              <Badge variant={validation?.isValid ? 'default' : 'destructive'}>
                {validation?.isValid ? 'Yes' : 'No'}
              </Badge>
            </div>

            <Separator />

            <div>
              <p className="font-medium mb-2">Status Message:</p>
              <p className="text-sm text-gray-600">{validation?.message}</p>
            </div>

            {validation?.errorDetails && (
              <div>
                <p className="font-medium mb-2">Error Details:</p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {typeof validation.errorDetails === 'string'
                    ? validation.errorDetails
                    : JSON.stringify(validation.errorDetails, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions & Testing</CardTitle>
            <CardDescription>
              Test your API connection and perform maintenance tasks
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ['/api/followup-boss/validate'] })
              }
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>

            <Button
              onClick={() => testMutation.mutate()}
              disabled={testMutation.isPending || validation?.status !== 'active'}
              className="w-full"
            >
              <TestTube className="h-4 w-4 mr-2" />
              {testMutation.isPending ? 'Testing...' : 'Test API Connection'}
            </Button>

            {testMutation.isSuccess && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Test Successful</AlertTitle>
                <AlertDescription>
                  API connection test completed successfully. Lead integration is working.
                </AlertDescription>
              </Alert>
            )}

            {testMutation.isError && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Test Failed</AlertTitle>
                <AlertDescription>
                  API test failed. Please check your API key and try again.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {validation?.status === 'expired' && (
        <Alert className="mt-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Expired</AlertTitle>
          <AlertDescription>
            Your Follow Up Boss API key has expired. Please generate a new API key from your Follow
            Up Boss account:
            <br />
            1. Log into Follow Up Boss
            <br />
            2. Go to Settings → Integrations → API
            <br />
            3. Generate a new API key
            <br />
            4. Update your secrets in Replit
          </AlertDescription>
        </Alert>
      )}

      {validation?.status === 'missing_key' && (
        <Alert className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Not Configured</AlertTitle>
          <AlertDescription>
            Follow Up Boss API key is not configured. Please add your API key to enable lead
            management integration.
          </AlertDescription>
        </Alert>
      )}

      {validation?.status === 'active' && (
        <Alert className="mt-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Integration Active</AlertTitle>
          <AlertDescription>
            Your Follow Up Boss integration is working properly. All leads from your website will be
            automatically sent to your CRM.
          </AlertDescription>
        </Alert>
        )}
      </div>
      </div>
    </>
  );
}
