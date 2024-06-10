import { getTranslations } from 'next-intl/server'

import DiscordLink from './DiscordLink'

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
  return (
    <>
      <div className="grid gap-6">
        <DiscordLink />
      </div>
    </>
  )
}
