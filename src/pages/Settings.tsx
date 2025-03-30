
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/components/auth/AuthContext";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  // role user control

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in container">
            <h1 className="text-3xl font-bold mb-6 text-dental-900 dark:text-dental-100">Settings</h1>
            
            <Tabs defaultValue="general" className="space-y-4">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Information</CardTitle>
                    <CardDescription>
                      Update your practice details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="practiceName">Practice Name</Label>
                        <Input id="practiceName" defaultValue="DentalCare Clinic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="contact@dentalcare.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://dentalcare.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main Street, Suite 100" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Anytown" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input id="zipCode" defaultValue="91234" />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Horário de funcionamento</CardTitle>
                    <CardDescription>
                      Set your clinic's operational hours
                      Defina o horário de funcionamento da sua clínica
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: "Monday", open: "09:00", close: "18:00", isOpen: true },
                        { day: "Tuesday", open: "09:00", close: "18:00", isOpen: true },
                        { day: "Wednesday", open: "09:00", close: "18:00", isOpen: true },
                        { day: "Thursday", open: "09:00", close: "18:00", isOpen: true },
                        { day: "Friday", open: "09:00", close: "17:00", isOpen: true },
                        { day: "Saturday", open: "10:00", close: "15:00", isOpen: true },
                        { day: "Sunday", open: "09:00", close: "18:00", isOpen: false },
                      ].map((schedule) => (
                        <div key={schedule.day} className="flex items-center justify-between">
                          <div className="font-medium w-32">{schedule.day}</div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Switch id={`${schedule.day.toLowerCase()}-open`} defaultChecked={schedule.isOpen} />
                              <Label htmlFor={`${schedule.day.toLowerCase()}-open`}>abrir</Label>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input type="time" defaultValue={schedule.open} disabled={!schedule.isOpen} />
                              <Input type="time" defaultValue={schedule.close} disabled={!schedule.isOpen} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4">Salvar horário</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Senhas</CardTitle>
                    <CardDescription>
                      Atualiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha atual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova senha</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Atualizar senha</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Autenticação em dois fatores</CardTitle>
                    <CardDescription>
                      Melhore a segurança da sua conta com 2FA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Autenticação de mensagem de texto</div>
                        <div className="text-sm text-muted-foreground">Receba um código via SMS</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Aplicativo autenticador</div>
                        <div className="text-sm text-muted-foreground">Use um aplicativo autenticador</div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações por e-mail</CardTitle>
                    <CardDescription>
                      Gerencie suas preferências de notificação por e-mail
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Lembretes de compromissos</div>
                        <div className="text-sm text-muted-foreground">Receba lembretes sobre compromissos futuros</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Notificações de novos pacientes</div>
                        <div className="text-sm text-muted-foreground">Notificações quando novos pacientes se registram</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Atualizações do sistema</div>
                        <div className="text-sm text-muted-foreground">Receba atualizações sobre mudanças no sistema</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações por SMS</CardTitle>
                    <CardDescription>
                      Configurar as configurações de notificação de mensagens de texto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Confirmações de compromissos</div>
                        <div className="text-sm text-muted-foreground">Enviar confirmações de compromissos por SMS</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Lembretes de compromissos</div>
                        <div className="text-sm text-muted-foreground">Envie lembretes por SMS antes dos compromissos</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="reminderHours">Enviar lembretes (horas antes da consulta)</Label>
                      <Input id="reminderHours" type="number" defaultValue="24" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços conectados</CardTitle>
                    <CardDescription>
                    Gerenciar integrações de serviços de terceiros
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Calendário Google</div>
                        <div className="text-sm text-muted-foreground">Sincronizar compromissos com o Google Agenda</div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Processador de pagamento</div>
                        <div className="text-sm text-muted-foreground">Integrar com serviço de processamento de pagamento</div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing por e-mail</div>
                        <div className="text-sm text-muted-foreground">Conecte-se com a plataforma de marketing por e-mail</div>
                      </div>
                      <Button variant="outline">Conectar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>API DE ACESSO</CardTitle>
                    <CardDescription>
                      Gerenciar chaves de API e acesso
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input id="apiKey" value="••••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                      Compartilhe sua chave de API somente com aplicativos confiáveis. Você pode regenerar sua chave a qualquer momento.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
