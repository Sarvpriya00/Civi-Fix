import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { useReportStore } from '@/lib/store';
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Activity,
  Target,
  Zap,
  Brain
} from 'lucide-react';

export default function AdminDashboard() {
  const { reports } = useReportStore();

  // Calculate analytics
  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved').length;
  const openReports = reports.filter(r => r.status === 'Open').length;
  const criticalReports = reports.filter(r => r.priority === 'Critical').length;
  
  const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;
  const avgResponseTime = 2.4; // Mock average response time in days
  
  // Category breakdown
  const categoryStats = ISSUE_CATEGORIES.slice(0, 8).map(category => {
    const categoryReports = reports.filter(r => r.category === category.id);
    return {
      ...category,
      count: categoryReports.length,
      resolved: categoryReports.filter(r => r.status === 'Resolved').length,
    };
  }).sort((a, b) => b.count - a.count);

  // Ward/location hotspots (mock data)
  const wardHotspots = [
    { ward: 'Ward 15', issues: 8, priority: 'High' },
    { ward: 'Ward 12', issues: 5, priority: 'Critical' },
    { ward: 'Ward 18', issues: 12, priority: 'Medium' },
    { ward: 'Ward 7', issues: 3, priority: 'Low' },
    { ward: 'Ward 22', issues: 6, priority: 'High' },
  ];

  // Recent trends (mock data)
  const weeklyTrends = {
    newReports: 23,
    resolved: 18,
    improvement: '+12%',
  };

  return (
    <RoleGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
            <p className="text-muted-foreground">
              Understand trends, hotspots, and response times to improve service delivery
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">{totalReports}</div>
                <p className="text-xs text-muted-foreground text-center">Total Reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckCircle className="h-8 w-8 text-status-resolved mb-2" />
                <div className="text-2xl font-bold">{resolutionRate}%</div>
                <p className="text-xs text-muted-foreground text-center">Resolution Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold">{avgResponseTime}d</div>
                <p className="text-xs text-muted-foreground text-center">Avg Response</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertTriangle className="h-8 w-8 text-priority-critical mb-2" />
                <div className="text-2xl font-bold">{criticalReports}</div>
                <p className="text-xs text-muted-foreground text-center">Critical Issues</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Category Mix
                </CardTitle>
                <CardDescription>Most reported issue categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryStats.slice(0, 6).map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${totalReports > 0 ? (category.count / totalReports) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ward Hotspots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ward Hotspots
                </CardTitle>
                <CardDescription>Areas requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {wardHotspots.map((ward, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{ward.ward}</p>
                        <p className="text-sm text-muted-foreground">{ward.issues} active issues</p>
                      </div>
                      <Badge 
                        className={
                          ward.priority === 'Critical' ? 'bg-priority-critical text-white' :
                          ward.priority === 'High' ? 'bg-priority-high text-white' :
                          ward.priority === 'Medium' ? 'bg-priority-medium text-white' :
                          'bg-priority-low text-white'
                        }
                      >
                        {ward.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Weekly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">New Reports</span>
                    <span className="font-bold">{weeklyTrends.newReports}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolved</span>
                    <span className="font-bold">{weeklyTrends.resolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Improvement</span>
                    <Badge className="bg-status-resolved text-white">
                      {weeklyTrends.improvement}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Staff Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Staff</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Load</span>
                    <span className="font-bold">3.2 issues</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Efficiency</span>
                    <Badge className="bg-accent text-white">94%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="font-bold">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="font-bold">145ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-status-resolved text-white">Healthy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Future Features */}
          <Card>
            <CardHeader>
              <CardTitle>Future-Ready Features</CardTitle>
              <CardDescription>Advanced capabilities coming to CivicFix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Predictive Analytics</h3>
                  <p className="text-sm text-muted-foreground">AI-powered hotspot detection</p>
                  <Badge variant="outline" className="mt-2">Coming Soon</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <Zap className="h-8 w-8 text-accent mb-2" />
                  <h3 className="font-semibold mb-1">IoT Integration</h3>
                  <p className="text-sm text-muted-foreground">Smart sensor data ingestion</p>
                  <Badge variant="outline" className="mt-2">Beta</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <Activity className="h-8 w-8 text-priority-high mb-2" />
                  <h3 className="font-semibold mb-1">Digital Twin</h3>
                  <p className="text-sm text-muted-foreground">Virtual city simulation</p>
                  <Badge variant="outline" className="mt-2">Planned</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <MapPin className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Open Data API</h3>
                  <p className="text-sm text-muted-foreground">Public transparency portal</p>
                  <Badge variant="outline" className="mt-2">In Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}