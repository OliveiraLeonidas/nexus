import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProceduresPage } from "@/components/procedures/ProceduresPage";

const Procedures = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <ProceduresPage />
        </main>
      </div>
    </div>
  );
};

export default Procedures;
