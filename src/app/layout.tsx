export const runtime = 'edge'

import { getTranslations } from 'next-intl/server'
import { locales } from './config'
import appInfo from '@appInfo'

type Props = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({
    locale: locale ? locale : locales[0],
    namespace: 'metadata'
  })

  return {
    metadataBase: new URL(
      process.env.NODE_ENV === 'production'
        ? `https://${appInfo.domain}`
        : 'http://localhost:4242'
    ),
    generator: appInfo.copyright,
    applicationName: t('appTitle'),
    title: {
      template: `%s | ${t('appTitle')}`,
      default: `${t('defaultTitle')} | ${t('appTitle')}`
    },
    description: t('defaultDescription'),
    openGraph: {
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      creator: appInfo.twitterId,
      site: appInfo.twitterId
    },
    robots: {
      index: false,
      follow: false,
      nocache: true
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
