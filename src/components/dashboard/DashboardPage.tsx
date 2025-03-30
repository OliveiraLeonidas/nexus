import { Progress } from "@radix-ui/react-progress";
import { Users,  CheckCircle,  Calendar, AlertCircle, XCircle, DollarSign, Clock,  Plus } from "lucide-react";
import  { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import  { Button } from "../ui/button";
import  { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { appointmentStats, patientStats, recentPatients, revenueStats, upcomingAppointments } from "@/mock/dashboard.mock";

export const DashboardPage = () => {
  const { user, hasPermission } = useAuth();
  const isAdminOrDentist = hasPermission(["admin", "dentist"]);
  
  return (
    <div className="animate-fade-in container">
      <h1 className="text-3xl font-bold mb-6 text-dental-900 dark:text-dental-100">
        {user ? `Welcome, ${user.name}` : "Dashboard"}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {isAdminOrDentist && (
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-dental-500" />
                Pacientes
              </CardTitle>
              <CardDescription>Estatísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-dental-800 dark:text-dental-300 mb-2">
                {patientStats.total}
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  +{patientStats.newThisMonth} novos neste mês
                </span>
                <span className="text-muted-foreground ml-2">
                  (+{patientStats.percentIncrease}%)
                </span>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-dental-500" />
              Consultas
            </CardTitle>
            <CardDescription>Agendamentos de hoje </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dental-800 dark:text-dental-300 mb-2">
              {appointmentStats.today}
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center">
                <CheckCircle className="mr-1 h-4 w-4" />
                {appointmentStats.completed} finalizadas
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center">
                <AlertCircle className="mr-1 h-4 w-4" />
                {appointmentStats.pending} pendentes
              </span>
              <span className="text-rose-600 dark:text-rose-400 font-medium flex items-center">
                <XCircle className="mr-1 h-4 w-4" />
                {appointmentStats.cancelled} canceladas
              </span>
            </div>
            
            {user?.role === "patient" && (
              <div className="bg-accent p-3 rounded-lg mt-1 text-sm">
                <div className="font-medium">Próxima consulta:</div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">
                    {appointmentStats.nextAppointment.procedure}
                  </span>
                  <span className="font-medium text-dental-600 dark:text-dental-400">
                    {appointmentStats.nextAppointment.time}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {isAdminOrDentist && (
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-dental-500" />
                Receita
              </CardTitle>
              <CardDescription>Visão geral</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-dental-800 dark:text-dental-300 mb-2">
                ${revenueStats.total}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa</span>
                  <span className="font-medium">
                    ${revenueStats.collected} / ${revenueStats.total}
                  </span>
                </div>
                <Progress value={Math.round((revenueStats.collected / revenueStats.total) * 100)} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
        <div className={`space-y-6 ${isAdminOrDentist ? "md:col-span-2" : "md:col-span-3"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Próximas consultas</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/appointments">
                <span>Ver todas</span>
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <Card key={appointment.id} className="transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center">
                        <span className="text-dental-600 font-medium">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{appointment.patient}</div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.procedure}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button asChild className="w-full">
              <Link to="/appointments/new">
                <Plus className="mr-2 h-4 w-4" />
                Agendar consulta
              </Link>
            </Button>
          </div>
        </div>
        
        {isAdminOrDentist && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pacientes recentes</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/patients">
                  <span>ver todos</span>
                </Link>
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <Card key={patient.id} className="transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-dental-100 flex items-center justify-center">
                          <span className="text-dental-600 font-medium">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            última visita: {patient.lastVisit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button asChild className="w-full">
                <Link to="/patients/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar novo paciente
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
