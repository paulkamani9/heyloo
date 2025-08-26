"use client";
import React from "react";
import { SidebarMenuItem } from "./ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export const SidebarUserItem = () => {
  const { user } = useUser();
  return (
    <SidebarMenuItem className="w-full flex items-center gap-4 py-4">
      <UserButton />
      {user?.fullName}
    </SidebarMenuItem>
  );
};

