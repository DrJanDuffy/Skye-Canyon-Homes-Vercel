import fetch from 'node-fetch';

/**
 * Task Master AI Deployment Verification
 * Tests all endpoints and functionality before production deployment
 */

async function verifyTaskMasterAI() {
  const baseUrl = 'http://localhost:5000';
  const results = {
    timestamp: new Date().toISOString(),
    endpoints: {},
    dashboard: {},
    automation: {},
    performance: {},
    summary: { passed: 0, failed: 0, total: 0 }
  };

  console.log('Verifying Task Master AI integration...\n');

  // Test API endpoints
  const endpoints = [
    { name: 'Tasks List', url: '/api/tasks', method: 'GET' },
    { name: 'Tasks Dashboard', url: '/api/tasks/dashboard', method: 'GET' },
    { name: 'Automations', url: '/api/automations', method: 'GET' }
  ];

  for (const endpoint of endpoints) {
    try {
      const startTime = Date.now();
      const response = await fetch(`${baseUrl}${endpoint.url}`);
      const duration = Date.now() - startTime;
      const data = await response.json();
      
      const success = response.ok && data && typeof data === 'object';
      results.endpoints[endpoint.name] = {
        status: response.status,
        success,
        duration,
        dataType: Array.isArray(data) ? 'array' : typeof data,
        recordCount: Array.isArray(data) ? data.length : Object.keys(data).length
      };

      console.log(`${success ? '✓' : '✗'} ${endpoint.name}: ${response.status} (${duration}ms)`);
      if (success) results.summary.passed++; else results.summary.failed++;
      results.summary.total++;
      
    } catch (error) {
      results.endpoints[endpoint.name] = { success: false, error: error.message };
      console.log(`✗ ${endpoint.name}: Failed - ${error.message}`);
      results.summary.failed++;
      results.summary.total++;
    }
  }

  // Test dashboard metrics
  try {
    const response = await fetch(`${baseUrl}/api/tasks/dashboard`);
    const dashboard = await response.json();
    
    results.dashboard = {
      totalTasks: dashboard.total || 0,
      tasksByStatus: dashboard.byStatus || {},
      tasksByPriority: dashboard.byPriority || {},
      automations: dashboard.automations || {},
      hasData: dashboard.total > 0
    };

    console.log(`\nDashboard Metrics:`);
    console.log(`- Total Tasks: ${dashboard.total}`);
    console.log(`- By Status: ${JSON.stringify(dashboard.byStatus)}`);
    console.log(`- By Priority: ${JSON.stringify(dashboard.byPriority)}`);
    console.log(`- Automations: ${dashboard.automations.enabled}/${dashboard.automations.total} enabled`);
    
  } catch (error) {
    console.log(`Dashboard test failed: ${error.message}`);
  }

  // Test automation trigger
  try {
    const response = await fetch(`${baseUrl}/api/automations/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trigger: 'manual', context: { test: 'verification' } })
    });
    
    const result = await response.json();
    results.automation = {
      triggerSuccess: response.ok,
      message: result.message || 'No message'
    };
    
    console.log(`\nAutomation Trigger: ${response.ok ? 'Success' : 'Failed'}`);
    
  } catch (error) {
    results.automation = { triggerSuccess: false, error: error.message };
    console.log(`Automation trigger failed: ${error.message}`);
  }

  // Performance summary
  const avgResponseTime = Object.values(results.endpoints)
    .filter(r => r.duration)
    .reduce((sum, r) => sum + r.duration, 0) / 
    Object.values(results.endpoints).filter(r => r.duration).length;

  results.performance = {
    averageResponseTime: Math.round(avgResponseTime) || 0,
    allEndpointsUnder100ms: Object.values(results.endpoints).every(r => !r.duration || r.duration < 100),
    fastestEndpoint: Math.min(...Object.values(results.endpoints).map(r => r.duration || Infinity)),
    slowestEndpoint: Math.max(...Object.values(results.endpoints).map(r => r.duration || 0))
  };

  console.log(`\nPerformance Summary:`);
  console.log(`- Average Response Time: ${results.performance.averageResponseTime}ms`);
  console.log(`- All Under 100ms: ${results.performance.allEndpointsUnder100ms}`);
  console.log(`- Fastest: ${results.performance.fastestEndpoint}ms`);
  console.log(`- Slowest: ${results.performance.slowestEndpoint}ms`);

  // Final summary
  const successRate = (results.summary.passed / results.summary.total * 100).toFixed(1);
  const readyForDeployment = results.summary.passed >= results.summary.total * 0.8 && 
                            results.dashboard.hasData && 
                            results.automation.triggerSuccess;

  console.log(`\nVerification Summary:`);
  console.log(`- Tests Passed: ${results.summary.passed}/${results.summary.total} (${successRate}%)`);
  console.log(`- Dashboard Data: ${results.dashboard.hasData ? 'Present' : 'Missing'}`);
  console.log(`- Automation: ${results.automation.triggerSuccess ? 'Working' : 'Failed'}`);
  console.log(`- Ready for Deployment: ${readyForDeployment ? 'YES' : 'NO'}`);

  if (readyForDeployment) {
    console.log(`\nDeploy with:`);
    console.log(`git add .`);
    console.log(`git commit -m "feat: Task Master AI integration"`);
    console.log(`git push origin main`);
  }

  return { results, readyForDeployment };
}

// Run verification
verifyTaskMasterAI().catch(console.error);