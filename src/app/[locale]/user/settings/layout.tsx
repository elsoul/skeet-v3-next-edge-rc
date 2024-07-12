import { useTranslations } from 'next-intl'
import UserSettingsNav from './SettingsNav'

type Props = {
  children: React.ReactNode
}

export default function UserSettingsLayout({ children }: Props) {
  const t = useTranslations()

  return (
    <>
      <div className="flex min-h-full flex-col bg-zinc-50 p-4 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid w-full gap-2 pb-3">
            <h1 className="text-lg font-semibold md:text-2xl">
              {t('settings.title')}
            </h1>
          </div>
          <div className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <UserSettingsNav />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
