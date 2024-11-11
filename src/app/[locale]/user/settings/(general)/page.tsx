import DiscordLink from './DiscordLink'
import { getLoggedInUser } from '@/queries/user/get'
import { redirect } from '@/i18n/routing'
import { DEFAULT_PATHS } from '@/app/[locale]/(default)/defaultNavs'
import { getDataForPageByPageJsonName, PageProps } from '@/lib/pages'

const { generateMetadata } = getDataForPageByPageJsonName('settings')
export { generateMetadata }

export default async function UserSettingsPage({ params }: PageProps) {
  const { locale } = await params
  const user = await getLoggedInUser()
  if (!user) {
    redirect({ href: DEFAULT_PATHS.home, locale })
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
