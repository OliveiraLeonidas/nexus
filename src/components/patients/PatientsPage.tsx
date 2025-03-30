import { mockPatients } from "@/mock/data.mock";
import { Search, Plus, FileText, Calendar, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";


export const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log('entrou na pagina do paciente')

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-dental-900 dark:text-dental-100">Pacientes</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button asChild>
            <Link to="/patients/new">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar paciente
            </Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No patients found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-dental-100 flex items-center justify-center">
                            <span className="text-dental-600 font-medium text-xs">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span>{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{patient.email}</div>
                          <div className="text-muted-foreground">{patient.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        {patient.nextAppointment ? (
                          patient.nextAppointment
                        ) : (
                          <span className="text-muted-foreground">No appointment scheduled</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.status === "active" ? "default" : "secondary"}
                          className={`${
                            patient.status === "active"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800/20 dark:text-emerald-400"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-red-800/20 dark:text-gray-400"
                          }`}
                        >
                          {patient.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2  transition-opacity">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/records/${patient.id}`} title="visualizar registros">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">visualizar registros</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/appointments/new?patient=${patient.id}`} title="agendar consulta">
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">Agendar consulta</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Link to={""} title="Editar">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit patient</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Link to={""} title="Excluir paciente">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Deletar</span>
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
