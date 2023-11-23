import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@huddl/db";

import { customHmset } from "@web/lib/helpers/custom-hmset";
import { redis } from "@web/lib/redis";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const cacheKey = `user:${user.id}`;

    let cachedUser = await redis.HGETALL(cacheKey);

    if (cachedUser) {
      return {
        success: true,
      };
    }

    const dbuser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (dbuser) {
      // Cache user
      await customHmset(cacheKey, dbuser);

      return {
        success: true,
      };
    }

    // Making user's username
    let username = `${user.email?.split("@")!}`;

    // Check if someone else has this username
    const usernameTaken = await db.user.findFirst({
      where: {
        username,
      },
    });

    // If username is taken, add a random number to username
    if (usernameTaken) {
      const random = Math.floor(Math.random() * 1000);
      username = `${username}${random}`;
    }

    const userCreation = await db.user.create({
      data: {
        id: user.id,
        email: user.email!,
        firstName: user.given_name!,
        lastName: user.family_name!,
        username,
      },
    });
    
    if (!userCreation) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    // Cache user
    await customHmset(cacheKey, userCreation);

    return {
      success: true,
    };
  }),
});
