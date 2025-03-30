export type UserRole = "admin" | "dentist" | "patient";
export type AppointmentStatus = "all" | "confirmed" | "pending" | "cancelled";

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

// Patient related types
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string | null;
  status: "active" | "inactive";
}

// Appointment related types
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  type: string;
  notes?: string;
}

// Medical record related types
export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  procedureId: string;
  procedureName: string;
  dentistId: string;
  dentistName: string;
  notes: string;
  attachments?: string[];
}

// Procedure related types
export interface Procedure {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

// Prescription related types
export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  medications: Medication[];
  instructions: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

