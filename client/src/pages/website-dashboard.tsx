import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Clock, TrendingUp, Database, Zap, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface DashboardOverview {
  performance: {
    totalRequests: number;
    averageResponseTime: number;
    slowRequests: number;
    errorRate: number;
  };
  optimization: {
    cacheHitRate: number;
    cachedItems: number;
    memoryUsage: any;
    uptime: number;
  };
  seo: {
    averageScore: number;
    totalIssues: number;
    topIssues: string[];
  };
  timestamp: string;
}

export default function WebsiteDashboard() {
  const { data: overview, isLoading } = useQuery<DashboardOverview>({
    queryKey: ["/api/dashboard/overview"],
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  const getHealthColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-green-600";
    if (value <= thresholds.warning) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (value <= thresholds.warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatMemory = (bytes: number) => {
    return Math.round(bytes / 1024 / 1024) + ' MB';
  };

  if (isLoading) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Dashboard</h1>
        <p className="text-gray-600">Comprehensive monitoring and optimization overview</p>
        {overview?.timestamp && (
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date(overview.timestamp).toLocaleString()}
          </p>
        )}
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(overview?.performance?.averageResponseTime || 0, { good: 500, warning: 1000 })}`}>
              {overview?.performance?.averageResponseTime || 0}ms
            </div>
            <div className="flex items-center gap-1 mt-1">
              {getHealthIcon(overview?.performance?.averageResponseTime || 0, { good: 500, warning: 1000 })}
              <p className="text-xs text-muted-foreground">Average response</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(100 - (overview?.optimization?.cacheHitRate || 0), { good: 20, warning: 50 })}`}>
              {overview?.optimization?.cacheHitRate || 0}%
            </div>
            <div className="flex items-center gap-1 mt-1">
              {getHealthIcon(100 - (overview?.optimization?.cacheHitRate || 0), { good: 20, warning: 50 })}
              <p className="text-xs text-muted-foreground">Cache efficiency</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(100 - (overview?.seo?.averageScore || 0), { good: 20, warning: 40 })}`}>
              {overview?.seo?.averageScore || 0}/100
            </div>
            <div className="flex items-center gap-1 mt-1">
              {getHealthIcon(100 - (overview?.seo?.averageScore || 0), { good: 20, warning: 40 })}
              <p className="text-xs text-muted-foreground">Average score</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthColor(overview?.performance?.errorRate || 0, { good: 1, warning: 5 })}`}>
              {overview?.performance?.errorRate || 0}%
            </div>
            <div className="flex items-center gap-1 mt-1">
              {getHealthIcon(overview?.performance?.errorRate || 0, { good: 1, warning: 5 })}
              <p className="text-xs text-muted-foreground">Error rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="seo">SEO Health</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Statistics</CardTitle>
                <CardDescription>Traffic and response metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Requests</span>
                  <Badge variant="outline">{overview?.performance?.totalRequests || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Slow Requests</span>
                  <Badge variant={
                    (overview?.performance?.slowRequests || 0) > 10 ? "destructive" : 
                    (overview?.performance?.slowRequests || 0) > 5 ? "secondary" : "default"
                  }>
                    {overview?.performance?.slowRequests || 0}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Time Health</span>
                    <span>{(overview?.performance?.averageResponseTime || 0) < 500 ? 'Excellent' : 
                           (overview?.performance?.averageResponseTime || 0) < 1000 ? 'Good' : 'Needs Improvement'}</span>
                  </div>
                  <Progress 
                    value={Math.min(100, Math.max(0, 100 - ((overview?.performance?.averageResponseTime || 0) / 20)))} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Server performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uptime</span>
                  <Badge variant="outline">{formatUptime(overview?.optimization?.uptime || 0)}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <Badge variant="outline">
                    {formatMemory(overview?.optimization?.memoryUsage?.heapUsed || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cached Items</span>
                  <Badge variant="outline">{overview?.optimization?.cachedItems || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Optimization Status
              </CardTitle>
              <CardDescription>Caching and performance optimization metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cache Hit Rate</span>
                    <span>{overview?.optimization?.cacheHitRate || 0}%</span>
                  </div>
                  <Progress value={overview?.optimization?.cacheHitRate || 0} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {overview?.optimization?.cachedItems || 0}
                    </div>
                    <p className="text-sm text-gray-600">Cached Items</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatMemory(overview?.optimization?.memoryUsage?.heapUsed || 0)}
                    </div>
                    <p className="text-sm text-gray-600">Memory Used</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Health Overview</CardTitle>
              <CardDescription>Search engine optimization status and issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall SEO Score</span>
                  <Badge variant={
                    (overview?.seo?.averageScore || 0) >= 80 ? "default" : 
                    (overview?.seo?.averageScore || 0) >= 60 ? "secondary" : "destructive"
                  }>
                    {overview?.seo?.averageScore || 0}/100
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Issues Found</span>
                  <Badge variant={
                    (overview?.seo?.totalIssues || 0) === 0 ? "default" : 
                    (overview?.seo?.totalIssues || 0) <= 5 ? "secondary" : "destructive"
                  }>
                    {overview?.seo?.totalIssues || 0}
                  </Badge>
                </div>

                {overview?.seo?.topIssues && overview.seo.topIssues.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Top Issues to Address:</p>
                    <div className="space-y-2">
                      {overview.seo.topIssues.slice(0, 3).map((issue, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}