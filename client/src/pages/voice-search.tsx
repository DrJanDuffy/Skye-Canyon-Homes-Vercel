import { Helmet } from 'react-helmet-async';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import VoiceSearchIntegration from '@/components/voice-search-integration';

export default function VoiceSearchPage() {
  return (
    <>
      <Helmet>
        <title>Voice Property Search | AI-Powered Real Estate | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Search for properties using voice commands with our AI-powered assistant. Find luxury homes in Skye Canyon and Las Vegas with natural language queries."
        />
        <meta
          name="keywords"
          content="voice search real estate, AI property search, voice activated search, Las Vegas homes, Skye Canyon properties"
        />
        <meta
          property="og:title"
          content="Voice Property Search | AI-Powered Real Estate | Dr. Jan Duffy"
        />
        <meta
          property="og:description"
          content="Revolutionary voice-activated property search powered by AI. Find your dream home in Skye Canyon and Las Vegas using natural language."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/voice-search" />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/voice-search" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Voice-Activated Property Search
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of real estate search with our AI-powered voice assistant.
              Simply speak your requirements and discover properties that match your needs.
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                Try These Voice Commands:
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                <div>
                  <ul className="space-y-2">
                    <li>• "Show me luxury homes in Skye Canyon under $2 million"</li>
                    <li>• "Find 4-bedroom houses with a pool"</li>
                    <li>• "What properties are available in Northwest Las Vegas?"</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>• "Properties with mountain views under $1.5M"</li>
                    <li>• "New construction homes in guard-gated communities"</li>
                    <li>• "Tell me about the Skye Canyon real estate market"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <VoiceSearchIntegration maxSearches={3} onSearchLimitReached={() => {}} />

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Speak Naturally</h3>
                  <p className="text-gray-600 text-sm">
                    Use natural language to describe what you're looking for. No need for specific
                    search terms.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Processing</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI understands your requirements and searches through available properties.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
                  <p className="text-gray-600 text-sm">
                    Receive personalized property recommendations with detailed information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
