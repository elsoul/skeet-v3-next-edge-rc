import { auth } from '@/auth'
import prismaNeonClient from '@/lib/prismaNeonClient'

export const getLoggedInUser = async () => {
  const prisma = prismaNeonClient(process.env.NEON_DB_URL)
  const session = await auth()
  if (!session?.user?.id) {
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      uid: session.user.id,
    },
  })
  return user
}
