import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { postsRouter } from "./posts";

export const appRouter = router({
  account: accountRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
