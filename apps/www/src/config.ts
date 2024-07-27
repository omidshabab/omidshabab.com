import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "fa"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  //   "/blog": {
  //     en: "/blog",
  //     fa: "/blog",
  //   },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.SITE_URL
  ? `${process.env.SITE_URL}`
  : `http://localhost:${port}`;
