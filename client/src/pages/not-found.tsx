import { AlertCircle, Home, Search, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Find Skye Canyon homes and properties with Dr. Jan Duffy, your local Las Vegas REALTOR®."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Here are some helpful links to get you back on track:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/">
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline">
                    <a href="/search">
                      <Search className="w-4 h-4 mr-2" />
                      Search Properties
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline">
                    <a href="tel:(702) 500-1902">
                      <Phone className="w-4 h-4 mr-2" />
                      Call (702) 500-1902
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </>
  );
}
