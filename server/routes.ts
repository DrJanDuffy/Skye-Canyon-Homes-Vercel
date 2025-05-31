import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";

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

  // Cloud CMA integration
  app.get("/api/cloud-cma-data", async (req, res) => {
    try {
      const apiKey = process.env.CLOUD_CMA_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ message: "Cloud CMA API key not configured" });
      }

      const response = await fetch(`https://api.cloudcma.com/api/listings?key=${apiKey}&limit=10`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Cloud CMA API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Cloud CMA API error:', error);
      res.status(500).json({ message: "Failed to fetch Cloud CMA data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
