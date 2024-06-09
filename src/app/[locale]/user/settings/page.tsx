import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('userSettingsTitle'),
  }
}

type Props = {
  params: { locale: string }
}

export default function UserSettings() {
  const t = useTranslations()
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {t('Settings.title')}
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            {t('Chat.noChats')}
          </h3>
          <p className="text-sm text-muted-foreground">{t('Chat.startChat')}</p>
          <Link
            href="https://discord.gg/H2HeqRq54J"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-4">{t('Chat.addChat')}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
