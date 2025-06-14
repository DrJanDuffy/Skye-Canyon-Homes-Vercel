/**
 * Lead Scoring Dashboard for Dr. Jan Duffy
 * Displays high-intent prospects and behavioral analytics
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Phone, Mail, Clock, TrendingUp, Users, Target, Eye } from 'lucide-react';

interface LeadAnalytics {
  totalVisitors: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageScore: number;
  highValueLeads: number;
  recentActivity: number;
}

interface QualifiedLead {
  sessionId: string;
  score: number;
  urgency: 'HIGH' | 'MEDIUM' | 'QUALIFIED';
  triggers: string[];
  summary: string;
  firstVisit: string;
  lastActivity: string;
  propertyViews: number;
  sessionTime: number;
  returnVisits: number;
}

export default function LeadScoringDashboard() {
  const [analytics, setAnalytics] = useState<LeadAnalytics | null>(null);
  const [qualifiedLeads, setQualifiedLeads] = useState<QualifiedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/lead-scoring/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch lead analytics:', error);
    }
  };

  const fetchQualifiedLeads = async () => {
    try {
      // In a real implementation, this would fetch qualified leads from the backend
      // For now, we'll simulate some data structure
      const mockLeads: QualifiedLead[] = [
        {
          sessionId: 'session-123',
          score: 145,
          urgency: 'HIGH',
          triggers: ['Phone Click', 'Multiple Properties', 'Extended Session'],
          summary: 'Viewed 4 luxury properties, spent 12 minutes, clicked phone number',
          firstVisit: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          lastActivity: new Date().toISOString(),
          propertyViews: 4,
          sessionTime: 720,
          returnVisits: 1
        }
      ];
      setQualifiedLeads(mockLeads);
    } catch (error) {
      console.error('Failed to fetch qualified leads:', error);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await Promise.all([fetchAnalytics(), fetchQualifiedLeads()]);
    setRefreshing(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchAnalytics(), fetchQualifiedLeads()]);
      setLoading(false);
    };

    loadData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatSessionTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading lead analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Scoring Dashboard</h1>
          <p className="text-gray-600">Monitor high-intent prospects and behavioral analytics</p>
        </div>
        <Button 
          onClick={refreshData} 
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalVisitors}</div>
              <p className="text-xs text-muted-foreground">Active sessions tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{analytics.qualifiedLeads}</div>
              <p className="text-xs text-muted-foreground">
                {((analytics.qualifiedLeads / analytics.totalVisitors) * 100).toFixed(1)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High-Value Leads</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analytics.highValueLeads}</div>
              <p className="text-xs text-muted-foreground">Score 100+ (immediate action)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.recentActivity}</div>
              <p className="text-xs text-muted-foreground">Active in last 24h</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Qualified Leads Section */}
      <Tabs defaultValue="qualified" className="w-full">
        <TabsList>
          <TabsTrigger value="qualified">Qualified Leads</TabsTrigger>
          <TabsTrigger value="analytics">Behavior Analytics</TabsTrigger>
          <TabsTrigger value="settings">Scoring Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="qualified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                High-Intent Prospects
              </CardTitle>
              <CardDescription>
                Leads automatically identified by behavioral triggers requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {qualifiedLeads.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Qualified Leads Yet</h3>
                  <p className="text-gray-600">The system is actively monitoring for high-intent behaviors</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {qualifiedLeads.map((lead) => (
                    <div key={lead.sessionId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Badge className={getUrgencyColor(lead.urgency)}>
                            {lead.urgency} PRIORITY
                          </Badge>
                          <span className="text-2xl font-bold text-blue-600">
                            {lead.score} pts
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Session Time:</span>
                          <div className="font-medium">{formatSessionTime(lead.sessionTime)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Properties Viewed:</span>
                          <div className="font-medium flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {lead.propertyViews}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Return Visits:</span>
                          <div className="font-medium">{lead.returnVisits}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Activity:</span>
                          <div className="font-medium">{formatTimeAgo(lead.lastActivity)}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500 text-sm">Behavioral Triggers:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lead.triggers.map((trigger, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Summary:</span>
                          <p className="text-sm mt-1">{lead.summary}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-xs text-gray-500">
                          Session ID: {lead.sessionId}
                        </span>
                        <div className="text-xs text-gray-500">
                          First Visit: {formatTimeAgo(lead.firstVisit)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Analytics</CardTitle>
              <CardDescription>
                Detailed insights into visitor behavior patterns and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Conversion Rate</span>
                      <span>{((analytics.qualifiedLeads / analytics.totalVisitors) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(analytics.qualifiedLeads / analytics.totalVisitors) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Lead Score</span>
                      <span>{analytics.averageScore.toFixed(0)} / 200</span>
                    </div>
                    <Progress value={(analytics.averageScore / 200) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{analytics.qualifiedLeads}</div>
                      <div className="text-sm text-gray-600">Qualified This Period</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{analytics.highValueLeads}</div>
                      <div className="text-sm text-gray-600">High-Value Leads</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{analytics.recentActivity}</div>
                      <div className="text-sm text-gray-600">Recent Activity</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Scoring Configuration</CardTitle>
              <CardDescription>
                Current scoring rules and thresholds for identifying high-intent prospects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Behavioral Triggers</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Phone Click</span>
                        <Badge variant="secondary">+50 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact Form</span>
                        <Badge variant="secondary">+60 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Click</span>
                        <Badge variant="secondary">+35 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Multiple Properties</span>
                        <Badge variant="secondary">+25 pts</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Engagement Scoring</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Return Visit</span>
                        <Badge variant="secondary">+30 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Extended Session (5+ min)</span>
                        <Badge variant="secondary">+15 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Search Usage</span>
                        <Badge variant="secondary">+12 pts</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Luxury Property Interest</span>
                        <Badge variant="secondary">+15 pts</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Qualification Thresholds</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>High Priority (Immediate Action)</span>
                      <Badge className="bg-red-100 text-red-800">100+ points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Medium Priority (Contact within 24h)</span>
                      <Badge className="bg-orange-100 text-orange-800">70-99 points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Qualified (Follow up within week)</span>
                      <Badge className="bg-blue-100 text-blue-800">50-69 points</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}