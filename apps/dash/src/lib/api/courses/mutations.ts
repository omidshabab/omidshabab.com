import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  CourseId,
  NewCourseParams,
  UpdateCourseParams,
  updateCourseSchema,
  insertCourseSchema,
  courses,
  courseIdSchema,
} from "@/lib/db/schema/courses";
import { getUserAuth } from "@/lib/auth/utils";

export const createCourse = async (course: NewCourseParams) => {
  const { session } = await getUserAuth();
  const newCourse = insertCourseSchema.parse({
    ...course,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(courses).values(newCourse).returning();
    return { course: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourse = async (id: CourseId, course: UpdateCourseParams) => {
  const { session } = await getUserAuth();
  const { id: courseId } = courseIdSchema.parse({ id });
  const newCourse = updateCourseSchema.parse({
    ...course,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(courses)
      .set({ ...newCourse, tags: [], updatedAt: new Date() })
      .where(and(eq(courses.id, courseId!), eq(courses.userId, session?.user.id!)))
      .returning();
    return { course: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourse = async (id: CourseId) => {
  const { session } = await getUserAuth();
  const { id: courseId } = courseIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(courses)
      .where(and(eq(courses.id, courseId!), eq(courses.userId, session?.user.id!)))
      .returning();
    return { course: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
