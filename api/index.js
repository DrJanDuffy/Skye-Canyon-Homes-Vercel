// Vercel Serverless Function Entry Point
// This file serves as the bridge between Vercel and your Express app

import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create Express app
const app = express();

// Import your built Express server logic
// We'll need to adapt the server.js content for serverless
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, '../dist/public')));

// Basic route handling for your Skye Canyon Homes app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/properties', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/voice-search', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/northwest-las-vegas', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/las-vegas-real-estate', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/luxury-homes-las-vegas', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/skye-canyon-guide', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/skye-canyon-schools', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/skye-canyon-parks', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/skye-canyon-communities', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/market-analysis', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/neighborhood-analysis', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.get('/terms-of-service', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// API routes
app.get('/api/properties', (req, res) => {
  // Mock response for now - you can add your actual API logic here
  res.json([
    {
      id: 1,
      address: "123 Skye Canyon Drive, Las Vegas, NV 89166",
      price: 1250000,
      bedrooms: 4,
      bathrooms: "3.5",
      sqft: 3200,
      description: "Luxury Skye Canyon home with mountain views",
      imageUrl: "/images/luxury-home-1.jpg",
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
    activeListings: 8
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

// Export for Vercel
export default app;
