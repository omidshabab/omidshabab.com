import { getCourses } from "@/lib/api/courses/queries";
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

export const courses = pgTable("courses", {
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

// Schema for courses - used to validate API requests
const baseSchema = createSelectSchema(courses).omit(timestamps);

export const insertCourseSchema = createInsertSchema(courses)
  .omit(timestamps)
  .extend({
    tags: z.array(z.string()).default([]),
  });
export const insertCourseParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCourseSchema = baseSchema;
export const updateCourseParams = baseSchema
  .extend({
    published: z.coerce.boolean(),
    locale: z.enum(["en", "fa"]),
    tags: z.array(z.string().min(2).max(10)).default([]),
  })
  .omit({
    userId: true,
  });

export const courseIdSchema = baseSchema.pick({ id: true });
export const courseSlugSchema = baseSchema.pick({ slug: true });

// Types for courses - used to type API request params and within Components
export type Course = typeof courses.$inferSelect;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type NewCourseParams = z.infer<typeof insertCourseParams>;
export type UpdateCourseParams = z.infer<typeof updateCourseParams>;
export type CourseId = z.infer<typeof courseIdSchema>["id"];
export type CourseSlug = z.infer<typeof courseSlugSchema>["slug"];

// this type infers the return from getCourse() - meaning it will include any joins
export type CompleteCourse = Awaited<
  ReturnType<typeof getCourses>
>["courses"][number];
