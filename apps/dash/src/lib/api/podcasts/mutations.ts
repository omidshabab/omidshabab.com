import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  PodcastId,
  NewPodcastParams,
  UpdatePodcastParams,
  updatePodcastSchema,
  insertPodcastSchema,
  podcasts,
  podcastIdSchema,
} from "@/lib/db/schema/podcasts";
import { getUserAuth } from "@/lib/auth/utils";

export const createPodcast = async (podcast: NewPodcastParams) => {
  const { session } = await getUserAuth();
  const newPodcast = insertPodcastSchema.parse({
    ...podcast,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(podcasts).values(newPodcast).returning();
    return { podcast: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePodcast = async (id: PodcastId, podcast: UpdatePodcastParams) => {
  const { session } = await getUserAuth();
  const { id: podcastId } = podcastIdSchema.parse({ id });
  const newPodcast = updatePodcastSchema.parse({
    ...podcast,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(podcasts)
      .set({ ...newPodcast, tags: [], updatedAt: new Date() })
      .where(and(eq(podcasts.id, podcastId!), eq(podcasts.userId, session?.user.id!)))
      .returning();
    return { podcast: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePodcast = async (id: PodcastId) => {
  const { session } = await getUserAuth();
  const { id: podcastId } = podcastIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(podcasts)
      .where(and(eq(podcasts.id, podcastId!), eq(podcasts.userId, session?.user.id!)))
      .returning();
    return { podcast: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
