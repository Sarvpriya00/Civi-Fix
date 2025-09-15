// Mock authentication system for demo purposes
export type UserRole = 'citizen' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

// Hardcoded demo users
export const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'John Citizen',
    email: 'citizen@demo.city',
    role: 'citizen',
    avatar: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Sarah Staff',
    email: 'staff@demo.city',
    role: 'staff',
    department: 'Engineering',
    avatar: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@demo.city',
    role: 'admin',
    department: 'City Administration',
    avatar: '/placeholder.svg',
  },
];

const DEMO_PASSWORD = 'demo123';

export interface AuthSession {
  user: User;
  token: string;
}

// Mock authentication functions
export function authenticateUser(email: string, password: string): User | null {
  if (password !== DEMO_PASSWORD) return null;
  
  const user = DEMO_USERS.find(u => u.email === email);
  return user || null;
}

export function saveSession(user: User): void {
  const session: AuthSession = {
    user,
    token: `mock-token-${user.id}`,
  };
  localStorage.setItem('civicfix-session', JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  try {
    const session = localStorage.getItem('civicfix-session');
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem('civicfix-session');
}

export function getCurrentUser(): User | null {
  const session = getSession();
  return session?.user || null;
}

export function requireAuth(requiredRole?: UserRole): User | null {
  const user = getCurrentUser();
  if (!user) return null;
  if (requiredRole && user.role !== requiredRole) return null;
  return user;
}