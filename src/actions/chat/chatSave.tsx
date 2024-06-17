import { Chat, Message } from '@/prisma/neon/PrismaNeonClient'

export async function saveChat({
  chat,
  messages,
}: {
  chat: Chat
  messages: Message[]
}) {}
