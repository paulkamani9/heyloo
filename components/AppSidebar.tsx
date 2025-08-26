"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { SidebarUserItem } from "./SidebarUserItem";
import { Plus, VideoIcon } from "lucide-react";
import Image from "next/image";
import { SidebarFriendsList } from "./SidebarFriendsList";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="w-full">
          <SidebarMenuItem className="w-full flex items-center justify-center py-4">
            <a className="text-3xl tracking-widest text-center">heyloo</a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Bots</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add AI</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="w-full">
              <SidebarMenuItem className="w-full flex items-center gap-4 py-4">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={"/openai.png"}
                  alt="Open AI GPT"
                />
                Chat GPT
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Video Call</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="w-full">
              <Link href={"/call"}>
                <SidebarMenuItem
                  role="button"
                  className="w-full flex items-center gap-4 py-4 cursor-pointer hover:bg-muted"
                >
                  <VideoIcon size={32} />
                  Start Video Call
                </SidebarMenuItem>
              </Link>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFriendsList />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu className="w-full pl-6 pr-2">
          <SidebarUserItem />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
