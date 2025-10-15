// Dynamic Sitemap API - Vercel Serverless Function
// Generates sitemap dynamically based on actual application routes

const { generateDynamicSitemap } = require('../lib/dynamic-sitemap-generator');

export default async function handler(req, res) {
  try {
    // Generate dynamic sitemap (now async)
    const sitemap = await generateDynamicSitemap();
    
    // Set proper headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('X-Sitemap-Generator', 'Dynamic-Sitemap-v1.0');
    
    // Send the sitemap
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Fallback to basic sitemap if generation fails
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes on error
    res.status(200).send(fallbackSitemap);
  }
}
