
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { PrescriptionsPage } from "@/components/prescriptions/PrescriptionsPage";

const Prescriptions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <PrescriptionsPage />
        </main>
      </div>
    </div>
  );
};

export default Prescriptions;
