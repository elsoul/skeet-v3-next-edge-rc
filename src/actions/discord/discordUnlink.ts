'use server'

import { auth } from '@/auth'
import { updateLinkedDiscordInfo } from '@/queries/user/update'

export default async function discordUnlinkAction() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('User not found')
    }

    await updateLinkedDiscordInfo({
      discordId: '',
      discordUsername: '',
      discordIconUrl: '',
    })
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      throw e
    }
  }
}
