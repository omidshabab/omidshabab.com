import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  PostId,
  NewPostParams,
  UpdatePostParams,
  updatePostSchema,
  insertPostSchema,
  posts,
  postIdSchema,
} from "@/lib/db/schema/posts";
import { getUserAuth } from "@/lib/auth/utils";

export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({
    ...post,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(posts).values(newPost).returning();
    return { post: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePost = async (id: PostId, post: UpdatePostParams) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const newPost = updatePostSchema.parse({
    ...post,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(posts)
      .set({ ...newPost, tags: [], updatedAt: new Date() })
      .where(and(eq(posts.id, postId!), eq(posts.userId, session?.user.id!)))
      .returning();
    return { post: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePost = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(posts)
      .where(and(eq(posts.id, postId!), eq(posts.userId, session?.user.id!)))
      .returning();
    return { post: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
