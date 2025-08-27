import type { InsertLead, InsertProperty, Lead, MarketStats, Property } from '@shared/schema';
import { leads, marketStats, properties } from '@shared/schema';
import { and, asc, desc, eq, gte, lte } from 'drizzle-orm';
import { db } from './db';

// In-memory cache for frequently accessed data
class DataCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttlMs: number = 300000) {
    // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) {
      return null;
    }

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

export class OptimizedStorage {
  private cache = new DataCache();

  // OPTIMIZED: Get all properties with caching
  async getProperties(): Promise<Property[]> {
    const cacheKey = 'all_properties';

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const startTime = Date.now();
    // Optimized query with proper ordering
    const results = await db
      .select()
      .from(properties)
      .orderBy(desc(properties.featured), asc(properties.price))
      .limit(50); // Limit initial load for performance

    const duration = Date.now() - startTime;

    // Cache the results
    this.cache.set(cacheKey, results, 180000); // 3 minutes cache

    if (duration > 1000) {
    }

    return results;
  }

  // OPTIMIZED: Get featured properties with caching
  async getFeaturedProperties(): Promise<Property[]> {
    const cacheKey = 'featured_properties';

    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const startTime = Date.now();

    try {
      const results = await db
        .select()
        .from(properties)
        .where(eq(properties.featured, true))
        .orderBy(asc(properties.price))
        .limit(12);

      const _duration = Date.now() - startTime;

      this.cache.set(cacheKey, results, 300000); // 5 minutes cache

      return results;
    } catch (_error) {
      return [];
    }
  }

  // OPTIMIZED: Search properties with indexed queries
  async searchProperties(filters: {
    priceMin?: number;
    priceMax?: number;
    type?: string;
    bedrooms?: number;
    limit?: number;
  }): Promise<Property[]> {
    const { priceMin, priceMax, type, bedrooms, limit = 20 } = filters;
    const cacheKey = `search_${JSON.stringify(filters)}`;

    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const startTime = Date.now();

    try {
      const _query = db.select().from(properties);
      const conditions = [];

      // Build efficient WHERE conditions
      if (priceMin) {
        conditions.push(gte(properties.price, priceMin));
      }
      if (priceMax) {
        conditions.push(lte(properties.price, priceMax));
      }
      if (type) {
        conditions.push(eq(properties.status, type));
      }
      if (bedrooms) {
        conditions.push(gte(properties.bedrooms, bedrooms));
      }

      if (conditions.length > 0) {
        const results = await db
          .select()
          .from(properties)
          .where(and(...conditions))
          .orderBy(desc(properties.featured), asc(properties.price))
          .limit(limit);

        const _duration = Date.now() - startTime;

        // Cache search results for 2 minutes
        this.cache.set(cacheKey, results, 120000);

        return results;
      }

      const results = await db
        .select()
        .from(properties)
        .orderBy(desc(properties.featured), asc(properties.price))
        .limit(limit);

      const _duration = Date.now() - startTime;

      // Cache search results for 2 minutes
      this.cache.set(cacheKey, results, 120000);

      return results;
    } catch (_error) {
      return [];
    }
  }

  // OPTIMIZED: Get single property with caching
  async getProperty(id: number): Promise<Property | undefined> {
    const cacheKey = `property_${id}`;

    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const [property] = await db.select().from(properties).where(eq(properties.id, id)).limit(1);

      if (property) {
        this.cache.set(cacheKey, property, 600000); // 10 minutes cache
      }

      return property;
    } catch (_error) {
      return undefined;
    }
  }

  // Create property and invalidate cache
  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();

    // Invalidate relevant caches
    this.cache.clear();

    return property;
  }

  // OPTIMIZED: Market stats with long-term caching
  async getMarketStats(): Promise<MarketStats | undefined> {
    const cacheKey = 'market_stats';

    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const [stats] = await db
        .select()
        .from(marketStats)
        .orderBy(desc(marketStats.updatedAt))
        .limit(1);

      if (stats) {
        // Cache market stats for 1 hour
        this.cache.set(cacheKey, stats, 3600000);
      }

      return stats;
    } catch (_error) {
      return undefined;
    }
  }

  // Lead operations (no caching for user data)
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100);
    } catch (_error) {
      return [];
    }
  }

  // Cache management
  clearCache() {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      cacheSize: this.cache.cache.size,
      timestamp: new Date().toISOString(),
    };
  }
}

// Singleton instance
export const optimizedStorage = new OptimizedStorage();
