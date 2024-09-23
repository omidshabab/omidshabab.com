import { NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";
import { Post } from "@/types";
import { defaultLocale, locales } from "@/lib/locales";
import { siteUrl } from "@/config/routes";

export async function GET() {
  const posts = await getPosts();

  const sitemap = generateSitemap(posts);

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function generateSitemap(posts: Post[]): string {
  const staticPaths = generateStaticPaths();
  const postPaths = generatePostPaths(posts);

  const allPaths = [...staticPaths, ...postPaths];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths.join("")}
  </urlset>`;
}

function generateStaticPaths(): string[] {
  const staticPaths: string[] = [];
  const staticRoutes = ["/", "/blog"];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticPaths.push(`
        <url>
          <loc>${siteUrl}${
        locale !== defaultLocale ? `/${locale}` : ""
      }${route}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `);
    }
  }

  return staticPaths;
}

function generatePostPaths(posts: Post[]): string[] {
  const postPaths: string[] = [];

  for (const post of posts) {
    postPaths.push(`
      <url>
        <loc>${siteUrl}/${
      post.locale !== defaultLocale ? `${post.locale}/` : ""
    }blog/${post.slug}</loc>
        <lastmod>${post.updatedAt}</lastmod>
      </url>
    `);
  }

  return postPaths;
}
