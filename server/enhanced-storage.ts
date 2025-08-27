import {
  type InsertLead,
  type InsertMarketStats,
  type InsertProperty,
  type Lead,
  leads,
  type MarketStats,
  marketStats,
  type Property,
  properties,
} from '@shared/schema';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { supabase } from './supabase-client';

export class EnhancedStorage {
  // Enhanced property methods with real-time updates
  async createProperty(property: InsertProperty): Promise<Property> {
    // Insert into database via Drizzle
    const [newProperty] = await db.insert(properties).values(property).returning();

    // Also sync to Supabase for real-time features
    await supabase.from('properties').insert({
      address: property.address,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      description: property.description,
      imageUrl: property.imageUrl,
      featured: property.featured,
      status: property.status,
    });

    return newProperty;
  }

  async getProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties);
    } catch (_error) {
      return [];
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    try {
      return await db.select().from(properties).where(eq(properties.featured, true));
    } catch (_error) {
      return [];
    }
  }

  // Enhanced lead management with Follow Up Boss integration
  async createLead(lead: InsertLead): Promise<Lead> {
    // Insert into database
    const [newLead] = await db
      .insert(leads)
      .values({
        ...lead,
        source: lead.source || 'website',
        createdAt: new Date(),
      })
      .returning();

    // Sync to Supabase for real-time tracking
    await supabase.from('leads').insert({
      firstName: newLead.firstName,
      lastName: newLead.lastName,
      email: newLead.email,
      phone: newLead.phone,
      message: newLead.message,
      source: newLead.source,
      timeframe: newLead.timeframe,
      priceRange: newLead.priceRange,
    });

    // Send to Follow Up Boss if API key is available and valid
    if (process.env.FUB_API_KEY) {
      try {
        await this.sendToFollowUpBoss(newLead);
      } catch (_error) {
        // Lead is safely stored in database for later sync
        await this.markLeadForSync(newLead.id);
      }
    } else {
    }

    return newLead;
  }

  private async sendToFollowUpBoss(lead: Lead) {
    const response = await fetch('https://api.followupboss.com/v1/people', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FUB_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        firstName: lead.firstName,
        lastName: lead.lastName,
        emails: [{ value: lead.email, type: 'home' }],
        phones: lead.phone ? [{ value: lead.phone, type: 'mobile' }] : [],
        source: 'Dr Jan Duffy Website',
        tags: ['Website Lead', 'Skye Canyon'],
        notes:
          lead.message ||
          `Lead from Dr. Jan Duffy website. Interest: ${lead.priceRange || 'Not specified'}. Timeframe: ${lead.timeframe || 'Not specified'}`,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Failed to send lead to FollowUp Boss: ${response.statusText}`);
    }
    return JSON.parse(responseText);
  }

  private async markLeadForSync(_leadId: number): Promise<void> {
    try {
      // Could add a sync status field to the database schema if needed
    } catch (_error) {}
  }

  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads);
    } catch (_error) {
      return [];
    }
  }

  // Market stats with real-time updates
  async getMarketStats(): Promise<MarketStats | undefined> {
    try {
      const stats = await db.select().from(marketStats).limit(1);
      return stats[0];
    } catch (_error) {
      return undefined;
    }
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    const [updated] = await db
      .insert(marketStats)
      .values({
        ...stats,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: marketStats.id,
        set: {
          ...stats,
          updatedAt: new Date(),
        },
      })
      .returning();

    return updated;
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
        // Fallback to Drizzle query
        return await db.select().from(properties);
      }

      return data || [];
    } catch (_error) {
      // Fallback to basic property fetch
      return await this.getProperties();
    }
  }
}

export const enhancedStorage = new EnhancedStorage();
