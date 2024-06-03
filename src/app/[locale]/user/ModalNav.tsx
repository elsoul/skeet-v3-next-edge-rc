import {
  ChatBubbleIcon,
  GearIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import UpgradeCard from '@/components/common/UpgradeCard'

export default function UserModalNav() {
  const t = useTranslations()
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">{t('User.toggleNavigationMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="mb-3 flex flex-row items-start">
              <LogoHorizontalLink className="w-24" href="/user" />
            </div>

            <Link
              href="/user"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <HomeIcon className="h-5 w-5" />
              {t('User.home')}
            </Link>
            <Link
              href="/user"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground dark:bg-muted/40"
            >
              <ChatBubbleIcon className="h-5 w-5" />
              {t('User.aiChats')}
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                1
              </Badge>
            </Link>
            <Link
              href="/user"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <GearIcon className="h-5 w-5" />
              {t('User.settings')}
            </Link>
          </nav>
          <div className="mt-auto">
            <UpgradeCard />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
