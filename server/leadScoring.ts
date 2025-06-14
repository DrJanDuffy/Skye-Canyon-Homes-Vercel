/**
 * Smart Lead Scoring System
 * Implements behavioral triggers to identify high-intent prospects
 * and automatically notify Dr. Jan Duffy with qualified leads
 */

interface UserBehavior {
  sessionId: string;
  ip: string;
  userAgent: string;
  actions: BehaviorAction[];
  firstVisit: Date;
  lastActivity: Date;
  totalSessionTime: number;
  returnVisits: number;
  leadScore: number;
  isQualified: boolean;
  notificationSent: boolean;
}

interface BehaviorAction {
  type: 'property_view' | 'price_search' | 'contact_form' | 'phone_click' | 'email_click' | 'ai_search' | 'realscout_interaction';
  timestamp: Date;
  data: any;
  sessionDuration?: number;
  priceRange?: string;
  propertyId?: string;
  searchQuery?: string;
}

interface LeadScoringRules {
  propertyViews: {
    single: number;
    multiple: number;
    luxury: number;
  };
  priceConsistency: {
    consistent: number;
    luxuryRange: number;
  };
  engagement: {
    longSession: number; // 5+ minutes
    returnVisit: number;
    aiSearch: number;
    contactAction: number;
  };
  urgencyTriggers: {
    phoneClick: number;
    emailClick: number;
    contactForm: number;
    multipleProperties: number;
  };
}

class SmartLeadScoring {
  private userBehaviors: Map<string, UserBehavior> = new Map();
  private scoringRules: LeadScoringRules;

  constructor() {
    this.scoringRules = {
      propertyViews: {
        single: 10,
        multiple: 25,
        luxury: 15
      },
      priceConsistency: {
        consistent: 20,
        luxuryRange: 25
      },
      engagement: {
        longSession: 15,
        returnVisit: 30,
        aiSearch: 12,
        contactAction: 40
      },
      urgencyTriggers: {
        phoneClick: 50,
        emailClick: 35,
        contactForm: 60,
        multipleProperties: 20
      }
    };
  }

  // Track user behavior and calculate lead score
  async trackBehavior(sessionId: string, action: BehaviorAction, userInfo: { ip: string; userAgent: string }): Promise<void> {
    let user = this.userBehaviors.get(sessionId);
    
    if (!user) {
      user = {
        sessionId,
        ip: userInfo.ip,
        userAgent: userInfo.userAgent,
        actions: [],
        firstVisit: new Date(),
        lastActivity: new Date(),
        totalSessionTime: 0,
        returnVisits: 0,
        leadScore: 0,
        isQualified: false,
        notificationSent: false
      };
    } else {
      // Check if this is a return visit (more than 30 minutes gap)
      const timeSinceLastActivity = Date.now() - user.lastActivity.getTime();
      if (timeSinceLastActivity > 30 * 60 * 1000) { // 30 minutes
        user.returnVisits++;
      }
    }

    user.actions.push(action);
    user.lastActivity = new Date();
    
    // Calculate session time
    if (action.sessionDuration) {
      user.totalSessionTime = Math.max(user.totalSessionTime, action.sessionDuration);
    }

    // Calculate lead score
    user.leadScore = this.calculateLeadScore(user);
    
    // Check if user is qualified for notification
    const wasQualified = user.isQualified;
    user.isQualified = this.isQualifiedLead(user);
    
    this.userBehaviors.set(sessionId, user);

    // Send notification if newly qualified
    if (user.isQualified && !wasQualified && !user.notificationSent) {
      await this.notifyDrJanDuffy(user);
      user.notificationSent = true;
    }
  }

