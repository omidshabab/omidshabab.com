import { baseApiUrl } from "@/config/routes";
import { Post } from "@/types";
import { locales } from "../locales";

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  for (const locale of locales) {
    const res = await fetch(`${baseApiUrl}/posts?locale=${locale}`, {
      next: { revalidate: 10 },
    });

    const localePosts = await res.json();

    posts.push(...localePosts);
  }

  return posts;
}
