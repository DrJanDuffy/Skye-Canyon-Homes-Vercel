import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Clock, AlertTriangle, TrendingUp, Server } from 'lucide-react';

interface PerformanceMetrics {
  totalRequests: number;
  averageResponseTime: number;
  slowRequests: number;
  errorRate: number;
  topEndpoints: Array<{ endpoint: string; count: number }>;
}

interface SlowEndpoint {
  endpoint: string;
  averageTime: number;
  maxTime: number;
  requestCount: number;
}

export default function PerformanceDashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<PerformanceMetrics>({
    queryKey: ['/api/performance/metrics'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { data: slowEndpoints, isLoading: slowLoading } = useQuery<SlowEndpoint[]>({
    queryKey: ['/api/performance/slow-endpoints'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getPerformanceColor = (responseTime: number) => {
    if (responseTime < 200) return 'text-green-600';
    if (responseTime < 500) return 'text-yellow-600';
    if (responseTime < 1000) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (responseTime: number) => {
    if (responseTime < 200) return 'default';
    if (responseTime < 500) return 'secondary';
    if (responseTime < 1000) return 'destructive';
    return 'destructive';
  };

  if (metricsLoading || slowLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Dashboard</h1>
        <p className="text-gray-600">Monitor website performance and response times in real-time</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalRequests || 0}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getPerformanceColor(metrics?.averageResponseTime || 0)}`}
            >
              {metrics?.averageResponseTime || 0}ms
            </div>
            <p className="text-xs text-muted-foreground">Average across all endpoints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slow Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics?.slowRequests || 0}</div>
            <p className="text-xs text-muted-foreground">Requests over 1000ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${(metrics?.errorRate || 0) > 5 ? 'text-red-600' : 'text-green-600'}`}
            >
              {metrics?.errorRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">4xx and 5xx responses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Most Requested Endpoints
            </CardTitle>
            <CardDescription>
              Endpoints with the highest traffic in the last 24 hours
            </CardDescription>
          </CardHeader>

          <CardContent>
            {metrics?.topEndpoints && metrics.topEndpoints.length > 0 ? (
              <div className="space-y-3">
                {metrics.topEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{endpoint.endpoint}</p>
                      <Progress
                        value={(endpoint.count / metrics.topEndpoints[0].count) * 100}
                        className="h-2 mt-1"
                      />
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {endpoint.count}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Slow Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Slow Response Endpoints
            </CardTitle>
            <CardDescription>Endpoints with response times over 500ms</CardDescription>
          </CardHeader>

          <CardContent>
            {slowEndpoints && slowEndpoints.length > 0 ? (
              <div className="space-y-4">
                {slowEndpoints.slice(0, 8).map((endpoint, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate flex-1">{endpoint.endpoint}</p>
                      <Badge variant={getPerformanceBadge(endpoint.averageTime)} className="ml-2">
                        {endpoint.averageTime}ms avg
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Max: {endpoint.maxTime}ms</span>
                      <span>{endpoint.requestCount} requests</span>
                    </div>
                    <Progress
                      value={Math.min((endpoint.averageTime / 2000) * 100, 100)}
                      className="h-1"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-green-600 font-medium">All endpoints performing well!</p>
                <p className="text-xs text-gray-500">No slow endpoints detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Health Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Health Summary</CardTitle>
          <CardDescription>Overall website performance assessment</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div
                className={`text-2xl font-bold mb-2 ${getPerformanceColor(metrics?.averageResponseTime || 0)}`}
              >
                {(metrics?.averageResponseTime || 0) < 500
                  ? 'Good'
                  : (metrics?.averageResponseTime || 0) < 1000
                    ? 'Fair'
                    : 'Needs Improvement'}
              </div>
              <p className="text-sm text-gray-600">Response Time</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div
                className={`text-2xl font-bold mb-2 ${
                  (metrics?.errorRate || 0) < 1
                    ? 'text-green-600'
                    : (metrics?.errorRate || 0) < 5
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {(metrics?.errorRate || 0) < 1
                  ? 'Excellent'
                  : (metrics?.errorRate || 0) < 5
                    ? 'Good'
                    : 'Poor'}
              </div>
              <p className="text-sm text-gray-600">Error Rate</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div
                className={`text-2xl font-bold mb-2 ${
                  (metrics?.slowRequests || 0) < 5
                    ? 'text-green-600'
                    : (metrics?.slowRequests || 0) < 20
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {(metrics?.slowRequests || 0) < 5
                  ? 'Optimal'
                  : (metrics?.slowRequests || 0) < 20
                    ? 'Acceptable'
                    : 'Concerning'}
              </div>
              <p className="text-sm text-gray-600">Slow Requests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
