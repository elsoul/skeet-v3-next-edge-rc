'use client'

import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import signOutAction from '@/actions/auth/signOutAction'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from '@/navigation'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getGravatarUrl } from '@/lib/utils'
import { DEFAULT_PATHS } from '../(default)/defaultNavs'
import { USER_PATHS } from './userNavs'

export default function UserMenu() {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()
  const session = useSession()
  const submitAction = async () => {
    startTransition(async () => {
      try {
        await signOutAction()
        router.push(DEFAULT_PATHS.home)
        toast({
          title: t('Auth.signOutTitle'),
          description: t('Auth.signOutDescription'),
        })
      } catch (e) {
        if (e instanceof Error) {
          console.error(e)
        }
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="hover:cursor-pointer">
            <AvatarImage src={getGravatarUrl(session.data?.user?.email)} />
            <AvatarFallback />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session.data?.user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(USER_PATHS.settings)}
            disabled={isPending}
          >
            {t('Settings.title')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={submitAction} disabled={isPending}>
            {t('Auth.signOut')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
