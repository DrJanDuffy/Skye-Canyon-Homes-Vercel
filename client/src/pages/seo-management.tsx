import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import SEOManagementDashboard from '@/components/seo-management-dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Globe, TrendingUp, CheckCircle } from 'lucide-react';

export default function SEOManagement() {
  return (
    <>
      <Helmet>
        <title>SEO Management Dashboard | Skye Canyon Homes for Sale</title>
        <meta
          name="description"
          content="Comprehensive SEO management tools for Google Search Console setup, page indexing, and analytics configuration for the Skye Canyon real estate website."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/seo-management" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SEO Management Dashboard</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Complete Google Search Console setup, page indexing, and analytics configuration for
              optimal search engine visibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Console Setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Page Indexing</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Analytics Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>SEO Optimization</span>
              </div>
            </div>
          </div>
        </section>

        {/* Current SEO Status */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Current SEO Implementation Status
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your real estate website is optimized with comprehensive SEO features. Use the
                dashboard below to complete Google Search Console setup and request page indexing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Meta Tags</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive meta descriptions, titles, and Open Graph tags implemented
                  </p>
                  <div className="mt-2">
                    <span className="text-green-600 font-medium">✓ Complete</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Structured Data</h3>
                  <p className="text-sm text-gray-600">
                    Schema.org markup for real estate agent, properties, and local business
                  </p>
                  <div className="mt-2">
                    <span className="text-green-600 font-medium">✓ Complete</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Sitemap & Robots</h3>
                  <p className="text-sm text-gray-600">
                    XML sitemap with all 16 pages and properly configured robots.txt
                  </p>
                  <div className="mt-2">
                    <span className="text-green-600 font-medium">✓ Complete</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Google Analytics 4 tracking with custom real estate events
                  </p>
                  <div className="mt-2">
                    <span className="text-blue-600 font-medium">✓ Configured</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Management Dashboard */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SEOManagementDashboard />
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Google Search Console Setup Guide
              </h2>
              <p className="text-lg text-gray-600">
                Follow these steps to complete your Google Search Console setup and maximize search
                visibility.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Step 1: Create Google Search Console Account
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      1. Go to{' '}
                      <a
                        href="https://search.google.com/search-console"
                        target="_blank"
                        className="text-blue-600 hover:underline" rel="noopener"
                      >
                        Google Search Console
                      </a>
                    </p>
                    <p>2. Click "Start now" and sign in with your Google account</p>
                    <p>3. Select "URL prefix" property type</p>
                    <p>4. Enter your website URL: https://skyecanyonhomesforsale.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Step 2: Verify Domain Ownership</h3>
                  <div className="space-y-3 text-gray-600">
                    <p>Choose one of these verification methods:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        <strong>HTML meta tag:</strong> Add the verification meta tag to your site's
                        head section
                      </li>
                      <li>
                        <strong>HTML file upload:</strong> Upload the provided HTML file to your
                        website root
                      </li>
                      <li>
                        <strong>DNS record:</strong> Add a TXT record to your domain's DNS settings
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Step 3: Submit Sitemap and Request Indexing
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p>Once verified, use the dashboard above to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Submit your sitemap (sitemap.xml) to Google</li>
                      <li>Request indexing for all 16 pages of your website</li>
                      <li>Monitor indexing status and search performance</li>
                    </ul>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <Button
                      onClick={() =>
                        window.open('https://search.google.com/search-console', '_blank')
                      }
                    >
                      Open Search Console
                    </Button>
                    <Button variant="outline" onClick={() => window.open('/sitemap.xml', '_blank')}>
                      View Sitemap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Page Attributes Summary */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">SEO Page Attributes Summary</h2>
              <p className="text-lg text-gray-600">
                Every page is optimized with proper meta tags, structured data, and SEO best
                practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Title Tags</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unique, descriptive titles for each page</li>
                    <li>• Target keywords included naturally</li>
                    <li>• Optimal length (50-60 characters)</li>
                    <li>• Brand consistency maintained</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Meta Descriptions</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Compelling descriptions (150-160 chars)</li>
                    <li>• Call-to-action included</li>
                    <li>• Location-specific keywords</li>
                    <li>• Value proposition highlighted</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Structured Data</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real Estate Agent schema</li>
                    <li>• Local Business markup</li>
                    <li>• Property listings schema</li>
                    <li>• FAQ and breadcrumb data</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
