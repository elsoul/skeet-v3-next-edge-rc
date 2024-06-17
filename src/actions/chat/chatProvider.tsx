import { createAI, getAIState } from 'ai/rsc'

import { saveChat } from './chatSave'
import { submitUserMessage } from './chatSubmit'

import { BotMessage, UserMessage } from './chatMessages'

import { auth } from '@/auth'
import { Chat, Message } from '@/prisma/neon/PrismaNeonClient'
import { getLoggedInUser } from '@/queries/user/get'

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: '', messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState as AIState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const user = await getLoggedInUser()

    if (user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const updatedAt = new Date()
      const userId = user.id

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        updatedAt,
      }

      await saveChat({ chat, messages })
    } else {
      return
    }
  },
})

export const getUIStateFromAIState = (aiState: AIState) => {
  return aiState.messages
    .filter((message) => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null,
    }))
}
