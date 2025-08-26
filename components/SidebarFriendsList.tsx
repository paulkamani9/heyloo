"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const SidebarFriendsList = () => {
  const friends = useQuery(api.users.getOtherUsers);
  const router = useRouter();
  const params = useParams();
  const { friendId } = params as { friendId?: string };

  const handleClick = (friendId: Id<"users">) => {
    router.push(`/chat/${friendId}`);
  };

  if (!friends)
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Friends</SidebarGroupLabel>
      </SidebarGroup>
    );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Friends</SidebarGroupLabel>
      <SidebarMenu>
        {friends.map((friend, index) => (
          <SidebarMenuItem
            role="button"
            onClick={() => handleClick(friend._id)}
            key={index}
            className={cn(
              "flex items-center gap-4 px-4 py-2 rounded-sm cursor-pointer",
              friendId === friend._id.toString() && "bg-muted py-4"
            )}
          >
            <Image
              width={28}
              height={28}
              src={friend.imageUrl}
              alt={friend.name + " image"}
              className="rounded-full"
            />
            <p className="font-semibold text-sm">{friend.name}</p>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};


