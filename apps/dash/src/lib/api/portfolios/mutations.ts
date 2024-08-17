import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  PortfolioId,
  NewPortfolioParams,
  UpdatePortfolioParams,
  updatePortfolioSchema,
  insertPortfolioSchema,
  portfolios,
  portfolioIdSchema,
} from "@/lib/db/schema/portfolios";
import { getUserAuth } from "@/lib/auth/utils";

export const createPortfolio = async (portfolio: NewPortfolioParams) => {
  const { session } = await getUserAuth();
  const newPortfolio = insertPortfolioSchema.parse({
    ...portfolio,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(portfolios).values(newPortfolio).returning();
    return { portfolio: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolio = async (id: PortfolioId, portfolio: UpdatePortfolioParams) => {
  const { session } = await getUserAuth();
  const { id: portfolioId } = portfolioIdSchema.parse({ id });
  const newPortfolio = updatePortfolioSchema.parse({
    ...portfolio,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(portfolios)
      .set({ ...newPortfolio, tags: [], updatedAt: new Date() })
      .where(and(eq(portfolios.id, portfolioId!), eq(portfolios.userId, session?.user.id!)))
      .returning();
    return { portfolio: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolio = async (id: PortfolioId) => {
  const { session } = await getUserAuth();
  const { id: portfolioId } = portfolioIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(portfolios)
      .where(and(eq(portfolios.id, portfolioId!), eq(portfolios.userId, session?.user.id!)))
      .returning();
    return { portfolio: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
