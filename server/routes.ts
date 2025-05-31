import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";

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
      suggestions.push("Properties in Sky Canyon are selling 15% faster than last year");
    } else if (context === 'value') {
      suggestions.push("Sky Canyon home values have increased 8% year-over-year");
    }
  } else {
    suggestions.push("No exact matches found, but here are similar properties");
    suggestions.push("Consider expanding your search criteria");
  }
  
  return {
    properties: filteredProperties.slice(0, 6),
    suggestions,
    marketInsights: "Sky Canyon remains one of Las Vegas's most desirable neighborhoods with strong appreciation potential.",
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



  // Create new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ 
        message: "Lead created successfully",
        id: lead.id 
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
        
        const title = titleMatch ? titleMatch[1] : '';
        const link = linkMatch ? linkMatch[1] : '';
        const description = descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '';
        
        return {
          title,
          link,
          description,
          source: 'Simplifying the Market'
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

  const httpServer = createServer(app);
  return httpServer;
}
