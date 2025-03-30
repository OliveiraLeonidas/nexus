import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, Users, Lock, ArrowRight, LineChart, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';
import odt from '../assets/image.png'

type FeatureCard = {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}


const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCard) => {
  return (
    <div className={cn(
      'bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 transition-all duration-300',
      'hover:shadow-md hover:translate-y-[-4px]',
      className
    )}>
      <div className='h-12 w-12 rounded-full flex items-center justify-center bg-dental-100 dark:bg-dental-900/30 text-dental-600 dark:text-dental-400 mb-4'>
        <Icon className='h-6 w-6' />
      </div>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  );
};

const Index = () => {
  const features = [
    {
      title: 'Agendamento Inteligente',
      description: 'Sistema avançado de agendamento com lembretes automáticos e prevenção de conflitos.',
      icon: CalendarDays
    },
    {
      title: 'Prontuário Digital',
      description: 'Armazene históricos clínicos, tratamentos e evolução do paciente com segurança.',
      icon: FileText
    },
    {
      title: 'Gerenciamento de Pacientes',
      description: 'Organize informações e acompanhe o status dos tratamentos de forma eficiente.',
      icon: Users
    },
    {
      title: 'Relatórios Avançados',
      description: 'Analise tendências e tome decisões baseadas em dados com nossos relatórios.',
      icon: LineChart
    },
    {
      title: 'Segurança de Dados',
      description: 'Proteção total dos dados conforme as normas da LGPD, com criptografia e backups.',
      icon: ShieldCheck
    },
    {
      title: 'Controle de Acesso',
      description: 'Defina permissões específicas para cada função dentro da sua equipe.',
      icon: Lock
    }
  ];
  console.log(features)
  return (
<div className="min-h-screen flex flex-col animate-fade-in">
      <header className="py-4 px-6 md:px-8 lg:px-12 border-b bg-transparent sticky top-0 z-50 backdrop-blur-md">
        <div className="container flex items-center justify-between">
          <div className="text-2xl font-bold text-dental-800 dark:text-dental-200">
          SmileWise
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 py-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Gestão odontológica <span className="bg-clip-text text-transparent bg-gradient-to-r from-dental-600 to-dental-800 dark:from-dental-400 dark:to-dental-600">simplificada</span> e inteligente
            </h1>
            <div className="text-lg text-muted-foreground max-w-md">
              A plataforma completa que ajuda você a gerenciar sua clínica odontológica com elegância e eficiência.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-dental-600 hover:bg-dental-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Iniciar agora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border hover:bg-muted flex items-center justify-center gap-2 transition-colors"
              >
                Saber mais
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className='lg:w[50%] rounded-2xl overflow-hidden shadow-2xl shadow-dental-500/20 animate-fade-in'>
              <img 
                src={odt} 
                alt="referencia" 
                className='w-full h-full object-cover'/>
            </div>
          </div>
        </div>
        
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tudo o que você precisa para gerenciar sua clínica odontológica em um só lugar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className={`animate-fade-in`}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-dental-600 to-dental-800 dark:from-dental-400 dark:to-dental-600">
                SmileWise
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                &copy; {new Date().getFullYear()} SmileWise. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Termos
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
