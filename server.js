#!/usr/bin/env node

// Production server entry point for Replit deployment
import('./dist/server.js').catch(console.error);
