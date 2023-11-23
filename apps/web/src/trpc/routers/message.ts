import { db } from "@huddl/db";
import { toPusherKey } from "@huddl/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { pusherServer } from "@web/lib/pusher";
import { redis } from "@web/lib/redis";
import { sendingMessageValidator } from "@web/lib/validations/message";
import { privateProcedure, router } from "../trpc";

export const messageRouter = router({
    sendMessage: privateProcedure
    .input(sendingMessageValidator)
    .mutation(async ({
        input: { chatId, text },
        }) => {
            const { getUser } = getKindeServerSession();
            const user = getUser();

            if (!user || !user.id) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
            }

            const [userId1, userId2] = chatId.split("--")

            if (user.id !== userId1 && user.id !== userId2) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
            }

            const chatPartnerId = user.id === userId1 ? userId2 : userId1;

            
            const chatkey =  `chat:${chatId}`;
            const cacheKey = chatkey + `:messages`;
            const recentCacheKey = `recent_chats:${user.id}`;

            const message = await db.message.create({
                data: {
                    content: text,
                    chat: {
                        connect: {
                            id: chatId,
                        },
                    },
                    sender: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            // notify all connected chat room clients
            await pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming_message', {
                id: message.id,
                senderId: message.senderId,
                text: message.content,
                timestamp: message.createdAt.getTime(),
            })

            // await pusherServer.trigger(toPusherKey(`user:${chatPartnerId}:chats`), 'new_message', {
            // ...message,
            // senderImg: user.picture,
            // senderName: (user.given_name + ' ' + user.family_name),
            // })


            await redis.LPUSH(cacheKey, JSON.stringify({id: message.id, text: message.content, senderId: message.senderId, timestamp: message.createdAt.getTime()}));
            await redis.ZADD(recentCacheKey, {score: Date.now(), value: chatkey});

            return message;
        }),
    });