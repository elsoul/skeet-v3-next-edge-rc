import { Inter, Noto_Sans_JP } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import '../globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SessionProvider } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp'
})

type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export const runtime = 'edge'

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'overflow-hidden',
          `${inter.variable} ${notoSansJP.variable}`
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SessionProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </SessionProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
