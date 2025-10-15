# Google Search Console Setup Guide

## Current Status
- **Domain**: skyecanyonhomesforsale.com (non-www) - but Vercel redirects to www
- **Actual Domain**: www.skyecanyonhomesforsale.com (what Vercel serves)
- **Sitemap**: Fixed with proper XML schema and current dates
- **Verification**: Ready for Google verification code

## Issues Fixed

### 1. Sitemap XML Errors ✅
- Added proper XML schema declarations (`xmlns:xsi` and `xsi:schemaLocation`)
- Updated all `lastmod` dates to current date (2025-01-14)
- Fixed page ordering and priorities
- Added missing service pages
- Updated Vercel configuration to serve sitemap.xml with correct content-type

### 2. Robots.txt ✅
- Updated to reference correct sitemap URL
- Added proper disallow rules for admin areas
- Explicitly allowed all important pages

### 3. Google Verification ✅
- Updated placeholder verification codes in components
- Ready for actual Google verification code

## Next Steps for Google Search Console

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Select "URL prefix"
4. Enter: `https://www.skyecanyonhomesforsale.com` (since Vercel redirects to www)

### Step 2: Verify Ownership
1. Choose "HTML tag" verification method
2. Copy the verification code (e.g., `abc123def456`)
3. Update these files with your actual code:
   - `client/src/components/google-search-console.tsx` (line 7)
   - `client/src/components/enhanced-seo-metadata.tsx` (line 153)
4. Replace `GOOGLE_VERIFICATION_CODE_NEEDED` with your actual code
5. Deploy the changes

### Step 3: Submit Sitemap
1. In Google Search Console, go to "Sitemaps"
2. Add sitemap: `https://www.skyecanyonhomesforsale.com/sitemap.xml`
3. Click "Submit"

### Step 4: Request Indexing
1. Go to "URL Inspection" tool
2. Enter key pages like:
   - `https://skyecanyonhomesforsale.com/`
   - `https://skyecanyonhomesforsale.com/properties`
   - `https://skyecanyonhomesforsale.com/about`
3. Click "Request Indexing" for each

## Domain Configuration Notes

### WWW vs Non-WWW
- **Current Setup**: Non-www (`skyecanyonhomesforsale.com`)
- **Redirects**: All www traffic redirects to non-www (configured in `public/_redirects`)
- **Recommendation**: Stick with non-www for Google Search Console

### Vercel Configuration
- Updated `vercel.json` to properly serve sitemap.xml with correct content-type
- Added robots.txt route with proper headers
- Ensured sitemap.xml is served before the catch-all route

## Files Updated

1. `public/sitemap.xml` - Fixed XML schema and dates
2. `public/robots.txt` - Updated disallow rules and sitemap reference
3. `server/sitemap-generator.ts` - Added missing service pages
4. `vercel.json` - Added sitemap.xml and robots.txt routes
5. `client/src/components/google-search-console.tsx` - Updated verification placeholder
6. `client/src/components/enhanced-seo-metadata.tsx` - Updated verification placeholder

## Testing

After deployment, test:
- `https://skyecanyonhomesforsale.com/sitemap.xml` returns XML (not HTML)
- `https://skyecanyonhomesforsale.com/robots.txt` returns plain text
- All URLs in sitemap are accessible and return 200 status

## Expected Results

Once properly configured:
- Google Search Console should show sitemap as "Success" instead of "Unknown"
- Discovered pages should show 20+ pages instead of 0
- No more sitemap errors in Google Search Console
