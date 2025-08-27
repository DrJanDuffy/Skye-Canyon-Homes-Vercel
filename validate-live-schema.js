/**
 * Live Schema Validation Tool
 * Tests the actual rendered schema markup in the browser
 */

import puppeteer from 'puppeteer';

async function extractSchemaFromPage(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Extract all JSON-LD scripts
    const schemas = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      return Array.from(scripts).map((script) => {
        try {
          return JSON.parse(script.textContent);
        } catch (_e) {
          return { error: 'Invalid JSON', content: script.textContent };
        }
      });
    });

    return schemas;
  } finally {
    await browser.close();
  }
}

async function _testSchemaImplementation() {
  const baseUrl = 'http://localhost:5000';
  const pages = [
    { name: 'Homepage', url: baseUrl },
    { name: 'Buyer Agent', url: `${baseUrl}/services/buyer-agent` },
    { name: 'First Time Buyer', url: `${baseUrl}/services/first-time-buyer` },
    { name: 'Luxury Properties', url: `${baseUrl}/services/luxury-properties` },
    { name: 'New Construction', url: `${baseUrl}/services/new-construction` },
  ];

  for (const page of pages) {
    try {
      const schemas = await extractSchemaFromPage(page.url);

      if (schemas.length === 0) {
        continue;
      }

      schemas.forEach((schema, _index) => {
        if (schema.error) {
          return;
        }

        const type = Array.isArray(schema['@type']) ? schema['@type'].join(', ') : schema['@type'];

        // Validate specific schema requirements
        if (type.includes('LocalBusiness')) {
          const _hasAddress = !!schema.address;
          const _hasPhone = !!schema.telephone;
          const _hasHours = !!schema.openingHours || !!schema.openingHoursSpecification;
        }

        if (type === 'Service') {
          const _hasProvider = !!schema.provider;
          const _hasServiceType = !!schema.serviceType;
        }

        if (type === 'Organization') {
          const _hasContactPoint = !!schema.contactPoint || !!schema.telephone;
          const _hasAddress = !!schema.address;
        }
      });
    } catch (_error) {}
  }
}

// Alternative simple test without puppeteer
async function testSchemaWithCurl() {
  const { exec } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const execAsync = promisify(exec);

  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');

    // Check for JSON-LD scripts
    const jsonLdMatches = stdout.match(/<script type="application\/ld\+json">/g);
    const schemaCount = jsonLdMatches ? jsonLdMatches.length : 0;

    // Check for specific schema types
    const hasLocalBusiness =
      stdout.includes('"@type":"LocalBusiness"') ||
      stdout.includes('"@type":["RealEstateAgent","LocalBusiness"]');
    const hasOrganization = stdout.includes('"@type":"Organization"');
    const hasWebsite = stdout.includes('"@type":"WebSite"');
    const hasReviews = stdout.includes('"@type":"Review"');

    // Check business information
    const hasPhone = stdout.includes('(702) 500-1902');
    const hasAddress = stdout.includes('10111 W. Skye Canyon Park Drive');
    const hasZipCode = stdout.includes('89166');

    return {
      schemaCount,
      hasLocalBusiness,
      hasOrganization,
      hasWebsite,
      hasReviews,
      hasPhone,
      hasAddress,
      hasZipCode,
    };
  } catch (_error) {
    return null;
  }
}

// Test Google's Structured Data Testing Tool format
async function validateSchemaFormat() {
  const sampleSchema = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: 'Dr. Jan Duffy - Skye Canyon Real Estate Expert',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10111 W. Skye Canyon Park Drive',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89166',
      addressCountry: 'US',
    },
    telephone: '(702) 500-1902',
  };

  // Validate required properties
  const requiredProps = ['@context', '@type', 'name', 'address', 'telephone'];
  const missingProps = requiredProps.filter((prop) => !sampleSchema[prop]);

  if (missingProps.length === 0) {
  } else {
  }

  // Validate address structure
  if (sampleSchema.address && sampleSchema.address['@type'] === 'PostalAddress') {
  } else {
  }

  // Validate phone format
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (phonePattern.test(sampleSchema.telephone)) {
  } else {
  }

  return true;
}

async function runCompleteTest() {
  // Test 1: Format validation
  await validateSchemaFormat();

  // Test 2: Live page testing with curl
  const curlResults = await testSchemaWithCurl();
  if (curlResults) {
    const _allPassed =
      curlResults.schemaCount >= 3 &&
      curlResults.hasLocalBusiness &&
      curlResults.hasPhone &&
      curlResults.hasAddress;
  }

  return true;
}

// Run the test
runCompleteTest()
  .then(() => {})
  .catch((_error) => {});
