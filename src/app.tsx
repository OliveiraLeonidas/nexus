import { ThemeProvider } from "./context/ThemeContext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "./components/auth/AuthContext"
import type { ProtectedRouteProps } from "./types"

//pages routes
import Login from "./pages/Login"
import Index from "./pages/Index"
import NotFound from "./pages/Not-found"

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
        element={<ProtectedRoute element={<Index />} requiredRoles={["admin", "dentist", "patient"]} />} 
      />
      {/* <Route 
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
      /> */}
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}



function App() {
  return (    
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Login></Login>
      {/* <Index /> */}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
  )
}

export default App
