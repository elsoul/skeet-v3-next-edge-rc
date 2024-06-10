import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import { Link } from '@/navigation'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { useTranslations } from 'next-intl'
import { USER_PATHS } from '../userNavs'
import { Button } from '@/components/ui/button'

type Props = {}

export default function DiscordAction({}: Props) {
  const t = useTranslations()
  return (
    <>
      <div className="flex h-full -translate-y-12 flex-col items-center justify-center gap-8 p-3">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 text-center">
          <DiscordLogoIcon className="h-24 w-24 text-zinc-500 dark:text-zinc-200" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
            {t('Settings.discordLink.confirmingTitle')}
          </h1>
          <p className="text-md text-zinc-500 dark:text-zinc-300">
            {t('Settings.discordLink.confirmingDescription')}
          </p>
          <Link href={USER_PATHS.settings}>
            <Button>{t('Settings.discordLink.backToSettings')}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
