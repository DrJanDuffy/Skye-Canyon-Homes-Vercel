import { eq, and, gte, lte, desc, asc } from 'drizzle-orm';
import { properties, leads, marketStats } from '../shared/schema';
import { db } from './db';

// Optimized property search with proper indexing strategy
export async function optimizedPropertySearch(filters: {
  priceMin?: number;
  priceMax?: number;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  limit?: number;
  offset?: number;
}) {
  const { priceMin, priceMax, type, bedrooms, bathrooms, limit = 20, offset = 0 } = filters;

  let query = db.select().from(properties);
  const conditions = [];

  // Build WHERE conditions efficiently
  if (priceMin) conditions.push(gte(properties.price, priceMin));
  if (priceMax) conditions.push(lte(properties.price, priceMax));
  if (type) conditions.push(eq(properties.type, type));
  if (bedrooms) conditions.push(eq(properties.bedrooms, bedrooms));
  if (bathrooms) conditions.push(eq(properties.bathrooms, bathrooms));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  // Add sorting and pagination
  const results = await query
    .orderBy(desc(properties.featured), asc(properties.price))
    .limit(limit)
    .offset(offset);

  return results;
}

// Cached market statistics
let marketStatsCache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getCachedMarketStats() {
  const now = Date.now();

  if (marketStatsCache && now - marketStatsCache.timestamp < CACHE_DURATION) {
    return marketStatsCache.data;
  }

  const stats = await db.select().from(marketStats).limit(1);

  marketStatsCache = {
    data: stats[0],
    timestamp: now,
  };

  return marketStatsCache.data;
}

// Batch lead processing for efficiency
export async function batchCreateLeads(
  leadsData: Array<{
    name: string;
    email: string;
    phone?: string;
    message?: string;
    source: string;
  }>
) {
  try {
    const results = await db.insert(leads).values(leadsData).returning();
    return results;
  } catch (error) {
    console.error('Batch lead creation error:', error);
    throw new Error('Failed to create leads');
  }
}

// Database connection pooling optimization
export function optimizeConnection() {
  // Connection pool settings are handled in db.ts
  // This function validates connection health
  return db.execute('SELECT 1 as health_check');
}

// Query performance monitoring
export async function logSlowQueries(query: string, duration: number) {
  if (duration > 1000) {
    // Log queries slower than 1 second
    console.warn(`Slow query detected (${duration}ms):`, query);
  }
}
