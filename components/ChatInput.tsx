"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Input } from "./ui/input";
import { BotIcon, Send, Plus, Image, File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  _id: Id<"users">;
  _creationTime: number;
  name: string;
  email: string;
  imageUrl: string;
  externalId: string;
}

export const ChatInput = ({ _id }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");
  const [toBot, setToBot] = useState<boolean>(false);
  const sendMessage = useMutation(api.messages.sendMessage);
  const [image, setImage] = useState<File | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // Only trigger send if there is message or image
        if (!message && !image) {
          return;
        }
        await handleSendMessage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [message, image]);

  const handleSendMessage = async () => {
    let imageStorageId;
    if (image) {
      const url = await generateUploadUrl();

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": image!.type },
        body: image,
      });

      const { storageId } = await result.json();
      console.log(storageId);
      imageStorageId = storageId;
      setImage(null);
    }

    sendMessage({
      recipientId: _id,
      content: message,
      toBot,
      image: imageStorageId,
    });

    setMessage("");
    setImage(null);
    imageInput.current!.value = "";
  };

  return (
    <div className="fixed bottom-0 md:left-[10%] w-full left-0 py-4">
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-2 rounded-md border px-3 py-2 bg-muted">
        {/* Image Preview */}
        {image && (
          <div className="w-full flex justify-center mb-2">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="max-h-40 rounded-md object-contain"
            />
          </div>
        )}

        <div className="w-full flex items-center gap-2">
          <button
            onClick={() => imageInput.current?.click()}
            className="p-2 rounded-full hover:bg-accent self-start"
            aria-label="Add Image"
          >
            <Image size={20} />
          </button>

          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-none bg-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type your message..."
          />
          <button
            onClick={() => setToBot(!toBot)}
            className={cn(
              "p-2 rounded-full hover:bg-foreground/50",
              toBot && "bg-foreground/25"
            )}
          >
            <BotIcon size={20} />
          </button>
          <button
            onClick={() => handleSendMessage()}
            className="p-2 rounded-full hover:bg-accent"
          >
            <Send size={20} />
          </button>
        </div>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInput}
          onChange={(e) => {
            const file = e.target.files![0];
            setImage(file);
          }}
        />
      </div>
    </div>
  );
};
