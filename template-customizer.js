#!/usr/bin/env node

/**
 * Real Estate Website Template Customizer
 * Automatically customizes the Skye Canyon template for new markets
 */

const fs = require('node:fs');
const _path = require('node:path');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Configuration object to store customization data
const config = {};

// Files that need customization
const TEMPLATE_FILES = [
  'client/src/components/agent-bio.tsx',
  'client/src/components/realscout-listings.tsx',
  'client/src/pages/home.tsx',
  'client/src/components/neighborhood-guide.tsx',
  'client/src/components/market-stats.tsx',
  'client/index.html',
  'package.json',
];

// Replacement patterns
const _REPLACEMENTS = {
  'Skye Canyon': (newArea) => newArea,
  'Dr. Jan Duffy': (newAgent) => newAgent,
  'Las Vegas': (newCity) => newCity,
  Nevada: (newState) => newState,
  QWdlbnQtMjI1MDUw: (newAgentId) => newAgentId,
  'skyecanyonhomesforsale.com': (newDomain) => newDomain,
  'Skye-Canyon-Homes': (newRepo) => newRepo,
};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function gatherConfiguration() {
  config.agentName = await askQuestion('Agent Name (e.g., John Smith): ');
  config.areaName = await askQuestion('Target Area/Neighborhood (e.g., Henderson): ');
  config.cityName = await askQuestion('City (e.g., Las Vegas): ');
  config.stateName = await askQuestion('State (e.g., Nevada): ');
  config.realscoutId = await askQuestion('RealScout Agent Encoded ID: ');
  config.customDomain = await askQuestion('Custom Domain (optional): ');
  config.repoName = await askQuestion('GitHub Repository Name: ');
  config.priceHomepage = await askQuestion('Homepage Min Price (e.g., $450K): ');
  config.priceLuxury = await askQuestion('Luxury Min Price (e.g., $700K): ');
  config.priceStarter = await askQuestion('Starter Home Range (e.g., $400K-$550K): ');
  config.agentEmail = await askQuestion('Agent Email: ');
  config.agentPhone = await askQuestion('Agent Phone: ');
  config.agentLicense = await askQuestion('Real Estate License #: ');
}

function customizeFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  Object.entries(replacements).forEach(([search, replace]) => {
    const regex = new RegExp(search, 'g');
    if (content.includes(search)) {
      content = content.replace(regex, replace);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function createEnvironmentFile() {
  const envContent = `# Real Estate Website Environment Variables
DATABASE_URL=your_database_url_here
VITE_REALSCOUT_AGENT_ID=${config.realscoutId}
VITE_AGENT_EMAIL=${config.agentEmail}
VITE_AGENT_PHONE=${config.agentPhone}
VITE_CUSTOM_DOMAIN=${config.customDomain || ''}
`;

  fs.writeFileSync('.env.template', envContent);
}

function updatePackageJson() {
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageData.name = config.repoName.toLowerCase().replace(/\s+/g, '-');
    packageData.description = `Real estate website for ${config.areaName}, ${config.cityName}`;

    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
  }
}

function createCustomizationSummary() {
  const summary = `# Customization Summary

## Site Configuration
- **Agent**: ${config.agentName}
- **Area**: ${config.areaName}
- **City**: ${config.cityName}, ${config.stateName}
- **Domain**: ${config.customDomain || 'Not specified'}
- **Repository**: ${config.repoName}

## RealScout Configuration
- **Agent ID**: ${config.realscoutId}
- **Homepage Price**: ${config.priceHomepage}+
- **Luxury Price**: ${config.priceLuxury}+
- **Starter Range**: ${config.priceStarter}

## Contact Information
- **Email**: ${config.agentEmail}
- **Phone**: ${config.agentPhone}
- **License**: ${config.agentLicense}

## Next Steps
1. Review customized files
2. Update agent photos in public/ folder
3. Configure database with local market data
4. Test RealScout widgets
5. Deploy to Replit
6. Set up custom domain

## Files Modified
${TEMPLATE_FILES.map((file) => `- ${file}`).join('\n')}
`;

  fs.writeFileSync('CUSTOMIZATION-SUMMARY.md', summary);
}

async function runCustomization() {
  try {
    await gatherConfiguration();

    // Define all replacements
    const replacements = {
      'Skye Canyon': config.areaName,
      'Dr. Jan Duffy': config.agentName,
      'Las Vegas': config.cityName,
      Nevada: config.stateName,
      QWdlbnQtMjI1MDUw: config.realscoutId,
      'skyecanyonhomesforsale.com': config.customDomain || 'your-domain.com',
      'Sky-Canyon-Homes': config.repoName,
      '$550K+': `${config.priceHomepage}+`,
      '$800K+': `${config.priceLuxury}+`,
      '$500K-$650K': config.priceStarter,
    };

    // Customize each template file
    TEMPLATE_FILES.forEach((file) => {
      customizeFile(file, replacements);
    });

    // Create additional files
    createEnvironmentFile();
    updatePackageJson();
    createCustomizationSummary();
  } catch (_error) {
  } finally {
    rl.close();
  }
}

// Run the customization
if (require.main === module) {
  runCustomization();
}

module.exports = { runCustomization, gatherConfiguration };
