import { db } from "@/lib/db";
import {
  Component,
  ComponentId,
  componentIdSchema,
  components,
  ComponentSlug,
  componentSlugSchema,
} from "@/lib/db/schema/components";
import { isValidLocale } from "@/lib/utils";
import { eq, and } from "drizzle-orm";
import { getLocale } from "next-intl/server";

export const getComponents = async () => {
  const locale = await getLocale();

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const rows = await db.select().from(components).where(eq(components.locale, newLocale));

  const t: Component[] = rows;
  return { components: t };
};

export const getComponentById = async (id?: ComponentId) => {
  const locale = await getLocale();

  const { id: componentId } = componentIdSchema.parse({ id });

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const [row] = await db
    .select()
    .from(components)
    .where(and(eq(components.id, componentId), eq(components.locale, newLocale)));
  if (row === undefined) return {};
  const t = row;
  return { component: t };
};

export const getComponentBySlug = async (slug?: ComponentSlug) => {
  const { slug: componentSlug } = componentSlugSchema.parse({ slug });
  const [row] = await db
    .select()
    .from(components)
    .where(and(eq(components.slug, componentSlug)));
  if (row === undefined) return {};
  const t = row;
  return { component: t };
};
