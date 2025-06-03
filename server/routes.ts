import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";
import { handleIndexingRequest, requestGoogleIndexing, getAllSiteUrls, submitSitemap } from "./google-indexing";


// AI Lead Scoring Functions
async function scoreLeadWithAI(leadData: any) {
  const factors = {
    hasPreapproval: leadData.preapproved ? 20 : 0,
    timeframe: {
      'ASAP': 25,
      '1-3 months': 20,
      '3-6 months': 10,
      '6+ months': 5,
      'Just browsing': 0
    }[leadData.timeframe as string] || 0,
    priceRange: leadData.priceRange ? 15 : 0,
    previousInteractions: Math.min((leadData.interactions || 0) * 5, 20),
    propertyViews: Math.min((leadData.propertyViews || 0) * 2, 10),
    responseTime: leadData.responseTime < 300 ? 10 : 5,
  };
  
  const totalScore = Object.values(factors).reduce((a, b) => a + b, 0);
  
  let category: 'hot' | 'warm' | 'cold';
  let recommendedActions: string[];
  let estimatedTimeframe: string;
  
  if (totalScore >= 70) {
    category = 'hot';
    recommendedActions = [
      'Call within 5 minutes',
      'Send personalized Skye Canyon property matches',
      'Schedule showing ASAP'
    ];
    estimatedTimeframe = '0-30 days';
  } else if (totalScore >= 40) {
    category = 'warm';
    recommendedActions = [
      'Call within 1 hour',
      'Send Skye Canyon market report',
      'Add to drip campaign'
    ];
    estimatedTimeframe = '30-90 days';
  } else {
    category = 'cold';
    recommendedActions = [
      'Add to nurture sequence',
      'Send monthly Skye Canyon newsletter',
      'Check in quarterly'
    ];
    estimatedTimeframe = '90+ days';
  }
  
  return {
    score: totalScore,
    category,
    recommendedActions,
    estimatedTimeframe
  };
}

async function sendToFollowUpBoss(lead: any, leadScore: any) {
  const apiKey = process.env.FOLLOWUP_BOSS_API_KEY;
  
  if (!apiKey) {
    console.log('FollowUp Boss API key not configured - skipping CRM integration');
    return;
  }

  try {
    const response = await fetch('https://api.followupboss.com/v1/people', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: lead.firstName,
        lastName: lead.lastName,
        emails: [{ value: lead.email, type: 'work' }],
        phones: lead.phone ? [{ value: lead.phone, type: 'mobile' }] : [],
        source: 'Skye Canyon Website',
        customFields: {
          lead_score: leadScore.score,
          lead_category: leadScore.category,
          estimated_timeframe: leadScore.estimatedTimeframe,
          skye_canyon_interest: true,
          timeframe: lead.timeframe,
          price_range: lead.priceRange,
          message: lead.message
        },
        tags: [`Lead Score: ${leadScore.category}`, 'Skye Canyon Interest']
      })
    });

    if (!response.ok) {
      console.error('Failed to send lead to FollowUp Boss:', response.statusText);
    } else {
      console.log(`Lead successfully sent to FollowUp Boss with ${leadScore.category} score`);
    }
  } catch (error) {
    console.error('Error sending lead to FollowUp Boss:', error);
  }
}

