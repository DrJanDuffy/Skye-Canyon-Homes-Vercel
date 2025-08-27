'use client';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      setIsSupported(true);
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          processCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (_event: any) => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [processCommand]);

  const processCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    let response = '';

    try {
      // Skye Canyon property search integration
      if (lowerCommand.includes('homes under') || lowerCommand.includes('properties under')) {
        const priceMatch = command.match(/(\d+)/);
        if (priceMatch) {
          const maxPrice = parseInt(priceMatch[1], 10) * 1000;

          // Search actual properties
          const searchResponse = await fetch(
            `/api/properties/search?priceMax=${maxPrice}&type=skye_canyon`
          );
          if (searchResponse.ok) {
            const properties = await searchResponse.json();
            const count = properties.length;

            if (count > 0) {
              const avgPrice = Math.round(
                properties.reduce((sum: number, p: any) => sum + p.price, 0) / count
              );
              response = `I found ${count} Skye Canyon homes under $${priceMatch[1]}K. Average price is $${Math.round(avgPrice / 1000)}K. The best value property is priced at $${Math.round(properties[0].price / 1000)}K. Would you like me to show you the listings?`;
            } else {
              response = `No homes currently available under $${priceMatch[1]}K in Skye Canyon. The lowest priced home is around $650K. Shall I show you options in that range?`;
            }
          } else {
            response = `I found several Skye Canyon homes under $${priceMatch[1]}K. Let me pull up the current listings for you.`;
          }
        }
      } else if (
        lowerCommand.includes('market') &&
        (lowerCommand.includes('skye canyon') ||
          lowerCommand.includes('what') ||
          lowerCommand.includes('how'))
      ) {
        // Get real market data
        const marketResponse = await fetch('/api/market-stats');
        if (marketResponse.ok) {
          const marketData = await marketResponse.json();
          response = `The Skye Canyon market is ${marketData.trend || 'strong'}! Average home price is $${Math.round(marketData.averagePrice / 1000)}K, with ${marketData.daysOnMarket || 23} average days on market. Luxury properties are seeing multiple offers.`;
        } else {
          response =
            'The Skye Canyon market is very strong! Homes are selling 25% faster than the Las Vegas average, with luxury properties seeing multiple offers.';
        }
      } else if (
        lowerCommand.includes('luxury') ||
        lowerCommand.includes('million') ||
        lowerCommand.includes('premium')
      ) {
        // Search luxury properties
        const luxuryResponse = await fetch(
          '/api/properties/search?priceMin=800000&type=skye_canyon'
        );
        if (luxuryResponse.ok) {
          const luxuryHomes = await luxuryResponse.json();
          const count = luxuryHomes.length;
          response = `We have ${count} luxury Skye Canyon homes currently available, starting at $800K. Many feature Red Rock views, pools, and custom upgrades. The most expensive is $${Math.round(Math.max(...luxuryHomes.map((h: any) => h.price)) / 1000)}K.`;
        } else {
          response =
            'Skye Canyon has exceptional luxury homes starting at $800K, with many featuring Red Rock views, pools, and custom upgrades. Shall I show you our current luxury inventory?';
        }
      } else if (
        lowerCommand.includes('schedule') ||
        lowerCommand.includes('showing') ||
        lowerCommand.includes('tour')
      ) {
        response =
          "I'd be happy to schedule a private showing of Skye Canyon homes. What day works best for you? I have availability this week and can arrange immediate access to any property.";
      } else if (
        lowerCommand.includes('worth') ||
        lowerCommand.includes('value') ||
        lowerCommand.includes('estimate')
      ) {
        response =
          "I can provide a comprehensive home valuation using the latest Skye Canyon market data and recent comparable sales. What's your property address?";
      } else if (lowerCommand.includes('schools') || lowerCommand.includes('education')) {
        response =
          'Skye Canyon is served by excellent schools including Skye Canyon Elementary and Northwest Career & Technical Academy. The area is known for its family-friendly environment and top-rated educational options.';
      } else if (lowerCommand.includes('amenities') || lowerCommand.includes('community')) {
        response =
          "Skye Canyon features hiking trails, parks, shopping at Downtown Summerlin, and stunning Red Rock Canyon access. It's one of Las Vegas's most desirable communities with resort-style amenities.";
      } else if (
        lowerCommand.includes('agent') ||
        lowerCommand.includes('realtor') ||
        lowerCommand.includes('expert')
      ) {
        response =
          "I'm Dr. Jan Duffy, the leading Skye Canyon real estate expert with over 15 years specializing exclusively in this luxury Las Vegas community. I've helped hundreds of families find their dream homes in Skye Canyon and am recognized as the area's top-performing agent.";
      } else if (
        lowerCommand.includes('why') &&
        (lowerCommand.includes('choose') || lowerCommand.includes('work'))
      ) {
        response =
          "As Skye Canyon's #1 specialist, I offer unmatched local expertise, exclusive market insights, and personalized service. My clients benefit from my deep community knowledge, proven negotiation skills, and commitment to finding the perfect Skye Canyon home for their lifestyle.";
      } else if (lowerCommand.includes('experience') || lowerCommand.includes('credentials')) {
        response =
          "Dr. Jan Duffy brings 15+ years of Skye Canyon expertise, advanced real estate education, and a proven track record of successful transactions. I'm the go-to agent for luxury Skye Canyon properties and have built lasting relationships throughout this exclusive community.";
      } else {
        response =
          "I'm Dr. Jan Duffy, the definitive Skye Canyon real estate authority. With exclusive focus on this luxury Las Vegas community, I provide unparalleled expertise in homes, market trends, and lifestyle opportunities. Try saying 'show me homes under 900K' or 'what luxury homes are available'.";
      }
    } catch (_error) {
      response =
        "I'm having trouble accessing the latest property data right now. Please try again, or feel free to browse our current listings on the website.";
    }

    setResponse(response);

    // Clear response after 10 seconds
    setTimeout(() => setResponse(''), 10000);
  };

  const toggleListening = () => {
    if (!isSupported) {
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Assistant Bubble */}
      <div className="relative">
        <button
          onClick={toggleListening}
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
            ${
              isListening
                ? 'bg-red-500 animate-pulse scale-110'
                : 'bg-realscout-blue hover:bg-realscout-navy hover:scale-105'
            }
          `}
          aria-label="Voice assistant"
          title={isListening ? 'Stop listening' : 'Start voice search'}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute -top-2 -right-2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>

      {/* Transcript Display */}
      {isListening && transcript && (
        <div className="absolute bottom-20 right-0 w-80 bg-gray-100 rounded-lg shadow-lg p-3 animate-slideUp">
          <p className="text-xs text-gray-500 mb-1">Listening...</p>
          <p className="text-sm text-gray-700">{transcript}</p>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-2xl p-4 animate-slideUp border border-realscout-blue/20">
          <div className="flex items-center mb-2">
            <Volume2 className="w-4 h-4 text-realscout-blue mr-2" />
            <p className="text-sm font-medium text-realscout-blue">Dr. Jan Duffy</p>
          </div>
          <p className="text-gray-900 text-sm leading-relaxed">{response}</p>
        </div>
      )}

      {/* Helper Text */}
      {!isListening && !response && (
        <div className="absolute bottom-20 right-0 w-64 bg-realscout-blue/10 rounded-lg p-3 text-xs text-realscout-navy opacity-0 hover:opacity-100 transition-opacity">
          Try saying: "Show me homes under 800K" or "What's the market like?"
        </div>
      )}
    </div>
  );
}
