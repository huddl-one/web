import { authRouter } from "./routers/auth";
import { problemRouter } from "./routers/problem";
import { router } from "./trpc";

export const appRouter = router({
    problem: problemRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
