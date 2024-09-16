import { Pathnames, LocalePrefix } from "next-intl/routing";
import { locales } from "./lib/locales";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/blog": "/blog",
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.SITE_URL
  ? `${process.env.SITE_URL}`
  : `http://localhost:${port}`;
