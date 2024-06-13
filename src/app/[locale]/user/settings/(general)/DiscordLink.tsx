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
import { cn } from '@/lib/utils'

import { User } from '@/prisma/neon/PrismaNeonClient'
import Image from 'next/image'
import { appInfo } from '@/app/config'

type Props = {
  user: User
}

const discordLoginLink =
  process.env.NODE_ENV === 'production'
    ? `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2F${appInfo.domain}%2Fuser%2Fdiscord-action&response_type=code&scope=identify%20email`
    : `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fuser%2Fdiscord-action&response_type=code&scope=identify%20email`

export default function DiscordLink({ user }: Props) {
  const t = useTranslations()
  const isLinkedDiscord = user.discordId !== ''

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
              className={cn(
                isLinkedDiscord ? 'bg-green-400' : 'bg-gray-400',
                `block h-1.5 w-1.5 rounded-full`,
              )}
            />
            {isLinkedDiscord && (
              <Image
                src={user.discordIconUrl}
                alt="Discord icon"
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
                unoptimized
              />
            )}
            {isLinkedDiscord
              ? `${t('Settings.discordLink.linking')}: ${user.discordUsername}`
              : t('Settings.discordLink.notYet')}
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          {isLinkedDiscord ? (
            <Button variant="outline">
              {t('Settings.discordLink.unlinkButton')}
            </Button>
          ) : (
            <a href={discordLoginLink}>
              <Button>
                <DiscordLogoIcon className="mr-2 h-6 w-6" />
                {t('Settings.discordLink.linkButton')}
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
