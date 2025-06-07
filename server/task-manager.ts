import type { Request, Response } from 'express';

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

interface TaskAutomation {
  trigger: 'form_submission' | 'hourly' | 'daily' | 'weekly' | 'manual';
  condition?: any;
  actions: string[];
  enabled: boolean;
}

export class RealEstateTaskManager {
  private tasks: Map<string, Task> = new Map();
  private automations: Map<string, TaskAutomation> = new Map();

  constructor() {
    this.initializeDefaultTasks();
    this.initializeAutomations();
  }

  private initializeDefaultTasks() {
    const defaultTasks: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: "Monitor Property Listing Performance",
        description: "Track response times and user engagement on property pages",
        category: "performance-monitoring",
        priority: "high",
        status: "pending"
      },
      {
        title: "Optimize Skye Canyon SEO Rankings",
        description: "Maintain top 3 Google rankings for 'Skye Canyon homes for sale'",
        category: "seo-optimization", 
        priority: "critical",
        status: "in-progress"
      },
      {
        title: "Sync Follow Up Boss CRM Data",
        description: "Automate lead synchronization with Follow Up Boss API",
        category: "crm-sync",
        priority: "high",
        status: "pending",
        metadata: { apiStatus: "requires_renewal" }
      },
      {
        title: "AI Lead Scoring Enhancement",
        description: "Improve lead quality scoring algorithm for better conversion",
        category: "ai-integration",
        priority: "medium",
        status: "completed"
      },
      {
        title: "Voice Search Conversion Optimization",
        description: "Track and optimize voice search to RealScout conversions",
        category: "lead-generation",
        priority: "high",
        status: "in-progress"
      }
    ];

    defaultTasks.forEach((taskData, index) => {
      const task: Task = {
        ...taskData,
        id: `task-${Date.now()}-${index}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.tasks.set(task.id, task);
    });
  }

  private initializeAutomations() {
    const automations: Array<{id: string, automation: TaskAutomation}> = [
      {
        id: "lead-capture-workflow",
        automation: {
          trigger: "form_submission",
          actions: ["ai_scoring", "crm_sync", "notification"],
          enabled: true
        }
      },
      {
        id: "property-updates",
        automation: {
          trigger: "hourly",
          actions: ["cache_refresh", "sitemap_update"],
          enabled: true
        }
      },
      {
        id: "performance-audit",
        automation: {
          trigger: "daily",
          actions: ["response_time_check", "seo_audit", "error_monitoring"],
          enabled: true
        }
      }
    ];

    automations.forEach(({id, automation}) => {
      this.automations.set(id, automation);
    });
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const task: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.tasks.set(task.id, task);
    return task;
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const task = this.tasks.get(id);
    if (!task) return null;

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  getTasks(filters?: {
    category?: Task['category'];
    priority?: Task['priority'];
    status?: Task['status'];
  }): Task[] {
    let tasks = Array.from(this.tasks.values());

    if (filters) {
      if (filters.category) {
        tasks = tasks.filter(task => task.category === filters.category);
      }
      if (filters.priority) {
        tasks = tasks.filter(task => task.priority === filters.priority);
      }
      if (filters.status) {
        tasks = tasks.filter(task => task.status === filters.status);
      }
    }

    return tasks.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  getTask(id: string): Task | null {
    return this.tasks.get(id) || null;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  getAutomations(): Array<{id: string, automation: TaskAutomation}> {
    return Array.from(this.automations.entries()).map(([id, automation]) => ({
      id,
      automation
    }));
  }

  updateAutomation(id: string, updates: Partial<TaskAutomation>): boolean {
    const automation = this.automations.get(id);
    if (!automation) return false;

    this.automations.set(id, { ...automation, ...updates });
    return true;
  }

  triggerAutomation(trigger: TaskAutomation['trigger'], context?: any): void {
    const relevantAutomations = Array.from(this.automations.entries())
      .filter(([_, automation]) => automation.trigger === trigger && automation.enabled);

    relevantAutomations.forEach(([id, automation]) => {
      this.executeAutomation(id, automation, context);
    });
  }

  private async executeAutomation(id: string, automation: TaskAutomation, context?: any): Promise<void> {
    console.log(`Executing automation: ${id}`);
    
    for (const action of automation.actions) {
      try {
        await this.executeAction(action, context);
      } catch (error) {
        console.error(`Failed to execute action ${action} in automation ${id}:`, error);
      }
    }
  }

  private async executeAction(action: string, context?: any): Promise<void> {
    switch (action) {
      case 'ai_scoring':
        // AI lead scoring logic would go here
        console.log('Executing AI lead scoring');
        break;
      case 'crm_sync':
        // Follow Up Boss sync logic would go here
        console.log('Executing CRM synchronization');
        break;
      case 'notification':
        // Notification logic would go here
        console.log('Sending notification');
        break;
      case 'cache_refresh':
        // Cache refresh logic would go here
        console.log('Refreshing cache');
        break;
      case 'sitemap_update':
        // Sitemap update logic would go here
        console.log('Updating sitemap');
        break;
      case 'response_time_check':
        // Performance monitoring logic would go here
        console.log('Checking response times');
        break;
      case 'seo_audit':
        // SEO audit logic would go here
        console.log('Running SEO audit');
        break;
      case 'error_monitoring':
        // Error monitoring logic would go here
        console.log('Monitoring for errors');
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  getDashboardSummary() {
    const tasks = this.getTasks();
    const summary = {
      total: tasks.length,
      byStatus: {
        pending: tasks.filter(t => t.status === 'pending').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        failed: tasks.filter(t => t.status === 'failed').length
      },
      byPriority: {
        critical: tasks.filter(t => t.priority === 'critical').length,
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      },
      byCategory: {
        'property-management': tasks.filter(t => t.category === 'property-management').length,
        'lead-generation': tasks.filter(t => t.category === 'lead-generation').length,
        'seo-optimization': tasks.filter(t => t.category === 'seo-optimization').length,
        'performance-monitoring': tasks.filter(t => t.category === 'performance-monitoring').length,
        'ai-integration': tasks.filter(t => t.category === 'ai-integration').length,
        'crm-sync': tasks.filter(t => t.category === 'crm-sync').length
      },
      automations: {
        total: this.automations.size,
        enabled: Array.from(this.automations.values()).filter(a => a.enabled).length
      }
    };

    return summary;
  }
}

export const taskManager = new RealEstateTaskManager();

// API endpoints
export async function handleGetTasks(req: Request, res: Response) {
  try {
    const { category, priority, status } = req.query;
    const filters: any = {};
    
    if (category) filters.category = category;
    if (priority) filters.priority = priority;
    if (status) filters.status = status;

    const tasks = taskManager.getTasks(filters);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export async function handleCreateTask(req: Request, res: Response) {
  try {
    const task = taskManager.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
}

export async function handleUpdateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = taskManager.updateTask(id, req.body);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
}

export async function handleDeleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = taskManager.deleteTask(id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
}

export async function handleGetTaskDashboard(req: Request, res: Response) {
  try {
    const summary = taskManager.getDashboardSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task dashboard" });
  }
}

export async function handleGetAutomations(req: Request, res: Response) {
  try {
    const automations = taskManager.getAutomations();
    res.json(automations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch automations" });
  }
}

export async function handleTriggerAutomation(req: Request, res: Response) {
  try {
    const { trigger, context } = req.body;
    taskManager.triggerAutomation(trigger, context);
    res.json({ message: "Automation triggered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to trigger automation" });
  }
}