import { Locale } from "@/lib/locales";

export type Post = {
  title: string;
  desc: string;
  slug: string;
  image: string;
  locale: Locale;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Direction = "rtl" | "ltr";
