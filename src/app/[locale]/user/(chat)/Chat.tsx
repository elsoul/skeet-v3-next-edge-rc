'use client'

import { cn } from '@/lib/utils'
import { ChatList } from './ChatList'
import { ChatPanel } from './ChatPanel'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message } from '@/prisma/neon/PrismaNeonClient'
import { useRouter } from 'next/navigation'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, className }: ChatProps) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

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
      <ChatPanel id={id} input={input} setInput={setInput} />
    </div>
  )
}
