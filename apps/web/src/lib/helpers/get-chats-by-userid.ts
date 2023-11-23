import { redis } from "../redis";

export async function getChatsByUserId(userId: string) {
    // our score is the timestamp, so we can get the most recent chats
    // our member is the cache key relavent chats
    // const recentChats = await redis.ZRANGE(`recent_chats:${userId}`, 0, 10, { BY: "SCORE", REV: true});
    const recentChats = await redis.ZRANGE_WITHSCORES(`recent_chats:${userId}`, 0, -1);

    console.log("recentChats", recentChats, "userId", `recent_chats:${userId}`);

    let chats = [];

    for (let i = 0; i < recentChats.length; i++) {
        const chatKey = recentChats[i]?.value!;
        const timestamp = recentChats[i]?.score;
        const type = chatKey?.split(":")[0];
        let chatMeta : Record<string, unknown> | null;
        let href: string;
        if (type === "chat") {
            let combo = chatKey?.split(":")[1]
            let [usr1, usr2] = combo!.split("--")
            let friendId;
            if (usr1 === userId) {
                friendId = usr2;
            } else {
                friendId = usr1;
            }
            chatMeta = await redis.HGETALL(`user:${friendId}`);
            href = `/chat/${combo}`;
            const lastMessages: string[] = await redis.LRANGE(`chat:${combo}:messages`, 0, 0);
            chatMeta.lastMessage = lastMessages[0];
        } else {
            chatMeta = await redis.HGETALL(chatKey);
            href = `/chat/group/${chatKey.split(":")[1]}`;
            // TODO: get last message
            chatMeta.lastMessage = "last message";
        }
        chats.push({
            ...chatMeta,
            timestamp,
            type,
            href
        });
    }

    return chats;

}