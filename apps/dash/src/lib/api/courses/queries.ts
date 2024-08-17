import { db } from "@/lib/db";
import {
  Course,
  CourseId,
  courseIdSchema,
  courses,
  CourseSlug,
  courseSlugSchema,
} from "@/lib/db/schema/courses";
import { isValidLocale } from "@/lib/utils";
import { eq, and } from "drizzle-orm";
import { getLocale } from "next-intl/server";

export const getCourses = async () => {
  const locale = await getLocale();

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const rows = await db.select().from(courses).where(eq(courses.locale, newLocale));

  const t: Course[] = rows;
  return { courses: t };
};

export const getCourseById = async (id?: CourseId) => {
  const locale = await getLocale();

  const { id: courseId } = courseIdSchema.parse({ id });

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const [row] = await db
    .select()
    .from(courses)
    .where(and(eq(courses.id, courseId), eq(courses.locale, newLocale)));
  if (row === undefined) return {};
  const t = row;
  return { course: t };
};

export const getCourseBySlug = async (slug?: CourseSlug) => {
  const { slug: courseSlug } = courseSlugSchema.parse({ slug });
  const [row] = await db
    .select()
    .from(courses)
    .where(and(eq(courses.slug, courseSlug)));
  if (row === undefined) return {};
  const t = row;
  return { course: t };
};
