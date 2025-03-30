
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { Bell, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky mb-8 top-1 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="hidden md:block">
            <Link to="/dashboard" className="text-xl font-bold text-primary transition-colors hover:text-primary/80">
              SmileWise
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-72 overflow-auto">
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Nova consulta agendada</p>
                    <p className="text-xs text-muted-foreground">
                    John Doe agendou uma consulta para amanhã às 14h.
                    </p>
                    <p className="text-xs text-muted-foreground">2 minutos atrás</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Lembrete de compromisso</p>
                    <p className="text-xs text-muted-foreground">
                      Você tem uma consulta com o Dr. Smith amanhã às 10:00 da manhã.
                    </p>
                    <p className="text-xs text-muted-foreground">1 hora atrás</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Atualizações do sistema</p>
                    <p className="text-xs text-muted-foreground">
                    Novos recursos foram adicionados à plataforma
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-center text-primary">
                Visualizar todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="hidden md:inline-block text-sm">
                      {user.name}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Configurações</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
