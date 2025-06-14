/**
 * Simple Schema Validation Test
 * Tests schema implementation without external dependencies
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testHomepageSchema() {
  console.log('Testing homepage schema markup...\n');
  
  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');
    
    // Count JSON-LD scripts
    const jsonLdMatches = stdout.match(/<script type="application\/ld\+json">/g);
    const schemaCount = jsonLdMatches ? jsonLdMatches.length : 0;
    
    console.log(`Found ${schemaCount} JSON-LD script tags`);
    
    // Test specific schema types
    const tests = {
      'LocalBusiness/RealEstateAgent': stdout.includes('"@type":["RealEstateAgent","LocalBusiness"]') || stdout.includes('"@type":"LocalBusiness"'),
      'Organization': stdout.includes('"@type":"Organization"'),
      'WebSite': stdout.includes('"@type":"WebSite"'),
      'Review': stdout.includes('"@type":"Review"'),
      'BreadcrumbList': stdout.includes('"@type":"BreadcrumbList"') || stdout.includes('BreadcrumbList'),
      'Service': stdout.includes('"@type":"Service"')
    };
    
    console.log('\nSchema Types Found:');
    Object.entries(tests).forEach(([type, found]) => {
      console.log(`${found ? '✓' : '✗'} ${type}: ${found ? 'FOUND' : 'MISSING'}`);
    });
    
    // Test business information
    const businessInfo = {
      'Business Name': stdout.includes('Dr. Jan Duffy'),
      'Phone Number': stdout.includes('(702) 500-1902'),
      'Address': stdout.includes('10111 W. Skye Canyon Park Drive'),
      'Zip Code': stdout.includes('89166'),
      'Coordinates': stdout.includes('36.2469') && stdout.includes('-115.3242'),
      'Opening Hours': stdout.includes('openingHours') || stdout.includes('openingHoursSpecification'),
      'Email': stdout.includes('@SkyeCanyonHomesForSale.com')
    };
    
    console.log('\nBusiness Information:');
    Object.entries(businessInfo).forEach(([info, found]) => {
      console.log(`${found ? '✓' : '✗'} ${info}: ${found ? 'FOUND' : 'MISSING'}`);
    });
    
    // Test review data
    const reviewTests = {
      'Customer Reviews': stdout.includes('Sarah Mitchell') || stdout.includes('Michael Rodriguez'),
      'Review Ratings': stdout.includes('"ratingValue":5') || stdout.includes('"rating":5'),
      'Review Body': stdout.includes('reviewBody'),
      'Date Published': stdout.includes('datePublished'),
      'Multiple Reviews': (stdout.match(/reviewBody/g) || []).length >= 3
    };
    
    console.log('\nReview Schema:');
    Object.entries(reviewTests).forEach(([test, passed]) => {
      console.log(`${passed ? '✓' : '✗'} ${test}: ${passed ? 'FOUND' : 'MISSING'}`);
    });
    
    return {
      schemaCount,
      schemaTypes: Object.values(tests).filter(Boolean).length,
      businessInfo: Object.values(businessInfo).filter(Boolean).length,
      reviews: Object.values(reviewTests).filter(Boolean).length
    };
    
  } catch (error) {
    console.error(`Error testing homepage: ${error.message}`);
    return null;
  }
}

async function testServicePages() {
  console.log('\n\nTesting service pages schema...\n');
  
  const services = [
    'buyer-agent',
    'first-time-buyer', 
    'luxury-properties',
    'new-construction'
  ];
  
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
        hasServiceType: stdout.includes('"serviceType"')
      };
      
      const passed = Object.values(tests).filter(Boolean).length;
      const total = Object.keys(tests).length;
      
      console.log(`${service}: ${passed}/${total} tests passed`);
      Object.entries(tests).forEach(([test, result]) => {
        console.log(`  ${result ? '✓' : '✗'} ${test}`);
      });
      
      results.push({ service, passed, total, tests });
      
    } catch (error) {
      console.log(`✗ ${service}: ERROR - ${error.message}`);
      results.push({ service, error: error.message });
    }
  }
  
  return results;
}

async function validateSchemaStructure() {
  console.log('\n\nValidating schema structure...\n');
  
  try {
    const { stdout } = await execAsync('curl -s http://localhost:5000');
    
    // Extract and validate JSON structure
    const jsonLdRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    const matches = [...stdout.matchAll(jsonLdRegex)];
    
    console.log(`Found ${matches.length} JSON-LD scripts to validate`);
    
    let validSchemas = 0;
    let totalSchemas = 0;
    
    matches.forEach((match, index) => {
      totalSchemas++;
      try {
        const jsonContent = match[1].trim();
        const schema = JSON.parse(jsonContent);
        
        // Basic validation
        const hasContext = schema['@context'] === 'https://schema.org';
        const hasType = !!schema['@type'];
        const hasName = !!schema.name;
        
        if (hasContext && hasType) {
          validSchemas++;
          console.log(`✓ Schema ${index + 1}: Valid ${schema['@type']}`);
        } else {
          console.log(`✗ Schema ${index + 1}: Invalid structure`);
        }
        
      } catch (e) {
        console.log(`✗ Schema ${index + 1}: JSON parse error`);
      }
    });
    
    return { validSchemas, totalSchemas };
    
  } catch (error) {
    console.error(`Error validating structure: ${error.message}`);
    return { validSchemas: 0, totalSchemas: 0 };
  }
}

async function runCompleteTest() {
  console.log('=== Comprehensive Schema Testing ===\n');
  
  // Test 1: Homepage schema
  const homepageResults = await testHomepageSchema();
  
  // Test 2: Service pages
  const serviceResults = await testServicePages();
  
  // Test 3: Schema structure validation
  const structureResults = await validateSchemaStructure();
  
  // Final summary
  console.log('\n\n=== FINAL TEST RESULTS ===\n');
  
  if (homepageResults) {
    console.log(`Homepage Schema Scripts: ${homepageResults.schemaCount}`);
    console.log(`Schema Types Found: ${homepageResults.schemaTypes}/6`);
    console.log(`Business Info Complete: ${homepageResults.businessInfo}/7`);
    console.log(`Review Schema: ${homepageResults.reviews}/5`);
  }
  
  const validServices = serviceResults.filter(r => !r.error && r.passed >= 4).length;
  console.log(`Service Pages Valid: ${validServices}/4`);
  
  console.log(`Schema Structure: ${structureResults.validSchemas}/${structureResults.totalSchemas} valid`);
  
  // Overall assessment
  const overallScore = homepageResults ? 
    (homepageResults.schemaTypes >= 5 && 
     homepageResults.businessInfo >= 6 && 
     homepageResults.reviews >= 4 && 
     validServices >= 3 && 
     structureResults.validSchemas >= 3) : false;
  
  console.log(`\nOVERALL STATUS: ${overallScore ? '✅ EXCELLENT' : '⚠️ NEEDS REVIEW'}`);
  
  return overallScore;
}

// Run the test
runCompleteTest()
  .then(success => {
    console.log('\nSchema testing completed successfully!');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Schema testing failed:', error.message);
    process.exit(1);
  });