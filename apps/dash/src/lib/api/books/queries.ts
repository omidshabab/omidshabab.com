import { db } from "@/lib/db";
import {
  Book,
  BookId,
  bookIdSchema,
  books,
  BookSlug,
  bookSlugSchema,
} from "@/lib/db/schema/books";
import { isValidLocale } from "@/lib/utils";
import { eq, and } from "drizzle-orm";
import { getLocale } from "next-intl/server";

export const getBooks = async () => {
  const locale = await getLocale();

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const rows = await db.select().from(books).where(eq(books.locale, newLocale));

  const t: Book[] = rows;
  return { books: t };
};

export const getBookById = async (id?: BookId) => {
  const locale = await getLocale();

  const { id: bookId } = bookIdSchema.parse({ id });

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const [row] = await db
    .select()
    .from(books)
    .where(and(eq(books.id, bookId), eq(books.locale, newLocale)));
  if (row === undefined) return {};
  const t = row;
  return { book: t };
};

export const getBookBySlug = async (slug?: BookSlug) => {
  const { slug: bookSlug } = bookSlugSchema.parse({ slug });
  const [row] = await db
    .select()
    .from(books)
    .where(and(eq(books.slug, bookSlug)));
  if (row === undefined) return {};
  const t = row;
  return { book: t };
};
