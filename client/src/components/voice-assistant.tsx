'use client'
import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  
  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(true)
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
        
        if (event.results[current].isFinal) {
          processCommand(transcript)
        }
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])
  
  const processCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase()
    let response = ''
    
    // Skye Canyon specific voice commands
    if (lowerCommand.includes('homes under') || lowerCommand.includes('properties under')) {
      const priceMatch = command.match(/(\d+)/)
      if (priceMatch) {
        const price = priceMatch[1]
        response = `I found several Skye Canyon homes under $${price}K. Would you like me to show you the best options with views of Red Rock Canyon?`
      }
    } else if (lowerCommand.includes('market') && (lowerCommand.includes('skye canyon') || lowerCommand.includes('what') || lowerCommand.includes('how'))) {
      response = 'The Skye Canyon market is very strong! Homes are selling 25% faster than the Las Vegas average, with luxury properties seeing multiple offers. I can provide you with detailed market analytics.'
    } else if (lowerCommand.includes('schedule') || lowerCommand.includes('showing') || lowerCommand.includes('tour')) {
      response = "I'd be happy to schedule a private showing of Skye Canyon homes. What day works best for you? I have availability this week."
    } else if (lowerCommand.includes('worth') || lowerCommand.includes('value') || lowerCommand.includes('estimate')) {
      response = "I can provide a comprehensive home valuation using the latest Skye Canyon market data. What's your property address?"
    } else if (lowerCommand.includes('luxury') || lowerCommand.includes('million') || lowerCommand.includes('premium')) {
      response = 'Skye Canyon has exceptional luxury homes starting at $800K, with many featuring Red Rock views, pools, and custom upgrades. Shall I show you our current luxury inventory?'
    } else if (lowerCommand.includes('schools') || lowerCommand.includes('education')) {
      response = 'Skye Canyon is served by excellent schools including Skye Canyon Elementary and Northwest Career & Technical Academy. The area is known for its family-friendly environment.'
    } else if (lowerCommand.includes('amenities') || lowerCommand.includes('community')) {
      response = 'Skye Canyon features hiking trails, parks, shopping at Downtown Summerlin, and stunning Red Rock Canyon access. It\'s one of Las Vegas\'s most desirable communities.'
    } else {
      response = "I'm Dr. Jan Duffy, your Skye Canyon specialist. I can help you search for homes, get market updates, schedule showings, or answer questions about this beautiful community. What would you like to know?"
    }
    
    setResponse(response)
    
    // Clear response after 8 seconds
    setTimeout(() => setResponse(''), 8000)
  }
  
  const toggleListening = () => {
    if (!isSupported) return
    
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
      setTranscript('')
    }
  }
  
  if (!isSupported) {
    return null // Don't show if not supported
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Assistant Bubble */}
      <div className="relative">
        <button
          onClick={toggleListening}
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
            ${isListening 
              ? 'bg-red-500 animate-pulse scale-110' 
              : 'bg-realscout-blue hover:bg-realscout-navy hover:scale-105'
            }
          `}
          aria-label="Voice assistant"
          title={isListening ? "Stop listening" : "Start voice search"}
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
  )
}