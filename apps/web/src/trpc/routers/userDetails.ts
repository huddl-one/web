import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@huddl/db";

import { customHmset } from "@web/lib/helpers/custom-hmset";
import { redis } from "@web/lib/redis";
import { privateProcedure, router } from "../trpc";

export const userDetailsRouter = router({
  getUsername: privateProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const cacheKey = `user:${user.id}`;

    let cachedUsername = await redis.HGET(cacheKey, "username");

    if (cachedUsername) {
      return {
        success: true,
        username: cachedUsername,
      };
    }

    const dbuser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    
    if (!dbuser) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    // Cache user
    await customHmset(cacheKey, dbuser);

    return {
      success: true,
      username: dbuser.username,
    };
  }),
});
