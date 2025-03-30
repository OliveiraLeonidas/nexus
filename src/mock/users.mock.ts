import { UserRole } from "@/types";


export const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@dental.com",
    password: "password123",
    role: "admin" as UserRole,
    avatar: "",
  },
  {
    id: "2",
    name: "Dr. Smith",
    email: "dentist@dental.com",
    password: "password123",
    role: "dentist" as UserRole,
    avatar: "",
  },
  {
    id: "3",
    name: "John Doe",
    email: "patient@dental.com",
    password: "password123",
    role: "patient" as UserRole,
    avatar: "",
  },
];