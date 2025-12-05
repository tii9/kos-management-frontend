import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ActiveSidebarContext } from "@/context/ActiveSidebarContext";
import { useContext } from "react";
import type { ActiveSidebarType } from "@/types/ActiveSidebarType";
import { Button } from "@/components/ui/button";
import { sidebarData as data } from "@/lib/sidebarContent";
import { CommandIcon } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeSidebar, setActiveSidebar } = useContext(ActiveSidebarContext);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center my-1">
        <div className="bg-primary text-primary-foreground p-1 rounded">
          <CommandIcon />
        </div>
        <div>
          <h1 className="font-medium">BoardingHub</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Button
                      asChild
                      onClick={() => {
                        setActiveSidebar(item.id as ActiveSidebarType);
                      }}
                      className="select-none w-full justify-start cursor-pointer"
                      variant={activeSidebar === item.id ? "default" : "ghost"}
                    >
                      <div className="text-left">
                        <item.icon />
                        {item.title}
                      </div>
                    </Button>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
