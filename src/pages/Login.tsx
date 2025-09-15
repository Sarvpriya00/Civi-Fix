import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/ui/navigation';
import { authenticateUser, saveSession } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = authenticateUser(email, password);
      
      if (!user) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        });
        return;
      }

      saveSession(user);
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
      });

      // Redirect based on role
      switch (user.role) {
        case 'citizen':
          navigate('/citizen');
          break;
        case 'staff':
          navigate('/staff');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Welcome to CivicFix</CardTitle>
              <CardDescription>
                Sign in to report issues and track their resolution
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 border-t pt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  <strong>Demo Accounts:</strong>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Citizen:</strong><br />
                      citizen@demo.city
                    </div>
                    <div>
                      <strong>Staff:</strong><br />
                      staff@demo.city
                    </div>
                  </div>
                  <div>
                    <strong>Admin:</strong> admin@demo.city
                  </div>
                  <div className="mt-2">
                    <strong>Password:</strong> demo123 (for all accounts)
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/about" className="text-primary hover:underline">
                  Learn more about CivicFix
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}