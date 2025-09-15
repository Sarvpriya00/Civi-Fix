import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { Badge } from '@/components/ui/badge';
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { PRIORITY_THRESHOLDS } from '@/lib/severity';
import { toast } from '@/hooks/use-toast';
import { 
  Settings, 
  Target, 
  Users,
  Bell,
  Database,
  Shield,
  Zap,
  Save,
  Plus,
  Trash2
} from 'lucide-react';

export default function AdminConfig() {
  const [priorityThresholds, setPriorityThresholds] = useState(PRIORITY_THRESHOLDS);
  const [categories, setCategories] = useState(ISSUE_CATEGORIES);
  const [newCategory, setNewCategory] = useState({ name: '', department: '', baseRisk: 50 });
  const [systemSettings, setSystemSettings] = useState({
    autoAssignment: true,
    emailNotifications: true,
    smsNotifications: false,
    responseTimeTargets: {
      critical: 24,
      high: 48,
      medium: 120,
      low: 240,
    },
  });

  const departmentRouting = [
    { category: 'Potholes', department: 'Engineering (Roads)', priority: 'Auto' },
    { category: 'Streetlights', department: 'Electrical', priority: 'Manual' },
    { category: 'Garbage', department: 'SWM Operations', priority: 'Auto' },
    { category: 'Water Issues', department: 'Water Supply', priority: 'Auto' },
  ];

  const handleSavePriorityThresholds = () => {
    // In real app, this would update the database
    toast({
      title: "Priority thresholds updated",
      description: "New priority levels have been applied to the scoring system.",
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.department) {
      toast({
        title: "Invalid category",
        description: "Please provide both name and department.",
        variant: "destructive",
      });
      return;
    }

    const category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory.name,
      department: newCategory.department,
      baseRisk: newCategory.baseRisk,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', department: '', baseRisk: 50 });
    
    toast({
      title: "Category added",
      description: `${newCategory.name} has been added to the system.`,
    });
  };

  const handleRemoveCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
    toast({
      title: "Category removed",
      description: "Category has been removed from the system.",
    });
  };

  const handleSystemSettingChange = (setting: string, value: any) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <RoleGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">System Configuration</h1>
            <p className="text-muted-foreground">
              Configure categories, priority thresholds, and department routing for optimal issue management
            </p>
          </div>

          <Tabs defaultValue="priorities" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="priorities">Priority Levels</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="routing">Department Routing</TabsTrigger>
              <TabsTrigger value="system">System Settings</TabsTrigger>
            </TabsList>

            {/* Priority Thresholds */}
            <TabsContent value="priorities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Priority Thresholds
                  </CardTitle>
                  <CardDescription>
                    Configure score thresholds for automatic priority assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="critical">Critical (Red)</Label>
                        <Input
                          id="critical"
                          type="number"
                          value={priorityThresholds.critical}
                          onChange={(e) => setPriorityThresholds(prev => ({ 
                            ...prev, 
                            critical: parseFloat(e.target.value) 
                          }))}
                          min="0"
                          max="100"
                        />
                        <p className="text-xs text-muted-foreground">
                          Issues scoring above this threshold are marked as Critical
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="high">High (Orange)</Label>
                        <Input
                          id="high"
                          type="number"
                          value={priorityThresholds.high}
                          onChange={(e) => setPriorityThresholds(prev => ({ 
                            ...prev, 
                            high: parseFloat(e.target.value) 
                          }))}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="medium">Medium (Yellow)</Label>
                        <Input
                          id="medium"
                          type="number"
                          value={priorityThresholds.medium}
                          onChange={(e) => setPriorityThresholds(prev => ({ 
                            ...prev, 
                            medium: parseFloat(e.target.value) 
                          }))}
                          min="0"
                          max="100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="low">Low (Green)</Label>
                        <Input
                          id="low"
                          type="number"
                          value={priorityThresholds.low}
                          onChange={(e) => setPriorityThresholds(prev => ({ 
                            ...prev, 
                            low: parseFloat(e.target.value) 
                          }))}
                          min="0"
                          max="100"
                        />
                        <p className="text-xs text-muted-foreground">
                          Issues below Medium threshold are marked as Low
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Configuration</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-priority-critical text-white">
                        Critical: {priorityThresholds.critical}+
                      </Badge>
                      <Badge className="bg-priority-high text-white">
                        High: {priorityThresholds.high}-{priorityThresholds.critical}
                      </Badge>
                      <Badge className="bg-priority-medium text-white">
                        Medium: {priorityThresholds.medium}-{priorityThresholds.high}
                      </Badge>
                      <Badge className="bg-priority-low text-white">
                        Low: 0-{priorityThresholds.medium}
                      </Badge>
                    </div>
                  </div>

                  <Button onClick={handleSavePriorityThresholds}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Priority Thresholds
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Management */}
            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Issue Categories
                  </CardTitle>
                  <CardDescription>
                    Manage issue categories and their base risk scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add New Category */}
                  <div className="mb-6 p-4 border rounded-lg bg-muted/25">
                    <h4 className="font-semibold mb-4">Add New Category</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          placeholder="e.g., Broken Traffic Lights"
                          value={newCategory.name}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="e.g., Traffic Management"
                          value={newCategory.department}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, department: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="baseRisk">Base Risk Score (0-100)</Label>
                        <Input
                          id="baseRisk"
                          type="number"
                          min="0"
                          max="100"
                          value={newCategory.baseRisk}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, baseRisk: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddCategory} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>

                  {/* Existing Categories */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Existing Categories</h4>
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium">{category.name}</h5>
                          <p className="text-sm text-muted-foreground">{category.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Risk: {category.baseRisk}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCategory(category.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Department Routing */}
            <TabsContent value="routing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Department Routing
                  </CardTitle>
                  <CardDescription>
                    Configure how issues are automatically routed to departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentRouting.map((route, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h5 className="font-medium">{route.category}</h5>
                          <p className="text-sm text-muted-foreground">{route.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue={route.priority.toLowerCase()}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto-assign</SelectItem>
                              <SelectItem value="manual">Manual assign</SelectItem>
                            </SelectContent>
                          </Select>
                          <Badge 
                            variant={route.priority === 'Auto' ? 'default' : 'secondary'}
                          >
                            {route.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Automation Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoAssignment">Auto-assignment</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically assign issues to available staff
                        </p>
                      </div>
                      <Switch
                        id="autoAssignment"
                        checked={systemSettings.autoAssignment}
                        onCheckedChange={(checked) => handleSystemSettingChange('autoAssignment', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email updates to citizens and staff
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={systemSettings.emailNotifications}
                        onCheckedChange={(checked) => handleSystemSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send SMS updates for critical issues
                        </p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={systemSettings.smsNotifications}
                        onCheckedChange={(checked) => handleSystemSettingChange('smsNotifications', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Response Time Targets
                    </CardTitle>
                    <CardDescription>
                      Set target response times for each priority level (in hours)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="criticalTarget">Critical Issues</Label>
                      <Input
                        id="criticalTarget"
                        type="number"
                        value={systemSettings.responseTimeTargets.critical}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          responseTimeTargets: {
                            ...prev.responseTimeTargets,
                            critical: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="highTarget">High Priority</Label>
                      <Input
                        id="highTarget"
                        type="number"
                        value={systemSettings.responseTimeTargets.high}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          responseTimeTargets: {
                            ...prev.responseTimeTargets,
                            high: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mediumTarget">Medium Priority</Label>
                      <Input
                        id="mediumTarget"
                        type="number"
                        value={systemSettings.responseTimeTargets.medium}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          responseTimeTargets: {
                            ...prev.responseTimeTargets,
                            medium: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lowTarget">Low Priority</Label>
                      <Input
                        id="lowTarget"
                        type="number"
                        value={systemSettings.responseTimeTargets.low}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          responseTimeTargets: {
                            ...prev.responseTimeTargets,
                            low: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Future Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Advanced Features
                  </CardTitle>
                  <CardDescription>
                    Configure upcoming AI and IoT integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Predictive Analytics</Label>
                          <p className="text-sm text-muted-foreground">
                            AI-powered hotspot prediction
                          </p>
                        </div>
                        <Badge variant="outline">Coming Soon</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>IoT Sensor Integration</Label>
                          <p className="text-sm text-muted-foreground">
                            Smart bin and traffic sensors
                          </p>
                        </div>
                        <Badge variant="outline">Beta</Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Voice Escalation</Label>
                          <p className="text-sm text-muted-foreground">
                            Voice-activated emergency reporting
                          </p>
                        </div>
                        <Badge variant="outline">Planned</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Digital Twin Simulation</Label>
                          <p className="text-sm text-muted-foreground">
                            Virtual city modeling
                          </p>
                        </div>
                        <Badge variant="outline">Research</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  );
}
