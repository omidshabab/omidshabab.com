import { getComponents } from "@/lib/api/components/queries";
import { nanoid, timestamps } from "@/lib/utils";
import { sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const localeEnums = pgEnum("locale", ["en", "fa"]);
export const typeEnums = pgEnum("type", ["free", "paid"]);

export const components = pgTable("components", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: varchar("title", { length: 150 }).notNull(),
  desc: text("desc").notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  published: boolean("published").default(false),
  userId: varchar("user_id", { length: 256 }).notNull(),
  locale: localeEnums("locale").notNull().default("en"),
  type: typeEnums("type").notNull().default("free"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for components - used to validate API requests
const baseSchema = createSelectSchema(components).omit(timestamps);

export const insertComponentSchema = createInsertSchema(components)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertComponentParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateComponentSchema = baseSchema;
export const updateComponentParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    userId: true,
  });

export const componentIdSchema = baseSchema.pick({ id: true });
export const componentSlugSchema = baseSchema.pick({ slug: true });

// Types for components - used to type API request params and within Components
export type Component = typeof components.$inferSelect;
export type NewComponent = z.infer<typeof insertComponentSchema>;
export type NewComponentParams = z.infer<typeof insertComponentParams>;
export type UpdateComponentParams = z.infer<typeof updateComponentParams>;
export type ComponentId = z.infer<typeof componentIdSchema>["id"];
export type ComponentSlug = z.infer<typeof componentSlugSchema>["slug"];

// this type infers the return from getComponent() - meaning it will include any joins
export type CompleteComponent = Awaited<
  ReturnType<typeof getComponents>
>["components"][number];
