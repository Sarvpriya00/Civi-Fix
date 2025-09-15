import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  TrendingUp,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CitizenMyReports() {
  const currentUser = getCurrentUser();
  const { getReportsByUser } = useReportStore();
  const userReports = currentUser ? getReportsByUser(currentUser.id) : [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredReports = userReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: userReports.length,
    open: userReports.filter(r => r.status === 'Open').length,
    acknowledged: userReports.filter(r => r.status === 'Acknowledged').length,
    inProgress: userReports.filter(r => r.status === 'In-Progress').length,
    resolved: userReports.filter(r => r.status === 'Resolved').length,
  };

  return (
    <RoleGuard requiredRole="citizen">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Reports</h1>
              <p className="text-muted-foreground">
                Track the status and progress of your submitted reports
              </p>
            </div>
            <Link to="/citizen/report">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Report
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <FileText className="h-6 w-6 text-muted-foreground mb-2" />
                <div className="text-xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Total</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="w-3 h-3 bg-status-open rounded-full mb-2"></div>
                <div className="text-xl font-bold">{stats.open}</div>
                <p className="text-xs text-muted-foreground text-center">Open</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="w-3 h-3 bg-status-acknowledged rounded-full mb-2"></div>
                <div className="text-xl font-bold">{stats.acknowledged}</div>
                <p className="text-xs text-muted-foreground text-center">Acknowledged</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="w-3 h-3 bg-status-in-progress rounded-full mb-2"></div>
                <div className="text-xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground text-center">In Progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="w-3 h-3 bg-status-resolved rounded-full mb-2"></div>
                <div className="text-xl font-bold">{stats.resolved}</div>
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
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{report.title}</h3>
                          <StatusBadge status={report.status} />
                          <PriorityBadge priority={report.priority} />
                        </div>
                        
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {report.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                        
                        {report.notes && report.notes.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Latest Update:</p>
                            <p className="text-sm text-muted-foreground">
                              {report.notes[report.notes.length - 1]}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4 text-right">
                        <Badge variant="outline" className="mb-2">
                          {ISSUE_CATEGORIES.find(c => c.id === report.category)?.name}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Updated: {new Date(report.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Votes: {report.upvotes}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    {userReports.length === 0 
                      ? "You haven't submitted any reports yet. Start by reporting your first issue."
                      : "No reports match your current filters. Try adjusting your search criteria."
                    }
                  </p>
                  <Link to="/citizen/report">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Report an Issue
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}