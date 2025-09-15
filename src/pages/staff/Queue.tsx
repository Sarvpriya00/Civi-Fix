import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { useReportStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';
import { ISSUE_CATEGORIES } from '@/lib/categories';
import { toast } from '@/hooks/use-toast';
import { 
  Clock, 
  CheckCircle, 
  MessageSquare,
  Calendar,
  MapPin,
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function StaffQueue() {
  const currentUser = getCurrentUser();
  const { reports, updateReport, addNote } = useReportStore();
  
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [newNote, setNewNote] = useState('');

  const myReports = reports.filter(r => r.assignedTo === currentUser?.id);
  const openReports = myReports.filter(r => r.status !== 'Resolved');
  const completedReports = myReports.filter(r => r.status === 'Resolved');

  const stats = {
    total: myReports.length,
    open: openReports.length,
    inProgress: myReports.filter(r => r.status === 'In-Progress').length,
    completed: completedReports.length,
  };

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    updateReport(reportId, { status: newStatus as any });
    
    toast({
      title: "Status updated",
      description: `Report status changed to ${newStatus}.`,
    });
  };

  const handleAddNote = (reportId: string) => {
    if (!newNote.trim()) return;
    
    addNote(reportId, newNote);
    setNewNote('');
    
    toast({
      title: "Note added",
      description: "Your note has been added to the report.",
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
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">
                {ISSUE_CATEGORIES.find(c => c.id === report.category)?.name}
              </Badge>
              <Badge variant="secondary">
                Votes: {report.upvotes}
              </Badge>
            </div>

            {/* Activity Timeline */}
            {report.notes && report.notes.length > 0 && (
              <div className="bg-muted/50 p-3 rounded-lg mb-4">
                <h4 className="text-sm font-medium mb-2">Latest Updates:</h4>
                <div className="space-y-1">
                  {report.notes.slice(-2).map((note: string, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      • {note}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {report.status !== 'Resolved' && (
            <>
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
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Update Note</DialogTitle>
                    <DialogDescription>
                      Add a note about the progress or actions taken for this report.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="note">Note</Label>
                      <Textarea
                        id="note"
                        placeholder="Describe what actions have been taken..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => selectedReport && handleAddNote(selectedReport.id)}
                        disabled={!newNote.trim()}
                      >
                        Add Note
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
          
          {report.status === 'Resolved' && (
            <Badge className="bg-status-resolved text-white">
              <CheckCircle className="mr-1 h-3 w-3" />
              Completed
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
            <h1 className="text-3xl font-bold mb-2">My Work Queue</h1>
            <p className="text-muted-foreground">
              Manage your assigned reports and track progress from acknowledgment to resolution
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground text-center">Total Assigned</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="w-6 h-6 bg-status-acknowledged rounded-full mb-2"></div>
                <div className="text-2xl font-bold">{stats.open}</div>
                <p className="text-xs text-muted-foreground text-center">Active</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="w-6 h-6 bg-status-in-progress rounded-full mb-2"></div>
                <div className="text-2xl font-bold">{stats.inProgress}</div>
                <p className="text-xs text-muted-foreground text-center">In Progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckCircle className="h-8 w-8 text-status-resolved mb-2" />
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground text-center">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Work Flow */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Workflow Process</CardTitle>
              <CardDescription>Standard process for handling assigned reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-status-acknowledged rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                  <span className="text-sm font-medium">Acknowledge</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-status-in-progress rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                  <span className="text-sm font-medium">Start Work</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                  <span className="text-sm font-medium">Add Updates</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-status-resolved rounded-full flex items-center justify-center text-xs font-bold text-white">4</div>
                  <span className="text-sm font-medium">Mark Resolved</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Reports */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Active Reports ({openReports.length})</h2>
            </div>
            
            <div className="space-y-4">
              {openReports.length > 0 ? (
                openReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No active reports</h3>
                    <p className="text-muted-foreground text-center">
                      All your assigned reports have been completed. Check the inbox for new assignments.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Completed Reports */}
          {completedReports.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recently Completed ({completedReports.length})</h2>
              
              <div className="space-y-4">
                {completedReports.slice(0, 3).map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}