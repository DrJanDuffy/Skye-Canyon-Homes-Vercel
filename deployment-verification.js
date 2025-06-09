/**
 * Task Master AI Deployment Verification
 * Tests all endpoints and functionality before production deployment
 */

import fs from 'fs';
import path from 'path';

async function verifyTaskMasterAI() {
  console.log('🔍 Verifying Task Master AI deployment readiness...\n');
  
  const results = {
    files: { passed: 0, failed: 0, tests: [] },
    apis: { passed: 0, failed: 0, tests: [] },
    performance: { passed: 0, failed: 0, tests: [] }
  };
  
  // File Structure Verification
  console.log('📁 Checking file structure...');
  const requiredFiles = [
    'taskmaster.json',
    'server/task-manager.ts',
    'client/src/pages/task-dashboard.tsx',
    '.taskmaster.config.json'
  ];
  
  for (const file of requiredFiles) {
    const exists = fs.existsSync(file);
    results.files.tests.push({ file, status: exists ? 'PASS' : 'FAIL' });
    if (exists) results.files.passed++;
    else results.files.failed++;
    console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  }
  
  // API Endpoint Testing
  console.log('\n🌐 Testing API endpoints...');
  const apiTests = [
    { endpoint: '/api/tasks', description: 'Task management API' },
    { endpoint: '/api/tasks/dashboard', description: 'Dashboard metrics' },
    { endpoint: '/api/automations', description: 'Automation workflows' }
  ];
  
  for (const test of apiTests) {
    try {
      const response = await fetch(`http://localhost:5000${test.endpoint}`);
      const isSuccess = response.ok;
      results.apis.tests.push({ 
        endpoint: test.endpoint, 
        status: isSuccess ? 'PASS' : 'FAIL',
        responseTime: response.headers.get('x-response-time') || 'N/A'
      });
      if (isSuccess) results.apis.passed++;
      else results.apis.failed++;
      console.log(`  ${isSuccess ? '✓' : '✗'} ${test.endpoint} - ${test.description}`);
    } catch (error) {
      results.apis.tests.push({ 
        endpoint: test.endpoint, 
        status: 'FAIL',
        error: error.message
      });
      results.apis.failed++;
      console.log(`  ✗ ${test.endpoint} - ${error.message}`);
    }
  }
  
  // Performance Testing
  console.log('\n⚡ Testing performance...');
  try {
    const start = Date.now();
    const response = await fetch('http://localhost:5000/api/tasks/dashboard');
    const responseTime = Date.now() - start;
    
    const performancePass = responseTime < 100; // Under 100ms
    results.performance.tests.push({
      test: 'Dashboard API Response Time',
      value: `${responseTime}ms`,
      status: performancePass ? 'PASS' : 'FAIL'
    });
    if (performancePass) results.performance.passed++;
    else results.performance.failed++;
    console.log(`  ${performancePass ? '✓' : '✗'} Dashboard response time: ${responseTime}ms`);
  } catch (error) {
    results.performance.failed++;
    console.log(`  ✗ Performance test failed: ${error.message}`);
  }
  
  // Summary Report
  console.log('\n📊 Verification Summary:');
  console.log(`Files: ${results.files.passed}/${results.files.passed + results.files.failed} passed`);
  console.log(`APIs: ${results.apis.passed}/${results.apis.passed + results.apis.failed} passed`);
  console.log(`Performance: ${results.performance.passed}/${results.performance.passed + results.performance.failed} passed`);
  
  const totalTests = results.files.passed + results.files.failed + 
                    results.apis.passed + results.apis.failed + 
                    results.performance.passed + results.performance.failed;
  const totalPassed = results.files.passed + results.apis.passed + results.performance.passed;
  
  console.log(`\nOverall: ${totalPassed}/${totalTests} tests passed`);
  
  if (totalPassed === totalTests) {
    console.log('\n✅ Task Master AI is ready for production deployment!');
    console.log('\nDeploy with:');
    console.log('git add .');
    console.log('git commit -m "feat: Task Master AI enterprise automation"');
    console.log('git push origin main');
  } else {
    console.log('\n❌ Some tests failed. Please review and fix issues before deployment.');
  }
  
  return { passed: totalPassed === totalTests, results };
}

// Run verification if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyTaskMasterAI().catch(console.error);
}

export { verifyTaskMasterAI };