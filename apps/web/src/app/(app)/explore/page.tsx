import { db } from "@huddl/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Explore from "@web/components/explore/Explore";
import { redis } from "@web/lib/redis";
import { notFound } from "next/navigation";


export default async function Home() {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    notFound();
  }

  const cacheKey = `user:${user.id}:friends`;

  let cachedfriends = await redis.smembers(cacheKey);

  if (!cachedfriends) {
    console.log("cachedfriends: ", cachedfriends);

    const friends = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        friends: {
          select: {
            id: true,
            image: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });


    if (!friends) {
      notFound();
    }

    cachedfriends = friends.friends.map((friend) => {
      return {
        id: friend.id,
        username: friend.username,
        firstName: friend.firstName,
        lastName: friend.lastName,
        image: friend.image,
      } as any;
    });
  }
  else {
    // based on the ids, get the usernames from redis using cache key user:id
    let cachedFriendRequests = [];

    for (let i = 0; i < cachedfriends.length; i++) {
      const friendId = cachedfriends[i];
      const friend = await redis.hgetall(`user:${friendId}`);

      if (friend) {
        cachedFriendRequests[i] = {
          id: friend.id,
          username: friend.username,
          firstName: friend.firstName,
          lastName: friend.lastName,
          image: friend.image,
        } as any;
        }
      else {
        const friend = await db.user.findUnique({
          where: {
            id: friendId,
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
          image: friend.image,
        } as any;
      }
    }

    cachedfriends = cachedFriendRequests;
  }

  // If everything is fine, we can show the dashboard
  return <Explore friends={cachedfriends} userId={user.id} />;
}
