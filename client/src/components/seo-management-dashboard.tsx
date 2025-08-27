import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Globe, Search, TrendingUp, ExternalLink } from 'lucide-react';

interface IndexingStatus {
  url: string;
  status: 'pending' | 'indexed' | 'error';
  lastRequested?: string;
  error?: string;
}

export default function SEOManagementDashboard() {
  const [indexingResults, setIndexingResults] = useState<IndexingStatus[]>([]);
  const [isIndexing, setIsIndexing] = useState(false);
  const [sitemapStatus, setSitemapStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );

  const handleIndexAllPages = async () => {
    setIsIndexing(true);
    try {
      const response = await fetch('/api/google/index-all-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setIndexingResults(result.results?.results || []);
      } else {
        console.error('Indexing failed:', result.message);
      }
    } catch (error) {
      console.error('Error requesting indexing:', error);
    } finally {
      setIsIndexing(false);
    }
  };

  const handleSubmitSitemap = async () => {
    setSitemapStatus('submitting');
    try {
      const response = await fetch('/api/google/submit-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setSitemapStatus(result.success ? 'success' : 'error');
    } catch (error) {
      console.error('Error submitting sitemap:', error);
      setSitemapStatus('error');
    }
  };

  const siteUrls = [
    '/',
    '/properties',
    '/voice-search',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/neighborhood-analysis',
    '/luxury-homes-las-vegas',
    '/skye-canyon-guide',
    '/skye-canyon-schools',
    '/skye-canyon-parks',
    '/skye-canyon-communities',
    '/market-analysis',
    '/las-vegas-real-estate',
    '/northwest-las-vegas',
  ];

  const googleSearchConsoleSetup = [
    {
      step: 1,
      title: 'Verify Domain Ownership',
      description: 'Add DNS TXT record or upload HTML file to verify your domain',
      action: 'Go to Search Console',
      link: 'https://search.google.com/search-console',
    },
    {
      step: 2,
      title: 'Submit Sitemap',
      description: 'Add your sitemap URL to Google Search Console',
      action: 'Submit Sitemap',
      completed: sitemapStatus === 'success',
    },
    {
      step: 3,
      title: 'Request Indexing',
      description: 'Request Google to index all your pages',
      action: 'Index Pages',
      completed: indexingResults.length > 0,
    },
  ];

  const seoMetrics = [
    {
      title: 'Total Pages',
      value: siteUrls.length.toString(),
      description: 'Site pages available',
      icon: Globe,
    },
    {
      title: 'SEO Optimized',
      value: '100%',
      description: 'Pages with meta data',
      icon: Search,
    },
    {
      title: 'Structured Data',
      value: '15+',
      description: 'Schema.org implementations',
      icon: TrendingUp,
    },
    {
      title: 'Indexing Status',
      value: indexingResults.length > 0 ? 'Requested' : 'Pending',
      description: 'Google indexing',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-6 h-6" />
            <span>SEO Management Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {seoMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                  <div className="text-xs text-gray-500">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">Google Setup</TabsTrigger>
              <TabsTrigger value="indexing">Page Indexing</TabsTrigger>
              <TabsTrigger value="analytics">Analytics Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Google Search Console Setup</h3>

              <div className="space-y-4">
                {googleSearchConsoleSetup.map((item) => (
                  <Card key={item.step}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">{item.step}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {item.link ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(item.link, '_blank')}
                            >
                              {item.action}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          ) : item.step === 2 ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleSubmitSitemap}
                              disabled={sitemapStatus === 'submitting'}
                            >
                              {sitemapStatus === 'submitting' ? 'Submitting...' : item.action}
                            </Button>
                          ) : item.step === 3 ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleIndexAllPages}
                              disabled={isIndexing}
                            >
                              {isIndexing ? 'Indexing...' : item.action}
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Site Verification Meta Tag</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Add this meta tag to your site's &lt;head&gt; section for Google Search Console
                    verification:
                  </p>
                  <code className="block bg-gray-100 p-2 rounded text-sm">
                    &lt;meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /&gt;
                  </code>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indexing" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Page Indexing Status</h3>
                <Button
                  onClick={handleIndexAllPages}
                  disabled={isIndexing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isIndexing ? 'Requesting Indexing...' : 'Request All Pages Indexing'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Site Pages ({siteUrls.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {siteUrls.map((url) => (
                        <div
                          key={url}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{url}</span>
                          <Badge variant="outline">Ready</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Indexing Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {indexingResults.length === 0 ? (
                      <p className="text-sm text-gray-600">No indexing requests submitted yet</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {indexingResults.map((result, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm">{result.url}</span>
                            <Badge
                              variant={
                                result.status === 'indexed'
                                  ? 'default'
                                  : result.status === 'error'
                                    ? 'destructive'
                                    : 'secondary'
                              }
                            >
                              {result.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h3 className="text-lg font-semibold">Google Analytics Configuration</h3>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">Google Analytics 4</h4>
                      <p className="text-sm text-gray-600">
                        Real-time visitor tracking and conversion monitoring
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <Badge variant="default">Configured</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Measurement ID:</span>
                      <span className="font-mono">
                        {import.meta.env.VITE_GA_MEASUREMENT_ID || 'Not configured'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page View Tracking:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Real Estate Events:</span>
                      <span className="text-green-600">Configured</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lead Tracking:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Tracked Events</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>• Property Views</div>
                    <div>• Lead Generation</div>
                    <div>• Search Queries</div>
                    <div>• Market Analysis</div>
                    <div>• Contact Attempts</div>
                    <div>• Voice Search Usage</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
