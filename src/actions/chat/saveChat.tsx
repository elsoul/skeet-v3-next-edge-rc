'use server'

import { Chat, Message } from '@/prisma/neon/PrismaNeonClient'
import prismaNeonClient from '@/lib/prismaNeonClient'

export async function saveChat({
  userId,
  chat,
  messages,
}: {
  userId: number
  chat: Chat
  messages: Message[]
}) {
  const prisma = prismaNeonClient(process.env.NEON_DB_URL)
  try {
    const existingChat = await prisma.chat.findUnique({
      where: { id: chat.id },
      include: {
        messages: true,
      },
    })

    let savedChat

    if (!existingChat) {
      savedChat = await prisma.chat.create({
        data: {
          title: chat.title,
          userId: userId,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        },
      })
    } else {
      savedChat = existingChat
    }

    const existingMessagesContent = new Set(
      existingChat?.messages.map((msg) => msg.content),
    )

    const newMessages = messages.filter(
      (message) => !existingMessagesContent.has(message.content),
    )

    const savedMessages = await Promise.all(
      newMessages.map((message) =>
        prisma.message.create({
          data: {
            chatId: savedChat.id,
            role: message.role,
            content: message.content,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
          },
        }),
      ),
    )

    return { savedChat, savedMessages }
  } catch (error) {
    console.error('Error saving chat and messages:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
