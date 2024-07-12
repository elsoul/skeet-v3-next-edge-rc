import { AI } from '@/actions/chat/chatProvider'
import { Chat } from './Chat'
import { getUserChats } from '@/queries/chat/get'
import { initialAIState } from '@/actions/chat/chatProvider'
import { getDataForPageByPageJsonName, PageProps } from '@/lib/pages'

const { generateMetadata } = getDataForPageByPageJsonName('chat')
export { generateMetadata }

export default async function UserChatPage({}: PageProps) {
  const chats = await getUserChats()

  const initAIState =
    !chats || chats.length === 0
      ? initialAIState
      : { chatId: chats[0].id, messages: chats[0].messages }

  return (
    <>
      <div className="w-full">
        <AI initialAIState={initAIState}>
          <Chat />
        </AI>
      </div>
    </>
  )
}
