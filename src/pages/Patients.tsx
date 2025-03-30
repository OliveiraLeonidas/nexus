
import { Navbar } from "@/components/layout/Navbar";
import { PatientsPage } from "@/components/patients/PatientsPage";
import { Sidebar } from "@/components/layout/Sidebar";  
import { useState } from "react";

const Patients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <PatientsPage />
        </main>
      </div>
    </div>
  );
};

export default Patients;
