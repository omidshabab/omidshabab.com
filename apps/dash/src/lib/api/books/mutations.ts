import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  BookId,
  NewBookParams,
  UpdateBookParams,
  updateBookSchema,
  insertBookSchema,
  books,
  bookIdSchema,
} from "@/lib/db/schema/books";
import { getUserAuth } from "@/lib/auth/utils";

export const createBook = async (book: NewBookParams) => {
  const { session } = await getUserAuth();
  const newBook = insertBookSchema.parse({
    ...book,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(books).values(newBook).returning();
    return { book: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBook = async (id: BookId, book: UpdateBookParams) => {
  const { session } = await getUserAuth();
  const { id: bookId } = bookIdSchema.parse({ id });
  const newBook = updateBookSchema.parse({
    ...book,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(books)
      .set({ ...newBook, tags: [], updatedAt: new Date() })
      .where(and(eq(books.id, bookId!), eq(books.userId, session?.user.id!)))
      .returning();
    return { book: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBook = async (id: BookId) => {
  const { session } = await getUserAuth();
  const { id: bookId } = bookIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(books)
      .where(and(eq(books.id, bookId!), eq(books.userId, session?.user.id!)))
      .returning();
    return { book: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
