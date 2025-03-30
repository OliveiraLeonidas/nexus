export const prescriptions = [
  {
    id: "1",
    patientId: "1",
    patientName: "James Wilson",
    date: "2023-05-12",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed for pain", duration: "5 days" },
    ],
    notes: "Take antibiotics with food. Complete entire course even if symptoms improve.",
    dentist: "Dr. Smith",
    status: "active",
  },
  {
    id: "2",
    patientId: "1",
    patientName: "James Wilson",
    date: "2023-03-30",
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed for pain", duration: "3 days" },
    ],
    notes: "Take with food or milk to reduce stomach upset.",
    dentist: "Dr. Johnson",
    status: "expired",
  },
  {
    id: "3",
    patientId: "2",
    patientName: "Sarah Johnson",
    date: "2023-06-05",
    medications: [
      { name: "Chlorhexidine", dosage: "0.12%", frequency: "Twice daily", duration: "10 days" },
      { name: "Acetaminophen", dosage: "500mg", frequency: "Every 6 hours as needed", duration: "3 days" },
    ],
    notes: "Rinse with chlorhexidine for 30 seconds and then spit out. Do not eat or drink for 30 minutes after use.",
    dentist: "Dr. Smith",
    status: "active",
  },
  {
    id: "4",
    patientId: "3",
    patientName: "Michael Brown",
    date: "2023-05-20",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
      { name: "Acetaminophen", dosage: "500mg", frequency: "Every 6 hours as needed", duration: "5 days" },
    ],
    notes: "Complete entire antibiotic course.",
    dentist: "Dr. Johnson",
    status: "active",
  },
];