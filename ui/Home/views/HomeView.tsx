"use client";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { BotIcon, CalendarHeartIcon, VideoIcon } from "lucide-react";
import { HeroItem } from "../ui/HeroItem";

export const HomeView = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <div className="font-sans bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <p className="text-4xl font-bold tracking-widest text-white">heyloo</p>
        <p className="text-lg text-white/90 mt-2">
          Talk. Laugh. Share. Anytime, anywhere.
        </p>
        <div className="grid grid-cols-1 gap-3 mt-6">
          <HeroItem
            icon={CalendarHeartIcon}
            message="Connect instantly with friends & family in style"
          />
          <HeroItem
            icon={VideoIcon}
            message="Crystal-clear HD video and smooth calls anytime"
          />
          <HeroItem
            icon={BotIcon}
            message="An AI Companion in your chats to assist you"
          />
        </div>
        <div className="flex gap-4 items-center flex-col w-full">
          {isAuthenticated ? (
            <Button
              size="lg"
              className="text-lg tracking-wide px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg"
            >
              <a href="/main">say heyloo 🚀</a>
            </Button>
          ) : (
            <SignInButton>
              <Button
                size="lg"
                className="text-lg px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg"
              >
                say heyloo 🚀
              </Button>
            </SignInButton>
          )}
        </div>
      </main>
      <footer className="fixed bottom-2">
        <span className="text-xs">
          © heyloo Inc 2025. All rights reserved.
        </span>
      </footer>
    </div>
  );
};
