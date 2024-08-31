import { getKeys } from "@/lib/api/keys/queries";
import { nanoid, timestamps } from "@/lib/utils";
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const keys = pgTable("keys", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for keys - used to validate API requests
const baseSchema = createSelectSchema(keys).omit(timestamps);

export const insertKeySchema = createInsertSchema(keys)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertKeyParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateKeySchema = baseSchema;
export const updateKeyParams = baseSchema.omit({
  userId: true,
});

export const keyIdSchema = baseSchema.pick({ id: true });

// Types for keys - used to type API request params and within Components
export type Key = typeof keys.$inferSelect;
export type NewKey = z.infer<typeof insertKeySchema>;
export type NewKeyParams = z.infer<typeof insertKeyParams>;
export type UpdateKeyParams = z.infer<typeof updateKeyParams>;
export type KeyId = z.infer<typeof keyIdSchema>["id"];

// this type infers the return from getKey() - meaning it will include any joins
export type CompleteKey = Awaited<ReturnType<typeof getKeys>>["keys"][number];
