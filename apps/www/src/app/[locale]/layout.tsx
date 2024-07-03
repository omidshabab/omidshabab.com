import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from '@vercel/analytics/react';
import { site } from "@/config/site";
import { cn } from "@repo/ui/lib/utils";
import { type Locale } from "@/lib/locales";
import { getMessages, getTranslations } from "next-intl/server";
import { env } from "@/lib/env.mjs";
import { LangDir, LangFont } from "@/lib/fonts";
import { NextIntlClientProvider } from "next-intl";

import "@/styles/editor.css";
import Head from "next/head";

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
  const tGeneral = getTranslations("general")

  return {
    title: {
      default: (await tGeneral)("site_name"),
      template: `%s${(await tGeneral)("separator")} ${(await tGeneral)("site_name")}`,
    },
    metadataBase: new URL(site.url),
    description: site.description,
    authors: [
      {
        name: "omidshabab",
        url: "https://omidshabab.com",
      },
    ],
    creator: "omidshabab",
    openGraph: {
      type: "website",
      locale: "en",
      url: site.url,
      title: site.name,
      description: site.description,
      siteName: site.name,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
      images: [site.ogImage],
      creator: "@omidshabab",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

export default async function RootLayout({
  children,
  params: {
    locale
  }
}: {
  children: React.ReactNode,
  params: {
    locale: Locale
  }
}) {
  const messages = await getMessages();

  const font = LangFont(locale);
  const dir = LangDir(locale);

  return (
    <html lang={locale} dir={dir}>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var fullres = document.createElement('script');
                fullres.async = true;
                fullres.src = 'https://t.fullres.net/omidshabab.js?' + (new Date() - new Date() % 43200000);
                document.head.appendChild(fullres);
              })();
            `,
          }}
        />
      </Head>
      <body className={cn(
        font,
        "cursor-default"
      )}>
        <NextIntlClientProvider
          messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
      <Analytics />
      <GoogleAnalytics gaId={env.WWW_GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
