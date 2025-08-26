import { ChatView } from "@/components/ChatView";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

const page = ({ params }: { params: { friendId: Id<"users"> } }) => {
    const { friendId } = params;
  return <ChatView userId={friendId}/>;
};

export default page;
