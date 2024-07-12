import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import SignInForm from './SignInForm'
import { useTranslations } from 'next-intl'
import { getDataForPageByPageJsonName, PageProps } from '@/lib/pages'

const { generateMetadata } = getDataForPageByPageJsonName('home')
export { generateMetadata }

export default function HomePage({}: PageProps) {
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
