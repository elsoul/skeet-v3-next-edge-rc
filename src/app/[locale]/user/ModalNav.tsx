'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/navigation'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import { useTranslations } from 'next-intl'
import UpgradeCard from '@/components/common/UpgradeCard'
import { userNav, USER_PATHS } from './userNavs'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function UserModalNav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setOpen(true)}
          >
            <HamburgerMenuIcon className="h-5 w-5" />
            <span className="sr-only">{t('common.toggleNavigationMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="mb-3 flex flex-row items-start">
              <LogoHorizontalLink className="w-24" href={USER_PATHS.home} />
            </div>
            {userNav.map((navItem) => (
              <Link
                href={navItem.path}
                key={`ModalNav ${navItem.label}`}
                className={cn(
                  pathname === navItem.path
                    ? 'bg-muted text-foreground hover:text-foreground dark:bg-muted/40'
                    : 'text-muted-foreground hover:text-foreground',
                  'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2',
                )}
                onClick={() => setOpen(false)}
              >
                <navItem.icon className="h-5 w-5" />
                {t(navItem.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <UpgradeCard />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
