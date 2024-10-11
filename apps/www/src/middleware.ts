import { defaultLocale, locales } from "@/lib/locales";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "as-needed",
});

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const userAgent = req.headers.get("user-agent") || "";

  if (PUBLIC_FILE.test(url.pathname)) {
    return NextResponse.next();
  }

  if (userAgent.includes("Googlebot") || userAgent.includes("Bingbot")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
