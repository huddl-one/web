import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChatInput } from "@web/components/chat/ChatInput";
import Messages from "@web/components/chat/Messages";
import { Icons } from "@web/components/global/Icons";
import { Avatar, AvatarFallback } from "@web/components/ui/avatar";
import { redis } from "@web/lib/redis";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await redis.LRANGE(`chat:${chatId}:messages`, 0, -1);
    // TODO: if redis returns null, try to fetch from db

    const dbMessages = results.map((message) => JSON.parse(message) as ChatMessage);

    // const reversedMessages = dbMessages.reverse();

    return dbMessages;
  } catch (error) {
    notFound();
  }
}


export default async function Chat({ params }: { params: { chatId: string}}) {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  const {chatId} = params;

  const [userId1, userId2] = chatId.split("--")

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = await redis.HGETALL(`user:${chatPartnerId}`);
  const chatPartnerPlainObject = JSON.parse(JSON.stringify(chatPartner));

  const initialMessages = await getChatMessages(chatId);


  // If everything is fine, we can show the dashboard
  return <div className='flex-1 justify-between flex flex-col h-[85vh] border-2 border-gray-200'>
  <div className='flex sm:items-center justify-between pl-3 py-3 border-b-2 border-gray-200'>
    <div className='relative flex items-center space-x-4'>
      <div className='relative'>
        <Avatar className="relative w-8 sm:w-12 h-8 sm:h-12">
            {chatPartner.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={chatPartner.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{chatPartner.firstName}</span>
                    <Icons.user className="h-4 w-4 text-zinc-900" />
                </AvatarFallback>
            )}
        </Avatar>
      </div>
  
      <div className='flex flex-col leading-tight'>
        <div className='text-xl flex items-center'>
          <span className='text-gray-700 mr-3 font-semibold'>
          {chatPartner.firstName} {chatPartner.lastName}
          </span>
        </div>
  
        <span className='text-sm text-gray-600'>{chatPartner.username}</span>
      </div>
    </div>
  </div>
  
  <Messages
    chatId={chatId}
    chatPartner={chatPartnerPlainObject}
    sessionImg={user.picture}
    sessionId={user.id}
    initialMessages={initialMessages}
  />
  <ChatInput chatId={chatId} chatPartner={chatPartnerPlainObject} />
  </div>;
}
