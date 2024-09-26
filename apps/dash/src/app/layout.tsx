import type { Metadata } from "next";
import "@repo/ui/globals.css"
import { LangDir, LangFont } from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@repo/ui/components/sonner";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from '@vercel/analytics/react';
import { cn } from "@repo/ui/lib/utils";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { uploadRouter } from "@/uploadthing/server";
import { extractRouterConfig } from "uploadthing/server";
import Providers from "@/components/ProvidersWrapper";
import "@/styles/globals.css";

import "@/styles/editor.css";
import { env } from "@/lib/env.mjs";
import NextAuthProvider from "@/lib/auth/Provider";

export async function generateMetadata(): Promise<Metadata> {
  const tGeneral = getTranslations("general")
  const tMetadata = getTranslations("metadata")

  return {
    title: {
      default: `${(await tGeneral)("dashboard")} ,${(await tMetadata)("name")}.`,
      template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("name")}.`,
    },
    description: (await tMetadata)("description"),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  const font = LangFont(locale);
  const dir = LangDir(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={cn(
        font,
        "cursor-default antialiased"
      )}>
        <NextAuthProvider>
          <Providers>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}>
              <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
              {children}
              <Toaster
                font={font}
                others={{
                  position: "top-center",
                }} />
            </NextIntlClientProvider>
          </Providers>
        </NextAuthProvider>
      </body>
      <Analytics />
      <GoogleAnalytics gaId={env.DASHBOARD_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
