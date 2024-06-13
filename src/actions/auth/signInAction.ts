'use server'

import { signIn } from '@/auth'

export default async function signInAction(formData: FormData) {
  try {
    await signIn('resend', formData)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      if (e.message.includes('NEXT_REDIRECT')) {
        return
      } else {
        throw e
      }
    }
  }
}
