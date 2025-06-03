#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files
const staticPath = join(__dirname, 'dist', 'public');
console.log(`Static files path: ${staticPath}`);

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));
  console.log('Static files configured');
} else {
  console.log('Static files directory not found');
}

// Basic API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'production'
  });
});

// API route for properties
app.get('/api/properties', (req, res) => {
  res.json([
    {
      id: 1,
      address: "123 Sky Canyon Drive, Las Vegas, NV 89166",
      price: 899000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: "Single Family Home",
      status: "For Sale",
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]);
});

// API route for featured properties
app.get('/api/properties/featured', (req, res) => {
  res.json([
    {
      id: 1,
      address: "123 Sky Canyon Drive, Las Vegas, NV 89166",
      price: 899000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      type: "Single Family Home",
      status: "For Sale",
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]);
});

// API route for agent bio
app.get('/api/agent-bio', (req, res) => {
  res.json({
    name: "Dr. Jan Duffy",
    title: "REALTOR® | Skye Canyon Specialist",
    phone: "(702) 500-1902",
    email: "jan@skyecanyonhomesforsale.com",
    experience: "15+ years",
    specialties: ["Luxury Homes", "New Construction", "Toll Brothers", "Lennar"],
    bio: "Dr. Jan Duffy is a top-rated Nevada REALTOR® specializing in luxury homes, new construction, custom builds, and resales in Skye Canyon and Northwest Las Vegas."
  });
});

// API route for market stats
app.get('/api/market-stats', (req, res) => {
  res.json({
    id: 1,
    medianPrice: "$1.2M",
    daysOnMarket: 28,
    homesSold: 156,
    priceAppreciation: "+8.5%",
    inventoryLevel: "2.1 months",
    lastUpdated: new Date().toISOString()
  });
});

// API route for community data
app.get('/api/community-data', (req, res) => {
  res.json({
    population: 45000,
    medianAge: 38,
    householdIncome: "$89,500",
    schools: [
      { name: "Skye Canyon Elementary", rating: "A", type: "Elementary" },
      { name: "Del Webb Middle School", rating: "A", type: "Middle" },
      { name: "Shadow Ridge High School", rating: "B+", type: "High School" }
    ],
    amenities: [
      "Skye Canyon Park",
      "Golf Courses",
      "Shopping Centers",
      "Recreation Centers"
    ]
  });
});

// API route for market insights
app.get('/api/market-insights', (req, res) => {
  res.json({
    insights: [
      {
        title: "Skye Canyon Market Trends Q4 2024",
        description: "Strong demand for luxury homes with inventory at historic lows",
        source: "Las Vegas Market Report"
      }
    ]
  });
});

// Analytics endpoint
app.post('/api/analytics', (req, res) => {
  console.log('Analytics Event:', JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('<h1>Application not built</h1><p>Please run: npm run build</p>');
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server with single instance check
const server = createServer(app);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

// Start the server
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

export default app;