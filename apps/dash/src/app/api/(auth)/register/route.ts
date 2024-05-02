import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia";

import type { NextRequest } from "next/server";
import { generateUsername } from "@/lib/auth/utils";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { email, username, password } = data;

  // basic check
  if (typeof email !== "string" || email.length < 6 || email.length > 31) {
    return NextResponse.json(
      {
        error: "Invalid email",
      },
      {
        status: 400,
      }
    );
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // find user by key
    // and validate password
    const key = await auth.useKey("email", email.toLowerCase(), password);

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(req.method, context);
    authRequest.setSession(session);

    return new Response(
      JSON.stringify({
        message: session,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      try {
        const user = await auth.createUser({
          key: {
            providerId: "email", // auth method
            providerUserId: email.toLowerCase(), // unique id when using "username" auth method
            password, // hashed by Lucia
          },
          attributes: {
            email,
            name: "",
            username: generateUsername(email),
          },
        });

        const session = await auth.createSession({
          userId: user.userId,
          attributes: {},
        });

        const authRequest = auth.handleRequest(req.method, context);
        authRequest.setSession(session);

        return new Response(
          JSON.stringify({
            message: session,
          }),
          {
            status: 201,
          }
        );
      } catch (e) {
        // user does not exist or invalid password
        return NextResponse.json(
          {
            error: "Incorrect email or password",
          },
          {
            status: 400,
          }
        );
      }
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
