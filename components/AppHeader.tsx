import { VideoIcon } from "lucide-react";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

export const AppHeader = () => {
  return (
    <div className="right-0 left-0 fixed h-20 top-0 flex items-center justify-between px-6">
      <SidebarTrigger className="md:hidden" size="icon" />
      <Link href={"/call"}>
        <VideoIcon className="self-center" />
      </Link>
    </div>
  );
};
