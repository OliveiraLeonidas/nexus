import { ThemeProvider } from "./context/ThemeContext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "./components/auth/AuthContext"
import { ProtectedRouteProps } from "./types"
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { TooltipProvider } from "./components/ui/tooltip"
import { Toaster } from "./components/ui/toaster"
import {Toaster as Sonner} from '@/components/ui/sonner'

//pages routes
import Login from "./pages/Login"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Settings from "./pages/Settings"
import Appointments from "./pages/Appointments"
import Patients from "./pages/Patients"
import Prescriptions from "./pages/Prescription"
import Procedures from "./pages/Procedures"
import Records from "./pages/Records"
import Dashboard from "./pages/Dashboard"

const queryClient = new QueryClient()

const ProtectedRoute = ({ element, requiredRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(requiredRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{element}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<Dashboard />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      <Route 
        path="/patients" 
        element={<ProtectedRoute element={<Patients />} requiredRoles={["admin", "dentist"]} />} 
      />
      <Route 
        path="/patients/:patientId" 
        element={<ProtectedRoute element={<Patients />} requiredRoles={["admin", "dentist"]} />} 
      />
      <Route 
        path="/appointments" 
        element={<ProtectedRoute element={<Appointments />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      <Route 
        path="/appointments/new" 
        element={<ProtectedRoute element={<Appointments />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      <Route 
        path="/records" 
        element={<ProtectedRoute element={<Records />} requiredRoles={["admin", "dentist"]} />} 
      />
      <Route 
        path="/records/:patientId" 
        element={<ProtectedRoute element={<Records />} requiredRoles={["admin", "dentist"]} />} 
      />
      <Route 
        path="/procedures" 
        element={<ProtectedRoute element={<Procedures />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      <Route 
        path="/prescriptions" 
        element={<ProtectedRoute element={<Prescriptions />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      <Route 
        path="/settings" 
        element={<ProtectedRoute element={<Settings />} requiredRoles={["admin"]} />} 
      />
      
      {/*not found route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      < Sonner/>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes/>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