  // Calculate comprehensive lead score
  private calculateLeadScore(user: UserBehavior): number {
    let score = 0;
    const actions = user.actions;

    // Property viewing behavior
    const propertyViews = actions.filter(a => a.type === 'property_view');
    const uniqueProperties = new Set(propertyViews.map(a => a.propertyId)).size;
    
    if (propertyViews.length === 1) {
      score += this.scoringRules.propertyViews.single;
    } else if (propertyViews.length > 1) {
      score += this.scoringRules.propertyViews.multiple;
      if (uniqueProperties >= 3) {
        score += this.scoringRules.urgencyTriggers.multipleProperties;
      }
    }

    // Luxury property interest
    const luxuryViews = propertyViews.filter(a => a.data?.price > 800000);
    if (luxuryViews.length > 0) {
      score += this.scoringRules.propertyViews.luxury;
    }

    // Price range consistency
    const priceSearches = actions.filter(a => a.type === 'price_search' || a.priceRange);
    if (priceSearches.length >= 2) {
      const priceRanges = priceSearches.map(a => a.priceRange).filter(Boolean);
      const consistentPricing = this.checkPriceConsistency(priceRanges);
      if (consistentPricing) {
        score += this.scoringRules.priceConsistency.consistent;
        
        // Bonus for luxury price range consistency
        if (priceRanges.some(range => range?.includes('800K+') || range?.includes('1M+'))) {
          score += this.scoringRules.priceConsistency.luxuryRange;
        }
      }
    }

    // Engagement metrics
    if (user.totalSessionTime > 300) { // 5+ minutes
      score += this.scoringRules.engagement.longSession;
    }

    if (user.returnVisits > 0) {
      score += this.scoringRules.engagement.returnVisit * Math.min(user.returnVisits, 3);
    }

    // AI search engagement
    const aiSearches = actions.filter(a => a.type === 'ai_search');
    if (aiSearches.length > 0) {
      score += this.scoringRules.engagement.aiSearch * Math.min(aiSearches.length, 3);
    }

    // High-intent actions
    const contactActions = actions.filter(a => 
      a.type === 'contact_form' || a.type === 'phone_click' || a.type === 'email_click'
    );
    
    contactActions.forEach(action => {
      switch (action.type) {
        case 'phone_click':
          score += this.scoringRules.urgencyTriggers.phoneClick;
          break;
        case 'email_click':
          score += this.scoringRules.urgencyTriggers.emailClick;
          break;
        case 'contact_form':
          score += this.scoringRules.urgencyTriggers.contactForm;
          break;
      }
    });

    // RealScout widget interactions
    const realscoutInteractions = actions.filter(a => a.type === 'realscout_interaction');
    if (realscoutInteractions.length > 0) {
      score += Math.min(realscoutInteractions.length * 5, 25);
    }

    return Math.min(score, 200); // Cap at 200 points
  }

  // Check if lead meets qualification criteria
  private isQualifiedLead(user: UserBehavior): boolean {
    const score = user.leadScore;
    const actions = user.actions;

    // High score threshold
    if (score >= 80) return true;

    // Immediate qualification triggers
    const hasContactAction = actions.some(a => 
      a.type === 'contact_form' || a.type === 'phone_click' || a.type === 'email_click'
    );
    if (hasContactAction) return true;

    // Multiple property views with engagement
    const propertyViews = actions.filter(a => a.type === 'property_view').length;
    if (propertyViews >= 3 && user.totalSessionTime > 300) return true;

    // Return visitor with high engagement
    if (user.returnVisits >= 2 && score >= 50) return true;

    // Luxury property interest with AI searches
    const luxuryInterest = actions.some(a => a.data?.price > 800000);
    const aiSearches = actions.filter(a => a.type === 'ai_search').length;
    if (luxuryInterest && aiSearches >= 2) return true;

    return false;
  }

  // Check price range consistency
  private checkPriceConsistency(priceRanges: (string | undefined)[]): boolean {
    if (priceRanges.length < 2) return false;
    
    const cleanRanges = priceRanges.filter(Boolean) as string[];
    if (cleanRanges.length < 2) return false;

    // Simple consistency check - at least 50% overlap in price ranges
    const ranges = cleanRanges.map(this.parsePriceRange);
    const firstRange = ranges[0];
    
    let consistentCount = 0;
    ranges.forEach(range => {
      if (this.hasOverlap(firstRange, range)) {
        consistentCount++;
      }
    });

    return consistentCount / ranges.length >= 0.5;
  }

  // Parse price range string to min/max values
  private parsePriceRange(range: string): { min: number; max: number } {
    const cleaned = range.replace(/[$,K+]/g, '');
    
    if (cleaned.includes('-')) {
      const [min, max] = cleaned.split('-').map(n => parseInt(n) * 1000);
      return { min, max };
    } else if (cleaned.includes('+')) {
      const min = parseInt(cleaned.replace('+', '')) * 1000;
      return { min, max: Infinity };
    } else {
      const value = parseInt(cleaned) * 1000;
      return { min: value * 0.8, max: value * 1.2 };
    }
  }

  // Check if two price ranges overlap
  private hasOverlap(range1: { min: number; max: number }, range2: { min: number; max: number }): boolean {
    return range1.min <= range2.max && range2.min <= range1.max;
  }

  // Send notification to Dr. Jan Duffy
  private async notifyDrJanDuffy(user: UserBehavior): Promise<void> {
    try {
      const leadSummary = this.generateLeadSummary(user);
      
      // Send email notification using SendGrid
      if (process.env.SENDGRID_API_KEY) {
        await this.sendEmailNotification(leadSummary);
      }

      // Log high-value lead for immediate attention
      console.log('🔥 HIGH-INTENT LEAD IDENTIFIED:', {
        sessionId: user.sessionId,
        score: user.leadScore,
        summary: leadSummary.summary
      });

      // Save to database for follow-up
      await this.saveQualifiedLead(user, leadSummary);

    } catch (error) {
      console.error('Error notifying Dr. Jan Duffy:', error);
    }
  }

