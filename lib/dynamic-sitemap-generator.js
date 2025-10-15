// Dynamic Sitemap Generator - Vercel Savant Edition
// Reads actual routes from the application and generates sitemap dynamically

// Import the route definitions from App.tsx
const fs = require('fs');
const path = require('path');

// Route configuration extracted from App.tsx
const ROUTES = [
  // Main pages with priorities and frequencies
  { path: '/', priority: 1.0, changefreq: 'daily', lastmod: 'auto' },
  { path: '/home', priority: 0.9, changefreq: 'daily', lastmod: 'auto' },
  { path: '/about', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/properties', priority: 0.9, changefreq: 'daily', lastmod: 'auto' },
  { path: '/voice-search', priority: 0.7, changefreq: 'weekly', lastmod: 'auto' },
  
  // Location pages
  { path: '/las-vegas', priority: 0.8, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/las-vegas-real-estate', priority: 0.8, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/luxury-homes-las-vegas', priority: 0.8, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/northwest-las-vegas', priority: 0.8, changefreq: 'weekly', lastmod: 'auto' },
  
  // Skye Canyon specific pages
  { path: '/skye-canyon-guide', priority: 0.9, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/skye-canyon-communities', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/skye-canyon-parks', priority: 0.7, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/skye-canyon-schools', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  
  // Analysis pages
  { path: '/market-analysis', priority: 0.8, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/neighborhood-analysis', priority: 0.7, changefreq: 'weekly', lastmod: 'auto' },
  
  // Service pages
  { path: '/services/buyer-agent', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/services/first-time-buyer', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/services/luxury-properties', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/services/new-construction', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/services/seller-agent', priority: 0.8, changefreq: 'monthly', lastmod: 'auto' },
  { path: '/services/relocation', priority: 0.7, changefreq: 'monthly', lastmod: 'auto' },
  
  // Search and demo pages
  { path: '/search', priority: 0.6, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/demo/maps', priority: 0.5, changefreq: 'monthly', lastmod: 'auto' },
  
  // Legal pages
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly', lastmod: 'auto' },
  { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly', lastmod: 'auto' },
  
  // Admin pages (lower priority)
  { path: '/performance-dashboard', priority: 0.2, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/lead-dashboard', priority: 0.2, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/followup-boss-status', priority: 0.2, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/seo-management', priority: 0.2, changefreq: 'weekly', lastmod: 'auto' },
  { path: '/home-simple', priority: 0.1, changefreq: 'monthly', lastmod: 'auto' }
];

// Function to get file modification time
function getFileLastMod(filePath) {
  try {
    // Handle different file patterns
    let fileName = filePath.replace('/', '');
    if (fileName === '') fileName = 'home';
    
    // Try different possible file locations
    const possiblePaths = [
      path.join(process.cwd(), 'client/src/pages', fileName + '.tsx'),
      path.join(process.cwd(), 'client/src/pages', fileName + '.jsx'),
      path.join(process.cwd(), 'client/src/pages', fileName, 'index.tsx'),
      path.join(process.cwd(), 'client/src/pages', fileName, 'index.jsx')
    ];
    
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0];
      }
    }
    
    // Fallback to current date if file not found
    return new Date().toISOString().split('T')[0];
  } catch (error) {
    // Fallback to current date if file not found
    return new Date().toISOString().split('T')[0];
  }
}

// Function to get sitemap statistics
function getSitemapStats(allUrls) {
  const stats = {
    totalUrls: allUrls.length,
    staticPages: allUrls.filter(url => !url.path.includes('/property/')).length,
    propertyPages: allUrls.filter(url => url.path.includes('/property/')).length,
    highPriority: allUrls.filter(url => url.priority >= 0.8).length,
    generatedAt: new Date().toISOString()
  };
  
  return stats;
}

// Function to generate dynamic property URLs from database
async function getPropertyUrls() {
  const propertyUrls = [];
  
  try {
    // Import database connection (adjust path as needed)
    const { db } = require('../server/db');
    const { properties } = require('../shared/schema');
    const { eq } = require('drizzle-orm');
    
    // Query active properties from database
    const activeProperties = await db
      .select({ id: properties.id, status: properties.status })
      .from(properties)
      .where(eq(properties.status, 'active'))
      .limit(100); // Limit to prevent sitemap from being too large
    
    // Generate URLs for each property
    activeProperties.forEach(property => {
      propertyUrls.push({
        path: `/property/${property.id}`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0]
      });
    });
    
    console.log(`Generated ${propertyUrls.length} property URLs for sitemap`);
  } catch (error) {
    console.warn('Could not fetch properties for sitemap:', error.message);
    // Continue without property URLs if database is unavailable
  }
  
  return propertyUrls;
}

// Main sitemap generation function (now async)
async function generateDynamicSitemap() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.skyecanyonhomesforsale.com' 
    : 'http://localhost:3000';

  // Get all URLs
  const allUrls = [...ROUTES];
  
  // Add property URLs from database
  const propertyUrls = await getPropertyUrls();
  allUrls.push(...propertyUrls);

  // Generate XML
  const lastmod = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  allUrls.forEach(route => {
    const lastmodDate = route.lastmod === 'auto' ? getFileLastMod(route.path.replace('/', '') + '.tsx') : route.lastmod;
    
    xml += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  // Log sitemap statistics
  const stats = getSitemapStats(allUrls);
  console.log('🗺️ Dynamic Sitemap Generated:', stats);

  return xml;
}

module.exports = {
  generateDynamicSitemap,
  ROUTES
};
