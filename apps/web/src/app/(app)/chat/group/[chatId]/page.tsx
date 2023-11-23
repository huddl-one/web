import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ChatWindow from "@web/components/chat/ChatWindow";
import { redis } from "@web/lib/redis";
import { notFound } from "next/navigation";

async function getGroupChatMessages(chatId: string) {
  try {
    const results: string[] = await redis.LRANGE(`group:${chatId}:messages`, 0, -1);
    // TODO: if redis returns null, try to fetch from db

    const dbMessages = results.map((message) => JSON.parse(message) as ChatMessage);

    const reversedMessages = dbMessages.reverse();

    return reversedMessages;
  } catch (error) {
    notFound();
  }
}


export default async function Chat({chatId}: {chatId: string}) {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  let groupMetaData = await redis.GET(`group:${chatId}`);

  if (!groupMetaData) {
    notFound();
  }

  groupMetaData = JSON.parse(groupMetaData!);
  

  const intialMessages = await getGroupChatMessages(chatId);


  // If everything is fine, we can show the dashboard
  return <ChatWindow />;
}
