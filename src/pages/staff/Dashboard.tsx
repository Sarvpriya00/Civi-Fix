import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { useReportStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { toast } from '@/hooks/use-toast';
import { 
  Inbox, 
  Users, 
  Filter, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  MapPin,
  Calendar
} from 'lucide-react';

export default function StaffDashboard() {
  const currentUser = getCurrentUser();
  const { reports, updateReport } = useReportStore();
  
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const inboxReports = filteredReports.filter(r => r.status === 'Open');
  const assignedReports = filteredReports.filter(r => r.assignedTo === currentUser?.id);
  const allReports = filteredReports.sort((a, b) => b.score - a.score);

  const stats = {
    total: reports.length,
    open: reports.filter(r => r.status === 'Open').length,
    assigned: reports.filter(r => r.assignedTo === currentUser?.id).length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  };

  const handleAssign = (reportId: string) => {
    if (!currentUser) return;
    
    updateReport(reportId, {
      assignedTo: currentUser.id,
      status: 'Acknowledged',
    });
    
    toast({
      title: "Report assigned",
      description: "You are now responsible for this issue.",
    });
  };

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    updateReport(reportId, { status: newStatus as any });
    
    toast({
      title: "Status updated",
      description: `Report status changed to ${newStatus}.`,
    });
  };

  const ReportCard = ({ report }: { report: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <StatusBadge status={report.status} />
              <PriorityBadge priority={report.priority} />
            </div>
            
            <p className="text-muted-foreground mb-3 line-clamp-2">
              {report.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {report.location.address}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(report.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Score: {report.score}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">
                {ISSUE_CATEGORIES.find(c => c.id === report.category)?.name}
              </Badge>
              <Badge variant="secondary">
                Votes: {report.upvotes}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {report.assignedTo === currentUser?.id ? (
            <div className="flex items-center gap-2">
              <Badge className="bg-primary">Assigned to you</Badge>
              {report.status !== 'Resolved' && (
                <Select
                  defaultValue={report.status}
                  onValueChange={(value) => handleStatusUpdate(report.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="In-Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ) : !report.assignedTo && report.status === 'Open' ? (
            <Button
              onClick={() => handleAssign(report.id)}
              size="sm"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Assign to Me
            </Button>
          ) : (
            <Badge variant="outline">
              {report.assignedTo ? 'Assigned to another staff' : 'Unassigned'}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <RoleGuard requiredRole="staff">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Triage and assign with one click—filter by category, severity, and location.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Inbox className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Total Reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertTriangle className="h-8 w-8 text-status-open mb-2" />
                <div className="text-2xl font-bold">{stats.open}</div>
                <p className="text-xs text-muted-foreground text-center">Open Issues</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-8 w-8 text-status-in-progress mb-2" />
                <div className="text-2xl font-bold">{stats.assigned}</div>
                <p className="text-xs text-muted-foreground text-center">Assigned to Me</p>
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

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {ISSUE_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="In-Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inbox">
                Inbox ({inboxReports.length})
              </TabsTrigger>
              <TabsTrigger value="assigned">
                My Queue ({assignedReports.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All Reports ({allReports.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inbox" className="space-y-4">
              {inboxReports.length > 0 ? (
                inboxReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No open reports</h3>
                    <p className="text-muted-foreground text-center">
                      All reports have been assigned or resolved. Great work!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="assigned" className="space-y-4">
              {assignedReports.length > 0 ? (
                assignedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No assigned reports</h3>
                    <p className="text-muted-foreground text-center">
                      Assign yourself to open reports to start working on them.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              {allReports.length > 0 ? (
                allReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                    <p className="text-muted-foreground text-center">
                      No reports match your current filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  );
}