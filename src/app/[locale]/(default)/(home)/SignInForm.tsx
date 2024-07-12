'use client'

import signInAction from '@/actions/auth/signInAction'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { DEFAULT_PATHS } from '../defaultNavs'

export default function SignInForm() {
  const t = useTranslations()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await signInAction(formData)
        router.push(DEFAULT_PATHS.verifyEmail)
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: t('auth.errorSignInTitle'),
            description: t('auth.errorSignInDescription'),
          })
        }
      }
    })
  }

  return (
    <>
      <form action={submitAction} className="w-full max-w-sm">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{t('auth.signIn')}</CardTitle>
            <CardDescription>{t('auth.enterEmail')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="el@example.com"
                disabled={isPending}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isPending}>
              {t('auth.signIn')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}
