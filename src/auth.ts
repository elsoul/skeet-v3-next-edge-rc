import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import Resend from 'next-auth/providers/resend'
import type { Provider } from 'next-auth/providers'
import { sendVerificationRequest } from './lib/authSendRequest'

export const runtime = 'experimental-edge'

const adapter = new PrismaD1(process.env.SKEET_AUTH_DB)
const prisma = new PrismaClient({ adapter })

const providers: Provider[] = [
  Resend({
    from: process.env.EMAIL_FROM,
    sendVerificationRequest,
  }),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 14 * 24 * 60 * 60 },
  providers,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
