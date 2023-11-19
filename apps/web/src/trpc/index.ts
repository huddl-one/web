import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { friendRouter } from "./routers/friend";
import { userDetailsRouter } from "./routers/userDetails";
import { router } from "./trpc";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    userDetails: userDetailsRouter,
    friend: friendRouter,
});

export type AppRouter = typeof appRouter;
