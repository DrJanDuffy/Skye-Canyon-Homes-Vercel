interface LeadScore {
  score: number
  category: 'hot' | 'warm' | 'cold'
  recommendedActions: string[]
  estimatedTimeframe: string
}

export async function scoreLeadWithAI(leadData: any): Promise<LeadScore> {
  // Scoring factors
  const factors = {
    hasPreapproval: leadData.preapproved ? 20 : 0,
    timeframe: {
      'ASAP': 25,
      '1-3 months': 20,
      '3-6 months': 10,
      '6+ months': 5,
      'Just browsing': 0
    }[leadData.timeframe] || 0,
    priceRange: leadData.priceRange ? 15 : 0,
    previousInteractions: Math.min(leadData.interactions * 5, 20),
    propertyViews: Math.min(leadData.propertyViews * 2, 10),
    responseTime: leadData.responseTime < 300 ? 10 : 5, // seconds
  }
  
  const totalScore = Object.values(factors).reduce((a, b) => a + b, 0)
  
  let category: 'hot' | 'warm' | 'cold'
  let recommendedActions: string[]
  let estimatedTimeframe: string
  
  if (totalScore >= 70) {
    category = 'hot'
    recommendedActions = [
      'Call within 5 minutes',
      'Send personalized property matches',
      'Schedule showing ASAP'
    ]
    estimatedTimeframe = '0-30 days'
  } else if (totalScore >= 40) {
    category = 'warm'
    recommendedActions = [
      'Call within 1 hour',
      'Send market report',
      'Add to drip campaign'
    ]
    estimatedTimeframe = '30-90 days'
  } else {
    category = 'cold'
    recommendedActions = [
      'Add to nurture sequence',
      'Send monthly newsletter',
      'Check in quarterly'
    ]
    estimatedTimeframe = '90+ days'
  }
  
  // Send to Followup Boss with score
  await updateLeadScore(leadData.id, {
    score: totalScore,
    category,
    estimatedTimeframe
  })
  
  return {
    score: totalScore,
    category,
    recommendedActions,
    estimatedTimeframe
  }
}

async function updateLeadScore(leadId: string, scoreData: any) {
  try {
    const response = await fetch('/api/followup-boss/update-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        leadId,
        customFields: {
          lead_score: scoreData.score,
          lead_category: scoreData.category,
          estimated_timeframe: scoreData.estimatedTimeframe,
          last_scored: new Date().toISOString()
        }
      })
    });
    
    if (!response.ok) {
      console.error('Failed to update lead score in FollowUp Boss');
    }
  } catch (error) {
    console.error('Error updating lead score:', error);
  }
}

// Enhanced lead qualification
export function qualifyLead(leadData: any) {
  const qualifications = {
    buyingTimeframe: leadData.timeframe && leadData.timeframe !== 'Just browsing',
    budgetSpecified: !!leadData.priceRange,
    contactInfoComplete: !!(leadData.email && leadData.phone),
    skyeCanyonInterest: leadData.message?.toLowerCase().includes('skye canyon'),
    luxuryMarket: leadData.priceRange && parseInt(leadData.priceRange.replace(/\D/g, '')) >= 500000
  };
  
  const qualificationScore = Object.values(qualifications).filter(Boolean).length;
  
  return {
    ...qualifications,
    qualificationScore,
    isQualified: qualificationScore >= 3
  };
}