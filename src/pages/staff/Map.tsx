import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { 
  MapPin, 
  Filter, 
  TrendingUp,
  Layers,
  Search,
  Eye,
  AlertTriangle,
  Activity
} from 'lucide-react';

export default function StaffMap() {
  const { reports } = useReportStore();
  
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    return matchesCategory && matchesStatus && matchesPriority;
  });

  const hotspots = [
    { area: 'Ward 15 - Commercial District', count: 8, severity: 'High' },
    { area: 'Ward 12 - School Zone', count: 5, severity: 'Critical' },
    { area: 'Ward 18 - Residential Area', count: 12, severity: 'Medium' },
    { area: 'Ward 7 - Industrial Zone', count: 3, severity: 'Low' },
  ];

  const stats = {
    total: filteredReports.length,
    critical: filteredReports.filter(r => r.priority === 'Critical').length,
    high: filteredReports.filter(r => r.priority === 'High').length,
    clusters: 4, // Mock cluster count
  };

  return (
    <RoleGuard requiredRole="staff">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Map View</h1>
            <p className="text-muted-foreground">
              City map with clustering and hotspot color scale for efficient issue management
            </p>
          </div>

          {/* Map Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Active Issues</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <AlertTriangle className="h-8 w-8 text-priority-critical mb-2" />
                <div className="text-2xl font-bold">{stats.critical}</div>
                <p className="text-xs text-muted-foreground text-center">Critical</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <TrendingUp className="h-8 w-8 text-priority-high mb-2" />
                <div className="text-2xl font-bold">{stats.high}</div>
                <p className="text-xs text-muted-foreground text-center">High Priority</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Activity className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold">{stats.clusters}</div>
                <p className="text-xs text-muted-foreground text-center">Hot Spots</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map View */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Interactive City Map
                  </CardTitle>
                  <CardDescription>
                    Issues are clustered by location with color-coded severity levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 relative overflow-hidden">
                    {/* Mock map with pins */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                      {/* Mock map pins */}
                      <div className="absolute top-12 left-16 w-4 h-4 bg-priority-critical rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-20 left-32 w-4 h-4 bg-priority-high rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-32 left-20 w-4 h-4 bg-priority-medium rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-40 left-48 w-4 h-4 bg-priority-low rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-24 left-64 w-4 h-4 bg-priority-high rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-48 left-40 w-4 h-4 bg-priority-medium rounded-full border-2 border-white shadow-lg"></div>
                      
                      {/* Cluster indicators */}
                      <div className="absolute top-16 left-24 w-8 h-8 bg-priority-critical/30 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div className="absolute top-36 left-44 w-8 h-8 bg-priority-medium/30 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                    </div>
                    
                    <div className="relative z-10 text-center bg-white/90 dark:bg-gray-900/90 p-6 rounded-lg">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground mb-2">Interactive Map with Live Data</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time clustering, hotspot detection, and routing optimization
                      </p>
                    </div>
                  </div>
                  
                  {/* Map Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Layers className="mr-2 h-4 w-4" />
                        Layers
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-priority-critical rounded-full"></div>
                        <span>Critical</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-priority-high rounded-full"></div>
                        <span>High</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-priority-medium rounded-full"></div>
                        <span>Medium</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-priority-low rounded-full"></div>
                        <span>Low</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Map Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {ISSUE_CATEGORIES.slice(0, 8).map((category) => (
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Hotspots */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Active Hotspots
                  </CardTitle>
                  <CardDescription>
                    Areas with high concentration of issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hotspots.map((hotspot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{hotspot.area}</p>
                        <p className="text-xs text-muted-foreground">{hotspot.count} issues</p>
                      </div>
                      <PriorityBadge priority={hotspot.severity} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Issues in View */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Issues in View
                  </CardTitle>
                  <CardDescription>
                    Latest reports in current map area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-sm truncate">{report.title}</h4>
                        <StatusBadge status={report.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {report.location.address}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {ISSUE_CATEGORIES.find(c => c.id === report.category)?.name}
                        </Badge>
                        <PriorityBadge priority={report.priority} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}