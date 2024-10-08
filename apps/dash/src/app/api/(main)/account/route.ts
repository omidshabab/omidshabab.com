import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const { session } = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    username?: string;
  };

  await db
    .update(users)
    .set({ ...body })
    .where(eq(users.id, session.user.id));
  revalidatePath("/account");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
