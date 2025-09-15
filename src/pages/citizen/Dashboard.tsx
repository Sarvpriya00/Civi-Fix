import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { useReportStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';
import { 
  FileText, 
  MapPin, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function CitizenDashboard() {
  const currentUser = getCurrentUser();
  const { reports, getReportsByUser } = useReportStore();
  const userReports = currentUser ? getReportsByUser(currentUser.id) : [];
  
  const stats = {
    total: userReports.length,
    open: userReports.filter(r => r.status === 'Open').length,
    inProgress: userReports.filter(r => r.status === 'In-Progress').length,
    resolved: userReports.filter(r => r.status === 'Resolved').length,
  };

  const recentReports = userReports.slice(0, 3);

  return (
    <RoleGuard requiredRole="citizen">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentUser?.name}!
            </h1>
            <p className="text-muted-foreground">
              Track your reports and make your community better.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Report an Issue
                </CardTitle>
                <CardDescription>
                  Tell us what's wrong: pick a category, add a photo, and describe the issue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/citizen/report">
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Start New Report
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Explore Issues
                </CardTitle>
                <CardDescription>
                  See what's happening in your community and support other reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/citizen/explore">
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Explore Community
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Total Reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertCircle className="h-8 w-8 text-status-open mb-2" />
                <div className="text-2xl font-bold">{stats.open}</div>
                <p className="text-xs text-muted-foreground text-center">Open</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-8 w-8 text-status-in-progress mb-2" />
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground text-center">In Progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckCircle className="h-8 w-8 text-status-resolved mb-2" />
                <div className="text-2xl font-bold">{stats.resolved}</div>
                <p className="text-xs text-muted-foreground text-center">Resolved</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Your latest issue reports</CardDescription>
              </div>
              <Link to="/citizen/my-reports">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentReports.length > 0 ? (
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.location.address}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <StatusBadge status={report.status} />
                          <PriorityBadge priority={report.priority} />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm font-medium">
                          Score: {report.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reports yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by reporting your first issue to help improve your community.
                  </p>
                  <Link to="/citizen/report">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Report
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
}