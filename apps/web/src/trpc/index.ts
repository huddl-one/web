import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { router } from "./trpc";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
