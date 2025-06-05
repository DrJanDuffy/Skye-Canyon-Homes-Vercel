interface FollowUpBossValidationResult {
  isValid: boolean;
  status: string;
  message: string;
  errorDetails?: any;
}

export async function validateFollowUpBossAPI(): Promise<FollowUpBossValidationResult> {
  const apiKey = process.env.FUB_API_KEY;
  
  if (!apiKey) {
    return {
      isValid: false,
      status: 'missing_key',
      message: 'Follow Up Boss API key not configured'
    };
  }

  try {
    // Test API connectivity with minimal request
    const response = await fetch('https://api.followupboss.com/v1/people?limit=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const responseText = await response.text();
    
    if (response.ok) {
      return {
        isValid: true,
        status: 'active',
        message: 'Follow Up Boss API connection successful'
      };
    } else if (response.status === 401) {
      const errorData = JSON.parse(responseText);
      return {
        isValid: false,
        status: 'expired',
        message: 'API key has expired - please generate a new one',
        errorDetails: errorData
      };
    } else {
      return {
        isValid: false,
        status: 'error',
        message: `API request failed with status ${response.status}`,
        errorDetails: responseText
      };
    }
  } catch (error) {
    return {
      isValid: false,
      status: 'network_error',
      message: 'Network error connecting to Follow Up Boss',
      errorDetails: error.message
    };
  }
}

export async function testFollowUpBossLead(testData: any): Promise<any> {
  const validation = await validateFollowUpBossAPI();
  
  if (!validation.isValid) {
    throw new Error(`Follow Up Boss validation failed: ${validation.message}`);
  }

  const response = await fetch('https://api.followupboss.com/v1/people', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FUB_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      firstName: testData.firstName,
      lastName: testData.lastName,
      emails: [{ value: testData.email, type: 'home' }],
      phones: testData.phone ? [{ value: testData.phone, type: 'mobile' }] : [],
      source: 'Dr Jan Duffy Website - API Test',
      tags: ['API Test', 'Website Lead'],
      notes: 'Test lead from API validation system'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Follow Up Boss test failed: ${response.status} - ${errorText}`);
  }

  return await response.json();
}