'use client'

import { cn } from '@/lib/utils'
import { ChatList } from './ChatList'
import { ChatPanel } from './ChatPanel'
import { ComponentProps, useState } from 'react'
import { useUIState } from 'ai/rsc'
import { Message } from '@/prisma/neon/PrismaNeonClient'
import { MESSAGE_LIMIT } from '@/lib/enums'

export interface ChatProps extends ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, className }: ChatProps) {
  const [input, setInput] = useState('')
  const [messages] = useUIState()

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full flex-col lg:h-[calc(100vh-60px)]">
      <div
        className={cn(
          'mx-auto max-h-[calc(100vh-10rem)] w-full overflow-auto px-3 pt-4 md:pt-10',
          className,
        )}
      >
        <ChatList messages={messages} />
      </div>
      {messages.length > MESSAGE_LIMIT ? null : (
        <ChatPanel id={id} input={input} setInput={setInput} />
      )}
    </div>
  )
}
