import { AI } from '@/actions/chat/chatProvider'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Chat } from './Chat'

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('userChatTitle'),
  }
}

type Props = {
  params: { locale: string }
}

export default function UserChat() {
  const t = useTranslations()
  return (
    <>
      <div className="w-full">
        <AI>
          <Chat />
        </AI>
      </div>
    </>
  )
}
