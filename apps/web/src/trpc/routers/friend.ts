import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@huddl/db";

import { redis } from "@web/lib/redis";
import { addFriendValidator } from "@web/lib/validations/add-friend";
import { privateProcedure, router } from "../trpc";

export const friendRouter = router({
  makeRequest: privateProcedure
  .input(addFriendValidator)
  .mutation(async ({
    input: { username },
  }) => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }

    const cacheKey = `user:${user.id}`;

    let cachedUser = await redis.hgetall(cacheKey);

    if (!cachedUser) {
      cachedUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!cachedUser) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }

      await redis.hmset(cacheKey, cachedUser);
    }

    // cachedUser = {
    //   id: cachedUser.id,
    //       username: cachedUser.username,
    //       firstName: cachedUser.firstName,
    //       lastName: cachedUser.lastName,
    // };

    // Make sure we don't add ourselves
    if (username === cachedUser.username) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "You can't add yourself as a friend" });
    }

    const friend = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!friend) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    // make sure we don't add the same friend twice
    // TODO: this should be updated with redis
    const existingFriend = await db.user.findFirst({
      where: {
        id: user.id,
        friends: {
          some: {
            id: friend.id,
          },
        },
      },
    });

    if (existingFriend) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Friend already added" });
    }

    const friendRequestcacheKey = `user:${friend.id}:friend-requests`;

    const friendRequestExists = await redis.sismember(friendRequestcacheKey, cachedUser.id);

    if (friendRequestExists) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Friend request already sent" });
    }

    const friendRequest = await db.friendRequest.create({
      data: {
        senderId: user.id,
        receiverId: friend.id,
      },
    });

    if (!friendRequest) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create friend request" });
    }

    await redis.sadd(friendRequestcacheKey, cachedUser.id);

    return {
      success: true,
    }
}),
getRequests: privateProcedure
.query(async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  const cacheKey = `user:${user.id}:friend-requests`;

  let friendRequests = await redis.smembers(cacheKey);

  if (!friendRequests || friendRequests.length === 0) {
    const friendRequestRecords = await db.friendRequest.findMany({
      where: {
        receiverId: user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!friendRequestRecords) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Friend requests not found" });
    }

    friendRequests = friendRequestRecords.map((request) => {
      return {
        id: request.sender.id,
        username: request.sender.username,
        firstName: request.sender.firstName,
        lastName: request.sender.lastName,
      } as any;
    });
  }
  else {
    // based on the ids, get the usernames from redis using cache key user:id
    let cachedFriendRequests = [];

    for (let i = 0; i < friendRequests.length; i++) {
      const friendRequesterId = friendRequests[i];
      const friend = await redis.hgetall(`user:${friendRequesterId}`);

      if (friend) {
        cachedFriendRequests[i] = {
          id: friend.id,
          username: friend.username,
          firstName: friend.firstName,
          lastName: friend.lastName,
        } as any;
        }
      else {
        const friend = await db.user.findUnique({
          where: {
            id: friendRequesterId,
          },
        });

        if (!friend) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Friend request not found" });
        }

        cachedFriendRequests[i] = {
          id: friend.id,
          username: friend.username,
          firstName: friend.firstName,
          lastName: friend.lastName,
        } as any;

        await redis.hmset(`user:${friendRequesterId}`, friend);
      }
    }

    friendRequests = cachedFriendRequests;
  }

  return friendRequests;
}
),
acceptRequest: privateProcedure
.input(addFriendValidator)
.mutation(async ({
  input: { username: friendUsername },
}) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  // get friend id from username
  const friendRequester = await db.user.findUnique({
    where: {
      username: friendUsername,
    },
  });

  if (!friendRequester) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
  }

  const cacheKey = `user:${user.id}:friend-requests`;

  await redis.srem(cacheKey, friendRequester.id);

  let friendRequest = await db.friendRequest.findFirst({
    where: {
      receiverId: user.id,
      senderId: friendRequester.id,
    },
  });

  if (!friendRequest) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Friend request not found" });
  }

  try {
    await db.friendRequest.delete({
      where: {
        id: friendRequest.id,
      },
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        friends: {
          connect: {
            id: friendRequester.id,
          },
        },
      },
    });
  
    await db.user.update({
      where: {
        id: friendRequester.id,
      },
      data: {
        friends: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  
    const friendsCacheKey = `user:${user.id}:friends`;
    const otherFriendsCacheKey = `user:${friendRequester.id}:friends`;
  
    await redis.sadd(friendsCacheKey, friendRequester.id);
    await redis.sadd(otherFriendsCacheKey, user.id);

    return {
      success: true,
    }
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to accept friend request" });
  }
}),
declineRequest: privateProcedure
.input(addFriendValidator)
.mutation(async ({
  input: { username: friendUsername },
}) => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  // get friend id from username
  const friendRequester = await db.user.findUnique({
    where: {
      username: friendUsername,
    },
  });

  if (!friendRequester) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
  }

  const cacheKey = `user:${user.id}:friend-requests`;

  let friendRequest = await db.friendRequest.findFirst({
    where: {
      receiverId: user.id,
      senderId: friendRequester.id,
    },
  });

  if (!friendRequest) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Friend request not found" });
  }

  await db.friendRequest.delete({
    where: {
      id: friendRequest.id,
    },
  });

  await redis.srem(cacheKey, friendRequester.id);

  return {
    success: true,
  }
}),
});
