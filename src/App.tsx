import { ActiveSidebarProvider } from "@/context/provider/ActiveSidebarProvider";
import AdminPage from "@/pages/AdminPage";
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { token } = useAuth();

  return (
    <>
      {!token ? (
        <LoginPage />
      ) : (
        <ActiveSidebarProvider>
          <AdminPage />
        </ActiveSidebarProvider>
      )}
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

export default App;
