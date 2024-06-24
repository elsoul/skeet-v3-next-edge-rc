import { AI } from '@/actions/chat/chatProvider'
import { getTranslations } from 'next-intl/server'
import { Chat } from './Chat'
import { getUserChats } from '@/queries/chat/get'
import { initialAIState } from '@/actions/chat/chatProvider'

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('userChatTitle'),
  }
}

type Props = {
  params: { locale: string }
}

export default async function UserChat() {
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
