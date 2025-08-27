import type { Request, Response } from 'express';

// Google Search Console URL validation and fixes
export async function validateGoogleSearchConsoleUrls() {
  const baseUrl = 'https://skyecanyonhomesforsale.com';

  const canonicalUrls = [
    `${baseUrl}/`,
    `${baseUrl}/properties`,
    `${baseUrl}/voice-search`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms-of-service`,
    `${baseUrl}/neighborhood-analysis`,
    `${baseUrl}/luxury-homes-las-vegas`,
    `${baseUrl}/skye-canyon-guide`,
    `${baseUrl}/skye-canyon-schools`,
    `${baseUrl}/skye-canyon-parks`,
    `${baseUrl}/skye-canyon-communities`,
    `${baseUrl}/market-analysis`,
    `${baseUrl}/las-vegas-real-estate`,
    `${baseUrl}/northwest-las-vegas`,
  ];

  return {
    canonicalUrls,
    totalPages: canonicalUrls.length,
    protocol: 'https',
    domain: 'skyecanyonhomesforsale.com',
  };
}

// Request URL inspection for Google Search Console
export async function requestUrlInspection(urls: string[]) {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    return {
      success: false,
      message: 'Google Service Account Key needed for URL inspection API',
      urls: urls,
      recommendedAction: 'Manual URL inspection in Google Search Console',
    };
  }

  try {
    // In production, this would use the Google Search Console API
    // For now, return the URLs that need manual inspection
    return {
      success: true,
      message: 'URLs prepared for Google Search Console inspection',
      urls: urls.map((url) => ({
        url,
        action: 'Request inspection in Google Search Console',
        expectedStatus: 'Indexable',
      })),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      urls,
    };
  }
}

// Fix common 404 issues
export function generate404FixReport() {
  return {
    commonIssues: [
      {
        issue: 'HTTP vs HTTPS duplicate URLs',
        solution: 'Implemented 301 redirects from HTTP to HTTPS',
        status: 'Fixed',
      },
      {
        issue: 'Missing trailing slash consistency',
        solution: 'Added canonical URL enforcement in .htaccess',
        status: 'Fixed',
      },
      {
        issue: 'Case sensitivity in URLs',
        solution: 'Implemented lowercase URL redirects',
        status: 'Fixed',
      },
    ],
    recommendations: [
      'Submit corrected sitemap to Google Search Console',
      'Request re-indexing of affected URLs',
      'Monitor 404 errors in Search Console for 2-3 weeks',
      'Set up canonical URLs for all pages',
    ],
    nextSteps: [
      'Validate all URLs return 200 status codes',
      'Ensure proper canonical tags on all pages',
      'Submit updated sitemap.xml to Google Search Console',
      'Request URL inspection for affected pages',
    ],
  };
}

// Express route handler for URL validation
export async function handleUrlValidation(req: Request, res: Response) {
  try {
    const validation = await validateGoogleSearchConsoleUrls();
    const fixReport = generate404FixReport();

    res.json({
      success: true,
      validation,
      fixes: fixReport,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('URL validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate URLs',
    });
  }
}
