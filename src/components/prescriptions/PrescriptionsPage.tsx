
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Download, 
  FileCheck, 
  Plus, 
  Search, 
  User,
  Edit,
  Trash,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { prescriptions } from "@/mock/prescriptions";

export const PrescriptionsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const isPatient = user?.role === "patient";
  
  // Filter prescriptions based on user role and search term
  let filteredPrescriptions = isPatient
    ? prescriptions.filter((pres) => pres.patientName === user?.name)
    : prescriptions;
    
  if (searchTerm) {
    filteredPrescriptions = filteredPrescriptions.filter(
      (pres) =>
        pres.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pres.dentist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pres.medications.some((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // Group prescriptions by patient for better organization in the admin/dentist view
  const groupedPrescriptions = filteredPrescriptions.reduce((groups, prescription) => {
    const { patientId, patientName } = prescription;
    const key = `${patientId}-${patientName}`;
    
    if (!groups[key]) {
      groups[key] = {
        patientId,
        patientName,
        prescriptions: [],
      };
    }
    
    groups[key].prescriptions.push(prescription);
    return groups;
  }, {} as Record<string, { patientId: string; patientName: string; prescriptions: typeof prescriptions }>);

  return (
    <div className="animate-fade-in container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-dental-900 dark:text-dental-100">Prescriptions</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search prescriptions..."
              className="pl-8 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {!isPatient && (
            <Button asChild>
              <Link to="/prescriptions/new">
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Link>
            </Button>
          )}
        </div>
      </div>

      {Object.keys(groupedPrescriptions).length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No prescriptions found matching your search.</p>
            {!isPatient && (
              <Button asChild>
                <Link to="/prescriptions/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Prescription
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : isPatient ? (
        // Patient view - simple list of prescriptions
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="transition-all duration-300 hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={
                          prescription.status === "active"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
                        }
                      >
                        {prescription.status === "active" ? "Active" : "Expired"}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {new Date(prescription.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="font-medium">{prescription.dentist}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileCheck className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {prescription.medications.map((medication, index) => (
                    <div key={index} className="bg-accent/50 p-3 rounded-md">
                      <div className="font-medium">{medication.name} ({medication.dosage})</div>
                      <div className="text-sm text-muted-foreground">
                        {medication.frequency} for {medication.duration}
                      </div>
                    </div>
                  ))}
                </div>
                
                {prescription.notes && (
                  <div className="mt-3 text-sm">
                    <p className="text-muted-foreground mb-1">Notes:</p>
                    <p>{prescription.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Admin/Dentist view - grouped by patient
        <div className="space-y-8">
          {Object.values(groupedPrescriptions).map((group) => (
            <div key={group.patientId} className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-dental-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-dental-600" />
                </div>
                <h2 className="text-xl font-semibold">{group.patientName}</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/prescriptions/new?patient=${group.patientId}`}>
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Link>
                </Button>
              </div>
              
              {group.prescriptions.map((prescription) => (
                <Card key={prescription.id} className="transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={
                              prescription.status === "active"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
                            }
                          >
                            {prescription.status === "active" ? "Active" : "Expired"}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {new Date(prescription.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="font-medium">{prescription.dentist}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link to={`/prescriptions/${prescription.id}`}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Print
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {prescription.medications.map((medication, index) => (
                        <div key={index} className="flex justify-between items-center bg-accent/50 p-2 rounded-md">
                          <div>
                            <span className="font-medium">{medication.name}</span>
                            <span className="text-sm ml-2">{medication.dosage}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {medication.frequency}, {medication.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {prescription.notes && (
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-1">Notes:</p>
                        <p>{prescription.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
