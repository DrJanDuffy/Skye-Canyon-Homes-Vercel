import { 
  users, properties, leads, marketStats,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Lead, type InsertLead,
  type MarketStats, type InsertMarketStats
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  searchProperties(filters: { priceMin?: number; priceMax?: number; type?: string }): Promise<Property[]>;
  
  // Lead methods
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Market stats methods
  getMarketStats(): Promise<MarketStats | undefined>;
  updateMarketStats(stats: InsertMarketStats): Promise<MarketStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.featured, true));
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async searchProperties(filters: { priceMin?: number; priceMax?: number; type?: string }): Promise<Property[]> {
    let query = db.select().from(properties);
    
    // Add filters as needed - this is a simplified version
    return await query;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getMarketStats(): Promise<MarketStats | undefined> {
    const [stats] = await db.select().from(marketStats).limit(1);
    return stats || undefined;
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    const [updatedStats] = await db
      .insert(marketStats)
      .values(stats)
      .onConflictDoUpdate({
        target: marketStats.id,
        set: stats
      })
      .returning();
    return updatedStats;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private leads: Map<number, Lead>;
  private marketStatsData: MarketStats | undefined;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentLeadId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.leads = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentLeadId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // No placeholder properties initialized - awaiting authentic MLS data connection
    // All property listings will come from verified real estate sources only

    // Initialize market stats
    this.marketStatsData = {
      id: 1,
      medianPrice: "$1.2M",
      daysOnMarket: 28,
      homesSold: 156,
      activeListings: 42,
      updatedAt: new Date()
    };
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.featured);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      status: insertProperty.status || "active",
      featured: insertProperty.featured ?? false
    };
    this.properties.set(id, property);
    return property;
  }

  async searchProperties(filters: { priceMin?: number; priceMax?: number; type?: string }): Promise<Property[]> {
    let results = Array.from(this.properties.values());
    
    if (filters.priceMin) {
      results = results.filter(p => p.price >= filters.priceMin!);
    }
    
    if (filters.priceMax) {
      results = results.filter(p => p.price <= filters.priceMax!);
    }
    
    return results;
  }

  // Lead methods
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id,
      source: insertLead.source || "website",
      message: insertLead.message ?? null,
      phone: insertLead.phone ?? null,
      timeframe: insertLead.timeframe ?? null,
      priceRange: insertLead.priceRange ?? null,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  // Market stats methods
  async getMarketStats(): Promise<MarketStats | undefined> {
    return this.marketStatsData;
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    this.marketStatsData = {
      id: 1,
      ...stats,
      updatedAt: new Date()
    };
    return this.marketStatsData;
  }
}

import { enhancedStorage } from './enhanced-storage';

export const storage = new DatabaseStorage();
export { enhancedStorage };
