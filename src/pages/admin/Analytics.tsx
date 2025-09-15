import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { useReportStore } from '@/lib/store';
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { 
  BarChart3, 
  TrendingUp, 
  Clock,
  MapPin,
  Calendar,
  Target,
  Users,
  Activity,
  Gauge
} from 'lucide-react';

export default function AdminAnalytics() {
  const { reports } = useReportStore();

  // Mock analytics data - in real app this would come from API
  const monthlyData = [
    { month: 'Jan', reports: 45, resolved: 38 },
    { month: 'Feb', reports: 52, resolved: 44 },
    { month: 'Mar', reports: 61, resolved: 55 },
    { month: 'Apr', reports: 48, resolved: 42 },
    { month: 'May', reports: 67, resolved: 59 },
    { month: 'Jun', reports: 73, resolved: 68 },
  ];

  const responseTimeData = [
    { category: 'Critical', avgTime: 0.8, target: 1.0 },
    { category: 'High', avgTime: 2.1, target: 2.0 },
    { category: 'Medium', avgTime: 4.5, target: 5.0 },
    { category: 'Low', avgTime: 8.2, target: 10.0 },
  ];

  const wardPerformance = [
    { ward: 'Ward 1-5', efficiency: 94, satisfaction: 4.2 },
    { ward: 'Ward 6-10', efficiency: 87, satisfaction: 3.9 },
    { ward: 'Ward 11-15', efficiency: 91, satisfaction: 4.1 },
    { ward: 'Ward 16-20', efficiency: 89, satisfaction: 4.0 },
    { ward: 'Ward 21-25', efficiency: 96, satisfaction: 4.4 },
  ];

  const peakHours = [
    { hour: '8-9 AM', reports: 12 },
    { hour: '12-1 PM', reports: 18 },
    { hour: '5-6 PM', reports: 15 },
    { hour: '7-8 PM', reports: 8 },
  ];

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const totalThisMonth = reports.length;
  const resolvedThisMonth = reports.filter(r => r.status === 'Resolved').length;
  const resolutionRate = totalThisMonth > 0 ? Math.round((resolvedThisMonth / totalThisMonth) * 100) : 0;

  return (
    <RoleGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Deep insights into city operations, trends, and performance metrics
            </p>
          </div>

          {/* Monthly Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {currentMonth} Overview
              </CardTitle>
              <CardDescription>Current month performance snapshot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalThisMonth}</div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-status-resolved">{resolvedThisMonth}</div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{resolutionRate}%</div>
                  <p className="text-sm text-muted-foreground">Resolution Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2.4</div>
                  <p className="text-sm text-muted-foreground">Avg Days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Trends Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Monthly Trends
                </CardTitle>
                <CardDescription>Reports submitted vs resolved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-2">Interactive Chart</p>
                    <p className="text-sm text-muted-foreground">
                      Trends visualization showing reports vs resolutions
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs font-medium">{data.month}</div>
                      <div className="text-xs text-muted-foreground">{data.reports}/{data.resolved}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Times
                </CardTitle>
                <CardDescription>Average response times by priority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responseTimeData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{data.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{data.avgTime}d</span>
                          <Badge 
                            variant={data.avgTime <= data.target ? "default" : "destructive"}
                            className="text-xs"
                          >
                            Target: {data.target}d
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            data.avgTime <= data.target ? 'bg-status-resolved' : 'bg-priority-high'
                          }`}
                          style={{
                            width: `${Math.min((data.avgTime / data.target) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Ward Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ward Performance
                </CardTitle>
                <CardDescription>Efficiency and satisfaction by ward groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wardPerformance.map((ward, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{ward.ward}</span>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary text-white">{ward.efficiency}%</Badge>
                          <Badge variant="outline">{ward.satisfaction}★</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${ward.efficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Peak Activity Hours
                </CardTitle>
                <CardDescription>When citizens report issues most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peakHours.map((peak, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{peak.hour}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${(peak.reports / 18) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-8">{peak.reports}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Category Performance
              </CardTitle>
              <CardDescription>Resolution efficiency by issue category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ISSUE_CATEGORIES.slice(0, 9).map((category) => {
                  const categoryReports = reports.filter(r => r.category === category.id);
                  const resolved = categoryReports.filter(r => r.status === 'Resolved').length;
                  const rate = categoryReports.length > 0 ? Math.round((resolved / categoryReports.length) * 100) : 0;
                  
                  return (
                    <div key={category.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium text-sm mb-2 truncate">{category.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {categoryReports.length} reports
                        </span>
                        <Badge 
                          variant={rate >= 80 ? "default" : rate >= 60 ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {rate}%
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            rate >= 80 ? 'bg-status-resolved' : 
                            rate >= 60 ? 'bg-priority-medium' : 'bg-priority-high'
                          }`}
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Key Insights
              </CardTitle>
              <CardDescription>AI-powered insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-status-resolved/10 border border-status-resolved/20 rounded-lg">
                    <h4 className="font-semibold text-status-resolved mb-2">✓ Strong Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Ward 21-25 maintains 96% efficiency with highest citizen satisfaction (4.4★)
                    </p>
                  </div>
                  
                  <div className="p-4 bg-priority-medium/10 border border-priority-medium/20 rounded-lg">
                    <h4 className="font-semibold text-priority-medium mb-2">⚠ Attention Needed</h4>
                    <p className="text-sm text-muted-foreground">
                      Streetlight issues show longer resolution times during winter months
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">📈 Trending Up</h4>
                    <p className="text-sm text-muted-foreground">
                      Mobile reporting increased 34% this quarter, improving issue detection
                    </p>
                  </div>
                  
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <h4 className="font-semibold text-accent mb-2">💡 Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      Deploy additional staff to Ward 6-10 during peak hours (12-1 PM)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}