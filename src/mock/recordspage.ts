// Mock data
export const patients = [
  {
    id: "1",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-05-15",
    gender: "Male",
    address: "123 Main St, Anytown, CA 91234",
    medicalHistory: [
      { condition: "Hypertension", status: "Controlled with medication" },
      { condition: "Allergies", status: "Penicillin" },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "1990-03-22",
    gender: "Female",
    address: "456 Oak Ave, Somecity, CA 92345",
    medicalHistory: [
      { condition: "Asthma", status: "Mild, controlled" },
      { condition: "Allergies", status: "None" },
    ],
  },
];

export const records = [
  {
    id: "1",
    patientId: "1",
    date: "2023-05-12",
    type: "Check-up",
    dentist: "Dr. Smith",
    notes: "Regular check-up. Patient reports no issues. Teeth appear healthy with minimal plaque buildup. Advised to continue good oral hygiene practices.",
    procedures: ["Dental Examination", "Teeth Cleaning"],
    attachments: [
      { id: "a1", name: "x-ray-front.jpg", type: "image" },
      { id: "a2", name: "treatment-plan.pdf", type: "document" },
    ],
  },
  {
    id: "2",
    patientId: "1",
    date: "2023-03-30",
    type: "Treatment",
    dentist: "Dr. Johnson",
    notes: "Filled cavity on lower right molar. Patient tolerated procedure well. No complications.",
    procedures: ["Cavity Filling"],
    attachments: [
      { id: "a3", name: "cavity-x-ray.jpg", type: "image" },
    ],
  },
  {
    id: "3",
    patientId: "1",
    date: "2022-12-15",
    type: "Check-up",
    dentist: "Dr. Smith",
    notes: "Annual check-up. Identified early signs of cavity on lower right molar. Recommended treatment at next visit.",
    procedures: ["Dental Examination", "Teeth Cleaning"],
    attachments: [
      { id: "a4", name: "annual-x-ray.jpg", type: "image" },
      { id: "a5", name: "checkup-report.pdf", type: "document" },
    ],
  },
];

export const RecordsPrescriptions = [
  {
    id: "1",
    patientId: "1",
    date: "2023-05-12",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed for pain", duration: "5 days" },
    ],
    notes: "Take antibiotics with food. Complete entire course even if symptoms improve.",
    dentist: "Dr. Smith",
  },
  {
    id: "2",
    patientId: "1",
    date: "2023-03-30",
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed for pain", duration: "3 days" },
    ],
    notes: "Take with food or milk to reduce stomach upset.",
    dentist: "Dr. Johnson",
  },
];
