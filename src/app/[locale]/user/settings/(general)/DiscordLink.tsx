import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DiscordLogoIcon } from '@radix-ui/react-icons'

export default function DiscordLink() {
  const t = useTranslations()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('Settings.discordLink.title')}</CardTitle>
          <CardDescription>
            {t('Settings.discordLink.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t('Settings.discordLink.notYet')}
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>
            <DiscordLogoIcon className="mr-2 h-6 w-6" />
            {t('Settings.discordLink.linkButton')}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
