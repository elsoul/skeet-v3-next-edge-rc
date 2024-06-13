'use client'

import { Link } from '@/navigation'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { useTranslations } from 'next-intl'
import { USER_PATHS } from '../userNavs'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useTransition, useEffect, useCallback, useState } from 'react'
import discordLinkAction from '@/actions/discord/discordLink'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from '@/navigation'

export default function DiscordLinking() {
  const t = useTranslations()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isLinked, setLinked] = useState(false)

  const linkDiscord = useCallback(
    async (code: string) => {
      startTransition(async () => {
        try {
          await discordLinkAction(code)
          setLinked(true)
        } catch (e) {
          console.error(e)
          toast({
            title: t('Settings.discordLink.errorTitle'),
            description: t('Settings.discordLink.errorDescription'),
          })
          router.push(USER_PATHS.settings)
        }
      })
    },
    [toast, t, router],
  )

  useEffect(() => {
    if (code) {
      void linkDiscord(code)
    }
  }, [linkDiscord, code])

  return (
    <>
      <div className="flex h-full -translate-y-12 flex-col items-center justify-center gap-8 p-3">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 text-center">
          <DiscordLogoIcon
            className={cn(
              isLinked ? 'text-green-400' : 'text-zinc-500 dark:text-zinc-200',
              'h-24 w-24',
            )}
          />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
            {isLinked
              ? t('Settings.discordLink.confirmedTitle')
              : t('Settings.discordLink.confirmingTitle')}
          </h1>
          <p className="text-md max-w-xs text-zinc-500 dark:text-zinc-300">
            {isLinked
              ? t('Settings.discordLink.confirmedDescription')
              : t('Settings.discordLink.confirmingDescription')}
          </p>
          <Link href={USER_PATHS.settings}>
            <Button disabled={isPending}>
              {t('Settings.discordLink.backToSettings')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
