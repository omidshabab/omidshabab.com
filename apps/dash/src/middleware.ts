import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fa"],

  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|cursors).*)",
    "/(en|fa)/:path*",
  ],
};
