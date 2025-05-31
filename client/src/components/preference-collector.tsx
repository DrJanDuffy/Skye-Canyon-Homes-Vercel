'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { saveUserPreferences } from '@/lib/preferences'
import { useToast } from "@/hooks/use-toast"

export default function PreferenceCollector() {
  const [preferences, setPreferences] = useState({
    propertyType: '',
    features: [] as string[],
    lifestyle: [] as string[],
    timeline: '',
    communication: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const features = [
    { id: 'pool', label: '🏊 Pool & Spa', value: 'pool' },
    { id: 'golf', label: '⛳ Golf Course View', value: 'golf-view' },
    { id: 'modern', label: '🏢 Gourmet Kitchen', value: 'gourmet-kitchen' },
    { id: 'office', label: '💼 Home Office', value: 'home-office' },
    { id: 'rv', label: '🚐 RV Parking', value: 'rv-parking' },
    { id: 'view', label: '🏔️ Red Rock Views', value: 'red-rock-views' },
    { id: 'solar', label: '☀️ Solar Panels', value: 'solar' },
    { id: 'garage', label: '🚗 3+ Car Garage', value: 'large-garage' }
  ]
  
  const lifestyles = [
    { id: 'family', label: '👨‍👩‍👧‍👦 Family-Focused', value: 'family' },
    { id: 'entertaining', label: '🎉 Love Entertaining', value: 'entertaining' },
    { id: 'quiet', label: '🤫 Quiet & Private', value: 'quiet' },
    { id: 'active', label: '🏃 Active Lifestyle', value: 'active' },
    { id: 'pet', label: '🐕 Pet Owner', value: 'pets' },
    { id: 'work', label: '🏠 Work From Home', value: 'remote-work' },
    { id: 'luxury', label: '✨ Luxury Living', value: 'luxury' },
    { id: 'investment', label: '📈 Investment Property', value: 'investment' }
  ]

  const handleSubmit = async () => {
    if (!preferences.propertyType || !preferences.communication) {
      toast({
        title: "Please complete all required fields",
        description: "Property style and communication preference are required.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const result = await saveUserPreferences(preferences)
      
      if (result.success) {
        toast({
          title: "Preferences Saved!",
          description: "I'll send you personalized Skye Canyon property matches within 24 hours."
        })
        
        // Reset form
        setPreferences({
          propertyType: '',
          features: [],
          lifestyle: [],
          timeline: '',
          communication: ''
        })
      } else {
        throw new Error('Failed to save preferences')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to save preferences. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Card className="bg-gradient-to-br from-realscout-blue/5 to-blue-50 border-realscout-blue/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-realscout-navy">
          🎯 Find Your Perfect Skye Canyon Home
        </CardTitle>
        <p className="text-gray-600">
          Tell us what matters most to you for personalized property recommendations
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium mb-3 text-realscout-navy">
            Preferred Property Style *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Single Story', 'Two Story', 'Modern', 'Traditional'].map((type) => (
              <Button
                key={type}
                variant={preferences.propertyType === type ? "default" : "outline"}
                onClick={() => setPreferences({...preferences, propertyType: type})}
                className={preferences.propertyType === type ? "bg-realscout-blue" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Must-Have Features */}
        <div>
          <label className="block text-sm font-medium mb-3 text-realscout-navy">
            Must-Have Features (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={preferences.features.includes(feature.value) ? "default" : "outline"}
                onClick={() => {
                  const updated = preferences.features.includes(feature.value)
                    ? preferences.features.filter(f => f !== feature.value)
                    : [...preferences.features, feature.value]
                  setPreferences({...preferences, features: updated})
                }}
                className={`text-left justify-start ${
                  preferences.features.includes(feature.value) ? "bg-realscout-blue" : ""
                }`}
                size="sm"
              >
                {feature.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Lifestyle */}
        <div>
          <label className="block text-sm font-medium mb-3 text-realscout-navy">
            Your Lifestyle (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lifestyles.map((lifestyle) => (
              <Button
                key={lifestyle.id}
                variant={preferences.lifestyle.includes(lifestyle.value) ? "default" : "outline"}
                onClick={() => {
                  const updated = preferences.lifestyle.includes(lifestyle.value)
                    ? preferences.lifestyle.filter(l => l !== lifestyle.value)
                    : [...preferences.lifestyle, lifestyle.value]
                  setPreferences({...preferences, lifestyle: updated})
                }}
                className={`text-left justify-start ${
                  preferences.lifestyle.includes(lifestyle.value) ? "bg-realscout-blue" : ""
                }`}
                size="sm"
              >
                {lifestyle.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium mb-3 text-realscout-navy">
            Buying Timeline
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['ASAP', '1-3 months', '3-6 months', '6+ months'].map((time) => (
              <Button
                key={time}
                variant={preferences.timeline === time ? "default" : "outline"}
                onClick={() => setPreferences({...preferences, timeline: time})}
                className={preferences.timeline === time ? "bg-realscout-blue" : ""}
                size="sm"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Communication Preference */}
        <div>
          <label className="block text-sm font-medium mb-3 text-realscout-navy">
            How should I update you? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Text', 'Email', 'Phone Call', 'All methods'].map((method) => (
              <Button
                key={method}
                variant={preferences.communication === method ? "default" : "outline"}
                onClick={() => setPreferences({...preferences, communication: method})}
                className={preferences.communication === method ? "bg-realscout-blue" : ""}
                size="sm"
              >
                {method}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-realscout-blue text-white py-3 text-lg font-medium hover:bg-realscout-navy"
          size="lg"
        >
          {isSubmitting ? "Saving..." : "Get My Personalized Matches 🏠"}
        </Button>
      </CardContent>
    </Card>
  )
}