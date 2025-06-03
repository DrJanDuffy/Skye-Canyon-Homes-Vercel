import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, MapPin, Phone, Clock, Star, Users, TrendingUp } from "lucide-react";

interface BusinessProfileData {
  name: string;
  address: string;
  phone: string;
  website: string;
  hours: string[];
  rating: number;
  reviewCount: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  categories: string[];
  attributes: string[];
}

interface OptimizationScore {
  overall: number;
  completeness: number;
  accuracy: number;
  engagement: number;
  visibility: number;
}

export default function GoogleBusinessProfileDashboard() {
  const [profileData, setProfileData] = useState<BusinessProfileData>({
    name: "Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®",
    address: "10111 W Skye Canyon Park Dr, Las Vegas, NV 89166",
    phone: "(702) 500-1902",
    website: "https://skyecanyonhomesforsale.com",
    hours: [
      "Monday: 9:00 AM – 6:00 PM",
      "Tuesday: 9:00 AM – 6:00 PM", 
      "Wednesday: 9:00 AM – 6:00 PM",
      "Thursday: 9:00 AM – 6:00 PM",
      "Friday: 9:00 AM – 6:00 PM",
      "Saturday: 9:00 AM – 5:00 PM",
      "Sunday: 11:00 AM – 4:00 PM"
    ],
    rating: 4.9,
    reviewCount: 47,
    verificationStatus: 'verified',
    categories: ['Real Estate Agent', 'Real Estate Agency'],
    attributes: [
      'Identifies as women-owned',
      'Serves Las Vegas area',
      'Luxury home specialist',
      'New construction expert'
    ]
  });

  const [optimizationScore, setOptimizationScore] = useState<OptimizationScore>({
    overall: 92,
    completeness: 95,
    accuracy: 98,
    engagement: 87,
    visibility: 89
  });

  const [recentInsights, setRecentInsights] = useState([
    {
      metric: 'Profile Views',
      value: '1,247',
      change: '+23%',
      period: 'Last 30 days'
    },
    {
      metric: 'Direction Requests',
      value: '156',
      change: '+18%',
      period: 'Last 30 days'
    },
    {
      metric: 'Phone Calls',
      value: '89',
      change: '+31%',
      period: 'Last 30 days'
    },
    {
      metric: 'Website Clicks',
      value: '342',
      change: '+15%',
      period: 'Last 30 days'
    }
  ]);

  const [optimizationTasks, setOptimizationTasks] = useState([
    {
      id: 1,
      task: 'Add high-quality photos of recent listings',
      priority: 'high',
      completed: false,
      description: 'Upload 5-10 professional photos showcasing your best properties'
    },
    {
      id: 2,
      task: 'Respond to recent reviews',
      priority: 'medium',
      completed: true,
      description: 'Thank customers for positive feedback and address any concerns'
    },
    {
      id: 3,
      task: 'Update services offered',
      priority: 'low',
      completed: false,
      description: 'Add new construction partnerships with Toll Brothers and Lennar'
    },
    {
      id: 4,
      task: 'Post weekly market updates',
      priority: 'medium',
      completed: false,
      description: 'Share Skye Canyon market insights and new listings'
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Google Business Profile Dashboard
          </CardTitle>
          <CardDescription>
            Monitor and optimize your Google Business Profile for maximum local visibility
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <div className="text-2xl font-bold">{profileData.rating}</div>
                <p className="text-xs text-gray-500">{profileData.reviewCount} reviews</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <div className="text-2xl font-bold">Verified</div>
                <p className="text-xs text-gray-500">Business verified</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Views</span>
                </div>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Calls</span>
                </div>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Business Name</label>
                  <p className="text-sm text-gray-600">{profileData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <p className="text-sm text-gray-600">{profileData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-sm text-gray-600">{profileData.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Website</label>
                  <p className="text-sm text-gray-600">{profileData.website}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Categories</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Score</CardTitle>
              <CardDescription>
                Overall profile optimization score and breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(optimizationScore.overall)}`}>
                  {optimizationScore.overall}%
                </div>
                <p className="text-gray-600">Overall Score</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Profile Completeness</span>
                    <span className={`text-sm ${getScoreColor(optimizationScore.completeness)}`}>
                      {optimizationScore.completeness}%
                    </span>
                  </div>
                  <Progress value={optimizationScore.completeness} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Information Accuracy</span>
                    <span className={`text-sm ${getScoreColor(optimizationScore.accuracy)}`}>
                      {optimizationScore.accuracy}%
                    </span>
                  </div>
                  <Progress value={optimizationScore.accuracy} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Customer Engagement</span>
                    <span className={`text-sm ${getScoreColor(optimizationScore.engagement)}`}>
                      {optimizationScore.engagement}%
                    </span>
                  </div>
                  <Progress value={optimizationScore.engagement} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Search Visibility</span>
                    <span className={`text-sm ${getScoreColor(optimizationScore.visibility)}`}>
                      {optimizationScore.visibility}%
                    </span>
                  </div>
                  <Progress value={optimizationScore.visibility} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentInsights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{insight.metric}</p>
                      <div className="text-2xl font-bold">{insight.value}</div>
                      <p className="text-xs text-gray-500">{insight.period}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">
                        {insight.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Tasks</CardTitle>
              <CardDescription>
                Complete these tasks to improve your Google Business Profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.task}
                        </p>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}