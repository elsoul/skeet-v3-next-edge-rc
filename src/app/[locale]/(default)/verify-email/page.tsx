import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { useTranslations } from 'next-intl'

export default function VerifyEmail() {
  const t = useTranslations()
  return (
    <>
      <div className="flex -translate-y-12 flex-col items-center justify-center gap-8 p-3">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 text-center">
          <EnvelopeClosedIcon className="h-24 w-24 text-zinc-500 dark:text-zinc-200" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
            {t('Auth.verifyEmail')}
          </h1>
          <p className="text-md text-zinc-500 dark:text-zinc-300">
            {t('Auth.verifyEmailMessage')}
          </p>
          <LogoHorizontalLink className="w-24" />
        </div>
      </div>
    </>
  )
}
