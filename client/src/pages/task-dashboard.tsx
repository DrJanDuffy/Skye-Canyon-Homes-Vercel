import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Zap, 
  BarChart3, 
  Users, 
  Home, 
  TrendingUp,
  PlayCircle,
  PauseCircle
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'property-management' | 'lead-generation' | 'seo-optimization' | 'performance-monitoring' | 'ai-integration' | 'crm-sync';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: any;
}

interface TaskDashboard {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byCategory: Record<string, number>;
  automations: {
    total: number;
    enabled: number;
  };
}

interface Automation {
  id: string;
  automation: {
    trigger: string;
    actions: string[];
    enabled: boolean;
  };
}

export default function TaskDashboard() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    refetchInterval: 10000,
  });

  const { data: dashboard, isLoading: dashboardLoading } = useQuery<TaskDashboard>({
    queryKey: ["/api/tasks/dashboard"],
    refetchInterval: 15000,
  });

  const { data: automations } = useQuery<Automation[]>({
    queryKey: ["/api/automations"],
    refetchInterval: 30000,
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/dashboard"] });
    },
  });

  const triggerAutomationMutation = useMutation({
    mutationFn: async ({ trigger, context }: { trigger: string; context?: any }) => {
      const response = await fetch('/api/automations/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger, context }),
      });
      if (!response.ok) throw new Error('Failed to trigger automation');
      return response.json();
    },
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'property-management': return <Home className="h-4 w-4" />;
      case 'lead-generation': return <Users className="h-4 w-4" />;
      case 'seo-optimization': return <TrendingUp className="h-4 w-4" />;
      case 'performance-monitoring': return <BarChart3 className="h-4 w-4" />;
      case 'ai-integration': return <Zap className="h-4 w-4" />;
      case 'crm-sync': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (tasksLoading || dashboardLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completionRate = dashboard ? (dashboard.byStatus.completed / dashboard.total) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Master AI Dashboard</h1>
        <p className="text-gray-600">Real estate workflow automation and task management</p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {dashboard?.byStatus['in-progress'] || 0} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
            <div className="mt-2">
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {dashboard?.byPriority.critical || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard?.automations.enabled || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              /{dashboard?.automations.total || 0} enabled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {tasks?.map((task) => (
              <Card key={task.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(task.category)}
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {task.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Category: {task.category.replace('-', ' ')}</span>
                      <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskMutation.mutate({
                            id: task.id,
                            updates: { status: 'in-progress' }
                          })}
                          disabled={updateTaskMutation.isPending}
                        >
                          Start
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button
                          size="sm"
                          onClick={() => updateTaskMutation.mutate({
                            id: task.id,
                            updates: { status: 'completed' }
                          })}
                          disabled={updateTaskMutation.isPending}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations?.map((automation) => (
              <Card key={automation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      {automation.automation.enabled ? (
                        <PlayCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <PauseCircle className="h-5 w-5 text-gray-400" />
                      )}
                      <span>{automation.id.replace('-', ' ').toUpperCase()}</span>
                    </CardTitle>
                    <Badge variant={automation.automation.enabled ? "default" : "secondary"}>
                      {automation.automation.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <CardDescription>
                    Trigger: {automation.automation.trigger}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Actions:</p>
                      <div className="flex flex-wrap gap-1">
                        {automation.automation.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => triggerAutomationMutation.mutate({
                        trigger: automation.automation.trigger,
                        context: { manual: true, timestamp: new Date().toISOString() }
                      })}
                      disabled={!automation.automation.enabled || triggerAutomationMutation.isPending}
                    >
                      Trigger Manually
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution by Category</CardTitle>
                <CardDescription>Distribution of tasks across different business areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboard && Object.entries(dashboard.byCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(category)}
                      <span className="text-sm font-medium capitalize">
                        {category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / dashboard.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Breakdown</CardTitle>
                <CardDescription>Task urgency and priority distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboard && Object.entries(dashboard.byPriority).map(([priority, count]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{priority}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(priority) as any} className="w-16 justify-center">
                        {count}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {Math.round((count / dashboard.total) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}