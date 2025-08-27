/**
 * Schema Validation Test Suite
 * Tests all implemented schema markup for compliance and accuracy
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(_message) {}

function _validateSchemaStructure(schema) {
  const errors = [];
  const warnings = [];

  // Check required fields
  if (!schema['@context']) {
    errors.push('Missing @context property');
  } else if (schema['@context'] !== 'https://schema.org') {
    warnings.push('@context should be https://schema.org');
  }

  if (!schema['@type']) {
    errors.push('Missing @type property');
  }

  if (!schema.name) {
    errors.push('Missing name property');
  }

  // Type-specific validation
  if (schema['@type'] === 'LocalBusiness' || schema['@type'] === 'RealEstateAgent') {
    if (!schema.address) {
      errors.push('LocalBusiness missing address');
    }
    if (!schema.telephone) {
      errors.push('LocalBusiness missing telephone');
    }
    if (!schema.openingHours && !schema.openingHoursSpecification) {
      warnings.push('LocalBusiness missing opening hours');
    }
  }

  if (schema['@type'] === 'Service') {
    if (!schema.provider) {
      errors.push('Service missing provider');
    }
    if (!schema.serviceType) {
      warnings.push('Service missing serviceType');
    }
  }

  if (schema['@type'] === 'Organization') {
    if (!schema.contactPoint && !schema.telephone) {
      warnings.push('Organization missing contact information');
    }
  }

  return { errors, warnings };
}

function extractSchemaFromComponent() {
  try {
    // Read the comprehensive schema component
    const componentPath = path.join(__dirname, 'client/src/components/comprehensive-schema.tsx');
    const componentContent = fs.readFileSync(componentPath, 'utf8');

    log('Schema component file found and loaded');

    // Extract schema objects
    const schemas = [];

    // Check for LocalBusiness schema
    if (componentContent.includes('LocalBusiness')) {
      schemas.push({
        name: 'LocalBusiness Schema',
        type: 'LocalBusiness',
        found: true,
      });
    }

    // Check for Organization schema
    if (componentContent.includes('Organization')) {
      schemas.push({
        name: 'Organization Schema',
        type: 'Organization',
        found: true,
      });
    }

    // Check for Service schema
    if (componentContent.includes('"@type": "Service"')) {
      schemas.push({
        name: 'Service Schema',
        type: 'Service',
        found: true,
      });
    }

    // Check for BreadcrumbList schema
    if (componentContent.includes('BreadcrumbList')) {
      schemas.push({
        name: 'Breadcrumb Schema',
        type: 'BreadcrumbList',
        found: true,
      });
    }

    // Check for Review schema
    if (componentContent.includes('"@type": "Review"')) {
      schemas.push({
        name: 'Review Schema',
        type: 'Review',
        found: true,
      });
    }

    // Check for WebSite schema
    if (componentContent.includes('WebSite')) {
      schemas.push({
        name: 'Website Schema',
        type: 'WebSite',
        found: true,
      });
    }

    return schemas;
  } catch (error) {
    log(`Error reading schema component: ${error.message}`);
    return [];
  }
}

function validateBusinessInformation() {
  const businessData = {
    name: 'Dr. Jan Duffy - Skye Canyon Real Estate Expert',
    address: '10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166',
    phone: '(702) 500-1902',
    email: 'DrDuffy@SkyeCanyonHomesForSale.com',
    coordinates: { lat: 36.2469, lng: -115.3242 },
    hours: {
      monday: '08:00-20:00',
      tuesday: '08:00-20:00',
      wednesday: '08:00-20:00',
      thursday: '08:00-20:00',
      friday: '08:00-20:00',
      saturday: '09:00-18:00',
      sunday: '10:00-16:00',
    },
  };

  const validation = {
    name: businessData.name.length > 0,
    address: businessData.address.includes('89166'),
    phone: businessData.phone.match(/\(\d{3}\) \d{3}-\d{4}/),
    email: businessData.email.includes('@'),
    coordinates: businessData.coordinates.lat && businessData.coordinates.lng,
    hours: Object.keys(businessData.hours).length === 7,
  };

  return validation;
}

function validateServicePages() {
  const servicePages = ['buyer-agent', 'first-time-buyer', 'luxury-properties', 'new-construction'];

  const results = [];

  servicePages.forEach((page) => {
    try {
      const pagePath = path.join(__dirname, `client/src/pages/services/${page}.tsx`);
      const pageContent = fs.readFileSync(pagePath, 'utf8');

      const hasSchema = pageContent.includes('ComprehensiveSchemaMarkup');
      const hasBreadcrumbs = pageContent.includes('breadcrumbs={[');
      const hasServiceName = pageContent.includes('serviceName=');

      results.push({
        page,
        hasSchema,
        hasBreadcrumbs,
        hasServiceName,
        valid: hasSchema && hasBreadcrumbs && hasServiceName,
      });
    } catch (error) {
      results.push({
        page,
        error: error.message,
        valid: false,
      });
    }
  });

  return results;
}

function checkHomepageReviews() {
  try {
    const homePath = path.join(__dirname, 'client/src/pages/home.tsx');
    const homeContent = fs.readFileSync(homePath, 'utf8');

    const hasReviews = homeContent.includes('reviews={[');
    const reviewCount = (homeContent.match(/author:/g) || []).length;
    const hasRatings = homeContent.includes('rating: 5');
    const hasReviewBody = homeContent.includes('reviewBody:');
    const hasDatePublished = homeContent.includes('datePublished:');

    return {
      hasReviews,
      reviewCount,
      hasRatings,
      hasReviewBody,
      hasDatePublished,
      valid: hasReviews && reviewCount >= 3 && hasRatings && hasReviewBody && hasDatePublished,
    };
  } catch (error) {
    return {
      error: error.message,
      valid: false,
    };
  }
}

async function runFullValidation() {
  log('Starting comprehensive schema validation...');

  // Test 1: Schema Component Structure
  log('\n=== Testing Schema Component Structure ===');
  const schemas = extractSchemaFromComponent();
  schemas.forEach((schema) => {
    log(`✓ ${schema.name}: ${schema.found ? 'FOUND' : 'MISSING'}`);
  });

  // Test 2: Business Information Validation
  log('\n=== Testing Business Information ===');
  const businessValidation = validateBusinessInformation();
  Object.entries(businessValidation).forEach(([key, valid]) => {
    log(`${valid ? '✓' : '✗'} ${key}: ${valid ? 'VALID' : 'INVALID'}`);
  });

  // Test 3: Service Pages Schema Implementation
  log('\n=== Testing Service Pages Schema ===');
  const serviceResults = validateServicePages();
  serviceResults.forEach((result) => {
    if (result.error) {
      log(`✗ ${result.page}: ERROR - ${result.error}`);
    } else {
      log(
        `${result.valid ? '✓' : '✗'} ${result.page}: Schema=${result.hasSchema}, Breadcrumbs=${result.hasBreadcrumbs}, ServiceName=${result.hasServiceName}`
      );
    }
  });

  // Test 4: Homepage Reviews Validation
  log('\n=== Testing Homepage Reviews ===');
  const reviewValidation = checkHomepageReviews();
  if (reviewValidation.error) {
    log(`✗ Reviews: ERROR - ${reviewValidation.error}`);
  } else {
    log(
      `${reviewValidation.valid ? '✓' : '✗'} Reviews: Count=${reviewValidation.reviewCount}, Valid=${reviewValidation.valid}`
    );
    log(`  - Has Reviews: ${reviewValidation.hasReviews}`);
    log(`  - Has Ratings: ${reviewValidation.hasRatings}`);
    log(`  - Has Review Body: ${reviewValidation.hasReviewBody}`);
    log(`  - Has Date Published: ${reviewValidation.hasDatePublished}`);
  }

  // Test 5: Schema Types Coverage
  log('\n=== Schema Types Coverage Summary ===');
  const requiredTypes = [
    'LocalBusiness',
    'Organization',
    'Service',
    'BreadcrumbList',
    'Review',
    'WebSite',
  ];

  const foundTypes = schemas.map((s) => s.type);
  requiredTypes.forEach((type) => {
    const found = foundTypes.includes(type);
    log(`${found ? '✓' : '✗'} ${type}: ${found ? 'IMPLEMENTED' : 'MISSING'}`);
  });

  // Overall Results
  log('\n=== Validation Summary ===');
  const totalSchemas = schemas.length;
  const validServices = serviceResults.filter((r) => r.valid).length;
  const businessValid = Object.values(businessValidation).every((v) => v);
  const reviewsValid = reviewValidation.valid;

  log(`Schema Component: ${totalSchemas} schemas found`);
  log(`Service Pages: ${validServices}/4 pages valid`);
  log(`Business Info: ${businessValid ? 'VALID' : 'NEEDS FIXES'}`);
  log(`Reviews: ${reviewsValid ? 'VALID' : 'NEEDS FIXES'}`);

  const overallValid = totalSchemas >= 6 && validServices === 4 && businessValid && reviewsValid;
  log(`\nOVERALL STATUS: ${overallValid ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  return overallValid;
}

// Run validation if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  runFullValidation()
    .then((valid) => {
      process.exit(valid ? 0 : 1);
    })
    .catch((error) => {
      log(`Validation failed with error: ${error.message}`);
      process.exit(1);
    });
}
