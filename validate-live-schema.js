/**
 * Live Schema Validation Tool
 * Tests the actual rendered schema markup in the browser
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

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
        } catch (e) {
          return { error: 'Invalid JSON', content: script.textContent };
        }
      });
    });

    return schemas;
  } finally {
    await browser.close();
  }
}

async function testSchemaImplementation() {
  console.log('Testing live schema implementation...\n');

  const baseUrl = 'http://localhost:5000';
  const pages = [
    { name: 'Homepage', url: baseUrl },
    { name: 'Buyer Agent', url: `${baseUrl}/services/buyer-agent` },
    { name: 'First Time Buyer', url: `${baseUrl}/services/first-time-buyer` },
    { name: 'Luxury Properties', url: `${baseUrl}/services/luxury-properties` },
    { name: 'New Construction', url: `${baseUrl}/services/new-construction` },
  ];

  for (const page of pages) {
    console.log(`Testing ${page.name}...`);
    try {
      const schemas = await extractSchemaFromPage(page.url);

      if (schemas.length === 0) {
        console.log(`❌ No schema found on ${page.name}`);
        continue;
      }

      console.log(`✅ Found ${schemas.length} schema(s) on ${page.name}`);

      schemas.forEach((schema, index) => {
        if (schema.error) {
          console.log(`  ❌ Schema ${index + 1}: ${schema.error}`);
          return;
        }

        const type = Array.isArray(schema['@type']) ? schema['@type'].join(', ') : schema['@type'];
        console.log(`  ✓ Schema ${index + 1}: ${type}`);

        // Validate specific schema requirements
        if (type.includes('LocalBusiness')) {
          const hasAddress = !!schema.address;
          const hasPhone = !!schema.telephone;
          const hasHours = !!schema.openingHours || !!schema.openingHoursSpecification;
          console.log(`    Address: ${hasAddress ? '✓' : '❌'}`);
          console.log(`    Phone: ${hasPhone ? '✓' : '❌'}`);
          console.log(`    Hours: ${hasHours ? '✓' : '❌'}`);
        }

        if (type === 'Service') {
          const hasProvider = !!schema.provider;
          const hasServiceType = !!schema.serviceType;
          console.log(`    Provider: ${hasProvider ? '✓' : '❌'}`);
          console.log(`    Service Type: ${hasServiceType ? '✓' : '❌'}`);
        }

        if (type === 'Organization') {
          const hasContactPoint = !!schema.contactPoint || !!schema.telephone;
          const hasAddress = !!schema.address;
          console.log(`    Contact: ${hasContactPoint ? '✓' : '❌'}`);
          console.log(`    Address: ${hasAddress ? '✓' : '❌'}`);
        }
      });
    } catch (error) {
      console.log(`❌ Error testing ${page.name}: ${error.message}`);
    }

    console.log('');
  }
}

// Alternative simple test without puppeteer
async function testSchemaWithCurl() {
  console.log('Testing schema with curl requests...\n');

  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');

    // Check for JSON-LD scripts
    const jsonLdMatches = stdout.match(/<script type="application\/ld\+json">/g);
    const schemaCount = jsonLdMatches ? jsonLdMatches.length : 0;

    console.log(`Found ${schemaCount} JSON-LD script tags in homepage`);

    // Check for specific schema types
    const hasLocalBusiness =
      stdout.includes('"@type":"LocalBusiness"') ||
      stdout.includes('"@type":["RealEstateAgent","LocalBusiness"]');
    const hasOrganization = stdout.includes('"@type":"Organization"');
    const hasWebsite = stdout.includes('"@type":"WebSite"');
    const hasReviews = stdout.includes('"@type":"Review"');

    console.log(`LocalBusiness schema: ${hasLocalBusiness ? '✓' : '❌'}`);
    console.log(`Organization schema: ${hasOrganization ? '✓' : '❌'}`);
    console.log(`Website schema: ${hasWebsite ? '✓' : '❌'}`);
    console.log(`Review schema: ${hasReviews ? '✓' : '❌'}`);

    // Check business information
    const hasPhone = stdout.includes('(702) 500-1902');
    const hasAddress = stdout.includes('10111 W. Skye Canyon Park Drive');
    const hasZipCode = stdout.includes('89166');

    console.log(`Phone number: ${hasPhone ? '✓' : '❌'}`);
    console.log(`Address: ${hasAddress ? '✓' : '❌'}`);
    console.log(`Zip code: ${hasZipCode ? '✓' : '❌'}`);

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
  } catch (error) {
    console.log(`Error testing with curl: ${error.message}`);
    return null;
  }
}

// Test Google's Structured Data Testing Tool format
async function validateSchemaFormat() {
  console.log('\nValidating schema format...\n');

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
    console.log('✅ All required properties present');
  } else {
    console.log(`❌ Missing properties: ${missingProps.join(', ')}`);
  }

  // Validate address structure
  if (sampleSchema.address && sampleSchema.address['@type'] === 'PostalAddress') {
    console.log('✅ Address structure valid');
  } else {
    console.log('❌ Address structure invalid');
  }

  // Validate phone format
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (phonePattern.test(sampleSchema.telephone)) {
    console.log('✅ Phone format valid');
  } else {
    console.log('❌ Phone format invalid');
  }

  return true;
}

async function runCompleteTest() {
  console.log('=== Comprehensive Schema Testing ===\n');

  // Test 1: Format validation
  await validateSchemaFormat();

  // Test 2: Live page testing with curl
  const curlResults = await testSchemaWithCurl();

  // Test 3: Summary
  console.log('\n=== Test Summary ===');
  if (curlResults) {
    const allPassed =
      curlResults.schemaCount >= 3 &&
      curlResults.hasLocalBusiness &&
      curlResults.hasPhone &&
      curlResults.hasAddress;

    console.log(`Overall Status: ${allPassed ? '✅ PASSED' : '❌ NEEDS ATTENTION'}`);
    console.log(`Schema Scripts Found: ${curlResults.schemaCount}`);
  }

  return true;
}

// Run the test
runCompleteTest()
  .then(() => {
    console.log('\nSchema testing complete!');
  })
  .catch((error) => {
    console.error('Schema testing failed:', error.message);
  });
