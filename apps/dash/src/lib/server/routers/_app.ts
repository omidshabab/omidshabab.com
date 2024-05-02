import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";

export const appRouter = router({
  account: accountRouter,
});

export type AppRouter = typeof appRouter;
