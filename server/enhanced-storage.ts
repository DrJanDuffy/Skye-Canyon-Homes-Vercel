import { supabase } from './supabase-client';
import { db } from './db';
import { 
  users, properties, leads, marketStats,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Lead, type InsertLead,
  type MarketStats, type InsertMarketStats
} from "@shared/schema";
import { eq } from "drizzle-orm";

export class EnhancedStorage {
  // Enhanced property methods with real-time updates
  async createProperty(property: InsertProperty): Promise<Property> {
    try {
      // Insert into database via Drizzle
      const [newProperty] = await db.insert(properties).values(property).returning();
      
      // Also sync to Supabase for real-time features
      await supabase
        .from('properties')
        .insert({
          address: property.address,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          sqft: property.sqft,
          description: property.description,
          imageUrl: property.imageUrl,
          featured: property.featured,
          status: property.status
        });
      
      return newProperty;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  async getProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties).where(eq(properties.featured, true));
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      return [];
    }
  }

  // Enhanced lead management with Follow Up Boss integration
  async createLead(lead: InsertLead): Promise<Lead> {
    try {
      // Insert into database
      const [newLead] = await db.insert(leads).values({
        ...lead,
        source: lead.source || "website",
        createdAt: new Date()
      }).returning();

      // Sync to Supabase for real-time tracking
      await supabase
        .from('leads')
        .insert({
          firstName: newLead.firstName,
          lastName: newLead.lastName,
          email: newLead.email,
          phone: newLead.phone,
          message: newLead.message,
          source: newLead.source,
          timeframe: newLead.timeframe,
          priceRange: newLead.priceRange
        });

      // Send to Follow Up Boss if API key is available
      if (process.env.FUB_API_KEY) {
        await this.sendToFollowUpBoss(newLead);
      }

      return newLead;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  private async sendToFollowUpBoss(lead: Lead) {
    try {
      const response = await fetch('https://api.followupboss.com/v1/people', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.FUB_API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: lead.firstName,
          lastName: lead.lastName,
          emails: [{ value: lead.email, type: 'home' }],
          phones: lead.phone ? [{ value: lead.phone, type: 'mobile' }] : [],
          source: 'Dr Jan Duffy Website',
          tags: ['Website Lead', 'Skye Canyon'],
          note: lead.message || `Lead from Dr. Jan Duffy website. Interest: ${lead.priceRange || 'Not specified'}`
        })
      });

      if (!response.ok) {
        console.error('Follow Up Boss API error:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending to Follow Up Boss:', error);
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      return [];
    }
  }

  // Market stats with real-time updates
  async getMarketStats(): Promise<MarketStats | undefined> {
    try {
      const stats = await db.select().from(marketStats).limit(1);
      return stats[0];
    } catch (error) {
      console.error('Error fetching market stats:', error);
      return undefined;
    }
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    try {
      const [updated] = await db.insert(marketStats).values({
        ...stats,
        updatedAt: new Date()
      }).onConflictDoUpdate({
        target: marketStats.id,
        set: {
          ...stats,
          updatedAt: new Date()
        }
      }).returning();

      return updated;
    } catch (error) {
      console.error('Error updating market stats:', error);
      throw error;
    }
  }

  // Real-time property search with Supabase
  async searchProperties(filters: { 
    priceMin?: number; 
    priceMax?: number; 
    type?: string;
    bedrooms?: number;
    location?: string;
  }): Promise<Property[]> {
    try {
      let query = supabase.from('properties').select('*');

      if (filters.priceMin) {
        query = query.gte('price', filters.priceMin);
      }
      if (filters.priceMax) {
        query = query.lte('price', filters.priceMax);
      }
      if (filters.type) {
        query = query.eq('status', filters.type);
      }
      if (filters.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms);
      }
      if (filters.location) {
        query = query.ilike('address', `%${filters.location}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase search error:', error);
        // Fallback to Drizzle query
        return await db.select().from(properties);
      }

      return data || [];
    } catch (error) {
      console.error('Error searching properties:', error);
      // Fallback to basic property fetch
      return await this.getProperties();
    }
  }
}

export const enhancedStorage = new EnhancedStorage();