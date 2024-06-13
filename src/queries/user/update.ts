import { auth } from '@/auth'
import prismaNeonClient from '@/lib/prismaNeonClient'

export const updateLinkedDiscordInfo = async ({
  discordId,
  discordUsername,
  discordIconUrl,
}: {
  discordId?: string
  discordUsername?: string
  discordIconUrl?: string
}) => {
  const prisma = prismaNeonClient(process.env.NEON_DB_URL)
  const session = await auth()
  if (!session?.user?.id) {
    return false
  }

  await prisma.user.update({
    where: {
      uid: session.user.id,
    },
    data: {
      discordId,
      discordUsername,
      discordIconUrl,
    },
  })

  return true
}
