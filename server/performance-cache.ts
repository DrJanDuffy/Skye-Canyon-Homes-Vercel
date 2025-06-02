// Performance cache to reduce API response times and improve FCP
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export function getCached(key: string): any | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

export function setCache(key: string, data: any, ttlMs: number = 60000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMs
  });
}

export function clearCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}