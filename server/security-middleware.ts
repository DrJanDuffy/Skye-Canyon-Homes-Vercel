import type { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Input sanitization utility
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

// SQL injection prevention
export function validateSearchParams(params: any): boolean {
  const dangerousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b)/i,
    /(UNION|OR|AND)\s+\d+\s*=\s*\d+/i,
    /['"`;]/,
  ];

  const stringParams = JSON.stringify(params);
  return !dangerousPatterns.some((pattern) => pattern.test(stringParams));
}

// Enhanced rate limiting for different endpoints
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const voiceSearchRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit voice searches
  message: {
    error: 'Voice search rate limit exceeded. Please wait before trying again.',
    retryAfter: 60,
  },
});

export const leadCaptureRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit lead submissions
  message: {
    error: 'Too many form submissions. Please wait before trying again.',
    retryAfter: 60 * 60,
  },
});

// Request validation middleware
export function validateRequest(req: Request, res: Response, next: NextFunction) {
  // Validate content type for POST requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(400).json({
        error: 'Content-Type must be application/json',
      });
    }
  }

  // Validate request size
  const contentLength = parseInt(req.get('content-length') || '0');
  if (contentLength > 1024 * 1024) {
    // 1MB limit
    return res.status(413).json({
      error: 'Request payload too large',
    });
  }

  next();
}

// CORS security headers
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP for production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://widget.homebot.com https://widgets.realscout.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://api.perplexity.ai; " +
        'frame-src https://widget.homebot.com https://widgets.realscout.com;'
    );
  }

  next();
}

// Error handling with security considerations
export function secureErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log full error details server-side
  console.error('Security Error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Send sanitized error to client
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'An error occurred',
    ...(isDevelopment && { stack: err.stack }),
  });
}
