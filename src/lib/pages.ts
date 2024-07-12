import { getTranslations } from 'next-intl/server'

export type PageProps = {
  params: {
    locale: string
  }
}

export const getDataForPageByPageJsonName = (
  pageJsonName: string,
  keyForTitle: string | null = null,
) => {
  return {
    generateMetadata: async ({ params: { locale } }: PageProps) => {
      const t = await getTranslations({ locale, namespace: pageJsonName })

      return {
        title: keyForTitle ? t(keyForTitle) : t('title'),
      }
    },
  }
}
