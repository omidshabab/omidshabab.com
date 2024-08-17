import { db } from "@/lib/db";
import {
  Portfolio,
  PortfolioId,
  portfolioIdSchema,
  portfolios,
  PortfolioSlug,
  portfolioSlugSchema,
} from "@/lib/db/schema/portfolios";
import { isValidLocale } from "@/lib/utils";
import { eq, and } from "drizzle-orm";
import { getLocale } from "next-intl/server";

export const getPortfolios = async () => {
  const locale = await getLocale();

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const rows = await db.select().from(portfolios).where(eq(portfolios.locale, newLocale));

  const t: Portfolio[] = rows;
  return { portfolios: t };
};

export const getPortfolioById = async (id?: PortfolioId) => {
  const locale = await getLocale();

  const { id: portfolioId } = portfolioIdSchema.parse({ id });

  let newLocale: "en" | "fa" = "en"; // Default value or handle appropriately

  if (isValidLocale(locale)) {
    newLocale = locale;
  }

  const [row] = await db
    .select()
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.locale, newLocale)));
  if (row === undefined) return {};
  const t = row;
  return { portfolio: t };
};

export const getPortfolioBySlug = async (slug?: PortfolioSlug) => {
  const { slug: portfolioSlug } = portfolioSlugSchema.parse({ slug });
  const [row] = await db
    .select()
    .from(portfolios)
    .where(and(eq(portfolios.slug, portfolioSlug)));
  if (row === undefined) return {};
  const t = row;
  return { portfolio: t };
};
