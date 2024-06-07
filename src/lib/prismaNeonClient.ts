import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient as PrismaNeonClient } from '@/prisma/neon/PrismaNeonClient'

const prismaNeonClient = (databaseUrl: string) => {
  neonConfig.webSocketConstructor = WebSocket
  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaNeon(pool)
  const prisma = new PrismaNeonClient({ adapter })
  return prisma as PrismaNeonClient
}

export default prismaNeonClient
