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

// SEO endpoints - robots.txt only (sitemap handled by /api/sitemap)

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  
  const robots = `User-agent: *
Allow: /
Sitemap: https://skyecanyonhomesforsale.com/sitemap.xml`;
  
  res.send(robots);
});

// All other routes serve the React app (except robots.txt)
app.get('*', (req, res) => {
  // Skip serving React app for robots.txt
  if (req.path === '/robots.txt') {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Export for Vercel
export default app;
