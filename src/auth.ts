import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient as PrismaAuthClient } from '@/prisma/auth/PrismaAuthClient'
import { PrismaD1 } from '@prisma/adapter-d1'
import Resend from 'next-auth/providers/resend'
import type { Provider } from 'next-auth/providers'
import { sendVerificationRequest } from './lib/authSendRequest'
import prismaNeonClient from './lib/prismaNeonClient'
import { getGravatarUrl } from './lib/utils'

export const runtime = 'experimental-edge'

const adapter = new PrismaD1(process.env.SKEET_AUTH_DB)
const prisma = new PrismaAuthClient({ adapter })

const providers: Provider[] = [
  Resend({
    from: process.env.EMAIL_FROM,
    sendVerificationRequest
  })
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 14 * 24 * 60 * 60 },
  providers,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (!user || !user.email || !user.id) {
        return token
      }
      token.id = user.id
      if (trigger === 'signUp') {
        console.log(`Signed up user: ${user.email}`)
        const prisma = prismaNeonClient(process.env.NEON_DB_URL)
        try {
          await prisma.user.create({
            data: {
              uid: user.id,
              email: user.email,
              username: user.email.split('@')[0],
              role: 'USER',
              iconUrl: getGravatarUrl(user.email)
            }
          })
        } catch (e: Error | any) {
          if (e.message.includes('Unique constraint failed')) {
            console.log('Already exists')
          } else {
            console.error(e)
          }
        }
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  }
})

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
