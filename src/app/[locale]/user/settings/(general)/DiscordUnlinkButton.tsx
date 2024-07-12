'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useTransition } from 'react'
import discordUnlinkAction from '@/actions/discord/discordUnlink'
import { useRouter } from '@/navigation'

export default function DiscordUnlinkButton() {
  const t = useTranslations()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const unlinkDiscord = async () => {
    startTransition(async () => {
      try {
        await discordUnlinkAction()
        router.refresh()
      } catch (e) {
        toast({
          title: t('settings.discordLink.errorTitle'),
          description: t('settings.discordLink.errorDescription'),
        })
      }
    })
  }

  return (
    <>
      <Button
        onClick={() => unlinkDiscord()}
        variant="outline"
        disabled={isPending}
      >
        {t('settings.discordLink.unlinkButton')}
      </Button>
    </>
  )
}
