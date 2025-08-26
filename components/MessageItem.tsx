"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface MessageItemProps {
  url?: string | null | undefined;
  _id: Id<"message">;
  _creationTime: number;
  image?: Id<"_storage"> | undefined;
  content: string;
  senderId: Id<"users">;
  recipientId: Id<"users">;
  toBot: boolean;
}

export const MessageItem = ({ content, senderId, url }: MessageItemProps) => {
  const sender = useQuery(api.messages.getSender, { senderId: senderId });
  const user = useUser();

  if (!sender || !user)
    return (
      <div>
        <Skeleton className="w-2 h-2" />
      </div>
    );

  const isCurrentUser = sender.externalId === user.user?.id;

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isCurrentUser ? "self-end flex-row-reverse" : "self-start"
      )}
    >
      <Image
        src={sender.imageUrl}
        width={28}
        height={28}
        alt="sender avatar"
        className="rounded-full"
      />
      <div
        className={cn(
          "max-w-xs px-3 py-3 rounded-lg flex flex-col gap-2",
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        )}
      >
        {url && (
          <Image
            src={url}
            alt="attached image"
            width={200}
            height={200}
            className="rounded-md object-cover max-w-full h-auto"
          />
        )}
        {content && <p className="mb-2 whitespace-pre-wrap">{content}</p>}
      </div>
    </div>
  );
};
