import { Patient, Appointment, MedicalRecord, Procedure, Prescription, User } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@dentalcare.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Dr. Smith",
    email: "smith@dentalcare.com",
    role: "dentist",
  },
  {
    id: "3",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "patient",
  }
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "May 12, 2023",
    nextAppointment: "Jun 15, 2023",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    lastVisit: "Apr 23, 2023",
    nextAppointment: "Jun 10, 2023",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 456-7890",
    lastVisit: "Jun 05, 2023",
    nextAppointment: "Jun 12, 2023",
    status: "active",
  },
  {
    id: "4",
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    phone: "+1 (555) 789-0123",
    lastVisit: "May 28, 2023",
    nextAppointment: "Jun 20, 2023",
    status: "inactive",
  },
  {
    id: "5",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "+1 (555) 234-5678",
    lastVisit: "Jun 02, 2023",
    nextAppointment: null,
    status: "inactive",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 345-6789",
    lastVisit: "May 15, 2023",
    nextAppointment: "Jun 18, 2023",
    status: "active",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 567-8901",
    lastVisit: "Apr 30, 2023",
    nextAppointment: "Jun 25, 2023",
    status: "active",
  },
  {
    id: "8",
    name: "Jessica White",
    email: "jessica.white@example.com",
    phone: "+1 (555) 678-9012",
    lastVisit: "May 25, 2023",
    nextAppointment: null,
    status: "inactive",
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "James Wilson",
    dentistId: "101",
    dentistName: "Dr. Sarah Johnson",
    date: "2023-06-15",
    time: "09:00",
    duration: 30,
    status: "scheduled",
    type: "Check-up",
    notes: "Regular 6-month check-up",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    dentistId: "102",
    dentistName: "Dr. Michael Chen",
    date: "2023-06-10",
    time: "14:30",
    duration: 60,
    status: "confirmed",
    type: "Root Canal",
    notes: "Patient reported sensitivity to cold",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Michael Brown",
    dentistId: "101",
    dentistName: "Dr. Sarah Johnson",
    date: "2023-06-12",
    time: "11:15",
    duration: 45,
    status: "scheduled",
    type: "Filling",
    notes: "Cavity on lower right molar",
  }
];

// Mock Procedures
export const mockProcedures: Procedure[] = [
  {
    id: "1",
    name: "Dental Check-up",
    description: "Comprehensive dental examination and cleaning",
    price: 75,
    duration: 30,
    category: "Preventive",
  },
  {
    id: "2",
    name: "Teeth Whitening",
    description: "Professional teeth whitening treatment",
    price: 250,
    duration: 60,
    category: "Cosmetic",
  },
  {
    id: "3",
    name: "Dental Filling",
    description: "Filling for cavities or tooth decay",
    price: 120,
    duration: 45,
    category: "Restorative",
  },
  {
    id: "4",
    name: "Root Canal Treatment",
    description: "Procedure to treat infected tooth pulp",
    price: 800,
    duration: 90,
    category: "Endodontic",
  },
  {
    id: "5",
    name: "Tooth Extraction",
    description: "Removal of a tooth",
    price: 150,
    duration: 30,
    category: "Oral Surgery",
  }
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "James Wilson",
    date: "2023-05-12",
    procedureId: "1",
    procedureName: "Dental Check-up",
    dentistId: "101",
    dentistName: "Dr. Sarah Johnson",
    notes: "Regular check-up completed. No issues found.",
    attachments: ["xray-20230512.jpg"]
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    date: "2023-04-23",
    procedureId: "3",
    procedureName: "Dental Filling",
    dentistId: "102",
    dentistName: "Dr. Michael Chen",
    notes: "Filled cavity on upper left molar. Patient tolerated procedure well.",
    attachments: ["xray-20230423.jpg", "treatment-plan.pdf"]
  }
];

// Mock Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "James Wilson",
    dentistId: "101",
    dentistName: "Dr. Sarah Johnson",
    date: "2023-05-12",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days"
      }
    ],
    instructions: "Take with food. Complete the full course."
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    dentistId: "102",
    dentistName: "Dr. Michael Chen",
    date: "2023-04-23",
    medications: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed for pain, not exceeding 3 times daily",
        duration: "5 days"
      },
      {
        name: "Chlorhexidine Mouthwash",
        dosage: "10ml",
        frequency: "Twice daily",
        duration: "10 days"
      }
    ],
    instructions: "Rinse with mouthwash after brushing. Do not eat or drink for 30 minutes after using mouthwash."
  }
];
