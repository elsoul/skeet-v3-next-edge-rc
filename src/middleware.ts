import createMiddleware from 'next-intl/middleware'
import { auth } from '@/auth'
import { locales, defaultLocale } from '@/app/config'

export const runtime = 'experimental-edge'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export default auth((req) => {
  return intlMiddleware(req as any)
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
