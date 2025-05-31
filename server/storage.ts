import { 
  users, properties, leads, marketStats,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Lead, type InsertLead,
  type MarketStats, type InsertMarketStats
} from "@shared/schema";

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
    // Sample properties for Sky Canyon
    const sampleProperties: InsertProperty[] = [
      {
        address: "123 Sky Canyon Drive",
        price: 1285000,
        bedrooms: 4,
        bathrooms: "3.5",
        sqft: 3240,
        description: "Stunning single-story home with panoramic mountain views, upgraded kitchen, and premium finishes throughout.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        status: "active",
        featured: true
      },
      {
        address: "456 Canyon Vista Lane",
        price: 1495000,
        bedrooms: 5,
        bathrooms: "4",
        sqft: 4120,
        description: "Contemporary masterpiece with resort-style backyard, chef's kitchen, and smart home technology.",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        status: "active",
        featured: true
      },
      {
        address: "789 Desert Bloom Court",
        price: 1750000,
        bedrooms: 6,
        bathrooms: "5.5",
        sqft: 5200,
        description: "Prestigious estate home with wine cellar, home theater, and breathtaking city lights views.",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        status: "active",
        featured: true
      },
      {
        address: "321 Mountain Ridge Way",
        price: 2100000,
        bedrooms: 5,
        bathrooms: "4.5",
        sqft: 4800,
        description: "Luxury custom home with infinity pool, outdoor kitchen, and spectacular golf course views.",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        status: "active",
        featured: false
      },
      {
        address: "654 Summit Heights Drive",
        price: 1650000,
        bedrooms: 4,
        bathrooms: "4",
        sqft: 3850,
        description: "Modern architectural design with floor-to-ceiling windows and private courtyard.",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        status: "active",
        featured: false
      }
    ];

    sampleProperties.forEach(property => {
      const id = this.currentPropertyId++;
      this.properties.set(id, { ...property, id });
    });

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
    const property: Property = { ...insertProperty, id };
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

export const storage = new MemStorage();
