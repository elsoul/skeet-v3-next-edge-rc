import DiscordLink from './DiscordLink'
import { getLoggedInUser } from '@/queries/user/get'
import { redirect } from '@/navigation'
import { DEFAULT_PATHS } from '@/app/[locale]/(default)/defaultNavs'
import { getDataForPageByPageJsonName, PageProps } from '@/lib/pages'

const { generateMetadata } = getDataForPageByPageJsonName('settings')
export { generateMetadata }

export default async function UserSettingsPage({}: PageProps) {
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
