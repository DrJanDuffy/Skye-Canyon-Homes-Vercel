import { Property, Lead, MarketStats } from '@shared/schema';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  entries: number;
  memoryUsage: number;
}

export class PerformanceCache {
  private cache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = { hits: 0, misses: 0, entries: 0, memoryUsage: 0 };
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_ENTRIES = 1000;

  constructor() {
    // Clean expired entries every 2 minutes
    setInterval(() => this.cleanExpired(), 2 * 60 * 1000);
  }

  set<T>(key: string, data: T, ttlMs: number = this.DEFAULT_TTL): void {
    // Remove oldest entries if we're at capacity
    if (this.cache.size >= this.MAX_ENTRIES) {
      const keys = Array.from(this.cache.keys());
      if (keys.length > 0) {
        this.cache.delete(keys[0]);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });

    this.updateStats();
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return entry.data as T;
  }

  async getOrSet<T>(
    key: string, 
    fetchFunction: () => Promise<T>, 
    ttlMs: number = this.DEFAULT_TTL
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetchFunction();
    this.set(key, data, ttlMs);
    return data;
  }

  invalidate(pattern: string): number {
    let deletedCount = 0;
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];
    
    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
      deletedCount++;
    });
    
    this.updateStats();
    return deletedCount;
  }

  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, entries: 0, memoryUsage: 0 };
  }

  getStats(): CacheStats {
    this.updateStats();
    return { ...this.stats };
  }

  private cleanExpired(): void {
    const now = Date.now();
    let deletedCount = 0;
    const keysToDelete: string[] = [];
    
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
      deletedCount++;
    });
    
    if (deletedCount > 0) {
      console.log(`Cleaned ${deletedCount} expired cache entries`);
      this.updateStats();
    }
  }

  private updateStats(): void {
    this.stats.entries = this.cache.size;
    this.stats.memoryUsage = this.calculateMemoryUsage();
  }

  private calculateMemoryUsage(): number {
    // Rough estimation of memory usage
    let size = 0;
    this.cache.forEach((entry, key) => {
      size += key.length * 2; // 2 bytes per character
      size += JSON.stringify(entry).length * 2;
    });
    return size;
  }
}

// Singleton instance
export const performanceCache = new PerformanceCache();

// Cache key generators
export const CacheKeys = {
  properties: () => 'properties:all',
  featuredProperties: () => 'properties:featured',
  propertyById: (id: number) => `property:${id}`,
  marketStats: () => 'market:stats',
  leads: () => 'leads:all',
  searchProperties: (filters: any) => `search:${JSON.stringify(filters)}`,
  communityData: () => 'community:data',
  marketInsights: () => 'market:insights'
};

// TTL configurations
export const CacheTTL = {
  PROPERTIES: 10 * 60 * 1000,     // 10 minutes
  MARKET_DATA: 30 * 60 * 1000,   // 30 minutes
  SEARCH_RESULTS: 5 * 60 * 1000, // 5 minutes
  LEADS: 2 * 60 * 1000,          // 2 minutes
  STATIC_DATA: 60 * 60 * 1000    // 1 hour
};