import { db } from "@/lib/db";
import {
  Key,
  KeyId,
  keyIdSchema,
  keys,
} from "@/lib/db/schema/keys";
import { eq, and } from "drizzle-orm";
import {getUserAuth} from "@/lib/auth/utils";

export const getKeys = async () => {
  const { session } = await getUserAuth();

  const rows = await db.select().from(keys).where(eq(keys.userId, session?.user.id!));

  const t: Key[] = rows;
  return { keys: t };
};

export const getKeyById = async (id?: KeyId) => {
  const { session } = await getUserAuth();

  const { id: keyId } = keyIdSchema.parse({ id });

  const [row] = await db
    .select()
    .from(keys)
    .where(and(eq(keys.id, keyId), eq(keys.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { key: t };
};
