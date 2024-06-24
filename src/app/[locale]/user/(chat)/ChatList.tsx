import { UIState } from '@/actions/chat/chatProvider'
import UpgradeCard from '@/components/common/UpgradeCard'
import { MESSAGE_LIMIT } from '@/lib/enums'
import { useRef, useLayoutEffect } from 'react'

export interface ChatList {
  messages: UIState
}

export function ChatList({ messages }: ChatList) {
  const scrollBottomRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [messages])

  if (!messages.length) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-2xl pb-20">
      {messages.map((message, index) => (
        <div key={message.id} className="mx-auto w-full max-w-2xl">
          {message.display}
          {index < messages.length - 1 && <div className="my-6" />}
        </div>
      ))}
      {messages.length > MESSAGE_LIMIT && (
        <div className="mt-10">
          <UpgradeCard />
        </div>
      )}
      <div ref={scrollBottomRef} />
    </div>
  )
}
