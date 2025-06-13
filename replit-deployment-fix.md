# Replit Deployment Fix Required

## Current Issue
The deployment logs show the ESBuild process completed successfully:
- Client bundle: 604 KB
- Server bundle: 69 KB  
- Build completed in 8.393 seconds

However, the deployment is failing health checks because it's not using the built server from the dist directory.

## Root Cause
The deployment is still trying to connect to port 5000 on the development server instead of running the production server from dist/server.js.

## Required Fix

### Update Replit Run Command
Change from current development command to:
```
cd dist && node server.js
```

### How to Fix in Replit
1. Go to your Replit project settings
2. Find the "Run" command configuration  
3. Update it from the current development command to: `cd dist && node server.js`
4. Redeploy

## What This Will Fix
- Server will run from the built production artifacts in dist/
- Proper port binding using environment PORT variable
- Static assets served correctly from dist/public/
- All EISDIR errors eliminated with ESBuild system

## Verification
After updating the run command, the deployment should:
1. Start the production server from dist/server.js
2. Bind to the correct port using Replit's PORT environment variable
3. Serve static assets from dist/public/
4. Pass health checks on the / endpoint

The ESBuild system has resolved all build issues - only the run command needs updating.