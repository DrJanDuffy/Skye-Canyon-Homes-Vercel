import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Search, Home, DollarSign, TrendingUp } from "lucide-react";

interface AISearchResults {
  properties?: any[];
  suggestions?: string[];
  marketInsights?: string;
}

export default function AISearchAssistant() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState<'buying' | 'selling' | 'value'>('buying');
  const [voiceActive, setVoiceActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AISearchResults | null>(null);

  const suggestions = [
    "Homes under $800k in Sky Canyon",
    "3 bedroom houses with pool",
    "What's my home worth?",
    "Best schools in the area",
    "Market trends in Sky Canyon"
  ];

  // Voice search integration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.onend = () => {
        setVoiceActive(false);
      };

      if (voiceActive) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [voiceActive]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          context
        })
      });
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const searchResults = await response.json();
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        suggestions: ["Search temporarily unavailable. Please try again."],
        marketInsights: "Connect with Dr. Jan Duffy directly for personalized property recommendations."
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleVoiceToggle = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setVoiceActive(!voiceActive);
    } else {
      alert('Voice search is not supported in this browser');
    }
  };

  return (
    <Card className="relative bg-gradient-to-br from-blue-50 to-white shadow-2xl border-0">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            AI Property Search Assistant
          </h3>
          <p className="text-gray-600">
            Ask me anything about Sky Canyon real estate
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything about Sky Canyon homes..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button
            onClick={handleVoiceToggle}
            variant={voiceActive ? "destructive" : "outline"}
            size="lg"
            className={`p-4 rounded-xl ${voiceActive ? 'animate-pulse' : ''}`}
          >
            {voiceActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
          <Button
            onClick={handleSearch}
            size="lg"
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl"
            disabled={isSearching}
          >
            <Search className="w-6 h-6" />
          </Button>
        </div>

        {/* AI Context Selector */}
        <div className="flex space-x-2 mb-6 justify-center">
          <Button
            onClick={() => setContext('buying')}
            variant={context === 'buying' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Buying</span>
          </Button>
          <Button
            onClick={() => setContext('selling')}
            variant={context === 'selling' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Selling</span>
          </Button>
          <Button
            onClick={() => setContext('value')}
            variant={context === 'value' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Home Value</span>
          </Button>
        </div>

        {/* Smart Suggestions */}
        {!query && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 text-center">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 px-3 py-1"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Analyzing market data and properties...</p>
          </div>
        )}

        {/* Results */}
        {results && !isSearching && (
          <div className="space-y-4 bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">AI Insights:</h4>
            {results.suggestions?.map((suggestion, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
            {results.marketInsights && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">Market Insight:</p>
                <p className="text-blue-700">{results.marketInsights}</p>
              </div>
            )}
          </div>
        )}

        {voiceActive && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Listening...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}