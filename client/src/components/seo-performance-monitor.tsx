import {
  AlertTriangle,
  CheckCircle,
  Globe,
  Search,
  Smartphone,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SEOMetrics {
  pageSpeed: {
    desktop: number;
    mobile: number;
    fcp: number;
    lcp: number;
    cls: number;
  };
  rankings: {
    keyword: string;
    position: number;
    change: number;
    searchVolume: number;
  }[];
  technicalSEO: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  localSEO: {
    gmbOptimization: number;
    citations: number;
    reviews: number;
    localRankings: { keyword: string; position: number }[];
  };
}

export default function SEOPerformanceMonitor() {
  const [seoMetrics, _setSeoMetrics] = useState<SEOMetrics>({
    pageSpeed: {
      desktop: 89,
      mobile: 76,
      fcp: 1.8,
      lcp: 2.4,
      cls: 0.08,
    },
    rankings: [
      { keyword: 'skye canyon real estate', position: 3, change: 2, searchVolume: 850 },
      { keyword: 'las vegas luxury homes', position: 8, change: -1, searchVolume: 2400 },
      { keyword: 'northwest las vegas realtor', position: 5, change: 1, searchVolume: 560 },
      { keyword: 'new construction homes las vegas', position: 12, change: 3, searchVolume: 1200 },
      { keyword: 'toll brothers las vegas', position: 15, change: 5, searchVolume: 680 },
    ],
    technicalSEO: {
      score: 92,
      issues: ['Some images missing alt text', 'Minor LCP optimization needed'],
      recommendations: [
        'Optimize hero section images for faster loading',
        'Implement lazy loading for below-fold content',
        'Add missing alt attributes to property images',
      ],
    },
    localSEO: {
      gmbOptimization: 94,
      citations: 47,
      reviews: 47,
      localRankings: [
        { keyword: 'realtor near me skye canyon', position: 2 },
        { keyword: 'luxury homes skye canyon', position: 1 },
        { keyword: 'real estate agent 89166', position: 4 },
      ],
    },
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) {
      return 'text-green-600';
    }
    if (score >= 70) {
      return 'text-yellow-600';
    }
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) {
      return 'bg-green-100 text-green-800';
    }
    if (score >= 70) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-red-100 text-red-800';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    if (change < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    }
    return <div className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Performance Monitor
          </CardTitle>
          <CardDescription>
            Real-time tracking of your website's search engine optimization metrics
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="local">Local SEO</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Desktop Speed</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(seoMetrics.pageSpeed.desktop)}`}
                >
                  {seoMetrics.pageSpeed.desktop}
                </div>
                <p className="text-xs text-gray-500">PageSpeed Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Mobile Speed</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(seoMetrics.pageSpeed.mobile)}`}>
                  {seoMetrics.pageSpeed.mobile}
                </div>
                <p className="text-xs text-gray-500">PageSpeed Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Technical SEO</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(seoMetrics.technicalSEO.score)}`}
                >
                  {seoMetrics.technicalSEO.score}
                </div>
                <p className="text-xs text-gray-500">Overall Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Local SEO</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(seoMetrics.localSEO.gmbOptimization)}`}
                >
                  {seoMetrics.localSEO.gmbOptimization}
                </div>
                <p className="text-xs text-gray-500">GMB Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Web Vitals */}
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
              <CardDescription>Essential metrics for user experience and SEO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">First Contentful Paint</span>
                    <Badge className={getScoreBadgeColor(seoMetrics.pageSpeed.fcp < 2.5 ? 90 : 60)}>
                      {seoMetrics.pageSpeed.fcp}s
                    </Badge>
                  </div>
                  <Progress value={seoMetrics.pageSpeed.fcp < 2.5 ? 90 : 60} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Largest Contentful Paint</span>
                    <Badge className={getScoreBadgeColor(seoMetrics.pageSpeed.lcp < 2.5 ? 90 : 60)}>
                      {seoMetrics.pageSpeed.lcp}s
                    </Badge>
                  </div>
                  <Progress value={seoMetrics.pageSpeed.lcp < 2.5 ? 90 : 60} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cumulative Layout Shift</span>
                    <Badge className={getScoreBadgeColor(seoMetrics.pageSpeed.cls < 0.1 ? 90 : 60)}>
                      {seoMetrics.pageSpeed.cls}
                    </Badge>
                  </div>
                  <Progress value={seoMetrics.pageSpeed.cls < 0.1 ? 90 : 60} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>Current search engine rankings for target keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoMetrics.rankings.map((ranking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{ranking.keyword}</span>
                        <Badge variant="outline">
                          {ranking.searchVolume.toLocaleString()} vol/mo
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {getChangeIcon(ranking.change)}
                        <span
                          className={`text-sm ${ranking.change > 0 ? 'text-green-600' : ranking.change < 0 ? 'text-red-600' : 'text-gray-600'}`}
                        >
                          {ranking.change > 0 ? '+' : ''}
                          {ranking.change}
                        </span>
                      </div>
                      <Badge
                        className={getScoreBadgeColor(
                          ranking.position <= 3 ? 95 : ranking.position <= 10 ? 80 : 60
                        )}
                      >
                        #{ranking.position}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Tab */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Current Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {seoMetrics.technicalSEO.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-yellow-50 rounded"
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {seoMetrics.technicalSEO.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Local SEO Tab */}
        <TabsContent value="local" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Local Search Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Google Business Profile</span>
                    <Badge className={getScoreBadgeColor(seoMetrics.localSEO.gmbOptimization)}>
                      {seoMetrics.localSEO.gmbOptimization}%
                    </Badge>
                  </div>
                  <Progress value={seoMetrics.localSEO.gmbOptimization} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Online Citations</span>
                    <span className="text-sm font-bold">{seoMetrics.localSEO.citations}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Customer Reviews</span>
                    <span className="text-sm font-bold">{seoMetrics.localSEO.reviews}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Keyword Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoMetrics.localSEO.localRankings.map((ranking, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{ranking.keyword}</span>
                      <Badge
                        className={getScoreBadgeColor(
                          ranking.position <= 3 ? 95 : ranking.position <= 10 ? 80 : 60
                        )}
                      >
                        #{ranking.position}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
