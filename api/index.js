// Vercel Serverless Function - React App Router
// This function handles all non-static routes and serves the React app

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
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

// SEO endpoints
app.get('/sitemap.xml', (req, res) => {
  console.log('🎯 SITEMAP ROUTE HIT!', req.url);
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/about</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/contact</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/properties</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/voice-search</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/northwest-las-vegas</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/las-vegas-real-estate</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/luxury-homes-las-vegas</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/skye-canyon-guide</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/skye-canyon-schools</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/skye-canyon-parks</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/skye-canyon-communities</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/market-analysis</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/neighborhood-analysis</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/buyer-agent</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/first-time-buyer</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/luxury-properties</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/new-construction</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/seller-agent</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/services/relocation</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/privacy-policy</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.skyecanyonhomesforsale.com/terms-of-service</loc>
    <lastmod>2025-01-15T20:00:00Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
  
  res.send(sitemap);
});

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  
  const robots = `User-agent: *
Allow: /
Sitemap: https://skyecanyonhomesforsale.com/sitemap.xml`;
  
  res.send(robots);
});

// All other routes serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Export for Vercel
export default app;
