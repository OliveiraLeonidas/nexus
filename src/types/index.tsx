export type UserRole = "admin" | "dentist" | "patient"

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

// ProtectedRoute component to handle role-based access control
export interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRoles: UserRole[];
}

