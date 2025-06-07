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

  const currentDate = new Date().toISOString().split('T')[0];
  const recentDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 2 days ago
  const weekOldDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 week ago

  const urls: SitemapUrl[] = [
    // Main pages with geo-targeting
    { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: currentDate },
    { loc: '/about', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    { loc: '/contact', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    { loc: '/properties', changefreq: 'daily', priority: 0.9, lastmod: currentDate },
    { loc: '/voice-search', changefreq: 'weekly', priority: 0.7, lastmod: recentDate },
    
    // Location-specific pages (high SEO value)
    { loc: '/northwest-las-vegas', changefreq: 'weekly', priority: 0.9, lastmod: recentDate },
    { loc: '/las-vegas-real-estate', changefreq: 'weekly', priority: 0.9, lastmod: recentDate },
    { loc: '/luxury-homes-las-vegas', changefreq: 'weekly', priority: 0.8, lastmod: recentDate },
    
    // Skye Canyon specific pages (core business)
    { loc: '/skye-canyon-guide', changefreq: 'monthly', priority: 0.9, lastmod: weekOldDate },
    { loc: '/skye-canyon-schools', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    { loc: '/skye-canyon-parks', changefreq: 'monthly', priority: 0.7, lastmod: weekOldDate },
    { loc: '/skye-canyon-communities', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    
    // Analysis and market pages
    { loc: '/market-analysis', changefreq: 'weekly', priority: 0.8, lastmod: recentDate },
    { loc: '/neighborhood-analysis', changefreq: 'weekly', priority: 0.7, lastmod: recentDate },
    
    // Legal and policy pages
    { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3, lastmod: weekOldDate },
    { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3, lastmod: weekOldDate }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => {
    const isHomePage = url.loc === '/';
    const isLocationPage = url.loc.includes('las-vegas') || url.loc.includes('skye-canyon') || url.loc.includes('northwest');
    
    let geoMarkup = '';
    if (isHomePage || isLocationPage) {
      geoMarkup = `
    <geo:geo>
      <geo:format>W3C-Basic</geo:format>
      <geo:lat>36.2648</geo:lat>
      <geo:lon>-115.3275</geo:lon>
    </geo:geo>`;
    }
    
    return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${geoMarkup}
  </url>`;
  }).join('\n')}
</urlset>`;

  return xmlContent;
}

export function registerSitemapRoutes(app: Express) {
  // XML Sitemap
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // Force fresh generation during development
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
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

# Block admin, API, and development resources
Disallow: /api/
Disallow: /leads
Disallow: /followup-boss-status
Disallow: /website-dashboard
Disallow: /_vite/
Disallow: /src/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /server/
Disallow: /build/
Disallow: /dist/

# Block common admin patterns (security)
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /administrator/
Disallow: /login/
Disallow: /dashboard/

# Block temporary and system files
Disallow: /*.tmp$
Disallow: /*.log$
Disallow: /.env
Disallow: /.htaccess

# Real Estate Business Context
User-agent: *
Host: ${baseUrl.replace('http://', '').replace('https://', '')}

# Preferred domain directive
${process.env.NODE_ENV === 'production' ? '# Production domain preference set' : '# Development environment'}`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(robotsContent);
  });
}