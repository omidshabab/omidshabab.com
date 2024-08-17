import { getPortfolios } from "@/lib/api/portfolios/queries";
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

export const portfolios = pgTable("portfolios", {
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

// Schema for portfolios - used to validate API requests
const baseSchema = createSelectSchema(portfolios).omit(timestamps);

export const insertPortfolioSchema = createInsertSchema(portfolios)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertPortfolioParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updatePortfolioSchema = baseSchema;
export const updatePortfolioParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    userId: true,
  });

export const portfolioIdSchema = baseSchema.pick({ id: true });
export const portfolioSlugSchema = baseSchema.pick({ slug: true });

// Types for portfolios - used to type API request params and within Components
export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = z.infer<typeof insertPortfolioSchema>;
export type NewPortfolioParams = z.infer<typeof insertPortfolioParams>;
export type UpdatePortfolioParams = z.infer<typeof updatePortfolioParams>;
export type PortfolioId = z.infer<typeof portfolioIdSchema>["id"];
export type PortfolioSlug = z.infer<typeof portfolioSlugSchema>["slug"];

// this type infers the return from getPortfolio() - meaning it will include any joins
export type CompletePortfolio = Awaited<
  ReturnType<typeof getPortfolios>
>["portfolios"][number];
