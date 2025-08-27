import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Phone,
  MapPin,
  Clock,
  Search,
  Globe,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Target,
} from 'lucide-react';

interface DashboardMetrics {
  businessProfile: {
    optimization: number;
    views: number;
    calls: number;
    directions: number;
    websiteClicks: number;
  };
  seoPerformance: {
    overallScore: number;
    pageSpeed: { desktop: number; mobile: number };
    rankings: { improved: number; total: number };
    technicalIssues: number;
  };
}

export default function ComprehensiveSEODashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    businessProfile: {
      optimization: 92,
      views: 1247,
      calls: 23,
      directions: 56,
      websiteClicks: 89,
    },
    seoPerformance: {
      overallScore: 78,
      pageSpeed: { desktop: 65, mobile: 42 },
      rankings: { improved: 14, total: 23 },
      technicalIssues: 3,
    },
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'performance'>('overview');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        businessProfile: {
          ...prev.businessProfile,
          views: prev.businessProfile.views + Math.floor(Math.random() * 3),
        },
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO Performance Dashboard</h2>
          <p className="text-gray-600">
            Real-time monitoring of Dr. Jan Duffy's website performance
          </p>
        </div>
        <div className="flex gap-2">
          {(['overview', 'performance'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Profile</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.businessProfile.optimization}%</div>
              <p className="text-xs text-muted-foreground">Google My Business optimization</p>
              <Progress value={metrics.businessProfile.optimization} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.businessProfile.views}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 text-xs">Increasing</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phone Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.businessProfile.calls}</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">High Intent</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${getScoreColor(metrics.seoPerformance.overallScore)}`}
              >
                {metrics.seoPerformance.overallScore}
              </div>
              <p className="text-xs text-muted-foreground">Overall optimization</p>
              <Badge className={`mt-2 ${getScoreBadge(metrics.seoPerformance.overallScore)}`}>
                Good
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Core Web Vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop Performance
                  </span>
                  <span className={getScoreColor(metrics.seoPerformance.pageSpeed.desktop)}>
                    {metrics.seoPerformance.pageSpeed.desktop}
                  </span>
                </div>
                <Progress value={metrics.seoPerformance.pageSpeed.desktop} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile Performance
                  </span>
                  <span className={getScoreColor(metrics.seoPerformance.pageSpeed.mobile)}>
                    {metrics.seoPerformance.pageSpeed.mobile}
                  </span>
                </div>
                <Progress value={metrics.seoPerformance.pageSpeed.mobile} />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Critical Issues</span>
                  <Badge variant="destructive">{metrics.seoPerformance.technicalIssues}</Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">FCP and LCP optimization needed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Search Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {metrics.seoPerformance.rankings.improved}
                  </div>
                  <p className="text-sm text-gray-600">Keywords improved this month</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>"Skye Canyon homes for sale"</span>
                    <Badge className="bg-green-100 text-green-800">#3</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>"Las Vegas luxury homes"</span>
                    <Badge className="bg-yellow-100 text-yellow-800">#7</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>"Dr Jan Duffy realtor"</span>
                    <Badge className="bg-green-100 text-green-800">#1</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