  // Generate comprehensive lead summary
  private generateLeadSummary(user: UserBehavior) {
    const actions = user.actions;
    const propertyViews = actions.filter(a => a.type === 'property_view');
    const priceRanges = actions.map(a => a.priceRange).filter(Boolean);
    const searchQueries = actions.filter(a => a.type === 'ai_search').map(a => a.searchQuery);

    let summary = `Lead Score: ${user.leadScore}/200\n`;
    summary += `Session Time: ${Math.round(user.totalSessionTime / 60)} minutes\n`;
    summary += `Return Visits: ${user.returnVisits}\n`;
    summary += `Properties Viewed: ${propertyViews.length}\n`;

    if (priceRanges.length > 0) {
      summary += `Price Interest: ${priceRanges.join(', ')}\n`;
    }

    if (searchQueries.length > 0) {
      summary += `AI Searches: ${searchQueries.slice(0, 3).join(', ')}\n`;
    }

    // Identify behavioral triggers
    const triggers = [];
    if (actions.some(a => a.type === 'phone_click')) triggers.push('Phone Click');
    if (actions.some(a => a.type === 'email_click')) triggers.push('Email Click');
    if (actions.some(a => a.type === 'contact_form')) triggers.push('Contact Form');
    if (propertyViews.length >= 3) triggers.push('Multiple Properties');
    if (user.returnVisits >= 2) triggers.push('Return Visitor');
    if (user.totalSessionTime > 600) triggers.push('Extended Session');

    return {
      score: user.leadScore,
      summary,
      triggers,
      urgency: user.leadScore >= 100 ? 'HIGH' : user.leadScore >= 70 ? 'MEDIUM' : 'QUALIFIED',
      user
    };
  }

  // Send email notification to Dr. Jan Duffy
  private async sendEmailNotification(leadSummary: any): Promise<void> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'jan@drjanduffy.com',
      from: 'leads@skyecanyonhomes.com',
      subject: `🔥 High-Intent Lead Alert - Score: ${leadSummary.score}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #2c5aa0;">High-Intent Lead Detected</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Lead Summary</h3>
            <pre style="font-family: monospace; background: white; padding: 15px; border-radius: 4px;">${leadSummary.summary}</pre>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Behavioral Triggers</h3>
            <ul>
              ${leadSummary.triggers.map((trigger: string) => `<li>${trigger}</li>`).join('')}
            </ul>
          </div>
          
          <div style="background: ${leadSummary.urgency === 'HIGH' ? '#ffebee' : '#f3e5f5'}; padding: 20px; border-radius: 8px;">
            <h3>Urgency Level: ${leadSummary.urgency}</h3>
            <p><strong>Recommendation:</strong> ${leadSummary.urgency === 'HIGH' ? 'Contact within 1 hour' : 'Contact within 24 hours'}</p>
          </div>
          
          <p style="margin-top: 30px; color: #666;">
            This lead was automatically identified by your Smart Lead Scoring system based on behavioral analysis.
          </p>
        </div>
      `
    };

    await sgMail.send(msg);
  }

  // Save qualified lead to database
  private async saveQualifiedLead(user: UserBehavior, leadSummary: any): Promise<void> {
    // Implementation would depend on your database schema
    // This could integrate with your existing lead storage system
    console.log('Saving qualified lead to database:', {
      sessionId: user.sessionId,
      score: user.leadScore,
      qualification: leadSummary.urgency
    });
  }

  // Get lead analytics for Dr. Jan Duffy's dashboard
  getLeadAnalytics() {
    const allUsers = Array.from(this.userBehaviors.values());
    const qualifiedLeads = allUsers.filter(u => u.isQualified);
    
    return {
      totalVisitors: allUsers.length,
      qualifiedLeads: qualifiedLeads.length,
      conversionRate: qualifiedLeads.length / allUsers.length,
      averageScore: allUsers.reduce((sum, u) => sum + u.leadScore, 0) / allUsers.length,
      highValueLeads: qualifiedLeads.filter(u => u.leadScore >= 100).length,
      recentActivity: allUsers.filter(u => 
        Date.now() - u.lastActivity.getTime() < 24 * 60 * 60 * 1000
      ).length
    };
  }

  // Get specific user behavior data
  getUserBehavior(sessionId: string): UserBehavior | undefined {
    return this.userBehaviors.get(sessionId);
  }

  // Clean up old behavior data (call periodically)
  cleanupOldData(daysToKeep: number = 30): void {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    
    for (const [sessionId, user] of this.userBehaviors) {
      if (user.lastActivity < cutoffDate) {
        this.userBehaviors.delete(sessionId);
      }
    }
  }
}

// Export singleton instance
export const leadScoring = new SmartLeadScoring();
export { BehaviorAction, UserBehavior };