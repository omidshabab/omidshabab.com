import { db } from "@/lib/db";
import {
  Podcast,
  PodcastId,
  podcastIdSchema,
  podcasts,
  PodcastSlug,
  podcastSlugSchema,
} from "@/lib/db/schema/podcasts";
import { isValidLocale } from "@/lib/utils";
import { eq, and } from "drizzle-orm";
import { getLocale } from "next-intl/server";

export const getPodcasts = async () => {
  const locale = await getLocale();

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const rows = await db.select().from(podcasts).where(eq(podcasts.locale, newLocale));

  const t: Podcast[] = rows;
  return { podcasts: t };
};

export const getPodcastById = async (id?: PodcastId) => {
  const locale = await getLocale();

  const { id: podcastId } = podcastIdSchema.parse({ id });

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const [row] = await db
    .select()
    .from(podcasts)
    .where(and(eq(podcasts.id, podcastId), eq(podcasts.locale, newLocale)));
  if (row === undefined) return {};
  const t = row;
  return { podcast: t };
};

export const getPodcastBySlug = async (slug?: PodcastSlug) => {
  const { slug: podcastSlug } = podcastSlugSchema.parse({ slug });
  const [row] = await db
    .select()
    .from(podcasts)
    .where(and(eq(podcasts.slug, podcastSlug)));
  if (row === undefined) return {};
  const t = row;
  return { podcast: t };
};
