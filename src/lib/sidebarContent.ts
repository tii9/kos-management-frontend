import RoomSection from "@/components/room/Room";
import DashboardSection from "@/components/sidebar-content/Dashboard";
import SettingsSection from "@/components/sidebar-content/Settings";
import TenantSection from "@/components/tenant/Tenant";
import { Bed, ChartLine, Settings, Users } from "lucide-react";

export const sidebarContent = {
  dashboard: {
    title: "Admin Dashboard",
    content: DashboardSection,
  },
  kamar: {
    title: "List Kamar",
    content: RoomSection,
  },
  penyewa: {
    title: "List Penyewa",
    content: TenantSection,
  },
  settings: {
    title: "Settings",
    content: SettingsSection,
  },
};

export const sidebarData = {
  navMain: [
    {
      title: "Main Content",
      url: "#",
      items: [
        {
          id: "dashboard",
          title: "Dashboard",
          icon: ChartLine,
          url: "#",
        },
        {
          id: "kamar",
          title: "Kamar",
          icon: Bed,
          url: "#",
        },
        {
          id: "penyewa",
          title: "Penyewa",
          icon: Users,
          url: "#",
        },
        {
          id: "settings",
          title: "Settings",
          icon: Settings,
          url: "#",
        },
      ],
    },
  ],
};
