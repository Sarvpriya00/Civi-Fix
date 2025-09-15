import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, UserRole } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function RoleGuard({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: RoleGuardProps) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate(redirectTo);
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      toast({
        title: "Access denied",
        description: `This page requires ${requiredRole} role.`,
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [user, requiredRole, navigate, redirectTo]);

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}