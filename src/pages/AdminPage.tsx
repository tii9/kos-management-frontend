import { AppSidebar } from "@/components/app-sidebar";
import LogoutDialog from "@/components/LogoutDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ActiveSidebarContext } from "@/context/ActiveSidebarContext";
import { useAuth } from "@/hooks/useAuth";
import { isTokenExpired } from "@/lib/isTokenExpired";
import { sidebarContent } from "@/lib/sidebarContent";
import LoginPage from "@/pages/LoginPage";
import { createElement, useContext } from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const { activeSidebar } = useContext(ActiveSidebarContext);
  const { token } = useAuth();

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
    return <LoginPage />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="font-medium">{sidebarContent[activeSidebar].title}</h1>
          <div className="ml-auto px-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>Logout</Button>
              </DialogTrigger>
              <LogoutDialog />
            </Dialog>
          </div>
        </header>
        <div className="p-4">
          {createElement(sidebarContent[activeSidebar].content)}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPage;
