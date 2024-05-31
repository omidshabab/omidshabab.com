import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const authRequest = auth.handleRequest(request.method, context);

    // check if user is authenticated
    const session = await authRequest.validate();
    if (!session) {
      return new Response(null, {
        status: 401,
      });
    }

    // make sure to invalidate the current session!
    await auth.invalidateSession(session.sessionId);

    // delete session cookie
    authRequest.setSession(null);
    return NextResponse.json(session, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: `An unknown error occurred, the error is: ${e}`,
      },
      {
        status: 500,
      }
    );
  }
};