// AI Search Processing Function
async function processAISearch(query: string, context: string) {
  const lowerQuery = query.toLowerCase();
  
  // Extract price range from query
  const priceMatch = lowerQuery.match(/(\$?[\d,]+k?)\s*(?:to|-)?\s*(\$?[\d,]+k?)?/);
  let priceMin: number | undefined, priceMax: number | undefined;
  
  if (priceMatch) {
    const parsePrice = (str: string) => {
      const num = str.replace(/[\$,]/g, '');
      return num.includes('k') ? parseInt(num) * 1000 : parseInt(num);
    };
    priceMin = parsePrice(priceMatch[1]);
    if (priceMatch[2]) priceMax = parsePrice(priceMatch[2]);
  }
  
  // Extract bedrooms/bathrooms
  const bedroomMatch = lowerQuery.match(/(\d+)\s*(?:bed|br)/);
  const bathroomMatch = lowerQuery.match(/(\d+)\s*(?:bath|ba)/);
  
  // Get properties from storage
  const properties = await storage.getProperties();
  
  // Filter properties based on query
  let filteredProperties = properties;
  
  if (priceMin) {
    filteredProperties = filteredProperties.filter(p => 
      p.price >= priceMin && (!priceMax || p.price <= priceMax)
    );
  }
  
  if (bedroomMatch) {
    const bedrooms = parseInt(bedroomMatch[1]);
    filteredProperties = filteredProperties.filter(p => Number(p.bedrooms) >= bedrooms);
  }
  
  if (bathroomMatch) {
    const bathrooms = parseInt(bathroomMatch[1]);
    filteredProperties = filteredProperties.filter(p => Number(p.bathrooms) >= bathrooms);
  }
  
  // Generate contextual suggestions
  const suggestions = [];
  const propertyCount = filteredProperties.length;
  
  if (propertyCount > 0) {
    suggestions.push(`Found ${propertyCount} properties matching your criteria`);
    
    const avgPrice = filteredProperties.reduce((sum, p) => sum + p.price, 0) / propertyCount;
    suggestions.push(`Average price: $${Math.round(avgPrice).toLocaleString()}`);
    
    if (context === 'buying') {
      suggestions.push("Current market conditions are favorable for buyers");
    } else if (context === 'selling') {
      suggestions.push("Properties in Skye Canyon are selling 15% faster than last year");
    } else if (context === 'value') {
      suggestions.push("Skye Canyon home values have increased 8% year-over-year");
    }
  } else {
    suggestions.push("No exact matches found, but here are similar properties");
    suggestions.push("Consider expanding your search criteria");
  }
  
  return {
    properties: filteredProperties.slice(0, 6),
    suggestions,
    marketInsights: "Skye Canyon remains one of Las Vegas's most desirable neighborhoods with strong appreciation potential.",
    totalResults: propertyCount
  };
}

