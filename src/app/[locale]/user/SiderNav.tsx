import { ChatBubbleIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/navigation'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import UpgradeCard from '@/components/common/UpgradeCard'
import { useTranslations } from 'next-intl'

export default function UserSiderNav() {
  const t = useTranslations()

  return (
    <>
      <div className="hidden border-r bg-muted/40 dark:bg-muted/5 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <LogoHorizontalLink className="w-24" href="/user" />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 pt-2 text-sm font-medium lg:px-4">
              <Link
                href="/user"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                {t('User.home')}
              </Link>
              <Link
                href="/user"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary dark:bg-muted/40"
              >
                <ChatBubbleIcon className="h-4 w-4" />
                {t('User.aiChats')}
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  1
                </Badge>
              </Link>
              <Link
                href="/user"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <GearIcon className="h-4 w-4" />
                {t('User.settings')}
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <UpgradeCard />
          </div>
        </div>
      </div>
    </>
  )
}
