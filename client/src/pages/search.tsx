import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function Search() {
  return (
    <>
      <Helmet>
        <title>Search Properties | Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate</title>
        <meta
          name="description"
          content="Search for Skye Canyon homes and properties in Las Vegas, NV 89166. Expert assistance from Dr. Jan Duffy, your local Skye Canyon REALTOR®."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Search Skye Canyon Properties
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Find your perfect home in Skye Canyon, Las Vegas
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Property Search Coming Soon
                </h2>
                <p className="text-gray-600 mb-6">
                  We're working on integrating our advanced property search system. 
                  In the meantime, please contact us directly for personalized assistance.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Search with RealScout
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access our comprehensive MLS database
                  </p>
                  <a
                    href="http://drjanduffy.realscout.com/onboarding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Start Property Search
                  </a>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Get Home Valuation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Find out what your home is worth
                  </p>
                  <a
                    href="tel:(702) 500-1902"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Call (702) 500-1902
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
