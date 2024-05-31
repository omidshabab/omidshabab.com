import { api } from "@/lib/trpc/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { post } = await api.posts.getPostBySlug.query({ slug: params.slug });

  return NextResponse.json(post, { status: 200 });
}
