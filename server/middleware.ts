import { Request, Response, NextFunction } from 'express';

// Security headers middleware
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Basic security headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Permissions policy for real estate features
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(self), geolocation=(self), payment=()'
  );
  
  // Content Security Policy for enhanced security
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.followupboss.com https://api.cloudcma.com https://www.simplifyingthemarket.com; " +
    "frame-src 'self' https://www.google.com; " +
    "object-src 'none';"
  );
  
  next();
}

// Geo-location and language detection middleware
export function geoHeaders(req: Request, res: Response, next: NextFunction) {
  // Extract location info from headers (Cloudflare, AWS CloudFront, etc.)
  const country = req.headers['cf-ipcountry'] || 
                  req.headers['x-country-code'] || 
                  req.headers['x-forwarded-country'] || 'US';
  
  const city = req.headers['cf-ipcity'] || 
               req.headers['x-city'] || 
               'Las Vegas';
  
  const language = req.headers['accept-language']?.split(',')[0] || 'en-US';
  
  // Add location context to request
  req.userLocation = {
    country: country as string,
    city: city as string,
    language: language,
    isLocal: (city as string).toLowerCase().includes('las vegas') || 
             (city as string).toLowerCase().includes('henderson') ||
             (city as string).toLowerCase().includes('summerlin')
  };
  
  // Set response headers for client-side access
  res.setHeader('X-User-Country', country as string);
  res.setHeader('X-User-City', city as string);
  res.setHeader('X-User-Language', language);
  
  next();
}

// SEO and canonical URL middleware
export function seoHeaders(req: Request, res: Response, next: NextFunction) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'skyecanyonhomesforsale.com';
  const canonical = `${protocol}://${host}${req.path}`;
  
  res.setHeader('X-Canonical-URL', canonical);
  
  // Preload critical resources
  res.setHeader('Link', [
    '</assets/fonts/inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
    '</api/properties>; rel=preload; as=fetch; crossorigin',
    '</api/market-data>; rel=preload; as=fetch; crossorigin'
  ].join(', '));
  
  next();
}

// Real estate specific middleware
export function realEstateContext(req: Request, res: Response, next: NextFunction) {
  // Detect if user is likely a real estate professional
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const isRealEstateAgent = userAgent.includes('mls') || 
                           userAgent.includes('realtor') ||
                           userAgent.includes('broker');
  
  // Set context for personalization
  req.userContext = {
    isAgent: isRealEstateAgent,
    isLocal: req.userLocation?.isLocal || false,
    timestamp: new Date().toISOString(),
    sessionId: (req as any).sessionID || 'anonymous'
  };
  
  next();
}

// Simple rate limiting store
interface RateLimitStore {
  [key: string]: number[];
}

declare global {
  var rateLimitStore: RateLimitStore | undefined;
}

// Rate limiting for API endpoints
export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;
  const key = `rate_limit_${ip}`;
  
  // Simple in-memory rate limiting (in production, use Redis)
  if (!global.rateLimitStore) {
    global.rateLimitStore = {};
  }
  
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // per window
  
  const requests = global.rateLimitStore[key] || [];
  const recentRequests = requests.filter((time: number) => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({ 
      error: 'Too many requests',
      retryAfter: Math.ceil(windowMs / 1000)
    });
  }
  
  recentRequests.push(now);
  global.rateLimitStore[key] = recentRequests;
  
  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', maxRequests.toString());
  res.setHeader('X-RateLimit-Remaining', (maxRequests - recentRequests.length).toString());
  res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());
  
  next();
}

// Declare custom types for Express Request
declare global {
  namespace Express {
    interface Request {
      userLocation?: {
        country: string;
        city: string;
        language: string;
        isLocal: boolean;
      };
      userContext?: {
        isAgent: boolean;
        isLocal: boolean;
        timestamp: string;
        sessionId: string;
      };
    }
  }
}