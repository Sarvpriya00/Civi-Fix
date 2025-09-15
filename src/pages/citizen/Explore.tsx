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
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { toast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Search, 
  Filter, 
  ThumbsUp,
  Calendar,
  TrendingUp,
  Eye,
  Users
} from 'lucide-react';

export default function CitizenExplore() {
  const { reports, upvoteReport } = useReportStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.location.address?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return b.score - a.score;
        case 'votes':
          return b.upvotes - a.upvotes;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleUpvote = (reportId: string) => {
    upvoteReport(reportId);
    toast({
      title: "Vote added",
      description: "Your support helps prioritize this issue.",
    });
  };

  const stats = {
    total: reports.length,
    highPriority: reports.filter(r => r.priority === 'High' || r.priority === 'Critical').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
    thisWeek: reports.filter(r => {
      const reportDate = new Date(r.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return reportDate >= weekAgo;
    }).length,
  };

  return (
    <RoleGuard requiredRole="citizen">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore Community Issues</h1>
            <p className="text-muted-foreground">
              See what's happening in your community and support other reports
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Eye className="h-6 w-6 text-primary mb-2" />
                <div className="text-xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Total Issues</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <TrendingUp className="h-6 w-6 text-priority-high mb-2" />
                <div className="text-xl font-bold">{stats.highPriority}</div>
                <p className="text-xs text-muted-foreground text-center">High Priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Users className="h-6 w-6 text-status-resolved mb-2" />
                <div className="text-xl font-bold">{stats.resolved}</div>
                <p className="text-xs text-muted-foreground text-center">Resolved</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Calendar className="h-6 w-6 text-accent mb-2" />
                <div className="text-xl font-bold">{stats.thisWeek}</div>
                <p className="text-xs text-muted-foreground text-center">This Week</p>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Community Map
              </CardTitle>
              <CardDescription>
                Interactive map showing all reported issues in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">Interactive Map View</p>
                  <p className="text-sm text-muted-foreground">
                    Map visualization with clustering and hotspot detection coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters and Sort */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter & Sort
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search issues..."
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="priority">Highest Priority</SelectItem>
                      <SelectItem value="votes">Most Voted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
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
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {ISSUE_CATEGORIES.find(c => c.id === report.category)?.name}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpvote(report.id)}
                            className="flex items-center gap-1"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            {report.upvotes}
                          </Button>
                        </div>
                      </div>
                      
                      {report.photoUrl && (
                        <div className="ml-4">
                          <img
                            src={report.photoUrl}
                            alt="Issue photo"
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Eye className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No issues found</h3>
                  <p className="text-muted-foreground text-center">
                    No issues match your current filters. Try adjusting your search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}