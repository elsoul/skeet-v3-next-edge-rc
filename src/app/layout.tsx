export const runtime = 'edge'

import { getTranslations } from 'next-intl/server'
import { locales } from './config'
import appInfo from '@appInfo'

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({
    locale: locale ? locale : locales[0],
    namespace: 'metadata',
  })

  return {
    metadataBase: new URL(
      process.env.NODE_ENV === 'production'
        ? `https://${appInfo.domain}`
        : 'http://localhost:4200',
    ),
    title: {
      template: `%s | ${t('appTitle')}`,
      default: t('defaultTitle'),
    },
    description: t('defaultDescription'),
    openGraph: {
      title: {
        template: `%s | ${t('appTitle')}`,
        default: t('defaultTitle'),
      },
      description: t('defaultDescription'),
      locale,
      type: 'website',
    },
    twitter: {
      creator: appInfo.twitterId,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
