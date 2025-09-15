import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/ui/navigation';
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Heart,
  CheckCircle,
  FileText,
  Settings
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">About CivicFix</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This platform connects citizens and municipalities to prioritize and resolve issues efficiently.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              CivicFix bridges the gap between citizens and municipal authorities by providing 
              a transparent, efficient platform for reporting and resolving civic issues. 
              We believe that every citizen's voice matters and that technology can make 
              municipal governance more responsive and accountable.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>1. Report</CardTitle>
                <CardDescription>
                  Citizens report issues with photos, location, and detailed descriptions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Settings className="h-12 w-12 text-accent mb-4" />
                <CardTitle>2. Triage</CardTitle>
                <CardDescription>
                  Municipal staff prioritize, assign, and manage reported issues efficiently
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-priority-resolved mb-4" />
                <CardTitle>3. Resolve</CardTitle>
                <CardDescription>
                  Transparent tracking from acknowledgment to resolution with regular updates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Location-Based Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatic location tagging and map-based visualization of issues 
                  helps identify hotspots and patterns in your community.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Smart Prioritization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered severity scoring considers multiple factors including 
                  location, public safety, and community impact.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Transparent Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time status updates and timeline tracking ensure citizens 
                  stay informed throughout the resolution process.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Community Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Citizens can vote on issues, add comments, and collaborate 
                  to build stronger, more responsive communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="text-center">Our Impact</CardTitle>
            <CardDescription className="text-center">
              Making cities more responsive, one issue at a time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1,247</div>
                <p className="text-sm text-muted-foreground">Issues Resolved</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">5,623</div>
                <p className="text-sm text-muted-foreground">Active Citizens</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-priority-resolved mb-2">94%</div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of citizens and municipal workers making cities better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/citizen/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Issues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}