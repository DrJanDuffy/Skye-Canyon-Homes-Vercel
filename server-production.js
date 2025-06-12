const express = require('express');
const path = require('path');
const { createServer } = require('http');

const app = express();

// Enable trust proxy for Replit domains
app.set('trust proxy', 1);

// CORS and security headers for external access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('X-Frame-Options', 'ALLOWALL');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic API endpoints for testing
app.get('/api/properties', (req, res) => {
  res.json([]);
});

app.get('/api/agent-bio', (req, res) => {
  res.json({
    name: "Dr. Jan Duffy",
    title: "REALTOR®",
    phone: "(702) 500-1902",
    email: "jan@skyecanyonhomes.com",
    specialties: ["Skye Canyon", "Las Vegas Real Estate", "Luxury Homes"]
  });
});

// Serve static files
const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // For non-API routes, send a simple HTML page
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skye Canyon | Dr. Jan Duffy, REALTOR®</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 15px; margin-bottom: 20px; }
        .contact-info { background: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .btn { background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px 0 0; }
        .btn:hover { background: #1d4ed8; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Dr. Jan Duffy, REALTOR®</h1>
            <h2>Skye Canyon Real Estate Specialist</h2>
        </div>
        
        <p>Welcome to your trusted source for Skye Canyon real estate. With expert local knowledge and personalized service, I help clients find their perfect home in one of Las Vegas's most desirable communities.</p>
        
        <div class="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> (702) 500-1902</p>
            <p><strong>Email:</strong> jan@skyecanyonhomes.com</p>
            <p><strong>Service Area:</strong> Skye Canyon, Las Vegas, NV 89166</p>
        </div>
        
        <h3>Services</h3>
        <ul>
            <li>Luxury Home Sales</li>
            <li>New Construction Expertise</li>
            <li>Market Analysis & Valuations</li>
            <li>Buyer & Seller Representation</li>
        </ul>
        
        <a href="tel:+17025001902" class="btn">Call Now</a>
        <a href="mailto:jan@skyecanyonhomes.com" class="btn">Email Me</a>
        
        <hr style="margin: 30px 0;">
        <p style="text-align: center; color: #666;">
            &copy; 2025 Dr. Jan Duffy, REALTOR® | Skye Canyon Real Estate
        </p>
    </div>
</body>
</html>`;
  
  res.send(html);
});

const server = createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
  console.log(`Server binding to 0.0.0.0:${port} for external access`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});