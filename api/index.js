// Vercel Serverless Function Wrapper
// This file bridges Vercel's serverless environment with your Express app

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist/public
app.use('/assets', express.static(path.join(__dirname, '../dist/public/assets')));
app.use('/images', express.static(path.join(__dirname, '../dist/public/images')));

// Real estate API routes
app.get('/api/properties', (req, res) => {
  res.json([
    {
      id: 1,
      address: "123 Skye Canyon Drive, Las Vegas, NV 89166",
      price: 1250000,
      bedrooms: 4,
      bathrooms: "3.5",
      sqft: 3200,
      description: "Luxury Skye Canyon home with mountain views and TPC golf course access",
      imageUrl: "/images/luxury-home-1.jpg",
      status: "active",
      featured: true
    },
    {
      id: 2,
      address: "456 Skye Canyon Park Drive, Las Vegas, NV 89166",
      price: 1850000,
      bedrooms: 5,
      bathrooms: "4.5",
      sqft: 4200,
      description: "Premium estate with Red Rock Canyon views and resort amenities",
      imageUrl: "/images/luxury-home-2.jpg",
      status: "active",
      featured: true
    }
  ]);
});

app.get('/api/market-stats', (req, res) => {
  res.json({
    medianPrice: "$1,250,000",
    daysOnMarket: 15,
    homesSold: 24,
    activeListings: 8,
    appreciationRate: "8-12% annually",
    marketTrend: "Strong buyer demand"
  });
});

app.get('/api/featured-properties', (req, res) => {
  res.json([
    {
      id: 1,
      address: "123 Skye Canyon Drive, Las Vegas, NV 89166",
      price: 1250000,
      featured: true
    },
    {
      id: 2,
      address: "456 Skye Canyon Park Drive, Las Vegas, NV 89166",
      price: 1850000,
      featured: true
    }
  ]);
});

// Lead generation endpoint
app.post('/api/leads', (req, res) => {
  const { firstName, lastName, email, phone, message, timeframe, priceRange } = req.body;
  
  // Mock lead creation - replace with your actual logic
  const lead = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    phone,
    message,
    timeframe,
    priceRange,
    source: "Skye Canyon Website",
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    lead
  });
});

// RealScout integration endpoint
app.get('/api/realscout/onboarding', (req, res) => {
  res.json({
    url: "http://drjanduffy.realscout.com/onboarding",
    agentId: "QWdlbnQtMjI1MDUw",
    location: "Skye Canyon, Las Vegas, NV 89166"
  });
});

// SEO and sitemap endpoints
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://skyecanyonhomesforsale.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/properties</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/voice-search</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/northwest-las-vegas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/las-vegas-real-estate</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/luxury-homes-las-vegas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/skye-canyon-guide</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/skye-canyon-schools</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/skye-canyon-parks</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/skye-canyon-communities</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/market-analysis</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://skyecanyonhomesforsale.com/neighborhood-analysis</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  
  res.send(sitemap);
});

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  
  const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://skyecanyonhomesforsale.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and utility pages
Disallow: /api/
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
  
  res.send(robots);
});

// React SPA routes - serve index.html for client-side routing
const spaRoutes = [
  '/',
  '/properties',
  '/about',
  '/contact',
  '/voice-search',
  '/northwest-las-vegas',
  '/las-vegas-real-estate',
  '/luxury-homes-las-vegas',
  '/skye-canyon-guide',
  '/skye-canyon-schools',
  '/skye-canyon-parks',
  '/skye-canyon-communities',
  '/market-analysis',
  '/neighborhood-analysis',
  '/privacy-policy',
  '/terms-of-service'
];

spaRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  });
});

// Catch-all route for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Export for Vercel
export default app;
