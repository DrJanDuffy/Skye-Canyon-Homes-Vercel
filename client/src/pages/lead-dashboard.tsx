import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Calendar, DollarSign, MessageSquare, Users, TrendingUp } from "lucide-react";
import type { Lead } from "@shared/schema";

interface LeadWithScore extends Lead {
  score?: number;
  category?: string;
  recommendedActions?: string[];
  estimatedTimeframe?: string;
}

export default function LeadDashboard() {
  const { data: leads = [], isLoading } = useQuery<LeadWithScore[]>({
    queryKey: ["/api/leads"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/lead-stats"],
  });

  const getScoreBadgeColor = (score?: number) => {
    if (!score) return "secondary";
    if (score >= 70) return "destructive"; // Hot lead
    if (score >= 40) return "default"; // Warm lead
    return "secondary"; // Cold lead
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "hot": return "destructive";
      case "warm": return "default";
      case "cold": return "secondary";
      default: return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Dashboard</h1>
        <p className="text-gray-600">Manage and track your real estate leads from the Dr. Jan Duffy website</p>
      </div>

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {leads.filter(lead => (lead.score || 0) >= 70).length}
            </div>
            <p className="text-xs text-muted-foreground">Score 70+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warm Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {leads.filter(lead => (lead.score || 0) >= 40 && (lead.score || 0) < 70).length}
            </div>
            <p className="text-xs text-muted-foreground">Score 40-69</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Leads</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(lead => {
                if (!lead.createdAt) return false;
                const leadDate = new Date(lead.createdAt.toString());
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return leadDate > yesterday;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Lead List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Leads</h2>
        
        {leads.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
              <p className="text-gray-500 text-center max-w-md">
                When visitors submit contact forms on your website, their information will appear here for easy management and follow-up.
              </p>
            </CardContent>
          </Card>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {lead.firstName} {lead.lastName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
{lead.createdAt ? new Date(lead.createdAt.toString()).toLocaleDateString() : 'No date'}
                      </span>
                      <Badge variant="outline">{lead.source}</Badge>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {lead.score && (
                      <Badge variant={getScoreBadgeColor(lead.score)}>
                        Score: {lead.score}
                      </Badge>
                    )}
                    {lead.category && (
                      <Badge variant={getCategoryColor(lead.category)}>
                        {lead.category} lead
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {lead.priceRange && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{lead.priceRange}</span>
                      </div>
                    )}
                    {lead.timeframe && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Timeframe: {lead.timeframe}</span>
                      </div>
                    )}
                  </div>
                </div>

                {lead.message && (
                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Message:</p>
                        <p className="text-sm text-gray-600">{lead.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {lead.recommendedActions && lead.recommendedActions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                    <div className="flex flex-wrap gap-1">
                      {lead.recommendedActions.map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-4" />
                
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={`mailto:${lead.email}`}>Send Email</a>
                  </Button>
                  {lead.phone && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${lead.phone}`}>Call Now</a>
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}