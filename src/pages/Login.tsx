import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-1 bg-dental-100 justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dental-600 to-dental-400 opacity-90"></div>
        <div className="relative z-10 text-white max-w-md p-8">
          <h1 className="text-4xl font-bold mb-6">SmileWise</h1>
          <p className="text-xl mb-8">
            Gestão odontológica simplificada para clínicas modernas.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Gerenciamento de pacientes</h3>
                <p className="text-white/80 text-sm">
                  Registros e consultas simplificadas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Agendamento inteligênte</h3>
                <p className="text-white/80 text-sm">
                  Gerenciamento eficiente de consultas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Prontuários Digitais</h3>
                <p className="text-white/80 text-sm">
                  Informações seguras sobre a saúde do paciente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-dental-900 dark:text-dental-100">
                Bem vindo
              </h1>
              <p className="text-muted-foreground">
                Faça login para acessar sua conta
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
        <div className="p-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmileWise. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
