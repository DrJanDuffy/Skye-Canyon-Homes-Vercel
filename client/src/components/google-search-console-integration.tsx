import { AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IndexingStatus {
  url: string;
  status: 'indexed' | 'pending' | 'error';
  lastChecked: string;
}

export default function GoogleSearchConsoleIntegration() {
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSitemapSubmission, setLastSitemapSubmission] = useState<string | null>(null);

  useEffect(() => {
    // Load indexing status from localStorage or API
    const savedStatus = localStorage.getItem('indexingStatus');
    if (savedStatus) {
      setIndexingStatus(JSON.parse(savedStatus));
    }

    const lastSubmission = localStorage.getItem('lastSitemapSubmission');
    if (lastSubmission) {
      setLastSitemapSubmission(lastSubmission);
    }
  }, []);

  const submitSitemap = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/google/submit-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sitemapUrl: 'https://skyecanyonhomesforsale.com/sitemap.xml',
        }),
      });

      if (response.ok) {
        const timestamp = new Date().toISOString();
        setLastSitemapSubmission(timestamp);
        localStorage.setItem('lastSitemapSubmission', timestamp);

        // Update indexing status for key pages
        const keyPages = [
          'https://skyecanyonhomesforsale.com/',
          'https://skyecanyonhomesforsale.com/properties',
          'https://skyecanyonhomesforsale.com/luxury-homes-las-vegas',
          'https://skyecanyonhomesforsale.com/skye-canyon-guide',
          'https://skyecanyonhomesforsale.com/market-analysis',
        ];

        const updatedStatus = keyPages.map((url) => ({
          url,
          status: 'pending' as const,
          lastChecked: timestamp,
        }));

        setIndexingStatus(updatedStatus);
        localStorage.setItem('indexingStatus', JSON.stringify(updatedStatus));
      }
    } catch (_error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkIndexingStatus = async () => {
    try {
      const response = await fetch('/api/google/check-indexing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: indexingStatus.map((item) => item.url),
        }),
      });

      if (response.ok) {
        const results = await response.json();
        const updatedStatus = indexingStatus.map((item) => {
          const result = results.find((r: any) => r.url === item.url);
          return result ? { ...item, ...result } : item;
        });

        setIndexingStatus(updatedStatus);
        localStorage.setItem('indexingStatus', JSON.stringify(updatedStatus));
      }
    } catch (_error) {}
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'indexed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Google Search Console Integration
        </CardTitle>
        <CardDescription>
          Monitor and manage your website's indexing status with Google Search Console
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sitemap Submission */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Sitemap Submission</h3>
              <p className="text-sm text-gray-600">
                Submit your sitemap to Google Search Console for faster indexing
              </p>
              {lastSitemapSubmission && (
                <p className="text-xs text-green-600 mt-1">
                  Last submitted: {new Date(lastSitemapSubmission).toLocaleString()}
                </p>
              )}
            </div>
            <Button
              onClick={submitSitemap}
              disabled={isSubmitting}
              className="bg-realscout-blue hover:bg-realscout-navy"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Sitemap'}
            </Button>
          </div>
        </div>

        {/* Indexing Status */}
        {indexingStatus.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Page Indexing Status</h3>
              <Button variant="outline" onClick={checkIndexingStatus} size="sm">
                Refresh Status
              </Button>
            </div>

            <div className="space-y-2">
              {indexingStatus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-medium text-sm">
                        {item.url.replace('https://skyecanyonhomesforsale.com', '')}
                        {item.url === 'https://skyecanyonhomesforsale.com/' ? 'Homepage' : ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last checked: {new Date(item.lastChecked).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'indexed'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Recommendations */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">SEO Optimization Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Submit your sitemap regularly when adding new content</li>
            <li>• Monitor indexing status for important pages</li>
            <li>• Ensure all pages have unique, descriptive meta titles and descriptions</li>
            <li>• Use proper structured data markup for better rich snippets</li>
            <li>• Maintain consistent NAP (Name, Address, Phone) information across all pages</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