// Voice Search with Perplexity AI
async function processVoiceSearch(query: string, conversationHistory: Array<{role: 'user' | 'assistant', content: string}>) {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error("Perplexity API key not configured");
  }

  // Get available properties from storage
  const allProperties = await storage.getProperties();
  
  // Create context for AI about available properties
  const propertyContext = allProperties.map(p => 
    `${p.address} - $${p.price.toLocaleString()} - ${p.bedrooms}bed/${p.bathrooms}bath - ${p.sqft}sqft - ${p.status || 'For Sale'}`
  ).join('\n');

  const systemPrompt = `You are a professional real estate assistant for Dr. Jan Duffy, specializing in Skye Canyon and Las Vegas properties. 

Available Properties:
${propertyContext}

Your role:
- Help users find properties that match their criteria
- Provide conversational, helpful responses
- Extract search criteria from natural language
- Be knowledgeable about Las Vegas real estate market
- Always be professional and friendly

When users ask about properties, analyze their request and:
1. Extract search criteria (price range, bedrooms, location, property type)
2. Filter the available properties
3. Provide a conversational response explaining the results
4. Suggest relevant follow-up questions or alternatives`;

  try {
    // Prepare messages for Perplexity
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (conversationHistory.length > 0) {
      // Add recent conversation history
      const recentHistory = conversationHistory.slice(-4);
      messages.push(...recentHistory.map(h => ({ role: h.role, content: h.content })));
    }

    messages.push({ role: 'user', content: query });

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.2,
        top_p: 0.9,
        search_domain_filter: ["realtor.com", "zillow.com", "redfin.com", "vegas.com", "lvrealtors.com"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'I can help you find properties that match your criteria.';
    
    // Extract search criteria using simple parsing (could be enhanced with more AI)
    const searchCriteria: any = {};
    const queryLower = query.toLowerCase();
    
    // Price range detection
    if (queryLower.includes('under') && queryLower.includes('million')) {
      const match = queryLower.match(/under\s+\$?(\d+(?:\.\d+)?)\s*million/);
      if (match) {
        searchCriteria.priceRange = `Under $${match[1]}M`;
      }
    }
    
    // Bedroom detection
    const bedroomMatch = queryLower.match(/(\d+)[\s-]*(bed|bedroom)/);
    if (bedroomMatch) {
      searchCriteria.bedrooms = parseInt(bedroomMatch[1]);
    }
    
    // Location detection
    if (queryLower.includes('skye canyon')) {
      searchCriteria.location = 'Skye Canyon';
    } else if (queryLower.includes('las vegas')) {
      searchCriteria.location = 'Las Vegas';
    }
    
    // Property type detection
    if (queryLower.includes('luxury') || queryLower.includes('premium')) {
      searchCriteria.propertyType = 'Luxury';
    }

    // Filter properties based on criteria
    let filteredProperties = allProperties;
    
    if (searchCriteria.priceRange && searchCriteria.priceRange.includes('Under')) {
      const maxPrice = parseFloat(searchCriteria.priceRange.match(/(\d+(?:\.\d+)?)/)[1]) * 1000000;
      filteredProperties = filteredProperties.filter(p => p.price <= maxPrice);
    }
    
    if (searchCriteria.bedrooms) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= searchCriteria.bedrooms);
    }
    
    if (searchCriteria.location === 'Skye Canyon') {
      filteredProperties = filteredProperties.filter(p => p.address.toLowerCase().includes('skye') || p.address.toLowerCase().includes('canyon'));
    }

    return {
      properties: filteredProperties.slice(0, 6), // Limit to 6 results
      conversationalResponse: aiResponse,
      searchCriteria,
      citations: data.citations || []
    };

  } catch (error) {
    console.error('Error processing voice search with AI:', error);
    
    // Fallback response
    return {
      properties: allProperties.slice(0, 3),
      conversationalResponse: "I apologize, but I'm having trouble processing your request right now. Here are some available properties that might interest you. Could you please rephrase your search or try again?",
      searchCriteria: {}
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all properties
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  // Search properties
  app.get("/api/properties/search", async (req, res) => {
    try {
      const { priceMin, priceMax, type } = req.query;
      const filters = {
        priceMin: priceMin ? Number(priceMin) : undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
        type: type as string | undefined
      };
      
      const properties = await storage.searchProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  // Get single property
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Create new property
  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  // Get market statistics
  app.get("/api/market-stats", async (req, res) => {
    try {
      const stats = await storage.getMarketStats();
      if (!stats) {
        return res.status(404).json({ message: "Market stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market stats" });
    }
  });



  // Create new lead with AI scoring
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // AI Lead Scoring
      const leadScore = await scoreLeadWithAI({
        ...validatedData,
        id: lead.id,
        interactions: 1,
        propertyViews: 0,
        responseTime: 0
      });
      
      // Send to FollowUp Boss CRM with score
      await sendToFollowUpBoss(lead, leadScore);
      
      res.status(201).json({ 
        message: "Lead created successfully",
        id: lead.id,
        score: leadScore.score,
        category: leadScore.category,
        recommendedActions: leadScore.recommendedActions,
        estimatedTimeframe: leadScore.estimatedTimeframe
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Get all leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // FollowUp Boss lead management only (no listings)
  app.get("/api/followup-boss/leads", async (req, res) => {
    try {
      const apiKey = process.env.FOLLOWUP_BOSS_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ message: "FollowUp Boss API key not configured" });
      }

      // Fetch leads/contacts from FollowUp Boss
      const response = await fetch('https://api.followupboss.com/v1/people', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`FollowUp Boss API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('FollowUp Boss leads API error:', error);
      res.status(500).json({ message: "Failed to fetch FollowUp Boss leads" });
    }
  });

  // FollowUp Boss lead update endpoint
  app.post("/api/followup-boss/update-lead", async (req, res) => {
    try {
      const apiKey = process.env.FOLLOWUP_BOSS_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ message: "FollowUp Boss API key not configured" });
      }

      const { leadId, customFields } = req.body;

      const response = await fetch(`https://api.followupboss.com/v1/people/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customFields
        })
      });

      if (!response.ok) {
        throw new Error(`FollowUp Boss API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('FollowUp Boss update lead API error:', error);
      res.status(500).json({ message: "Failed to update lead in FollowUp Boss" });
    }
  });

  // FollowUp Boss contacts endpoint
  app.get("/api/followup-boss/contacts", async (req, res) => {
    try {
      const apiKey = process.env.FOLLOWUP_BOSS_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ message: "FollowUp Boss API key not configured" });
      }

      const response = await fetch('https://api.followupboss.com/v1/people', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`FollowUp Boss API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('FollowUp Boss contacts API error:', error);
      res.status(500).json({ message: "Failed to fetch FollowUp Boss contacts" });
    }
  });

  // Neighborhood heatmap endpoint
  app.get("/api/neighborhood-heatmap", async (req, res) => {
    try {
      const heatmapData = {
        neighborhoods: [
          {
            neighborhood: "Skye Canyon",
            coordinates: { lat: 36.2469, lng: -115.3242 },
            priceRange: "$800K - $1.5M",
            averagePrice: 1250000,
            marketActivity: 'hot',
            daysOnMarket: 15,
            priceChange: 8.5,
            schoolRating: 9,
            walkScore: 45,
            crimeRating: 'low',
            amenities: ['Golf Course', 'Parks', 'Shopping', 'Hiking Trails'],
            recentSales: 24
          },
          {
            neighborhood: "Centennial Hills",
            coordinates: { lat: 36.2633, lng: -115.3086 },
            priceRange: "$700K - $1.2M",
            averagePrice: 950000,
            marketActivity: 'warm',
            daysOnMarket: 22,
            priceChange: 5.2,
            schoolRating: 8,
            walkScore: 52,
            crimeRating: 'low',
            amenities: ['Shopping Centers', 'Recreation', 'Schools'],
            recentSales: 18
          },
          {
            neighborhood: "Summerlin West",
            coordinates: { lat: 36.1716, lng: -115.3447 },
            priceRange: "$600K - $1.8M",
            averagePrice: 1100000,
            marketActivity: 'hot',
            daysOnMarket: 18,
            priceChange: 7.1,
            schoolRating: 9,
            walkScore: 48,
            crimeRating: 'low',
            amenities: ['Red Rock Canyon', 'Golf', 'Dining', 'Entertainment'],
            recentSales: 31
          },
          {
            neighborhood: "Mountains Edge",
            coordinates: { lat: 36.0853, lng: -115.3447 },
            priceRange: "$500K - $1.1M",
            averagePrice: 780000,
            marketActivity: 'warm',
            daysOnMarket: 28,
            priceChange: 4.3,
            schoolRating: 7,
            walkScore: 41,
            crimeRating: 'medium',
            amenities: ['Parks', 'Shopping', 'Community Centers'],
            recentSales: 15
          },
          {
            neighborhood: "Aliante",
            coordinates: { lat: 36.2897, lng: -115.2419 },
            priceRange: "$400K - $900K",
            averagePrice: 650000,
            marketActivity: 'cool',
            daysOnMarket: 35,
            priceChange: 2.1,
            schoolRating: 6,
            walkScore: 38,
            crimeRating: 'medium',
            amenities: ['Golf Course', 'Casino', 'Dining'],
            recentSales: 12
          }
        ],
        insights: {
          marketTrends: {
            direction: 'up',
            percentage: 6.2,
            timeframe: 'last 6 months'
          },
          hotspots: ['Skye Canyon', 'Summerlin West', 'Centennial Hills'],
          investmentOpportunity: 'high',
          demographicInsights: {
            averageAge: 42,
            familyFriendly: true,
            incomeLevel: 'high'
          }
        }
      };
      
      res.json(heatmapData);
    } catch (error) {
      console.error("Error fetching neighborhood heatmap data:", error);
      res.status(500).json({ error: "Failed to fetch neighborhood heatmap data" });
    }
  });

  // Voice Property Search endpoint
  app.post("/api/voice-property-search", async (req, res) => {
    try {
      const { query, conversationHistory } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query is required" });
      }

      const results = await processVoiceSearch(query, conversationHistory || []);
      res.json(results);
    } catch (error) {
      console.error('Voice search error:', error);
      res.status(500).json({ 
        message: "Failed to process voice search",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // User preferences endpoint
  app.post("/api/user-preferences", async (req, res) => {
    try {
      const { preferences, timestamp, source } = req.body;
      
      // Save preferences to database
      const preferenceData = {
        preferences: JSON.stringify(preferences),
        timestamp,
        source,
        sessionId: (req as any).sessionID || 'anonymous'
      };
      
      // Send enhanced lead to FollowUp Boss with preferences
      const apiKey = process.env.FOLLOWUP_BOSS_API_KEY;
      
      if (apiKey) {
        const leadData = {
          source: 'Skye Canyon Preference Collector',
          customFields: {
            property_type_preference: preferences.propertyType,
            desired_features: preferences.features.join(', '),
            lifestyle_preferences: preferences.lifestyle.join(', '),
            buying_timeline: preferences.timeline,
            communication_preference: preferences.communication,
            preference_score: calculatePreferenceQuality(preferences)
          },
          tags: ['Preference Qualified', 'Skye Canyon Interest', `Timeline: ${preferences.timeline}`]
        };

        await fetch('https://api.followupboss.com/v1/people', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData)
        });
      }
      
      res.json({ success: true, message: "Preferences saved successfully" });
    } catch (error) {
      console.error('Error saving preferences:', error);
      res.status(500).json({ message: "Failed to save preferences" });
    }
  });

  // Personalized property matching endpoint
  app.post("/api/personalized-matches", async (req, res) => {
    try {
      const preferences = req.body;
      
      // Get all properties
      const properties = await storage.getProperties();
      
      // Score and filter properties based on preferences
      const scoredProperties = properties.map(property => ({
        ...property,
        matchScore: calculatePropertyMatch(property, preferences)
      }))
      .filter(property => property.matchScore > 30) // Only show good matches
      .sort((a, b) => b.matchScore - a.matchScore) // Sort by best match
      .slice(0, 6); // Top 6 matches
      
      res.json({
        matches: scoredProperties,
        totalCount: scoredProperties.length,
        preferences
      });
    } catch (error) {
      console.error('Error generating matches:', error);
      res.status(500).json({ message: "Failed to generate matches" });
    }
  });

  function calculatePreferenceQuality(preferences: any): number {
    let score = 0;
    
    if (preferences.propertyType) score += 20;
    if (preferences.features.length > 0) score += preferences.features.length * 10;
    if (preferences.lifestyle.length > 0) score += preferences.lifestyle.length * 8;
    if (preferences.timeline) score += 15;
    if (preferences.communication) score += 10;
    
    return Math.min(score, 100);
  }

  function calculatePropertyMatch(property: any, preferences: any): number {
    let score = 0;
    
    // Property type matching
    if (preferences.propertyType && property.type?.includes(preferences.propertyType.toLowerCase())) {
      score += 25;
    }
    
    // Feature matching
    preferences.features.forEach((feature: string) => {
      if (property.description?.toLowerCase().includes(feature.replace('-', ' '))) {
        score += 15;
      }
    });
    
    // Lifestyle matching
    preferences.lifestyle.forEach((lifestyle: string) => {
      switch (lifestyle) {
        case 'family':
          if (property.bedrooms >= 3) score += 10;
          break;
        case 'entertaining':
          if (property.description?.includes('pool') || property.description?.includes('entertaining')) score += 10;
          break;
        case 'luxury':
          if (property.price > 800000) score += 10;
          break;
        case 'active':
          if (property.description?.includes('trail') || property.description?.includes('fitness')) score += 10;
          break;
      }
    });
    
    // Timeline urgency factor
    if (preferences.timeline === 'ASAP') score += 5;
    
    return Math.min(score, 100);
  }

  // Google Search Console and Indexing endpoints
  app.post("/api/google/request-indexing", handleIndexingRequest);
  
  app.post("/api/google/index-all-pages", async (req, res) => {
    try {
      const urls = getAllSiteUrls();
      const result = await requestGoogleIndexing(urls);
      res.json({
        success: true,
        message: `Requested indexing for ${urls.length} pages`,
        results: result
      });
    } catch (error) {
      console.error('Bulk indexing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to request bulk indexing'
      });
    }
  });

  app.post("/api/google/submit-sitemap", async (req, res) => {
    try {
      const result = await submitSitemap();
      res.json(result);
    } catch (error) {
      console.error('Sitemap submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit sitemap'
      });
    }
  });

  app.get("/api/google/site-urls", (req, res) => {
    const urls = getAllSiteUrls();
    res.json({
      success: true,
      urls,
      count: urls.length
    });
  });

  // Analytics endpoint
  app.post("/api/analytics", async (req, res) => {
    try {
      const { event, parameters, context } = req.body;
      
      // Store analytics data
      const analyticsData = {
        event,
        parameters,
        context,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      };
      
      // Log for analysis (in production, send to analytics service)
      console.log('Analytics Event:', JSON.stringify(analyticsData, null, 2));
      
      // Send to external analytics if configured
      const analyticsKey = process.env.ANALYTICS_API_KEY;
      if (analyticsKey) {
        // Forward to external analytics service
        await fetch('https://analytics.example.com/events', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${analyticsKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(analyticsData)
        }).catch(err => console.log('External analytics error:', err));
      }
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  // RSS Feed integration from Simplifying the Market
  app.get("/api/market-insights", async (req, res) => {
    try {
      const response = await fetch("https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18");
      
      if (!response.ok) {
        throw new Error(`RSS Feed error: ${response.status}`);
      }

      const xmlText = await response.text();
      
      // Parse XML to extract insights from items
      const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];
      
      const insights = itemMatches.slice(0, 5).map((item) => {
        const titleMatch = item.match(/<title>(.*?)<\/title>/);
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
        const imageMatch = item.match(/<img[^>]*src="([^"]*)"[^>]*>/);
        
        const title = titleMatch ? titleMatch[1] : '';
        const link = linkMatch ? linkMatch[1] : '';
        const description = descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '';
        const imageUrl = imageMatch ? imageMatch[1] : '';
        
        return {
          title,
          link,
          description,
          imageUrl,
          source: 'Skye Canyon Market Report'
        };
      }).filter(insight => insight.title && insight.link);

      res.json({ insights });
    } catch (error) {
      console.error("RSS Feed error:", error);
      res.status(500).json({ message: "Failed to fetch market insights" });
    }
  });

  // AI Search Assistant endpoint
  app.post("/api/ai-search", async (req, res) => {
    try {
      const { query, context } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }

      // Process natural language query and return relevant property insights
      const searchResults = await processAISearch(query, context);
      res.json(searchResults);
    } catch (error) {
      console.error('AI Search error:', error);
      res.status(500).json({ message: "Failed to process search query" });
    }
  });

  // SEO Routes
  app.get("/robots.txt", (req, res) => {
    res.type('text/plain');
    res.sendFile('robots.txt', { root: 'public' });
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type('application/xml');
    res.sendFile('sitemap.xml', { root: 'public' });
  });

  // Google Indexing API webhook
  app.post("/api/indexing-webhook", async (req, res) => {
    try {
      const { url, type, timestamp } = req.body;
      
      console.log(`Indexing request: ${type} for ${url} at ${timestamp}`);
      
      const indexingData = {
        url,
        type,
        timestamp: new Date().toISOString(),
        userAgent: req.get('User-Agent'),
        ip: req.ip
      };
      
      res.status(200).json({ 
        success: true, 
        message: 'Indexing request processed',
        data: indexingData 
      });
      
    } catch (error) {
      console.error('Indexing webhook error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to process indexing request' 
      });
    }
  });

  // IndexNow API endpoint for instant search engine notification
  app.post("/api/submit-indexnow", async (req, res) => {
    try {
      const { urls } = req.body;
      const indexNowKey = process.env.INDEXNOW_API_KEY;
      
      if (!indexNowKey) {
        return res.status(400).json({ 
          success: false, 
          message: 'IndexNow API key not configured' 
        });
      }
      
      const payload = {
        host: 'skyecanyonhomesforsale.com',
        key: indexNowKey,
        keyLocation: `https://skyecanyonhomesforsale.com/${indexNowKey}.txt`,
        urlList: urls || []
      };
      
      const engines = [
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow'
      ];
      
      const submissions = engines.map(engine => 
        fetch(engine, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.log(`IndexNow submission failed for ${engine}:`, err))
      );
      
      await Promise.allSettled(submissions);
      
      res.json({ 
        success: true, 
        message: `IndexNow submitted for ${urls?.length || 0} URLs`,
        submitted_urls: urls 
      });
      
    } catch (error) {
      console.error('IndexNow submission error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to submit to IndexNow' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
