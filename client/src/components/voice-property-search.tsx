import { DollarSign, Home, MapPin, Mic, MicOff, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  status: string;
  imageUrl?: string;
}

interface SearchResponse {
  properties: Property[];
  conversationalResponse: string;
  searchCriteria: {
    priceRange?: string;
    bedrooms?: number;
    location?: string;
    propertyType?: string;
  };
}

export default function VoicePropertySearch() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);

  const recognitionRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (_event: any) => {
          setIsListening(false);
          toast({
            title: 'Voice Recognition Error',
            description: 'Please try again or type your query instead.',
            variant: 'destructive',
          });
        };
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    } else {
      toast({
        title: 'Voice Recognition Not Supported',
        description: 'Please type your property search query instead.',
        variant: 'destructive',
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processQuery = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/voice-property-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process search query');
      }

      const result: SearchResponse = await response.json();
      setSearchResults(result);

      // Update conversation history
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', content: query },
        { role: 'assistant', content: result.conversationalResponse },
      ]);

      // Clear the transcript after successful processing
      setTranscript('');

      toast({
        title: 'Search Complete',
        description: `Found ${result.properties.length} properties matching your criteria.`,
      });
    } catch (_error) {
      toast({
        title: 'Search Error',
        description: 'Failed to process your search. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice-Activated Property Search
          </CardTitle>
          <p className="text-sm text-gray-600">
            Ask me about properties in natural language. Try: "Show me luxury homes in Skye Canyon
            under $2 million"
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice Input Controls */}
          <div className="flex items-center gap-4">
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? 'destructive' : 'default'}
              size="lg"
              className="flex items-center gap-2"
              disabled={!isSupported || isProcessing}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? 'Stop Listening' : 'Start Voice Search'}
            </Button>

            {transcript && (
              <Button
                onClick={() => processQuery(transcript)}
                disabled={isProcessing}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Search
              </Button>
            )}
          </div>

          {/* Live Transcript */}
          {(isListening || transcript) && (
            <div className="p-4 bg-blue-50 rounded-lg border">
              <p className="text-sm font-medium text-blue-800 mb-1">
                {isListening ? 'Listening...' : 'Voice Input:'}
              </p>
              <p className="text-blue-900">{transcript || 'Say something...'}</p>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Processing your request with AI...</span>
            </div>
          )}

          {/* Text Input Fallback */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Or type your query:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="e.g., Find me a 4-bedroom house in Skye Canyon under $1.5M"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && processQuery(transcript)}
              />
              <Button
                onClick={() => processQuery(transcript)}
                disabled={isProcessing || !transcript.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {conversationHistory.slice(-4).map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-50 border-blue-200 border ml-8'
                    : 'bg-gray-50 border-gray-200 border mr-8'
                }`}
              >
                <p
                  className={`text-sm font-medium mb-1 ${
                    message.role === 'user' ? 'text-blue-800' : 'text-gray-800'
                  }`}
                >
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </p>
                <p className="text-gray-900">{message.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            {searchResults.searchCriteria && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchResults.searchCriteria.priceRange && (
                  <Badge variant="outline">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {searchResults.searchCriteria.priceRange}
                  </Badge>
                )}
                {searchResults.searchCriteria.bedrooms && (
                  <Badge variant="outline">
                    <Home className="w-3 h-3 mr-1" />
                    {searchResults.searchCriteria.bedrooms} bedrooms
                  </Badge>
                )}
                {searchResults.searchCriteria.location && (
                  <Badge variant="outline">
                    <MapPin className="w-3 h-3 mr-1" />
                    {searchResults.searchCriteria.location}
                  </Badge>
                )}
                {searchResults.searchCriteria.propertyType && (
                  <Badge variant="outline">{searchResults.searchCriteria.propertyType}</Badge>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {searchResults.properties.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{property.address}</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                    <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                    <span>{property.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
