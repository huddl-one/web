'use client'

import { Button } from '@tremor/react'
import { trpc } from '@web/app/_trpc/client'
import { Loader2, Send } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useToast } from '../ui/use-toast'

interface ChatInputProps {
  chatPartner: User
  chatId: string
}

export const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { toast } = useToast();

  chatPartner = JSON.parse(JSON.stringify(chatPartner)) as User;

  const messageMutation = trpc.message.sendMessage.useMutation({
    onSuccess: () => {
      setInput('')
      textareaRef.current?.focus()
      setIsLoading(false)
    },
    onError: (error) => {
      toast({
        title: "Something went wrong. Please try again later.",
        description: error.message,
        variant: "destructive",
        })
        setIsLoading(false)
    },
  })

  const sendMessage = async () => {
    if(!input) return
    setIsLoading(true)

    messageMutation.mutate({ text: input, chatId })

  }

  return (
    <div className='border-t border-gray-200 px-4 py-4 mb-2 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 px-2'>
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.firstName}`}
          className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className='py-2'
          aria-hidden='true'>
          <div className='py-px'>
            <div className='h-9' />
          </div>
        </div>

        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrin-0'>
            <Button disabled={isLoading} onClick={sendMessage} type='submit'>
              <span className='flex items-center'>
              {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Send className="w-3 h-3 mr-2" />}
              Send 
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}