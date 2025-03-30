
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { appointments } from "@/mock/appointments.mock";
import type { AppointmentStatus } from "@/types";



export const AppointmentsPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus>("all");

  const isPatient = user?.role === "patient";

  // Filter appointments based on user role (patient only sees their own)
  let filteredAppointments = isPatient
    ? appointments.filter((apt) => apt.patientName === user?.name)
    : appointments;

  // Apply additional filters
  if (selectedDate !== "all") {
    filteredAppointments = filteredAppointments.filter((apt) => apt.date === selectedDate);
  }

  if (statusFilter !== "all") {
    filteredAppointments = filteredAppointments.filter((apt) => apt.status === statusFilter);
  }

  if (searchTerm) {
    filteredAppointments = filteredAppointments.filter(
      (apt) =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.dentistName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const date = appointment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {} as Record<string, typeof appointments>);

  // Get unique dates for the filter
  const uniqueDates = [...new Set(appointments.map((apt) => apt.date))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800/20 dark:text-emerald-400";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800/20 dark:text-amber-400";
      case "cancelled":
        return "bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-800/20 dark:text-rose-400";
      default:
        return "";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="animate-fade-in container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-dental-900 dark:text-dental-100">Agendamentos</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procurar agendamentos..."
              className="pl-8 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button asChild>
            <Link to="/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo agendamento
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Datas</SelectItem>
            {uniqueDates.map((date) => (
              <SelectItem key={date} value={date}>
                {formatDate(date)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs
          defaultValue="all"
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as AppointmentStatus)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {Object.keys(groupedAppointments).length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">Nenhum agendamento encontrado correspondendo aos seus filtros.</p>
            <Button asChild>
              <Link to="/appointments/new">
                <Plus className="mr-2 h-4 w-4" />
                Agendar novo compromisso
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedAppointments)
          .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
          .map(([date, appointments]) => (
            <div key={date} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{formatDate(date)}</h2>
              <div className="space-y-3">
                {appointments
                  .sort((a, b) => {
                    // Convert time strings to comparable values for sorting
                    const timeA = a.time.replace(/(AM|PM)/, "");
                    const timeB = b.time.replace(/(AM|PM)/, "");
                    const isPMA = a.time.includes("PM");
                    const isPMB = b.time.includes("PM");
                    
                    if (isPMA && !isPMB) return 1;
                    if (!isPMA && isPMB) return -1;
                    
                    return timeA.localeCompare(timeB);
                  })
                  .map((appointment) => (
                    <Card key={appointment.id} className="transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center mt-1">
                              <User className="h-5 w-5 text-dental-600" />
                            </div>
                            <div>
                              <div className="font-medium">{appointment.patientName}</div>
                              <div className="text-sm text-muted-foreground">{appointment.type}</div>
                              <div className="text-sm text-muted-foreground">{appointment.dentistName}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:items-end gap-1">
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(appointment.status)}`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                            
                            <div className="flex items-center text-sm mt-1">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {appointment.time} ({appointment.duration} min)
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
};
