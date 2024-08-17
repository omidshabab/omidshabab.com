import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { cache } from "react";
import * as context from "next/headers";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import { client } from "@/lib/db";

export const auth = lucia({
  adapter: postgresAdapter(client, {
    user: "users",
    key: "passwords",
    session: "sessions",
  }),
  env: "DEV",
  middleware: nextjs_future(),
  sessionCookie: { expires: false },
  getUserAttributes: (data) => {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      name: data.name,
      role: data.role,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
