'use client'

import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'
import { userSettingsNav } from './settingsNavs'

export default function UserSettingsNav() {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <>
      <nav className="grid gap-4 text-sm text-muted-foreground">
        {userSettingsNav.map((navItem) => (
          <Link
            href={navItem.path}
            key={navItem.label}
            className={cn(
              pathname === navItem.path ? 'font-semibold text-primary' : '',
              '',
            )}
          >
            {t(navItem.label)}
          </Link>
        ))}
      </nav>
    </>
  )
}
