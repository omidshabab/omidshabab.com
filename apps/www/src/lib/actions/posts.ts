import { baseApiUrl } from "@/config/routes";
import { Locale } from "../locales";
import { Post } from "@/types";

export default async function getPosts(locale: Locale) {
  const response = await fetch(`${baseApiUrl}/posts?locale=${locale}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await response.json();

  return { posts };
}
