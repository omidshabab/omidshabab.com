import { db } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { resend } from "../email";
import { v4 as uuidv4 } from "uuid";
import { authRoutes } from "@/config/routes";
import VerifyEmail from "../../../emails/verify";
import { RoleType } from "@/types";
// import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/users";
import { accounts } from "../db/schema/accounts";
import { verificationTokens } from "../db/schema/tokens";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users as any,
    accountsTable: accounts as any,
    verificationTokensTable: verificationTokens as any,
  }) as Adapter,
  pages: {
    signIn: authRoutes.default,
    error: authRoutes.error,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const payload = {
          email: identifier,
          url,
        };

        const result = await resend.emails.send({
          from: "omidshabab. <hey@omidshabab.com>",
          to: [payload.email],
          subject: "Confirm Your Email to Access Your Account",
          react: VerifyEmail({ url: payload.url }),
        });

        if (result.error) {
          console.log(`ERROR::NextAuth-EmailProvider: ${result.error}`);

          throw new Error(`${result.error}`);
        }
      },
    }),
  ],
  events: {
    async signIn(data) {
      /* on successful sign in */
    },
    async signOut(data) {
      /* on signout */
    },
    async createUser({ ...data }) {
      /* user created */
    },
    async updateUser(data) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount({ user, account }) {
      await db
        .update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id));
    },
    async session(data) {
      /* session is active */
    },
  },
  logger: {
    error(code, metadata) {
      //
    },
    warn(code) {
      //
    },
    debug(code, metadata) {
      //
    },
  },
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
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
