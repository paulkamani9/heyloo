import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { send } from "process";

const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
  message: defineTable({
    senderId: v.id("users"),
    recipientId: v.id("users"),
    content: v.string(),
    image: v.optional(v.id("_storage")),
    toBot: v.boolean(),
  }).index("bySenderId_and_byRecipientId", ["senderId", "recipientId"]),
});

export default schema;
