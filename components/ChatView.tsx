"use client";

import React from "react";
import { ChatInput } from "./ChatInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "./ui/skeleton";
import ChatMessages from "./ChatMessages";



export const ChatView = ({ userId }: { userId: Id<"users"> }) => {
  const user = useQuery(api.users.getAnotherUser, { userId: userId });

  if (!user) {
    return (
      <div className="w-full h-full flex flex-col">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatMessages {...user} />
      <ChatInput {...user} />
    </div>
  );
};
