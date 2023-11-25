import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@huddl/db";

import { customHmset } from "@web/lib/helpers/custom-hmset";
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

    let cachedUser: any = await redis.HGETALL(cacheKey);

    if (!cachedUser) {
      cachedUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!cachedUser) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }

      await customHmset(cacheKey, cachedUser);
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

    const friendRequestExists = await redis.SISMEMBER(friendRequestcacheKey, cachedUser.id);

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

    // pusherServer.trigger(toPusherKey(`user:${friend.id}:friend_requests`), "friend_requests", {senderName: user.given_name + " " + user.family_name, senderUsername: cachedUser.username});

    await redis.SADD(friendRequestcacheKey, cachedUser.id);

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

  let friendRequests = await redis.SMEMBERS(cacheKey);

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
      const friend = await redis.HGETALL(`user:${friendRequesterId}`);

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

        customHmset(`user:${friendRequesterId}`, friend);
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

  await redis.SREM(cacheKey, friendRequester.id);

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

    let chatCacheKey = "";
    if (user.id < friendRequester.id) {
      chatCacheKey = `chat:${user.id}--${friendRequester.id}`;
    }
    else {
      chatCacheKey = `chat:${friendRequester.id}--${user.id}`;
    }

    await db.chat.create({
      data: {
        id: chatCacheKey,
        users: {
          connect: [
            {
              id: user.id,
            },
            {
              id: friendRequester.id,
            },
          ],
        },
      },
    });
    
    const recentChatCacheKeyOfUser = `recent_chats:${user.id}`;
    const recentChatCacheKeyOfFriend = `recent_chats:${friendRequester.id}`;
    
    const friendsCacheKey = `user:${user.id}:friends`;
    const otherFriendsCacheKey = `user:${friendRequester.id}:friends`;

    // time now in milliseconds
    let time = Date.now();

    // No need to add some to chatCacheKey because only group chats have some metadata and they are not created here
    
    await redis.ZADD(recentChatCacheKeyOfUser, {score: time, value: chatCacheKey});
    await redis.ZADD(recentChatCacheKeyOfFriend, {score: time,value: chatCacheKey});
    await redis.SADD(friendsCacheKey, friendRequester.id);
    await redis.SADD(otherFriendsCacheKey, user.id);

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

  await redis.SREM(cacheKey, friendRequester.id);

  return {
    success: true,
  }
}),
});
