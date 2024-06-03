import createMiddleware from 'next-intl/middleware'
import { auth } from '@/auth'
import { localePrefix } from '@/navigation'
import { locales, defaultLocale } from '@/app/config'

export const runtime = 'experimental-edge'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
})

export default auth((req) => {
  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
