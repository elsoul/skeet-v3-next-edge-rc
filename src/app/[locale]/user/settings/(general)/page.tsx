import { getTranslations } from 'next-intl/server'

import DiscordLink from './DiscordLink'
import { getLoggedInUser } from '@/queries/user/get'
import { redirect } from '@/navigation'
import { DEFAULT_PATHS } from '@/app/[locale]/(default)/defaultNavs'

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('userSettingsTitle'),
  }
}

type Props = {
  params: { locale: string }
}

export default async function UserSettings() {
  const user = await getLoggedInUser()
  if (!user) {
    redirect(DEFAULT_PATHS.home)
    return
  }

  return (
    <>
      <div className="grid gap-6">
        <DiscordLink user={user} />
      </div>
    </>
  )
}
