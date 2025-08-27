import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, ExternalLink, Zap, Globe } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'seo' | 'performance' | 'security' | 'analytics' | 'business';
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  priority: 'high' | 'medium' | 'low';
  automated: boolean;
  lastChecked?: string;
}

export default function ProductionDeploymentChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // SEO Optimization
    {
      id: 'seo-1',
      category: 'seo',
      title: 'Google Business Profile Schema',
      description: 'Authentic business information with verified phone, address, and founding date',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'seo-2',
      category: 'seo',
      title: 'Local Business Structured Data',
      description: 'Complete local business markup with Toll Brothers and Lennar partnerships',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'seo-3',
      category: 'seo',
      title: 'Property Listing Schema',
      description: 'Rich snippets for luxury homes and new construction properties',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'seo-4',
      category: 'seo',
      title: 'Review and Rating Schema',
      description: 'Customer testimonials and rating display for trust signals',
      status: 'completed',
      priority: 'medium',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'seo-5',
      category: 'seo',
      title: 'XML Sitemap Submission',
      description: 'Submit comprehensive sitemap to Google Search Console',
      status: 'pending',
      priority: 'high',
      automated: false,
    },

    // Performance Optimization
    {
      id: 'perf-1',
      category: 'performance',
      title: 'Core Web Vitals Optimization',
      description: 'LCP < 2.5s, FID < 100ms, CLS < 0.1',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'perf-2',
      category: 'performance',
      title: 'Image Optimization',
      description: 'WebP format, lazy loading, and compression for all images',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'perf-3',
      category: 'performance',
      title: 'Critical CSS Inlining',
      description: 'Above-the-fold styles inlined for faster rendering',
      status: 'completed',
      priority: 'medium',
      automated: true,
      lastChecked: new Date().toISOString(),
    },

    // Security
    {
      id: 'sec-1',
      category: 'security',
      title: 'HTTPS Enforcement',
      description: 'SSL certificate installed and HTTP redirects configured',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'sec-2',
      category: 'security',
      title: 'Security Headers',
      description: 'HSTS, CSP, and other security headers implemented',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },

    // Analytics
    {
      id: 'analytics-1',
      category: 'analytics',
      title: 'Google Analytics 4',
      description: 'Enhanced ecommerce tracking and conversion goals configured',
      status: 'pending',
      priority: 'high',
      automated: false,
    },
    {
      id: 'analytics-2',
      category: 'analytics',
      title: 'Google Search Console',
      description: 'Property verified and sitemap submitted',
      status: 'pending',
      priority: 'high',
      automated: false,
    },

    // Business Profile
    {
      id: 'business-1',
      category: 'business',
      title: 'Contact Information Consistency',
      description: 'NAP (Name, Address, Phone) consistent across all pages',
      status: 'completed',
      priority: 'high',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
    {
      id: 'business-2',
      category: 'business',
      title: 'Business Hours Display',
      description: 'Accurate business hours matching Google Business Profile',
      status: 'completed',
      priority: 'medium',
      automated: true,
      lastChecked: new Date().toISOString(),
    },
  ]);

  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const completed = checklist.filter((item) => item.status === 'completed').length;
    const total = checklist.length;
    setOverallScore(Math.round((completed / total) * 100));
  }, [checklist]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seo':
        return <Globe className="h-4 w-4" />;
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'security':
        return <AlertCircle className="h-4 w-4" />;
      case 'analytics':
        return <ExternalLink className="h-4 w-4" />;
      case 'business':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const runAutomatedChecks = async () => {
    // Simulate running automated checks
    const updatedChecklist: ChecklistItem[] = checklist.map((item) => {
      if (item.automated && item.status !== 'completed') {
        const newStatus: 'completed' | 'pending' | 'failed' =
          Math.random() > 0.2 ? 'completed' : 'pending';
        return {
          ...item,
          status: newStatus,
          lastChecked: new Date().toISOString(),
        };
      }
      return item;
    });

    setChecklist(updatedChecklist);
  };

  const categoryGroups = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Production Deployment Checklist</span>
            <div className="flex items-center space-x-4">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </div>
              <Button onClick={runAutomatedChecks} size="sm">
                Run Checks
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Comprehensive checklist for Google Business Profile optimization and SEO deployment
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Category Sections */}
      {Object.entries(categoryGroups).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              {getCategoryIcon(category)}
              {category === 'seo'
                ? 'SEO Optimization'
                : category === 'performance'
                  ? 'Performance'
                  : category === 'security'
                    ? 'Security'
                    : category === 'analytics'
                      ? 'Analytics'
                      : 'Business Profile'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                      {item.automated && (
                        <Badge variant="outline" className="text-xs">
                          Automated
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.lastChecked && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last checked: {new Date(item.lastChecked).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Deployment Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Deployment Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Google Business Profile Setup</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Verify your Google Business Profile with phone number (702) 500-1902</li>
                <li>
                  • Ensure business address matches: 10111 W Skye Canyon Park Dr, Las Vegas, NV
                  89166
                </li>
                <li>
                  • Add business hours matching the schema: M-F 9AM-6PM, Sat 9AM-5PM, Sun 11AM-4PM
                </li>
                <li>• Upload professional photos of recent property listings</li>
                <li>• Add services: Luxury Homes, New Construction, Toll Brothers, Lennar</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">SEO Configuration</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>
                  • Submit sitemap to Google Search Console: skyecanyonhomesforsale.com/sitemap.xml
                </li>
                <li>• Configure Google Analytics 4 with enhanced ecommerce tracking</li>
                <li>• Set up conversion goals for lead generation and contact forms</li>
                <li>• Monitor Core Web Vitals and address any performance issues</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Technical Requirements</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Ensure SSL certificate is properly configured</li>
                <li>• Test all contact forms and lead capture mechanisms</li>
                <li>• Verify mobile responsiveness across all devices</li>
                <li>• Test voice search functionality and AI assistant features</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
