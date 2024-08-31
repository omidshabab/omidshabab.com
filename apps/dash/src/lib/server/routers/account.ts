import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { publicProcedure, router } from "@/lib/server/trpc";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { RoleType } from "@/types";
import { eq } from "drizzle-orm";

export type UserType = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  username?: string;
  phone?: string;
  role: RoleType;
};

export const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user.id!));

    return { user: user[0] };
  }),
  getSubscription: publicProcedure.query(async () => {
    const sub = await getUserSubscriptionPlan();
    return sub;
  }),
});
