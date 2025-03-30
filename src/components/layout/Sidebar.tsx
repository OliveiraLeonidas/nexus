
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  FilePlus, 
  FileText, 
  Home,
  Users, 
  LogOut, 
  Settings,
  ChevronLeft,
  User,
  ListChecks,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import type { UserRole } from "@/types";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  requiredRoles?: UserRole[];
}

function NavItem({ icon: Icon, label, href, isActive, isCollapsed, requiredRoles }: NavItemProps) {
  const { hasPermission } = useAuth();
  
  if (requiredRoles && !hasPermission(requiredRoles)) {
    return null;
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-foreground",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (href: string) => location.pathname === href;

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
      requiredRoles: ["admin", "dentist", "patient"] as UserRole[],
    },
    {
      icon: Users,
      label: "Patients",
      href: "/patients",
      requiredRoles: ["admin", "dentist"] as UserRole[],
    },
    {
      icon: Calendar,
      label: "Appointments",
      href: "/appointments",
      requiredRoles: ["admin", "dentist", "patient"] as UserRole[],
    },
    {
      icon: FileText,
      label: "Records",
      href: "/records",
      requiredRoles: ["admin", "dentist"] as UserRole[],
    },
    {
      icon: ListChecks,
      label: "Procedures",
      href: "/procedures",
      requiredRoles: ["admin", "dentist", "patient"] as UserRole[],
    },
    {
      icon: FilePlus,
      label: "Prescriptions",
      href: "/prescriptions",
      requiredRoles: ["admin", "dentist"] as UserRole[],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      requiredRoles: ["admin"] as UserRole[],
    },
  ];

  if (!user) return null;

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border bg-sidebar h-screen transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-border">
        {!isCollapsed && (
          <div className="font-semibold text-xl flex items-center gap-4 text-primary">
            <span>SmileWise</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto transition-all duration-300",
            isCollapsed && "rotate-180"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className={cn("p-4 border-b border-border", isCollapsed ? "flex justify-center" : "")}>
        <div className={cn("flex items-center gap-3", isCollapsed ? "flex-col" : "")}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></span>
          </div>
          {!isCollapsed && (
            <div className="space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-2 py-4">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isActive(item.href)}
              isCollapsed={isCollapsed}
              requiredRoles={item.requiredRoles}
            />
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-foreground/70 hover:text-foreground transition-all duration-300",
            isCollapsed && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!isCollapsed && <span>Log out</span>}
        </Button>
      </div>
    </div>
  );
}
