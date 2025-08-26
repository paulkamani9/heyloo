import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendMessage = mutation({
  args: {
    recipientId: v.id("users"),
    content: v.string(),
    image: v.optional(v.id("_storage")),
    toBot: v.boolean(),
  },
  handler: async (ctx, { recipientId, content, image, toBot }) => {
    const user = await getUser(ctx);

    await ctx.db.insert("message", {
      senderId: user._id,
      recipientId,
      content,
      image,
      toBot,
    });

    // if tobot do something after scheduler.after
  },
});

export const getFriendMessages = query({
  args: {
    friendId: v.id("users"),
  },
  handler: async (ctx, { friendId }) => {
    const user = await getUser(ctx);

    const messages = await ctx.db
      .query("message")
      .filter((q) =>
        q.or(
          q.eq(q.field("senderId"), user._id),
          q.eq(q.field("senderId"), friendId),
          q.eq(q.field("recipientId"), friendId),
          q.eq(q.field("recipientId"), user._id)
        )
      )
      .order("asc")
      .collect();

    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(message.image
          ? { url: await ctx.storage.getUrl(message.image) }
          : {}),
      }))
    );
  },
});

export const getSender = query({
  args: { senderId: v.id("users") },
  handler: async (ctx, { senderId }) => {
    await getUser(ctx);

    return await ctx.db.get(senderId);
  },
});
