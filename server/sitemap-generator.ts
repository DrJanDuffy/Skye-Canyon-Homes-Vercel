import type { Express, Request, Response } from "express";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://skyecanyonhomesforsale.com' 
    : 'http://localhost:5000';

  const urls: SitemapUrl[] = [
    // Main pages
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/about', changefreq: 'monthly', priority: 0.8 },
    { loc: '/contact', changefreq: 'monthly', priority: 0.8 },
    { loc: '/properties', changefreq: 'daily', priority: 0.9 },
    { loc: '/voice-search', changefreq: 'weekly', priority: 0.7 },
    
    // Location pages
    { loc: '/northwest-las-vegas', changefreq: 'weekly', priority: 0.8 },
    { loc: '/las-vegas-real-estate', changefreq: 'weekly', priority: 0.8 },
    { loc: '/luxury-homes-las-vegas', changefreq: 'weekly', priority: 0.8 },
    
    // Skye Canyon specific pages
    { loc: '/skye-canyon-guide', changefreq: 'monthly', priority: 0.9 },
    { loc: '/skye-canyon-schools', changefreq: 'monthly', priority: 0.8 },
    { loc: '/skye-canyon-parks', changefreq: 'monthly', priority: 0.7 },
    { loc: '/skye-canyon-communities', changefreq: 'monthly', priority: 0.8 },
    
    // Analysis pages
    { loc: '/market-analysis', changefreq: 'weekly', priority: 0.8 },
    { loc: '/neighborhood-analysis', changefreq: 'weekly', priority: 0.7 },
    
    // Legal pages
    { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
    { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3 }
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod || lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
}

export function registerSitemapRoutes(app: Express) {
  // XML Sitemap
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(generateSitemap());
  });

  // Robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://skyecanyonhomesforsale.com' 
      : 'http://localhost:5000';

    const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and utility pages
Disallow: /api/
Disallow: /leads
Disallow: /followup-boss-status
Disallow: /_vite/
Disallow: /src/

# Allow important pages
Allow: /
Allow: /about
Allow: /contact
Allow: /properties
Allow: /voice-search
Allow: /northwest-las-vegas
Allow: /las-vegas-real-estate
Allow: /luxury-homes-las-vegas
Allow: /skye-canyon-guide
Allow: /skye-canyon-schools
Allow: /skye-canyon-parks
Allow: /skye-canyon-communities
Allow: /market-analysis
Allow: /neighborhood-analysis`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(robotsContent);
  });
}