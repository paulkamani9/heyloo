"use client";
import { AppHeader } from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider} from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main suppressHydrationWarning className="pt-20 px-6 w-full min-h-screen">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
