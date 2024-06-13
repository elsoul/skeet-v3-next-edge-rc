'use server'

import { auth } from '@/auth'
import { getAccessToken, getUserInfo } from '@/lib/discordApi'
import { updateLinkedDiscordInfo } from '@/queries/user/update'

export default async function discordLinkAction(code: string) {
  try {
    console.log('code here', code)
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('User not found')
    }

    const oauth2 = await getAccessToken(
      code,
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_CLIENT_SECRET,
    )
    const userInfo = await getUserInfo(oauth2)

    console.log('userInfo:', userInfo)
    if (userInfo.id === undefined) {
      throw new Error('Authorization failed')
    }

    await updateLinkedDiscordInfo({
      discordId: userInfo.id,
      discordUsername: userInfo.username,
      discordIconUrl: `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}`,
    })
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}
