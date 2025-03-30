// Mock data
export const patientStats = {
  total: 128,
  newThisMonth: 14,
  percentIncrease: 12,
};

export const appointmentStats = {
  today: 8,
  pending: 4,
  completed: 3,
  cancelled: 1,
  nextAppointment: {
    patient: "James Wilson",
    time: "2:30 PM",
    procedure: "Teeth Cleaning",
  },
};

export const revenueStats = {
  total: 8750,
  percentIncrease: 5,
  outstanding: 2200,
  collected: 6550,
};

export const upcomingAppointments = [
  {
    id: "1",
    patient: "James Wilson",
    time: "2:30 PM",
    date: "Today",
    procedure: "Teeth Cleaning",
    status: "confirmed",
  },
  {
    id: "2",
    patient: "Sarah Johnson",
    time: "9:00 AM",
    date: "Tomorrow",
    procedure: "Cavity Filling",
    status: "confirmed",
  },
  {
    id: "3",
    patient: "Michael Brown",
    time: "11:30 AM",
    date: "Tomorrow",
    procedure: "Root Canal",
    status: "pending",
  },
  {
    id: "4",
    patient: "Amanda Lee",
    time: "3:45 PM",
    date: "Jun 12, 2023",
    procedure: "Dental Crown",
    status: "confirmed",
  },
];

export const recentPatients = [
  {
    id: "1",
    name: "James Wilson",
    lastVisit: "Today",
    nextAppointment: "Jun 15, 2023",
    contact: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    lastVisit: "Yesterday",
    nextAppointment: "Tomorrow",
    contact: "+1 (555) 987-6543",
  },
  {
    id: "3",
    name: "Michael Brown",
    lastVisit: "Jun 8, 2023",
    nextAppointment: "Tomorrow",
    contact: "+1 (555) 456-7890",
  },
];