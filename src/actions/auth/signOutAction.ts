'use server'

import { signOut } from '@/auth'

export default async function signOutAction() {
  try {
    await signOut()
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('NEXT_REDIRECT')) {
        return
      } else {
        throw e
      }
    }
  }
}
