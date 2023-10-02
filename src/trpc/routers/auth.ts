import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { db } from "@web/db";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = getUser();

        if (!user || !user.id) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const dbuser = await db.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!dbuser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email!,
                    firstName: user.given_name!,
                    lastName: user.family_name!,
                },
            });
        }

        return {
            success: true,
        };
    }),
});
