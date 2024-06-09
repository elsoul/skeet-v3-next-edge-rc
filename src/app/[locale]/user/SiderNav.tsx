'use client'

import { Link, usePathname } from '@/navigation'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import UpgradeCard from '@/components/common/UpgradeCard'
import { useTranslations } from 'next-intl'
import { USER_PATHS, userNav } from './userNav'
import { cn } from '@/lib/utils'

export default function UserSiderNav() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <>
      <div className="hidden border-r bg-muted/40 dark:bg-muted/5 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <LogoHorizontalLink className="w-24" href={USER_PATHS.home} />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 pt-2 text-sm font-medium lg:px-4">
              {userNav.map((navItem) => (
                <Link
                  href={navItem.path}
                  key={`ModalNav ${navItem.label}`}
                  className={cn(
                    pathname === navItem.path
                      ? 'bg-muted text-primary transition-all hover:text-primary dark:bg-muted/40'
                      : 'text-muted-foreground hover:text-primary',
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  )}
                >
                  <navItem.icon className="h-5 w-5" />
                  {t(navItem.label)}
                </Link>
              ))}
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
