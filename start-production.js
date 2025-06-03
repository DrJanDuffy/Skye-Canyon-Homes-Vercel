// Force production environment
process.env.NODE_ENV = 'production';

// Import and start the production server
import('./dist/index.js').catch(console.error);