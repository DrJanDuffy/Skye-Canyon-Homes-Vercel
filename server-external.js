const express = require('express');
const path = require('path');
const { createServer } = require('http');

const app = express();

// Enable trust proxy for external domains
app.set('trust proxy', true);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security headers for external access
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`External server running on port ${port}`);
});
