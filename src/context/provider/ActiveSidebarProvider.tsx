import { ActiveSidebarContext } from "@/context/ActiveSidebarContext";
import type { ActiveSidebarType } from "@/types/ActiveSidebarType";
import React, { useState } from "react";

export const ActiveSidebarProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [activeSidebar, setActiveSidebar] =
    useState<ActiveSidebarType>("kamar");

  return (
    <ActiveSidebarContext.Provider value={{ activeSidebar, setActiveSidebar }}>
      {children}
    </ActiveSidebarContext.Provider>
  );
};
