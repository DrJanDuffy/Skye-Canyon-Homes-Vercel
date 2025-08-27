import type {
  InsertLead,
  InsertMarketStats,
  InsertProperty,
  Lead,
  MarketStats,
  Property,
} from '@shared/schema';
import { enhancedStorage } from './enhanced-storage';
import { CacheKeys, CacheTTL, performanceCache } from './performance-cache';

export class CachedStorage {
  private logSlowQueries = (_operation: string, duration: number) => {
    if (duration > 1000) {
    }
    if (duration > 5000) {
    }
  };

  async getProperties(): Promise<Property[]> {
    const start = Date.now();

    try {
      const properties = await performanceCache.getOrSet(
        CacheKeys.properties(),
        async () => {
          const _dbStart = Date.now();
          const result = await enhancedStorage.getProperties();
          return result;
        },
        CacheTTL.PROPERTIES
      );

      const duration = Date.now() - start;
      this.logSlowQueries('getProperties', duration);

      return properties;
    } catch (_error) {
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
          const _dbStart = Date.now();
          const result = await enhancedStorage.getFeaturedProperties();
          return result;
        },
        CacheTTL.PROPERTIES
      );

      this.logSlowQueries('getFeaturedProperties', Date.now() - start);
      return properties;
    } catch (_error) {
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
          const _dbStart = Date.now();
          const result = await enhancedStorage.searchProperties(filters);
          return result;
        },
        CacheTTL.SEARCH_RESULTS
      );

      this.logSlowQueries('searchProperties', Date.now() - start);
      return properties;
    } catch (_error) {
      return await enhancedStorage.searchProperties(filters);
    }
  }

  async getMarketStats(): Promise<MarketStats | undefined> {
    const start = Date.now();

    try {
      const stats = await performanceCache.getOrSet(
        CacheKeys.marketStats(),
        async () => {
          const _dbStart = Date.now();
          const result = await enhancedStorage.getMarketStats();
          return result;
        },
        CacheTTL.MARKET_DATA
      );

      this.logSlowQueries('getMarketStats', Date.now() - start);
      return stats;
    } catch (_error) {
      return await enhancedStorage.getMarketStats();
    }
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const result = await enhancedStorage.createProperty(property);

    // Invalidate related caches
    performanceCache.invalidate('properties:');
    performanceCache.invalidate('search:');
    return result;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const result = await enhancedStorage.createLead(lead);

    // Invalidate leads cache
    performanceCache.invalidate('leads:');

    return result;
  }

  async getLeads(): Promise<Lead[]> {
    const start = Date.now();

    try {
      const leads = await performanceCache.getOrSet(
        CacheKeys.leads(),
        async () => {
          const _dbStart = Date.now();
          const result = await enhancedStorage.getLeads();
          return result;
        },
        CacheTTL.LEADS
      );

      this.logSlowQueries('getLeads', Date.now() - start);
      return leads;
    } catch (_error) {
      return await enhancedStorage.getLeads();
    }
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const start = Date.now();

    try {
      const property = await performanceCache.getOrSet(
        CacheKeys.propertyById(id),
        async () => {
          const _dbStart = Date.now();
          // Use enhanced storage getProperties and filter by ID
          const properties = await enhancedStorage.getProperties();
          const result = properties.find((p) => p.id === id);
          return result;
        },
        CacheTTL.PROPERTIES
      );

      this.logSlowQueries('getProperty', Date.now() - start);
      return property;
    } catch (_error) {
      // Fallback to direct database call
      const properties = await enhancedStorage.getProperties();
      return properties.find((p) => p.id === id);
    }
  }

  async updateMarketStats(stats: InsertMarketStats): Promise<MarketStats> {
    const result = await enhancedStorage.updateMarketStats(stats);

    // Invalidate market stats cache
    performanceCache.invalidate('market:');

    return result;
  }

  // Cache management methods
  getCacheStats() {
    return performanceCache.getStats();
  }

  clearCache() {
    performanceCache.clear();
  }

  invalidateCache(pattern: string) {
    const deletedCount = performanceCache.invalidate(pattern);
    return deletedCount;
  }
}

export const cachedStorage = new CachedStorage();
