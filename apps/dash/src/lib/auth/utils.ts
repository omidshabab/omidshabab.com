import { redirect } from "next/navigation";
import { getPageSession } from "@/lib/auth/lucia";
import { v4 as uuidv4 } from "uuid";
import { authRoutes } from "@/config/routes";
import { env } from "../env.mjs";
import { Google } from "arctic";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      username?: string;
      phone?: string;
      role: "user" | "admin" | "manager";
    };
  } | null;
};

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NEXTAUTH_URL + "/api/auth/google"
);

export const getUserAuth = async (): Promise<AuthSession> => {
  const session = await getPageSession();
  if (!session) return { session: null };
  return {
    session: {
      user: {
        id: session.user?.userId,
        name: session.user?.name,
        email: session.user?.email,
        username: session.user?.username,
        phone: session.user?.phone,
        role: session.user?.role,
      },
    },
  };
};

export const checkAuth = async () => {
  const session = await getPageSession();

  if (!session) redirect(authRoutes.default);
};

export function generateUsername(email: string): string {
  const parts = email.split("@");
  const usernamePart = parts[0].toLowerCase().replace(/[^a-z0-9\-_]/gi, ""); // Remove non-alphanumeric characters and hyphens

  const username = `${usernamePart.slice(
    0,
    usernamePart.length
  )}-${uuidv4().slice(0, 5)}`; // Combine initials and UUID

  return username;
}
