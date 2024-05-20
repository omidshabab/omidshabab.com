import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
// const locales = ["en", "fa"];

export default getRequestConfig(async () => {
  // Validate that the incoming `locale` parameter is valid
  // if (!locales.includes(locale as any)) notFound;

  const locale = "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
