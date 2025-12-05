export type ActiveSidebarType = "dashboard" | "kamar" | "penyewa" | "settings";

export type ActiveSidebarContextType = {
  activeSidebar: ActiveSidebarType;
  setActiveSidebar: React.Dispatch<React.SetStateAction<ActiveSidebarType>>;
};
