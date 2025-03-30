import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (error) {
      // Error is already handled in the login function
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
        <CardDescription className="text-center">
          Entre com suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="dentist@dental.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" className="px-0 text-xs text-primary" type="button">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="transition-all duration-200"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 hover:shadow-lg bg-dental-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <p>Contas de teste:</p>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => {
              setEmail("admin@dental.com");
              setPassword("password123");
            }}>
              Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setEmail("dentist@dental.com");
              setPassword("password123");
            }}>
              Dentist
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              setEmail("patient@dental.com");
              setPassword("password123");
            }}>
              Patient
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
