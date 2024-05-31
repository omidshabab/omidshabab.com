import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const results = await db.select().from(posts);

  return NextResponse.json(results, { status: 200 });
}
