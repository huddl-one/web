'use client'

import { cn, toPusherKey } from '@huddl/utils'
import { pusherClient } from '@web/lib/pusher'
import { Message } from '@web/lib/validations/message'

// import { Message } from '@/lib/validations/message'
import { format } from 'date-fns'
import { FC, useEffect, useRef, useState } from 'react'
import { Icons } from '../global/Icons'

interface MessagesProps {
  initialMessages: Message[]
  sessionId: string
  chatId: string
  sessionImg: string | null | undefined
  chatPartner: User
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
  sessionImg,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  chatPartner = JSON.parse(JSON.stringify(chatPartner)) as User;

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`chat:${chatId}`)
    )

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev])
      console.log(messages)
    }

    pusherClient.bind('incoming_message', messageHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`chat:${chatId}`)
      )
      pusherClient.unbind('incoming_message', messageHandler)
    }
  }, [chatId])

  const scrollDownRef = useRef<HTMLDivElement | null>(null)

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
  }

  const formatDate = (timestamp: number) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dayOfWeek = messageDate.getDay();
    const todayDayOfWeek = today.getDay();

    // Formatting the date as '23 November 2023'
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

    const formattedDate = messageDate.toLocaleDateString(undefined, options);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (dayOfWeek < todayDayOfWeek && messageDate > yesterday) {
      // If the message date is within the current week
      return messageDate.toLocaleDateString(undefined, { weekday: 'long' });
    } else {
      return formattedDate;
    }
}

  return (
    <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrolling-touch bg-gray-50'>
      <div ref={scrollDownRef} />

      {messages && messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index]?.senderId
        
          const isNextMessageFromDifferentDay =
          (messages[index - 1] &&
          new Date(messages[index - 1]?.timestamp || 0).toDateString() !==
            new Date(messages[index]?.timestamp || 0).toDateString()) || index === messages.length - 1;

        return (
          <div
            className='chat-message'
            key={`${message.id}-${message.timestamp}`}>
            {isNextMessageFromDifferentDay && (
            <div className="text-center text-xs my-4 font-semibold">
              <span className='p-1 px-2 bg-gray-200 rounded-lg'>{formatDate(messages[index]?.timestamp!)}</span>
            </div>
      )}
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}>
              <div
                className={cn(
                  'flex flex-col space-y-2 text-base max-w-xs mx-2',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}>
                <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}>
                  {message.text}{' '}
                  <span className='ml-2 text-xs text-gray-400'>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </span>
              </div>

              <div
                className={cn('relative w-6 h-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}>
                {/* <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner
                  }
                  alt='Profile picture'
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                /> */}
                <Icons.user className="h-4 w-4 text-zinc-900" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages