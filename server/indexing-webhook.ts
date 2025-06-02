import type { Request, Response } from 'express';

// Google Indexing API webhook handler for real-time indexing requests
export async function handleIndexingWebhook(req: Request, res: Response) {
  try {
    const { url, type, timestamp } = req.body;
    
    // Log indexing requests for monitoring
    console.log(`Indexing request received: ${type} for ${url} at ${timestamp}`);
    
    // Store indexing request data
    const indexingData = {
      url,
      type,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
      ip: req.ip
    };
    
    // In production, you would:
    // 1. Validate the request is from Google
    // 2. Store the indexing status in database
    // 3. Trigger any necessary cache invalidation
    // 4. Update internal analytics
    
    res.status(200).json({ 
      success: true, 
      message: 'Indexing request processed',
      data: indexingData 
    });
    
  } catch (error) {
    console.error('Indexing webhook error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process indexing request' 
    });
  }
}

// IndexNow API integration for instant indexing
export async function submitToIndexNow(urls: string[]) {
  const indexNowKey = process.env.INDEXNOW_API_KEY;
  
  if (!indexNowKey) {
    console.log('IndexNow API key not configured - skipping submission');
    return;
  }
  
  const payload = {
    host: 'skyecanyonhomesforsale.com',
    key: indexNowKey,
    keyLocation: `https://skyecanyonhomesforsale.com/${indexNowKey}.txt`,
    urlList: urls
  };
  
  try {
    // Submit to multiple search engines via IndexNow
    const engines = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://search.seznam.cz/indexnow'
    ];
    
    const submissions = engines.map(engine => 
      fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );
    
    await Promise.allSettled(submissions);
    console.log(`IndexNow submitted for ${urls.length} URLs`);
    
  } catch (error) {
    console.error('IndexNow submission error:', error);
  }
}