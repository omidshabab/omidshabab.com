import { getBooks } from "@/lib/api/books/queries";
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

export const books = pgTable("books", {
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

// Schema for books - used to validate API requests
const baseSchema = createSelectSchema(books).omit(timestamps);

export const insertBookSchema = createInsertSchema(books)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertBookParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateBookSchema = baseSchema;
export const updateBookParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    userId: true,
  });

export const bookIdSchema = baseSchema.pick({ id: true });
export const bookSlugSchema = baseSchema.pick({ slug: true });

// Types for books - used to type API request params and within Components
export type Book = typeof books.$inferSelect;
export type NewBook = z.infer<typeof insertBookSchema>;
export type NewBookParams = z.infer<typeof insertBookParams>;
export type UpdateBookParams = z.infer<typeof updateBookParams>;
export type BookId = z.infer<typeof bookIdSchema>["id"];
export type BookSlug = z.infer<typeof bookSlugSchema>["slug"];

// this type infers the return from getBook() - meaning it will include any joins
export type CompleteBook = Awaited<
  ReturnType<typeof getBooks>
>["books"][number];
