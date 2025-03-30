
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Image, 
  Plus, 
  Search, 
  FileCheck, 
  Calendar,
  Download,
  ExternalLink
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { patients, records, RecordsPrescriptions } from "@/mock/recordspage";




export const RecordsPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  
  const patient = patientId 
    ? patients.find((p) => p.id === patientId) 
    : patients[0]; // Default to first patient if no ID provided
  
  const patientRecords = records.filter((record) => record.patientId === patient?.id);
  const patientPrescriptions = RecordsPrescriptions.filter((prescription) => prescription.patientId === patient?.id);

  const filteredRecords = patientRecords.filter(
    (record) =>
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.dentist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.procedures.some((proc) => proc.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!patient) {
    return (
      <div className="animate-fade-in container">
        <h1 className="text-3xl font-bold mb-6 text-dental-900 dark:text-dental-100">
          Histórico do paciente
        </h1>
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">Paciente não encontrado.</p>
            <Button asChild>
              <Link to="/patients">Ir para lista de pacientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-dental-900 dark:text-dental-100">
          Registro: {patient.name}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records..."
              className="pl-8 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button asChild>
            <Link to={`/records/${patient.id}/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar registro
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-1 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Informações do paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Informações de contato</p>
                <div className="mt-1">
                  <p className="text-sm">{patient.email}</p>
                  <p className="text-sm">{patient.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Dados pessoais</p>
                <div className="mt-1">
                  <p className="text-sm">Data de nascimento: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  <p className="text-sm">Gênero: {patient.gender}</p>
                  <p className="text-sm">Endereço: {patient.address}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Histórico médico</p>
                <div className="mt-1 space-y-2">
                  {patient.medicalHistory.map((item, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{item.condition}:</span> {item.status}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/patients/${patient.id}/edit`}>
                    Editar informações do paciente
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/appointments/new?patient=${patient.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    agendar consulta
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-md">
          <CardContent className="p-0">
            <Tabs defaultValue="records">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger 
                  value="records" 
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  SmileWise
                </TabsTrigger>
                <TabsTrigger 
                  value="RecordsPrescriptions" 
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Prescrições
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="records" className="p-4">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Nenhum registro encontrado na sua busca</p>
                    <Button asChild>
                      <Link to={`/records/${patient.id}/new`}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar novo registro
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRecords.map((record) => (
                      <Card key={record.id} className="transition-all duration-300 hover:shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className="bg-dental-50 text-dental-800 hover:bg-dental-100 dark:bg-dental-900/20 dark:text-dental-300"
                                >
                                  {record.type}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(record.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="font-medium mt-1">{record.dentist}</p>
                            </div>
                            <div className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8" asChild>
                                <Link to={`/records/${patient.id}/${record.id}`}>
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">Visualizar detalhes</span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground mb-1">Procedimentos:</p>
                            <div className="flex flex-wrap gap-2">
                              {record.procedures.map((procedure, index) => (
                                <Badge key={index} variant="secondary">
                                  {procedure}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground mb-1">Anotações:</p>
                            <p className="text-sm">{record.notes}</p>
                          </div>
                          
                          {record.attachments.length > 0 && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Anexos:</p>
                              <div className="flex flex-wrap gap-2">
                                {record.attachments.map((attachment) => (
                                  <Button 
                                    key={attachment.id} 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-xs"
                                  >
                                    {attachment.type === "image" ? (
                                      <Image className="h-3.5 w-3.5 mr-1" />
                                    ) : (
                                      <FileText className="h-3.5 w-3.5 mr-1" />
                                    )}
                                    {attachment.name}
                                    {/* TODO: ADICIONAR FUNCIONALIDADE DE DOWNLOAD */}
                                    <Download className="h-3.5 w-3.5 ml-1" />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="RecordsPrescriptions" className="p-4">
                {patientPrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Nenhum prescrições foram emitidas para este paciente.</p>
                    <Button asChild>
                      <Link to={`/RecordsPrescriptions/new?patient=${patient.id}`}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Prescription
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientPrescriptions.map((prescription) => (
                      <Card key={prescription.id} className="transition-all duration-300 hover:shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className="bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300"
                                >
                                  Prescription
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(prescription.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="font-medium mt-1">{prescription.dentist}</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                              <FileCheck className="h-4 w-4 mr-1" />
                              Print
                            </Button>
                          </div>
                          
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Medication</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Duration</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {prescription.medications.map((medication, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{medication.name}</TableCell>
                                  <TableCell>{medication.dosage}</TableCell>
                                  <TableCell>{medication.frequency}</TableCell>
                                  <TableCell>{medication.duration}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          
                          {prescription.notes && (
                            <div className="mt-3">
                              <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                              <p className="text-sm">{prescription.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
