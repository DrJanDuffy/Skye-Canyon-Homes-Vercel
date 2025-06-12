#!/usr/bin/env node

// Production server entry point for Replit deployment
import('./dist/index.js').catch(console.error);