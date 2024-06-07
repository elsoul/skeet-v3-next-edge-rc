import { auth } from '@/auth'
import { ModeToggle } from '@/components/config/ModeToggle'
import { redirect } from '@/navigation'
import UserMenu from './UserMenu'
import { LanguageToggle } from '@/components/config/LanguageToggle'
import UserModalNav from './ModalNav'
import UserSiderNav from './SiderNav'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function UserLayout({ children }: Props) {
  const session = await auth()
  if (!session || !session.user?.id) {
    redirect('/')
  }
  console.log(session)

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <UserSiderNav />
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 dark:bg-muted/5 lg:h-[60px] lg:px-6">
            <UserModalNav />
            <div className="flex flex-grow" />
            <LanguageToggle />
            <ModeToggle />
            <UserMenu />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
