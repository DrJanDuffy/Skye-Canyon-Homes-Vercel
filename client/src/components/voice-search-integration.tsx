import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Search, AlertCircle } from 'lucide-react';

interface VoiceSearchIntegrationProps {
  maxSearches?: number;
  onSearchLimitReached?: () => void;
}

interface SearchResult {
  query: string;
  timestamp: number;
  results: any[];
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function VoiceSearchIntegration({ 
  maxSearches = 3,
  onSearchLimitReached 
}: VoiceSearchIntegrationProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Load search count from localStorage
    const savedCount = localStorage.getItem('voiceSearchCount');
    const savedDate = localStorage.getItem('voiceSearchDate');
    const today = new Date().toDateString();

    if (savedDate !== today) {
      // Reset count for new day
      localStorage.setItem('voiceSearchCount', '0');
      localStorage.setItem('voiceSearchDate', today);
      setSearchCount(0);
    } else if (savedCount) {
      setSearchCount(parseInt(savedCount));
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);

        if (event.results[event.results.length - 1].isFinal) {
          handleVoiceSearch(currentTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsProcessing(true);
    
    try {
      // Process voice search with AI and get property results
      const response = await fetch('/api/voice-property-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          searchCount,
          conversationHistory: []
        })
      });

      const results = await response.json();
      
      const searchResult: SearchResult = {
        query,
        timestamp: Date.now(),
        results: results.properties || []
      };

      setSearchHistory(prev => [searchResult, ...prev.slice(0, 4)]);
      
      // Increment search count
      const newCount = searchCount + 1;
      setSearchCount(newCount);
      localStorage.setItem('voiceSearchCount', newCount.toString());

      // Check if limit reached
      if (newCount >= maxSearches) {
        setShowLimitWarning(true);
        setTimeout(() => {
          triggerRealScoutPopup();
        }, 2000);
      } else if (newCount === maxSearches - 1) {
        setShowLimitWarning(true);
      }

    } catch (error) {
      console.error('Voice search error:', error);
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const triggerRealScoutPopup = () => {
    // Create overlay for RealScout integration
    const overlay = document.createElement('div');
    overlay.id = 'realscout-voice-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    `;

    popup.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
          Ready to Find Your Perfect Home?
        </h3>
        <p style="color: #6b7280; margin-bottom: 1.5rem;">
          You've reached your voice search limit. Continue with our full property search platform.
        </p>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="http://drjanduffy.realscout.com/onboarding" 
           target="_blank" 
           rel="noopener noreferrer"
           onclick="trackConversionClick('realscout_onboarding', 'voice_limit_popup')"
           style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 1rem 2rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
          </svg>
          Search All Properties
        </a>
        <button onclick="document.getElementById('realscout-voice-overlay').remove()" 
                style="background: transparent; border: 2px solid #3b82f6; color: #3b82f6; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
          Maybe Later
        </button>
      </div>
      
      <p style="font-size: 0.875rem; color: #9ca3af; margin-top: 1rem;">
        Voice searches reset daily
      </p>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'voice_search_limit_reached', {
        event_category: 'engagement',
        event_label: 'realscout_popup_triggered',
        value: searchCount
      });
    }

    onSearchLimitReached?.();
  };

  const startListening = () => {
    if (searchCount >= maxSearches) {
      triggerRealScoutPopup();
      return;
    }

    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const remainingSearches = Math.max(0, maxSearches - searchCount);

  return (
    <div className="space-y-4">
      {/* Voice Search Interface */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Mic className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Voice Property Search</h3>
            </div>
            
            {showLimitWarning && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-orange-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {remainingSearches > 0 
                      ? `${remainingSearches} voice search${remainingSearches !== 1 ? 'es' : ''} remaining today`
                      : 'Voice search limit reached for today'
                    }
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>

              <p className="text-sm text-gray-600">
                {isListening 
                  ? 'Listening... Speak now!'
                  : isProcessing
                  ? 'Processing your search...'
                  : 'Click to start voice search'
                }
              </p>

              {transcript && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">"{transcript}"</p>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">
              Voice searches used today: {searchCount}/{maxSearches}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Recent Voice Searches</h4>
            <div className="space-y-2">
              {searchHistory.slice(0, 3).map((search, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate flex-1">
                    "{search.query}"
                  </span>
                  <span className="text-gray-500 ml-2">
                    {search.results.length} results
                  </span>
                </div>
              ))}
            </div>
            
            {searchCount >= maxSearches && (
              <div className="mt-3 pt-3 border-t">
                <Button
                  onClick={triggerRealScoutPopup}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Continue with Full Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}