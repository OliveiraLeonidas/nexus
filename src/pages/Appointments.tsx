
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppointmentsPage } from "@/components/appointments/AppointmentsPage";
import { Navbar } from "@/components/layout/Navbar";

const Appointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <AppointmentsPage />
        </main>
      </div>
    </div>
  );
};

export default Appointments;
