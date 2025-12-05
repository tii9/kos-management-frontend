import type { ActiveSidebarContextType } from "@/types/ActiveSidebarType";
import { createContext } from "react";

export const ActiveSidebarContext = createContext<ActiveSidebarContextType>({
  activeSidebar: "dashboard",
  setActiveSidebar: () => {}, // dummy function
});
