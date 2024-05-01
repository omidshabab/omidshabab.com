import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { site } from "../config/site";
import { cn } from "@repo/ui/lib/utils";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
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
    creator: "@iamomidshabab",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${site.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        font.className,
        "cursor-default"
      )}>
        {children}
      </body>
    </html>
  );
}
