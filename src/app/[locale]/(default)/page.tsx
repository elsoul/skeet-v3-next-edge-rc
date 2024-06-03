import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import SignInForm from './SignInForm'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()
  return (
    <>
      <div className="flex -translate-y-12 flex-col items-center justify-center gap-8 p-3">
        <LogoHorizontalLink className="w-24" />
        <SignInForm />
      </div>
    </>
  )
}
