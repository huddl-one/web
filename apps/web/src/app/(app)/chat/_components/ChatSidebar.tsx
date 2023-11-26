"use client";

import { cn } from '@huddl/utils';
import { Icons } from '@web/components/global/Icons';
import { Avatar, AvatarFallback } from '@web/components/ui/avatar';
import { buttonVariants } from '@web/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ChatSidebar({chats}: {chats: any[]}) {
    const pathname = usePathname();
    // change type of chats to ChatMeta[]
    let chatsArr = chats

  return (
    <div className="flex flex-col gap-1 space-y-1 col-span-1">
            {chatsArr.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants(
                      pathname === item.href
                        ? { variant: "outline" }
                        : { variant: "ghost" },
                    ),
                    `w-full h-auto justify-start py-0 ${pathname === item.href ? "opacity-80" : "opacity-70"}`,
                  )}
                >
                    {item.type === "group" ? (
                          <div className='flex items-center gap-2 py-3 w-full'>
                            <Avatar className="relative w-8 h-8">
            {item.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={item.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{item.firstName}</span>
                    <Icons.user className="h-4 w-4 text-zinc-900" />
                </AvatarFallback>
            )}
        </Avatar>
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.lastMessage}</p>
                            </div>
                            </div>

                    ) : (
                        <div className='flex items-center gap-2 py-3 w-full'>
                            <Avatar className="relative w-8 h-8">
            {item.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={item.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{item.firstName}</span>
                    <Icons.user className="h-4 w-4 text-zinc-900" />
                </AvatarFallback>
            )}
        </Avatar>
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold">{`${item.firstName} ${item.lastName}`}</p>
                                <p className="text-xs text-gray-500">{item.lastMessage === undefined ? "Start Chatting" : JSON.parse(item.lastMessage).text}</p>
                            </div>
                        </div>
                    )}
                </Link>
              );
            })}
          </div>
  )
}

export default ChatSidebar