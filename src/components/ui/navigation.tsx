import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getCurrentUser, clearSession, UserRole } from '@/lib/auth';
import { 
  Home, 
  MapPin, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    clearSession();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of CivicFix.",
    });
    window.location.href = '/';
  };

  const getRoleLinks = (role: UserRole) => {
    switch (role) {
      case 'citizen':
        return [
          { href: '/citizen', label: 'Dashboard', icon: Home },
          { href: '/citizen/report', label: 'Report Issue', icon: FileText },
          { href: '/citizen/my-reports', label: 'My Reports', icon: FileText },
          { href: '/citizen/explore', label: 'Explore', icon: MapPin },
        ];
      case 'staff':
        return [
          { href: '/staff', label: 'Dashboard', icon: Home },
          { href: '/staff/map', label: 'Map View', icon: MapPin },
          { href: '/staff/queue', label: 'My Queue', icon: FileText },
        ];
      case 'admin':
        return [
          { href: '/admin', label: 'Overview', icon: Home },
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/admin/config', label: 'Config', icon: Settings },
        ];
      default:
        return [];
    }
  };

  if (!user) {
    return (
      <nav className={`flex items-center justify-between p-4 border-b bg-card ${className}`}>
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">CivicFix</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </nav>
    );
  }

  const roleLinks = getRoleLinks(user.role);

  return (
    <nav className={`flex items-center justify-between p-4 border-b bg-card ${className}`}>
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">CivicFix</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          {roleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href}>
                <Button 
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Badge variant="secondary" className="capitalize">
          {user.role}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            
            {/* Mobile menu items */}
            <div className="md:hidden">
              {roleLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
            </div>
            
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}