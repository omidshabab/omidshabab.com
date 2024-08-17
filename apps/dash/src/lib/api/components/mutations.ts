import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import {
  ComponentId,
  NewComponentParams,
  UpdateComponentParams,
  updateComponentSchema,
  insertComponentSchema,
  components,
  componentIdSchema,
} from "@/lib/db/schema/components";
import { getUserAuth } from "@/lib/auth/utils";

export const createComponent = async (component: NewComponentParams) => {
  const { session } = await getUserAuth();
  const newComponent = insertComponentSchema.parse({
    ...component,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(components).values(newComponent).returning();
    return { component: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateComponent = async (id: ComponentId, component: UpdateComponentParams) => {
  const { session } = await getUserAuth();
  const { id: componentId } = componentIdSchema.parse({ id });
  const newComponent = updateComponentSchema.parse({
    ...component,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(components)
      .set({ ...newComponent, tags: [], updatedAt: new Date() })
      .where(and(eq(components.id, componentId!), eq(components.userId, session?.user.id!)))
      .returning();
    return { component: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteComponent = async (id: ComponentId) => {
  const { session } = await getUserAuth();
  const { id: componentId } = componentIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(components)
      .where(and(eq(components.id, componentId!), eq(components.userId, session?.user.id!)))
      .returning();
    return { component: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
