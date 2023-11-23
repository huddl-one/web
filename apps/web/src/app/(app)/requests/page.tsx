import { db } from "@huddl/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Requests from "@web/components/requests/Requests";
import { customHmset } from "@web/lib/helpers/custom-hmset";
import { redis } from "@web/lib/redis";
import { notFound } from "next/navigation";


export default async function Home() {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    notFound();
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
      notFound();
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
          notFound();
        }

        cachedFriendRequests[i] = {
          id: friend.id,
          username: friend.username,
          firstName: friend.firstName,
          lastName: friend.lastName,
        } as any;

        await customHmset(`user:${friendRequesterId}`, friend);
      }
    }

    friendRequests = cachedFriendRequests;
  }

  // If everything is fine, we can show the dashboard
  return <Requests data={friendRequests} />;
}
