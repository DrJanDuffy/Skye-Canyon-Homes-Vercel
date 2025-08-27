/**
 * Simple Schema Validation Test
 * Tests schema implementation without external dependencies
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

async function testHomepageSchema() {
  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');

    // Count JSON-LD scripts
    const jsonLdMatches = stdout.match(/<script type="application\/ld\+json">/g);
    const schemaCount = jsonLdMatches ? jsonLdMatches.length : 0;

    // Test specific schema types
    const tests = {
      'LocalBusiness/RealEstateAgent':
        stdout.includes('"@type":["RealEstateAgent","LocalBusiness"]') ||
        stdout.includes('"@type":"LocalBusiness"'),
      Organization: stdout.includes('"@type":"Organization"'),
      WebSite: stdout.includes('"@type":"WebSite"'),
      Review: stdout.includes('"@type":"Review"'),
      BreadcrumbList:
        stdout.includes('"@type":"BreadcrumbList"') || stdout.includes('BreadcrumbList'),
      Service: stdout.includes('"@type":"Service"'),
    };
    Object.entries(tests).forEach(([_type, _found]) => {});

    // Test business information
    const businessInfo = {
      'Business Name': stdout.includes('Dr. Jan Duffy'),
      'Phone Number': stdout.includes('(702) 500-1902'),
      Address: stdout.includes('10111 W. Skye Canyon Park Drive'),
      'Zip Code': stdout.includes('89166'),
      Coordinates: stdout.includes('36.2469') && stdout.includes('-115.3242'),
      'Opening Hours':
        stdout.includes('openingHours') || stdout.includes('openingHoursSpecification'),
      Email: stdout.includes('@SkyeCanyonHomesForSale.com'),
    };
    Object.entries(businessInfo).forEach(([_info, _found]) => {});

    // Test review data
    const reviewTests = {
      'Customer Reviews': stdout.includes('Sarah Mitchell') || stdout.includes('Michael Rodriguez'),
      'Review Ratings': stdout.includes('"ratingValue":5') || stdout.includes('"rating":5'),
      'Review Body': stdout.includes('reviewBody'),
      'Date Published': stdout.includes('datePublished'),
      'Multiple Reviews': (stdout.match(/reviewBody/g) || []).length >= 3,
    };
    Object.entries(reviewTests).forEach(([_test, _passed]) => {});

    return {
      schemaCount,
      schemaTypes: Object.values(tests).filter(Boolean).length,
      businessInfo: Object.values(businessInfo).filter(Boolean).length,
      reviews: Object.values(reviewTests).filter(Boolean).length,
    };
  } catch (_error) {
    return null;
  }
}

async function testServicePages() {
  const services = ['buyer-agent', 'first-time-buyer', 'luxury-properties', 'new-construction'];

  const results = [];

  for (const service of services) {
    try {
      const { stdout } = await execAsync(`curl -s http://localhost:5000/services/${service}`);

      const tests = {
        hasJsonLd: stdout.includes('application/ld+json'),
        hasService: stdout.includes('"@type":"Service"'),
        hasLocalBusiness: stdout.includes('LocalBusiness') || stdout.includes('RealEstateAgent'),
        hasBreadcrumbs: stdout.includes('BreadcrumbList'),
        hasProvider: stdout.includes('"provider"'),
        hasServiceType: stdout.includes('"serviceType"'),
      };

      const passed = Object.values(tests).filter(Boolean).length;
      const total = Object.keys(tests).length;
      Object.entries(tests).forEach(([_test, _result]) => {});

      results.push({ service, passed, total, tests });
    } catch (error) {
      results.push({ service, error: error.message });
    }
  }

  return results;
}

async function validateSchemaStructure() {
  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');

    // Extract and validate JSON structure
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    const matches = [...stdout.matchAll(jsonLdRegex)];

    let validSchemas = 0;
    let totalSchemas = 0;

    matches.forEach((match, _index) => {
      totalSchemas++;
      try {
        const jsonContent = match[1].trim();
        const schema = JSON.parse(jsonContent);

        // Basic validation
        const hasContext = schema['@context'] === 'https://schema.org';
        const hasType = !!schema['@type'];
        const _hasName = !!schema.name;

        if (hasContext && hasType) {
          validSchemas++;
        } else {
        }
      } catch (_e) {}
    });

    return { validSchemas, totalSchemas };
  } catch (_error) {
    return { validSchemas: 0, totalSchemas: 0 };
  }
}

async function runCompleteTest() {
  // Test 1: Homepage schema
  const homepageResults = await testHomepageSchema();

  // Test 2: Service pages
  const serviceResults = await testServicePages();

  // Test 3: Schema structure validation
  const structureResults = await validateSchemaStructure();

  if (homepageResults) {
  }

  const validServices = serviceResults.filter((r) => !r.error && r.passed >= 4).length;

  // Overall assessment
  const overallScore = homepageResults
    ? homepageResults.schemaTypes >= 5 &&
      homepageResults.businessInfo >= 6 &&
      homepageResults.reviews >= 4 &&
      validServices >= 3 &&
      structureResults.validSchemas >= 3
    : false;

  return overallScore;
}

// Run the test
runCompleteTest()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((_error) => {
    process.exit(1);
  });
