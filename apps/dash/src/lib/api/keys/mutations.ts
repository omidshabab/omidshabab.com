import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  KeyId,
  NewKeyParams,
  UpdateKeyParams,
  updateKeySchema,
  insertKeySchema,
  keys,
  keyIdSchema,
} from "@/lib/db/schema/keys";
import { getUserAuth } from "@/lib/auth/utils";

export const createKey = async (key: NewKeyParams) => {
  const { session } = await getUserAuth();
  const newKey = insertKeySchema.parse({
    ...key,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(keys).values(newKey).returning();
    return { key: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateKey = async (id: KeyId, key: UpdateKeyParams) => {
  const { session } = await getUserAuth();
  const { id: keyId } = keyIdSchema.parse({ id });
  const newKey = updateKeySchema.parse({
    ...key,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(keys)
      .set({ ...newKey, updatedAt: new Date() })
      .where(and(eq(keys.id, keyId!), eq(keys.userId, session?.user.id!)))
      .returning();
    return { key: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteKey = async (id: KeyId) => {
  const { session } = await getUserAuth();
  const { id: keyId } = keyIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(keys)
      .where(and(eq(keys.id, keyId!), eq(keys.userId, session?.user.id!)))
      .returning();
    return { key: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
