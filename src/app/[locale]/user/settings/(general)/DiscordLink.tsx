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

import { User } from '@/prisma/neon/PrismaNeonClient'

import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type Props = {
  user: User
}

export default function DiscordLink({ user }: Props) {
  const t = useTranslations()
  console.log(user)

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
          <p className="flex flex-row items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span
              className={cn(`block h-1.5 w-1.5 rounded-full bg-gray-400`)}
            />
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
