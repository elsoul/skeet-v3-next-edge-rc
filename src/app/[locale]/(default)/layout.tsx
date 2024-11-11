import appInfo from '@appInfo'
import { auth } from '@/auth'
import { LanguageToggle } from '@/components/config/LanguageToggle'
import { ModeToggle } from '@/components/config/ModeToggle'
import { redirect } from '@/i18n/routing'
import { USER_PATHS } from '../user/userNavs'
import {
  DiscordIconLink,
  GithubIconLink,
  TwitterIconLink
} from '@/components/common/icons'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DefaultLayout({ children, params }: Props) {
  const { locale } = await params
  const session = await auth()
  if (session) {
    redirect({ href: USER_PATHS.home, locale })
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col justify-between">
        <header className="flex flex-row items-start justify-center p-6">
          <div className="flex flex-grow" />
          <div className="flex flex-row items-start justify-center gap-3">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </header>
        <main>{children}</main>
        <footer className="flex flex-row items-start justify-center p-6">
          <p className="text-sm tracking-tight text-zinc-400">
            © {new Date().getFullYear()} {appInfo.copyright}
          </p>
          <div className="flex flex-grow" />
          <div className="flex flex-row items-center gap-4">
            <GithubIconLink />
            <TwitterIconLink />
            <DiscordIconLink />
          </div>
        </footer>
      </div>
    </>
  )
}
