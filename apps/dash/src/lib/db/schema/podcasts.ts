import { getPodcasts } from "@/lib/api/podcasts/queries";
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

export const podcasts = pgTable("podcasts", {
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

// Schema for podcasts - used to validate API requests
const baseSchema = createSelectSchema(podcasts).omit(timestamps);

export const insertPodcastSchema = createInsertSchema(podcasts)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertPodcastParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePodcastSchema = baseSchema;
export const updatePodcastParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    userId: true,
  });

export const podcastIdSchema = baseSchema.pick({ id: true });
export const podcastSlugSchema = baseSchema.pick({ slug: true });

// Types for podcasts - used to type API request params and within Components
export type Podcast = typeof podcasts.$inferSelect;
export type NewPodcast = z.infer<typeof insertPodcastSchema>;
export type NewPodcastParams = z.infer<typeof insertPodcastParams>;
export type UpdatePodcastParams = z.infer<typeof updatePodcastParams>;
export type PodcastId = z.infer<typeof podcastIdSchema>["id"];
export type PodcastSlug = z.infer<typeof podcastSlugSchema>["slug"];

// this type infers the return from getPodcast() - meaning it will include any joins
export type CompletePodcast = Awaited<
  ReturnType<typeof getPodcasts>
>["podcasts"][number];
