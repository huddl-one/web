import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@web/trpc";

export const trpc = createTRPCReact<AppRouter>({});
