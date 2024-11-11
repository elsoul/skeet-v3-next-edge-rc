import { getTranslations } from 'next-intl/server'

export type PageProps = {
  params: Promise<{
    locale: string
  }>
}

export const getDataForPageByPageJsonName = (
  pageJsonName: string,
  keyForTitle: string | null = null
) => {
  return {
    generateMetadata: async ({ params }: PageProps) => {
      const { locale } = await params
      const t = await getTranslations({ locale, namespace: pageJsonName })

      return {
        title: keyForTitle ? t(keyForTitle) : t('title')
      }
    }
  }
}
