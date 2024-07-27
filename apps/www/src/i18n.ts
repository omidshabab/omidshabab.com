"server-only";

import { notFound, redirect } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { type AbstractIntlMessages } from "next-intl";
import { locales, type Locale } from "@/lib/locales";
import { defaultRoutes } from "./config/routes";

const messageImports = {
  en: () => import("../translations/en.json"),
  fa: () => import("../translations/fa.json"),
} as const satisfies Record<Locale, () => Promise<{ default: AbstractIntlMessages }>>;

export function isValidLocale(locale: unknown): locale is Locale {
  return locales.some((l) => l === locale);
}

export default getRequestConfig(async (params) => {
  const baseLocale = new Intl.Locale(params.locale).baseName;
  if (!isValidLocale(baseLocale)) redirect(defaultRoutes.default);

  const messages = (await messageImports[baseLocale]()).default;
  return {
    messages,
  };
});