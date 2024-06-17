export const runtime = 'edge'

import { getTranslations } from 'next-intl/server'
import { appInfo } from './config'

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
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
