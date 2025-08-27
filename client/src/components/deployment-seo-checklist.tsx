import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'critical';
  priority: 'high' | 'medium' | 'low';
  category: 'technical' | 'content' | 'local' | 'performance';
}

export default function DeploymentSEOChecklist() {
  const [checklist] = useState<ChecklistItem[]>([
    // Technical SEO
    {
      id: 'meta-tags',
      title: 'Enhanced Meta Tags Implementation',
      description: 'Geo-specific meta tags, Open Graph, Twitter Cards',
      status: 'completed',
      priority: 'high',
      category: 'technical',
    },
    {
      id: 'structured-data',
      title: 'Comprehensive Structured Data',
      description: 'Real estate agent, local business, geo-enhanced schemas',
      status: 'completed',
      priority: 'high',
      category: 'technical',
    },
    {
      id: 'sitemap',
      title: 'XML Sitemap with Geo-targeting',
      description: 'Enhanced sitemap with location coordinates',
      status: 'completed',
      priority: 'high',
      category: 'technical',
    },
    {
      id: 'robots',
      title: 'Robots.txt Optimization',
      description: 'Allow all important pages, block sensitive areas',
      status: 'completed',
      priority: 'medium',
      category: 'technical',
    },
    {
      id: 'core-web-vitals',
      title: 'Core Web Vitals Optimization',
      description: 'FCP currently 7747ms - needs immediate attention',
      status: 'critical',
      priority: 'high',
      category: 'performance',
    },

    // Local SEO
    {
      id: 'nap-consistency',
      title: 'NAP Consistency',
      description: 'Name, Address, Phone: (702) 500-1902 across all pages',
      status: 'completed',
      priority: 'high',
      category: 'local',
    },
    {
      id: 'business-hours',
      title: 'Business Hours Schema',
      description: 'Mo-Fr 09:00-18:00, Sa 09:00-17:00, Su 11:00-16:00',
      status: 'completed',
      priority: 'medium',
      category: 'local',
    },
    {
      id: 'service-areas',
      title: 'Service Area Optimization',
      description: 'Skye Canyon, Centennial Hills, Northwest Las Vegas',
      status: 'completed',
      priority: 'high',
      category: 'local',
    },

    // Content SEO
    {
      id: 'keyword-optimization',
      title: 'Geo-specific Keyword Targeting',
      description: 'Skye Canyon, Las Vegas NV 89166, luxury homes',
      status: 'completed',
      priority: 'high',
      category: 'content',
    },
    {
      id: 'builder-partnerships',
      title: 'Builder Partnership Content',
      description: 'Toll Brothers and Lennar integration',
      status: 'completed',
      priority: 'medium',
      category: 'content',
    },

    // Performance Issues
    {
      id: 'image-optimization',
      title: 'Image Optimization Pipeline',
      description: 'WebP format, lazy loading, compression',
      status: 'in-progress',
      priority: 'high',
      category: 'performance',
    },
    {
      id: 'css-optimization',
      title: 'CSS Critical Path Optimization',
      description: 'Inline critical CSS, async non-critical',
      status: 'in-progress',
      priority: 'high',
      category: 'performance',
    },
    {
      id: 'javascript-optimization',
      title: 'JavaScript Bundle Optimization',
      description: 'Code splitting, tree shaking, preloading',
      status: 'pending',
      priority: 'medium',
      category: 'performance',
    },
  ]);

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      default:
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  const categoryStats = {
    technical: checklist.filter((item) => item.category === 'technical'),
    content: checklist.filter((item) => item.category === 'content'),
    local: checklist.filter((item) => item.category === 'local'),
    performance: checklist.filter((item) => item.category === 'performance'),
  };

  const overallProgress = Math.round(
    (checklist.filter((item) => item.status === 'completed').length / checklist.length) * 100
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SEO Deployment Checklist</h2>
        <p className="text-gray-600 mb-4">
          Comprehensive optimization status for Dr. Jan Duffy Real Estate
        </p>
        <div className="text-3xl font-bold text-blue-600">{overallProgress}% Complete</div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(categoryStats).map(([category, items]) => {
          const completed = items.filter((item) => item.status === 'completed').length;
          const percentage = Math.round((completed / items.length) * 100);

          return (
            <Card key={category}>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-semibold capitalize mb-2">{category}</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{percentage}%</div>
                <div className="text-sm text-gray-600">
                  {completed}/{items.length} tasks
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Checklist */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <Card key={item.id} className={item.status === 'critical' ? 'border-red-200' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(item.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {getPriorityBadge(item.priority)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Issues Summary */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Critical Issues Requiring Immediate Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div>
                <div className="font-medium text-red-800">First Contentful Paint (FCP): 7747ms</div>
                <div className="text-sm text-red-600">
                  Currently in "Poor" range - Target: &lt; 1800ms
                </div>
              </div>
              <Badge variant="destructive">Critical</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div>
                <div className="font-medium text-yellow-800">Mobile Performance Score: 42</div>
                <div className="text-sm text-yellow-600">
                  Needs optimization for mobile Core Web Vitals
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">High Priority</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Implement image optimization with WebP format and compression</li>
            <li>Optimize CSS delivery with critical path CSS inlining</li>
            <li>Implement JavaScript code splitting and lazy loading</li>
            <li>Configure CDN for static asset delivery</li>
            <li>Monitor Core Web Vitals improvements post-deployment</li>
          </ol>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Performance Report
            </Button>
            <Button variant="outline" size="sm">
              Schedule SEO Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
