import { UIState } from '@/actions/chat/chatProvider'

export interface ChatList {
  messages: UIState
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {messages.map((message, index) => (
        <div key={message.id} className="mx-auto w-full max-w-2xl">
          {message.display}
          {index < messages.length - 1 && <div className="my-6" />}
        </div>
      ))}
    </div>
  )
}
