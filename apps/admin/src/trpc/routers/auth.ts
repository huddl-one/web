import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@huddl/db";

import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser, getPermissions } = getKindeServerSession();
    const user = getUser();

    const kindePermissions = getPermissions()

    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!(kindePermissions.permissions?.includes("admin"))) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbuser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

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

    if (!dbuser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          firstName: user.given_name!,
          lastName: user.family_name!,
          roles: kindePermissions.permissions || ["user"],
          username, // Add the username property here
        },
      });
    }

    return {
      success: true,
    };
  }),
});
