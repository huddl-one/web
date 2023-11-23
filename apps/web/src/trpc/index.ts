import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { friendRouter } from "./routers/friend";
import { messageRouter } from "./routers/message";
import { userDetailsRouter } from "./routers/userDetails";
import { router } from "./trpc";

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    userDetails: userDetailsRouter,
    friend: friendRouter,
    message: messageRouter,
});

export type AppRouter = typeof appRouter;
