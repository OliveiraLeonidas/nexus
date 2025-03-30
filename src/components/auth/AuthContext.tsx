import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AuthContextType, User, UserRole } from '@/types'
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '@/mock/users.mock';
import { toast } from 'sonner';
import { InvalidCredentialsError } from '@/errors/invalid-credentials';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //check if user is logged
    const loggedUser = localStorage.getItem("nexus_user");

    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (error) {
        console.error('Failed to parse: ', error);
        localStorage.removeItem("nexus_user")
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const foundUser = MOCK_USERS.find(
        (user) => user.email == email && user.password === password);

      if (!foundUser) {
        throw new InvalidCredentialsError();
      }

      const {password: _, ...newUser} = foundUser;
      setUser(newUser);
      localStorage.setItem("nexus_user", JSON.stringify(newUser));

      toast.success(`Bem vindo novamente, ${newUser.name}!`);

      navigate('/dashboard')
    } catch (error) {
      console.timeLog('Login failed: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus_user");
    toast.info("Você foi deslogado");
    navigate('/login');
  }

  const hasPermission = (requiredRoles: UserRole[]) => {
    if(!user) return false;

    return requiredRoles.includes(user.role);
  }

  return (
    <AuthContext.Provider
    value={{
      user, isLoading,
      login, logout,
      isAuthenticated: !!user,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined){
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}

