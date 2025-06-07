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

  // Use current timestamp for accurate last modification tracking
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const recentDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 day ago
  const weekOldDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 3 days ago
  const monthOldDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 week ago

  const urls: SitemapUrl[] = [
    // Homepage - highest priority with daily updates for real estate market
    { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: currentDate },
    
    // Core business pages - high conversion potential
    { loc: '/properties', changefreq: 'hourly', priority: 0.95, lastmod: currentDate },
    { loc: '/voice-search', changefreq: 'weekly', priority: 0.85, lastmod: recentDate },
    { loc: '/contact', changefreq: 'monthly', priority: 0.9, lastmod: weekOldDate },
    { loc: '/about', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    
    // Location-specific pages (primary SEO targets for Las Vegas market)
    { loc: '/northwest-las-vegas', changefreq: 'weekly', priority: 0.95, lastmod: recentDate },
    { loc: '/las-vegas-real-estate', changefreq: 'weekly', priority: 0.95, lastmod: recentDate },
    { loc: '/luxury-homes-las-vegas', changefreq: 'weekly', priority: 0.9, lastmod: recentDate },
    
    // Skye Canyon authority pages (niche expertise)
    { loc: '/skye-canyon-guide', changefreq: 'weekly', priority: 0.95, lastmod: recentDate },
    { loc: '/skye-canyon-schools', changefreq: 'monthly', priority: 0.85, lastmod: weekOldDate },
    { loc: '/skye-canyon-parks', changefreq: 'monthly', priority: 0.8, lastmod: weekOldDate },
    { loc: '/skye-canyon-communities', changefreq: 'weekly', priority: 0.9, lastmod: recentDate },
    
    // Market intelligence pages (thought leadership)
    { loc: '/market-analysis', changefreq: 'daily', priority: 0.9, lastmod: currentDate },
    { loc: '/neighborhood-analysis', changefreq: 'weekly', priority: 0.85, lastmod: recentDate },
    
    // Legal compliance pages
    { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.2, lastmod: monthOldDate },
    { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.2, lastmod: monthOldDate }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/geo/schemas/sitemap/1.0
        http://www.google.com/geo/schemas/sitemap/1.0/sitemap-geo.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${urls.map(url => {
    const isHomePage = url.loc === '/';
    const isLocationPage = url.loc.includes('las-vegas') || url.loc.includes('skye-canyon') || url.loc.includes('northwest');
    const isPropertyPage = url.loc.includes('properties') || url.loc.includes('luxury-homes');
    const isMarketPage = url.loc.includes('market-analysis') || url.loc.includes('neighborhood-analysis');
    
    // Geographic markup for location-specific pages
    let geoMarkup = '';
    if (isHomePage || isLocationPage) {
      geoMarkup = `
    <geo:geo>
      <geo:format>W3C-Basic</geo:format>
      <geo:lat>36.2648</geo:lat>
      <geo:lon>-115.3275</geo:lon>
    </geo:geo>`;
    }
    
    // Image markup for property and visual content pages
    let imageMarkup = '';
    if (isPropertyPage || isHomePage || isLocationPage) {
      imageMarkup = `
    <image:image>
      <image:loc>${baseUrl}/images/skye-canyon-luxury-homes.webp</image:loc>
      <image:title>Luxury Homes in Skye Canyon Las Vegas</image:title>
      <image:caption>Premium guard-gated community homes in Skye Canyon, Las Vegas</image:caption>
      <image:geo_location>Las Vegas, Nevada</image:geo_location>
    </image:image>`;
    }
    
    // Mobile optimization markup
    let mobileMarkup = '';
    if (isHomePage || isPropertyPage || isLocationPage) {
      mobileMarkup = `
    <mobile:mobile/>`;
    }
    
    // Enhanced metadata for Core Web Vitals and user experience
    let alternateMarkup = '';
    if (isHomePage || isLocationPage) {
      alternateMarkup = `
    <xhtml:link rel="alternate" media="only screen and (max-width: 640px)" href="${baseUrl}${url.loc}?mobile=1"/>
    <xhtml:link rel="alternate" media="handheld" href="${baseUrl}${url.loc}?mobile=1"/>`;
    }
    
    return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}T${now.toTimeString().split(' ')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${geoMarkup}${imageMarkup}${mobileMarkup}${alternateMarkup}
  </url>`;
  }).join('\n')}
</urlset>`;

  return xmlContent;
}

// Generate specialized image sitemap
function generateImageSitemap(): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://skyecanyonhomesforsale.com' 
    : 'http://localhost:5000';

  const images = [
    {
      loc: `${baseUrl}/`,
      images: [
        { url: `${baseUrl}/images/skye-canyon-luxury-homes.webp`, title: 'Luxury Homes in Skye Canyon', caption: 'Premium guard-gated community properties' },
        { url: `${baseUrl}/images/dr-jan-duffy-realtor.webp`, title: 'Dr. Jan Duffy REALTOR', caption: 'Experienced Las Vegas real estate specialist' },
        { url: `${baseUrl}/images/skye-canyon-community.webp`, title: 'Skye Canyon Community', caption: 'Beautiful Las Vegas neighborhood overview' }
      ]
    },
    {
      loc: `${baseUrl}/properties`,
      images: [
        { url: `${baseUrl}/images/luxury-property-1.webp`, title: 'Luxury Property Listing', caption: 'High-end home in Skye Canyon' },
        { url: `${baseUrl}/images/luxury-property-2.webp`, title: 'Premium Real Estate', caption: 'Exclusive Las Vegas property' }
      ]
    }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(page => `  <url>
    <loc>${page.loc}</loc>
${page.images.map(img => `    <image:image>
      <image:loc>${img.url}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
      <image:geo_location>Las Vegas, Nevada</image:geo_location>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;
}

// Generate specialized properties sitemap
function generatePropertiesSitemap(): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://skyecanyonhomesforsale.com' 
    : 'http://localhost:5000';

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];

  const propertyUrls = [
    { loc: '/properties', priority: 0.95, changefreq: 'hourly' },
    { loc: '/luxury-homes-las-vegas', priority: 0.9, changefreq: 'weekly' },
    { loc: '/skye-canyon-guide', priority: 0.95, changefreq: 'weekly' },
    { loc: '/northwest-las-vegas', priority: 0.95, changefreq: 'weekly' },
    { loc: '/las-vegas-real-estate', priority: 0.95, changefreq: 'weekly' }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
${propertyUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${currentDate}T${now.toTimeString().split(' ')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <geo:geo>
      <geo:format>W3C-Basic</geo:format>
      <geo:lat>36.2648</geo:lat>
      <geo:lon>-115.3275</geo:lon>
    </geo:geo>
  </url>`).join('\n')}
</urlset>`;
}

export function registerSitemapRoutes(app: Express) {
  // Main XML Sitemap
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(generateSitemap());
  });

  // Specialized Image Sitemap
  app.get('/sitemap-images.xml', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=43200'); // 12 hours
    res.send(generateImageSitemap());
  });

  // Specialized Properties Sitemap
  app.get('/sitemap-properties.xml', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=21600'); // 6 hours
    res.send(generatePropertiesSitemap());
  });

  // Robots.txt
  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://skyecanyonhomesforsale.com' 
      : 'http://localhost:5000';

    const robotsContent = `# Robots.txt - Advanced 2025 Configuration for Real Estate Website
# Dr. Jan Duffy REALTOR® - Skye Canyon Las Vegas Specialist
# Generated: ${new Date().toISOString()}

# Primary search engine crawlers - optimized for real estate content
User-agent: Googlebot
Allow: /
Crawl-delay: 1
Request-rate: 1/10s

User-agent: Bingbot
Allow: /
Crawl-delay: 2
Request-rate: 1/15s

User-agent: Slurp
Allow: /
Crawl-delay: 3

# AI Training Crawlers - June 2025 Directives
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: ChatGPT-User
Disallow: /

# Social Media Crawlers - Allow for sharing optimization
User-agent: facebookexternalhit
Allow: /
User-agent: Twitterbot
Allow: /
User-agent: LinkedInBot
Allow: /

# Real Estate Specific Crawlers
User-agent: RealEstateBot
Allow: /properties
Allow: /luxury-homes-las-vegas
Allow: /skye-canyon-guide

# Default for all other crawlers
User-agent: *
Allow: /
Crawl-delay: 5

# Sitemaps - Multiple formats for enhanced indexing
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-properties.xml

# Preferred domain and canonical URL
Host: ${baseUrl.replace('http://', '').replace('https://', '')}

# Security - Block sensitive and admin areas
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
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /administrator/
Disallow: /login/
Disallow: /dashboard/
Disallow: /config/
Disallow: /.env*
Disallow: /.htaccess
Disallow: /backup/
Disallow: /cache/
Disallow: /tmp/

# Block malicious patterns and scraping attempts
Disallow: /*.tmp$
Disallow: /*.log$
Disallow: /*.bak$
Disallow: /*?debug=*
Disallow: /*?test=*
Disallow: /*?admin=*
Disallow: /*?password=*
Disallow: /*?token=*

# Performance optimization - prevent crawling of duplicate content
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*
Disallow: /*?campaign=*
Disallow: /*?gclid=*
Disallow: /*?fbclid=*

# Real Estate Business Optimization
# Allow priority pages for Las Vegas real estate market
Allow: /properties$
Allow: /luxury-homes-las-vegas$
Allow: /skye-canyon-guide$
Allow: /northwest-las-vegas$
Allow: /las-vegas-real-estate$
Allow: /market-analysis$
Allow: /contact$

# Noindex parameters (for crawlers that support it)
Noindex: /*?sort=*
Noindex: /*?filter=*
Noindex: /*?page=*

# Clean-param directive (supported by Yandex and some others)
Clean-param: utm_source&utm_medium&utm_campaign&gclid&fbclid

# Request rate throttling for resource protection
Request-rate: 1/10s 0600-2100
Request-rate: 1/30s 2100-0600

# Visit-time optimization for better user experience
Visit-time: 0600-2100

# Crawling window for maintenance (PST timezone)
Disallow: / 0300-0400`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(robotsContent);
  });
}