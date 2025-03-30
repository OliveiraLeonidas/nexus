
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  Info, 
  Plus, 
  Search,
  Edit,
  Trash
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { procedures } from "@/mock/procedures";



export const ProceduresPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const isAdminOrDentist = user?.role === "admin" || user?.role === "dentist";
  
  // Get unique categories for the filter
  const categories = [...new Set(procedures.map((proc) => proc.category))];
  
  // Filter procedures
  let filteredProcedures = procedures;
  
  if (categoryFilter !== "all") {
    filteredProcedures = filteredProcedures.filter((proc) => proc.category === categoryFilter);
  }
  
  if (searchTerm) {
    filteredProcedures = filteredProcedures.filter(
      (proc) =>
        proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Map category to badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "diagnóstico":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300";
      case "preventivo":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300";
      case "restaurador":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-300";
      case "endodontia":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-300";
      case "cirúrgico":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300";
      case "cosmético":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-300";
      case "implantodontia":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <div className="animate-fade-in container pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-dental-900 dark:text-dental-100">Procedimentos</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procurar procecimentos..."
              className="pl-8 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isAdminOrDentist && (
            <Button asChild>
              <Link to="/procedures/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo procedimento
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" value={categoryFilter} onValueChange={setCategoryFilter} className="mb-6">
        <TabsList className="bg-muted/50 p-1 mb-2 overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="all" className="rounded-sm">Todos</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category} 
              className="rounded-sm capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredProcedures.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No procedures found matching your search.</p>
            {isAdminOrDentist && (
              <Button asChild>
                <Link to="/procedures/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar novo procedimento
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProcedures.map((procedure) => (
            <Card key={procedure.id} className="transition-all duration-300 hover:shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{procedure.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 capitalize ${getCategoryColor(procedure.category)}`}
                      >
                        {procedure.category}
                      </Badge>
                    </div>
                    
                    {isAdminOrDentist && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {procedure.description}
                  </p>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{procedure.duration} min</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold">
                      <DollarSign className="mr-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{procedure.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t mt-2">
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-none py-3 h-auto flex items-center justify-center text-sm font-medium text-primary"
                    asChild
                  >
                    <Link to={`/procedures/${procedure.id}`}>
                      <Info className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
