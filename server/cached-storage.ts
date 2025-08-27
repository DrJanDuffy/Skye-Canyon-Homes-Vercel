import { enhancedStorage } from './enhanced-storage';
import { performanceCache, CacheKeys, CacheTTL } from './performance-cache';
import type {
  Property,
  InsertProperty,
  Lead,
  InsertLead,
  MarketStats,
  InsertMarketStats,
} from '@shared/schema';

export class CachedStorage {
  private logSlowQueries = (operation: string, duration: number) => {
    if (duration > 1000) {
      console.warn(`Slow query detected: ${operation} - ${duration}ms`);
    }
    if (duration > 5000) {
      console.error(`Very slow query: ${operation} - ${duration}ms`);
    }
  };

  async getProperties(): Promise<Property[]> {
    const start = Date.now();

    try {
      const properties = await performanceCache.getOrSet(
        CacheKeys.properties(),
        async () => {
          const dbStart = Date.now();
          const result = await enhancedStorage.getProperties();
          console.log(`DB query took: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.PROPERTIES
      );

      const duration = Date.now() - start;
      console.log(`Total request time: ${duration}ms`);
      this.logSlowQueries('getProperties', duration);

      return properties;
    } catch (error) {
      console.error('Error in cached getProperties:', error);
      // Fallback to direct database call
      return await enhancedStorage.getProperties();
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const start = Date.now();

    try {
      const properties = await performanceCache.getOrSet(
        CacheKeys.featuredProperties(),
        async () => {
          const dbStart = Date.now();
          const result = await enhancedStorage.getFeaturedProperties();
          console.log(`Featured properties query: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.PROPERTIES
      );

      this.logSlowQueries('getFeaturedProperties', Date.now() - start);
      return properties;
    } catch (error) {
      console.error('Error in cached getFeaturedProperties:', error);
      return await enhancedStorage.getFeaturedProperties();
    }
  }

  async searchProperties(filters: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    minSqft?: number;
    maxSqft?: number;
    status?: string;
    featured?: boolean;
  }): Promise<Property[]> {
    const start = Date.now();

    try {
      const properties = await performanceCache.getOrSet(
        CacheKeys.searchProperties(filters),
        async () => {
          const dbStart = Date.now();
          const result = await enhancedStorage.searchProperties(filters);
          console.log(`Search properties query: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.SEARCH_RESULTS
      );

      this.logSlowQueries('searchProperties', Date.now() - start);
      return properties;
    } catch (error) {
      console.error('Error in cached searchProperties:', error);
      return await enhancedStorage.searchProperties(filters);
    }
  }

  async getMarketStats(): Promise<MarketStats | undefined> {
    const start = Date.now();

    try {
      const stats = await performanceCache.getOrSet(
        CacheKeys.marketStats(),
        async () => {
          const dbStart = Date.now();
          const result = await enhancedStorage.getMarketStats();
          console.log(`Market stats query: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.MARKET_DATA
      );

      this.logSlowQueries('getMarketStats', Date.now() - start);
      return stats;
    } catch (error) {
      console.error('Error in cached getMarketStats:', error);
      return await enhancedStorage.getMarketStats();
    }
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    try {
      const result = await enhancedStorage.createProperty(property);

      // Invalidate related caches
      performanceCache.invalidate('properties:');
      performanceCache.invalidate('search:');

      console.log('Cache invalidated after property creation');
      return result;
    } catch (error) {
      console.error('Error in cached createProperty:', error);
      throw error;
    }
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    try {
      const result = await enhancedStorage.createLead(lead);

      // Invalidate leads cache
      performanceCache.invalidate('leads:');

      return result;
    } catch (error) {
      console.error('Error in cached createLead:', error);
      throw error;
    }
  }

  async getLeads(): Promise<Lead[]> {
    const start = Date.now();

    try {
      const leads = await performanceCache.getOrSet(
        CacheKeys.leads(),
        async () => {
          const dbStart = Date.now();
          const result = await enhancedStorage.getLeads();
          console.log(`Leads query: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.LEADS
      );

      this.logSlowQueries('getLeads', Date.now() - start);
      return leads;
    } catch (error) {
      console.error('Error in cached getLeads:', error);
      return await enhancedStorage.getLeads();
    }
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const start = Date.now();

    try {
      const property = await performanceCache.getOrSet(
        CacheKeys.propertyById(id),
        async () => {
          const dbStart = Date.now();
          // Use enhanced storage getProperties and filter by ID
          const properties = await enhancedStorage.getProperties();
          const result = properties.find((p) => p.id === id);
          console.log(`Single property query: ${Date.now() - dbStart}ms`);
          return result;
        },
        CacheTTL.PROPERTIES
      );

      this.logSlowQueries('getProperty', Date.now() - start);
      return property;
    } catch (error) {
      console.error('Error in cached getProperty:', error);
      // Fallback to direct database call
      const properties = await enhancedStorage.getProperties();
      return properties.find((p) => p.id === id);
    }
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    try {
      const result = await enhancedStorage.updateMarketStats(stats);

      // Invalidate market stats cache
      performanceCache.invalidate('market:');

      return result;
    } catch (error) {
      console.error('Error in cached updateMarketStats:', error);
      throw error;
    }
  }

  // Cache management methods
  getCacheStats() {
    return performanceCache.getStats();
  }

  clearCache() {
    performanceCache.clear();
    console.log('All caches cleared');
  }

  invalidateCache(pattern: string) {
    const deletedCount = performanceCache.invalidate(pattern);
    console.log(`Invalidated ${deletedCount} cache entries matching pattern: ${pattern}`);
    return deletedCount;
  }
}

export const cachedStorage = new CachedStorage();
