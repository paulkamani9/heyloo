"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MessageItem } from "./MessageItem";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  _id: Id<"users">;
  _creationTime: number;
  name: string;
  email: string;
  imageUrl: string;
  externalId: string;
}

const ChatMessages = ({_id,imageUrl}: ChatMessagesProps) => {
  const messages = useQuery(api.messages.getFriendMessages, {
    friendId: _id,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!messages) {
    return;
  }

  return (
    <div className="flex-1 flex flex-col mt-16 overflow-y-auto px-4 gap-2 pb-40">
      {messages.map((message, index) => (
        <MessageItem key={index}  {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
