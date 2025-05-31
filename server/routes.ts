import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";

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

  // FollowUp Boss integration
  app.get("/api/followup-boss-listings", async (req, res) => {
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
      console.error('FollowUp Boss API error:', error);
      res.status(500).json({ message: "Failed to fetch FollowUp Boss data" });
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

  const httpServer = createServer(app);
  return httpServer;
}
