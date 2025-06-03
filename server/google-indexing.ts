import { Request, Response } from "express";

// Google Indexing API integration
export async function requestGoogleIndexing(urls: string[]) {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    console.warn('Google Service Account Key not configured for indexing API');
    return { success: false, message: 'Service account not configured' };
  }

  try {
    // Parse the service account key
    const credentials = JSON.parse(serviceAccountKey);
    
    // Get access token for Google Indexing API
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: await createJWT(credentials)
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token request failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Submit each URL to Google Indexing API
    const results = [];
    for (const url of urls) {
      try {
        const indexResponse = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
          })
        });

        const indexResult = await indexResponse.json();
        results.push({
          url,
          success: indexResponse.ok,
          response: indexResult
        });
      } catch (error) {
        results.push({
          url,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return { success: true, results };
  } catch (error) {
    console.error('Google Indexing API error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Create JWT for Google API authentication
async function createJWT(credentials: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  // Note: In production, you would use a proper JWT signing library
  // This is a simplified version for demonstration
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));
  
  // In real implementation, you would sign this with the private key
  return `${base64Header}.${base64Payload}.signature`;
}

// Submit sitemap to Google Search Console
export async function submitSitemap() {
  const sitemapUrl = 'https://skyecanyonhomesforsale.com/sitemap.xml';
  
  try {
    // Submit sitemap via Google Search Console API
    const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fskyecanyonhomesforsale.com/sitemaps/${encodeURIComponent(sitemapUrl)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: response.ok,
      status: response.status,
      message: response.ok ? 'Sitemap submitted successfully' : 'Failed to submit sitemap'
    };
  } catch (error) {
    console.error('Sitemap submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Generate comprehensive list of all site URLs for indexing
export function getAllSiteUrls(): string[] {
  const baseUrl = 'https://skyecanyonhomesforsale.com';
  
  return [
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
    `${baseUrl}/northwest-las-vegas`
  ];
}

// Express route handler for manual indexing requests
export async function handleIndexingRequest(req: Request, res: Response) {
  try {
    const { urls } = req.body;
    
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ 
        success: false, 
        message: 'URLs array is required' 
      });
    }

    const result = await requestGoogleIndexing(urls);
    res.json(result);
  } catch (error) {
    console.error('Indexing request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}