import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/ui/navigation';
import { 
  MapPin, 
  Camera, 
  Clock, 
  Shield, 
  Users, 
  CheckCircle,
  FileText,
  TrendingUp,
  Heart
} from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Report. Track. Resolve.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A citizen‑powered way to fix everyday civic issues—fast, transparent, and accountable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/citizen/report">
              <Button size="lg" className="w-full sm:w-auto">
                <FileText className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/citizen/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Issues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How CivicFix Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Mobile‑first Reporting</CardTitle>
                <CardDescription>
                  Report issues with photos and location tagging directly from your phone
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Live Map View</CardTitle>
                <CardDescription>
                  See what's happening in your community with real-time issue tracking
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Transparent Updates</CardTitle>
                <CardDescription>
                  Track progress from acknowledgment to resolution with full transparency
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Common Issue Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Potholes', icon: '🕳️' },
              { name: 'Streetlights', icon: '💡' },
              { name: 'Garbage', icon: '🗑️' },
              { name: 'Water Issues', icon: '💧' },
              { name: 'Parks', icon: '🌳' },
              { name: 'Roads', icon: '🛣️' },
              { name: 'Sewerage', icon: '🚰' },
              { name: 'Public Health', icon: '🏥' },
            ].map((category) => (
              <Card key={category.name} className="text-center p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="font-medium">{category.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Placeholder */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Live Community Map</h2>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Interactive map showing active issues</p>
              <p className="text-sm text-muted-foreground mt-2">Coming soon in the full version</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">1,247</div>
              <p className="opacity-90">Issues Resolved</p>
            </div>
            <div>
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">5,623</div>
              <p className="opacity-90">Active Citizens</p>
            </div>
            <div>
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">94%</div>
              <p className="opacity-90">Resolution Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold">CivicFix</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built for accountability and engagement—together, cities get better.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Citizens</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/citizen/report" className="hover:text-foreground">Report Issue</Link></li>
                <li><Link to="/citizen/explore" className="hover:text-foreground">Explore</Link></li>
                <li><Link to="/help" className="hover:text-foreground">Help</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Municipality</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/staff" className="hover:text-foreground">Staff Dashboard</Link></li>
                <li><Link to="/admin" className="hover:text-foreground">Admin Panel</Link></li>
                <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link to="/help" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for better cities
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}