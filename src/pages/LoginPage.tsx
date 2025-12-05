import { LoginForm } from "@/components/login-form";
import { Toaster } from "@/components/ui/sonner";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50">
      <div className="w-full max-w-sm">
        <LoginForm />
        <Toaster richColors closeButton position="top-right" />
      </div>
    </div>
  );
};

export default LoginPage;
