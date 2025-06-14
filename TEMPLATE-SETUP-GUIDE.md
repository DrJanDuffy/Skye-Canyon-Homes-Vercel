# Real Estate Website Template Setup Guide

## Overview
This guide shows how to use the Skye Canyon Homes website as a template for creating new real estate websites.

## Prerequisites
- GitHub account
- Replit account
- Cloudflare account (for custom domains)
- RealScout agent account

## Step 1: Fork the Repository

1. Go to: https://github.com/DrJanDuffy/Sky-Canyon-Homes
2. Click "Fork" button (top right)
3. Create fork in your GitHub account
4. Name it appropriately (e.g., "YourCity-Homes")

## Step 2: Import to Replit

1. Go to Replit.com
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste your forked repository URL
5. Name your Repl (e.g., "YourCity Real Estate")

## Step 3: Customize Configuration Files

### A. Update package.json
```json
{
  "name": "yourcity-real-estate",
  "description": "Real estate website for [Your City]"
}
```

### B. Update .replit file
```
[deployment]
build = "npm run build"
run = "cd dist && node server.js"
```

## Step 4: Customize Content

### A. Agent Information
Edit `client/src/components/agent-bio.tsx`:
- Replace Dr. Jan Duffy's information
- Update photo, name, contact details
- Change bio and credentials

### B. Location-Specific Content
1. **City/Area Names**: Search and replace "Skye Canyon" with your area
2. **SEO Tags**: Update all H1/H2 tags with your location
3. **Market Data**: Update neighborhood information

### C. RealScout Widgets
Edit `client/src/components/realscout-listings.tsx`:
- Replace agent-encoded-id with your RealScout ID
- Update price ranges for your market
- Adjust search criteria

## Step 5: Update Branding

### A. Colors and Styling
Edit `client/src/index.css`:
- Update CSS custom properties for brand colors
- Modify theme variables

### B. Logo and Images
- Replace images in `public/` folder
- Update favicon
- Add agent photos

## Step 6: Configure Environment

### A. Create .env file
```
DATABASE_URL=your_database_url
VITE_REALSCOUT_AGENT_ID=your_agent_id
```

### B. Update Database Schema
- Import your property data
- Configure neighborhood boundaries
- Set up market statistics

## Step 7: Test Locally

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Test all RealScout widgets
4. Verify contact forms
5. Check responsive design

## Step 8: Deploy

1. Push changes to GitHub
2. In Replit, click "Deploy"
3. Configure custom domain in Replit deployments
4. Set up Cloudflare optimizations

## Step 9: Custom Domain Setup

### A. Domain Configuration
1. Point domain to Replit deployment
2. Configure Cloudflare DNS
3. Set up redirect rules
4. Enable performance optimizations

### B. SEO Optimization
1. Update all meta descriptions
2. Configure structured data
3. Set up local business schema
4. Verify Google My Business integration

## Key Customization Points

### Critical Files to Modify:
- `client/src/pages/home.tsx` - Homepage content
- `client/src/components/realscout-listings.tsx` - Property widgets
- `client/src/components/agent-bio.tsx` - Agent information
- `client/src/components/neighborhood-guide.tsx` - Local information
- `client/src/components/market-stats.tsx` - Market data

### RealScout Configuration:
```typescript
const REALSCOUT_CONFIG = {
  agentEncodedId: "YOUR_AGENT_ID_HERE",
  market: "YOUR_CITY_STATE",
  priceRanges: {
    homepage: "$XXXk+",
    luxury: "$XXXk+",
    starter: "$XXXk-$XXXk"
  }
}
```

## Performance Optimizations Included

- Cloudflare caching rules
- Image optimization
- Code splitting
- Analytics tracking
- SEO optimization
- Mobile responsiveness

## Support and Maintenance

- Monitor analytics for user engagement
- Update property listings regularly
- Maintain SEO rankings
- Keep RealScout widgets current

## Template Benefits

✓ Proven high engagement (10+ minute sessions)
✓ Optimized for real estate SEO
✓ Mobile-responsive design
✓ Lead capture system
✓ Performance optimized
✓ Easy customization

## Next Steps

1. Complete the customization
2. Test thoroughly
3. Deploy to production
4. Monitor performance
5. Scale to additional markets